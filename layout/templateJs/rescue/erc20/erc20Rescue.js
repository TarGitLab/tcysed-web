import { showToast } from "../../../utils/toast.js";
import { controller } from "../../../layoutController/layoutController.js";
import { rescueTermsData, ERC20_rescue_commission } from "./erc20RescueTC.js";

import { ethers } from "../../../../src/libary/ethers@6.5.0.js";
import { evmNetworks } from "../../../config/chains.js";

import { getERC20Details , getERC20Balance } from "../../../../src/backend/rescue/erc20/getErc20Details.js";
import { encodeErc20Transfer } from "../../../../src/backend/rescue/erc20/encodeErc20T.js";
import { readyForSendingTxRequest } from "./txSend.js";
import { validateSelectedRescueWallets, getSelectedWalletDetails, } from "../../../../src/backend/site/settings/rescueWalletsStorage.js";
import {  initErc20RescueStorage,  setErc20RescueValue,  getErc20RescueValue,  clearErcRescue,} from "../../../../src/backend/rescue/erc20/erc20.js";
import { checkRpc } from "../../../../src/backend/utils/static/checkRpcUrl.js";

let erc20RescueKeys = [
  "isWalletsConfigured",
  "rpcUrl",
  "erc20ContractAddress",
  "tokenTransferTx",
  "isSimulate",
];
let selectedWalletType = ["safe", "compromised", "sponsor"];
let provider,chainId, tokenDetails, rescueTokenAmount;

let Txs = {
  tokenTransfer: {},
};
let wallets = {};

async function transferTxSendDetails() {

  let sendTransaction = document.querySelector("#sendTransaction");
  sendTransaction.addEventListener("click", async () => {

    if (!getErc20RescueValue(erc20RescueKeys[4])) {
      showToast({  message: "You must simulate the transaction before proceeding.",  type: 2,  duration: 5,});
      return;
    }

    sendTransaction.innerHTML = "Sending...";
    await readyForSendingTxRequest();
    sendTransaction.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
      </svg>
      Send Transaction
    `;

  });
}

async function checkServiceFee() {

  let simulateServiceFeeResult = document.querySelector("#simulateServiceFeeResult");
  simulateServiceFeeResult.innerHTML =
    `Service Commission: ${ERC20_rescue_commission}% ; 
    This commission is required to safely extract tokens from a compromised wallet that has an active sweeper bot installed.`;
  simulateServiceFeeResult.style.backgroundColor = "var(--success_bg)";
  simulateServiceFeeResult.style.color = "var(--success)";
  simulateServiceFeeResult.classList.remove("hidden");

  await setErc20RescueValue(erc20RescueKeys[4], true);
  await transferTxSendDetails();

}

function getNativeToken(chainId) {
  const network = evmNetworks.find((n) => n.chainId === chainId);
  return network ? network.nativeToken : null;
}

async function checkGasFeeForTx() {
  let simulateGasResult = document.querySelector("#simulateGasResult");

  // get tx fees
  const gas1 = await provider.estimateGas(Txs.tokenTransfer);

  const feeData = await provider.getFeeData();
  const gasPrice = feeData.gasPrice;

  const fee1Wei = gas1 * gasPrice;

  const doubleTotalFee = fee1Wei * 2n;

  let networksNT = getNativeToken(chainId);
  const totalFeeNative = ethers.formatEther(doubleTotalFee);

  // get wallet balance
  let walletBalance = await provider.getBalance(wallets.sponsorWalletAddress);

  if (walletBalance < doubleTotalFee) {
    showToast({
      message: `Sponsor wallet does not have enough ${networksNT} for the transaction. ` +   `Wallet balance: ${ethers.formatEther(walletBalance)} ${networksNT}. ` +   `Gas fee required: ${totalFeeNative} ${networksNT}.`, type: 3, duration: 30,
    });
    simulateGasResult.innerHTML = `Sponsor wallet does not have enough ${networksNT} for the transaction. Wallet balance: ${ethers.formatEther(walletBalance)} ${networksNT}. Gas fee required: ${totalFeeNative} ${networksNT}.`;
    simulateGasResult.style.backgroundColor = "var(--danger_bg)";
    simulateGasResult.style.color = "var(--danger)";
    simulateGasResult.classList.remove("hidden");
    return false;
  } else {
    simulateGasResult.innerHTML = "Successfull";
    simulateGasResult.style.backgroundColor = "var(--success_bg)";
    simulateGasResult.style.color = "var(--success)";
    simulateGasResult.classList.remove("hidden");

    return true;
  }
  
}

async function simulateTxByProvider() {

  if (!Txs.tokenTransfer) {
    showToast({ message: "Token Transfer Tx not found.", type: 3 });
    return;
  }

  if (!provider) {
    showToast({ message: "Provider not set.", type: 3 });
    return;
  }

  let simu1 = false; 
  let error1;

  try {
    const result1 = await provider.call(Txs.tokenTransfer);
    simu1 = true;
  } catch (error) {
    error1 = error.message
    showToast({ message: error.message, type: 3, duration: 30 });
  }

  let simulateTxResult = document.querySelector("#simulateTxResult");
  if (simu1) {
    simulateTxResult.innerHTML = "Successfull";
    simulateTxResult.style.backgroundColor = "var(--success_bg)";
    simulateTxResult.style.color = "var(--success)";
    simulateTxResult.classList.remove("hidden");

    await setErc20RescueValue(
      erc20RescueKeys[3],
      JSON.stringify({
        tokenContractAddress: getErc20RescueValue(erc20RescueKeys[2]),
        safeWalletAddress: wallets.safeWalletAddress,
        tokenDecimals: tokenDetails.decimals.toString(),
        transferAmount: rescueTokenAmount,
      })
    );
    return true;
  } else {
    simulateTxResult.innerHTML = `${error1}`;
    simulateTxResult.style.backgroundColor = "var(--danger_bg)";
    simulateTxResult.style.color = "var(--danger)";
    simulateTxResult.classList.remove("hidden");
    return;
  }
}

async function getTransferTx(txData, coWallet) {
  let erc20CaAddress = await getErc20RescueValue(erc20RescueKeys[2]);
  if (!erc20CaAddress) {
    showToast({
      message: "ERC-20 token contract address not found.",
      type: 3,
      duration: 5,
    });
  }

  let coWalletAddress = coWallet.wallet.address;

  let tx = {
    from: coWalletAddress,
    to: erc20CaAddress,
    data: txData,
  };

  return tx;
}

async function createTransferTx() {

  let selectedSafeWallet = getSelectedWalletDetails(selectedWalletType[0]);
  let selectedCompromisedWallet = getSelectedWalletDetails(
    selectedWalletType[1]
  );
  let selectedSponsorWallet = getSelectedWalletDetails(selectedWalletType[2]);

  if (!selectedSafeWallet.status) {
    showToast({ message: selectedSafeWallet.message, type: 3, duration: 5 });
    return;
  }

  if (!selectedCompromisedWallet.status) {
    showToast({
      message: selectedCompromisedWallet.message,
      type: 3,
      duration: 5,
    });
    return;
  }

  if (!selectedSponsorWallet.status) {
    showToast({ message: selectedSponsorWallet.message, type: 3, duration: 5 });
    return;
  }

  wallets.sponsorWalletAddress = selectedSponsorWallet.wallet.address;
  wallets.compromisedWalletAddress = selectedCompromisedWallet.wallet.address;
  wallets.safeWalletAddress = selectedSafeWallet.wallet.address;

  // next 
  const tokenInput = document.getElementById("tokenAmountInput");
  if(tokenInput.value <= 0){
    showToast({message: " Please enter valid token amount. ", type: 3, duration: 5});
    return;
  }

  let encodedTransferTxData = await encodeErc20Transfer(
    wallets.safeWalletAddress,
    tokenInput.value.trim(),
    tokenDetails.decimals
  );
  if (!encodedTransferTxData.status) {
    showToast({
      message: encodedTransferTxData.message,
      type: 3,
      duration: 5,
    });
    return;
  }

  rescueTokenAmount = tokenInput.value.trim();

  let transferTx = await getTransferTx(
    encodedTransferTxData.data,
    selectedCompromisedWallet
  );

  Txs.tokenTransfer = transferTx;

  return;
}

async function configForWalletSimulations() {
  let simulateBtn = document.querySelector("#simulateBtn");
  simulateBtn.addEventListener("click", async function () {
    simulateBtn.innerHTML = "Simulating...";

    function setSimulateBtnDefault(){
      simulateBtn.innerHTML = "Run Simulation";
    }

    let isWalletsConfiguredSts = await getErc20RescueValue(erc20RescueKeys[0]);
    if (!isWalletsConfiguredSts) {
      showToast({ message: "Please verify wallets first", type: 3 });
      setSimulateBtnDefault();
      return;
    }

    let isRpcUrlConfigureSts = await getErc20RescueValue(erc20RescueKeys[1]);
    if (!isRpcUrlConfigureSts) {
      showToast({ message: "Please verify RPC Url first", type: 3 });
      setSimulateBtnDefault();
      return;
    }

    let isErc20CaConfigureSts = await getErc20RescueValue(erc20RescueKeys[2]);
    if (!isErc20CaConfigureSts) {
      showToast({
        message: "Please verify ERC-20 token contract address first",
        type: 3,
      });
      setSimulateBtnDefault();
      return;
    }

    let tokenAmountInput = document.querySelector("#tokenAmountInput");
    if (!tokenAmountInput.value) {
      showToast({ message: "Please enter token amount. ", type: 2 });
      setSimulateBtnDefault();
      return;
    }

    await createTransferTx(tokenAmountInput.value.trim());
    
    let simulateRes = await simulateTxByProvider();
    if (!simulateRes) {
      setSimulateBtnDefault();
      return;
    }

    let gasRes = await checkGasFeeForTx();
    if (!gasRes) {
      setSimulateBtnDefault();
      return;
    }

    await checkServiceFee();

    setSimulateBtnDefault();
  });
}

async function verifyErc20ContractAddress() {
  let verifyErc20CaBtn = document.querySelector("#verifyErc20TokenAddress");
  verifyErc20CaBtn.addEventListener("click", async function () {

    let isRpcUrlConfigureSts = await getErc20RescueValue(erc20RescueKeys[1]);
    if (!isRpcUrlConfigureSts) {
      showToast({ message: "Please verify RPC Url first", type: 3 });
      return;
    }

    let erc20ContractInputTag = document.querySelector("#erc20ContractInputTag");
    if (!erc20ContractInputTag.value) {
      showToast({ message: "Please enter ERC-20 token contract address.", type: 2 });
      return;
    }

    verifyErc20CaBtn.innerHTML = "Verifying...";
    let erc20Details = await getERC20Details(provider, erc20ContractInputTag.value.trim());

    if (erc20Details.status) {
      let erc20NameValue = document.querySelector("#erc20NameValue");
      erc20NameValue.innerHTML = erc20Details.name;
      let erc20NameDisplay = document.querySelector("#erc20NameDisplay");
      erc20NameDisplay.classList.remove("hidden");

      verifyErc20CaBtn.innerHTML = "Verified";
      verifyErc20CaBtn.style.backgroundColor = "var(--success)";
      await setErc20RescueValue(
        erc20RescueKeys[2],
        erc20ContractInputTag.value.trim()
      );
    }

    tokenDetails = erc20Details

    let erc20TokenBalance = await getERC20Balance(provider,erc20ContractInputTag.value.trim(), wallets.compromisedWalletAddress);
    if (erc20TokenBalance.status) {
      let userTokenBalance = document.querySelector("#userTokenBalance");
      userTokenBalance.innerHTML = erc20TokenBalance.formattedBalance +"  " + erc20Details.symbol;
      let userTokenBalanceDisplay = document.querySelector("#tokenActionDetails");
      userTokenBalanceDisplay.classList.remove("hidden");
      userTokenBalance.dataset.tokenamount = erc20TokenBalance.formattedBalance;

      verifyErc20CaBtn.innerHTML = "Verified";
      verifyErc20CaBtn.style.backgroundColor = "var(--success)";
    }else{
      showToast({ message: erc20TokenBalance.message, type: 3, duration: 5 });
      return;
    }

    function setupPercentageButtons(balance) {
      const buttons = document.querySelectorAll(".percentBtn");
      const tokenInput = document.getElementById("tokenAmountInput");

      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const percent = Number(btn.dataset.percent);
          const value = (balance * percent) / 100;
          tokenInput.value = value.toFixed(3);
        });
      });
    }
    setupPercentageButtons(erc20TokenBalance.formattedBalance);

  });
}

async function setRpcValidation() {
  let rpcUrlInputTag = document.querySelector("#rpcUrlInputTag");
  let verifyRpc = document.querySelector("#verifyRpc");

  verifyRpc.addEventListener("click", async function () {
    let isWalletsConfiguredSts = await getErc20RescueValue(erc20RescueKeys[0]);
    if (!isWalletsConfiguredSts) {
      showToast({ message: "Please verify wallets first", type: 3 });
      return;
    }

    if (!rpcUrlInputTag.value) {
      showToast({ message: "Please enter rpc url", type: 3 });
      return;
    }

    verifyRpc.innerHTML = `Verifying...`;
    let res = await checkRpc(rpcUrlInputTag.value.trim());
    verifyRpc.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.5"/>
        <path d="M13 13L16 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      Verify
    `;

    if (!res.status) {
      showToast({ message: res.error, type: 3 });
      return;
    }

    await setErc20RescueValue(erc20RescueKeys[1], rpcUrlInputTag.value.trim());
    provider = res.provider;
    chainId = res.chainId;
    verifyRpc.style.backgroundColor = "var(--success)";
    verifyRpc.innerHTML = `Verified`;

    let chainIdValue = document.querySelector("#chainIdValue");
    chainIdValue.innerHTML = chainId;
    let chainIdDisplay = document.querySelector("#chainIdDisplay");
    chainIdDisplay.classList.remove("hidden");
  });
}

async function readyForWalletsNext(wallesVerifyBtn) {
  let res = await validateSelectedRescueWallets();
  if (!res.status) {
    showToast({ message: res.message, type: 2 });
    return;
  }

  if (!res.allSelected || res.missingSelections.length > 0) {
    showToast({
      message: `Please configure ${res.missingSelections} Wallets first`,
      type: 3,
    });
    return;
  }

  if (res.missingWallets.length > 0) {
    showToast({ message: "rescueWallets not have in storage", type: 2 });
    return;
  }

  wallesVerifyBtn.innerHTML = "Verified";
  wallesVerifyBtn.style.backgroundColor = "var(--success)";

  await setErc20RescueValue(erc20RescueKeys[0], true);

  return true;
}

async function setWalletAddress() {

    let selectedSafeWallet = getSelectedWalletDetails(selectedWalletType[0]);
    let selectedCompromisedWallet = getSelectedWalletDetails(
      selectedWalletType[1]
    );
    let selectedSponsorWallet = getSelectedWalletDetails(selectedWalletType[2]);

    if (!selectedSafeWallet.status) {
      showToast({ message: selectedSafeWallet.message, type: 3, duration: 5 });
      return;
    }

    if (!selectedCompromisedWallet.status) {
      showToast({  message: selectedCompromisedWallet.message,  type: 3,  duration: 5,});
      return;
    }

    if (!selectedSponsorWallet.status) {
      showToast({ message: selectedSponsorWallet.message, type: 3, duration: 5 });
      return;
    }

    wallets.sponsorWalletAddress = selectedSponsorWallet.wallet.address;
    wallets.compromisedWalletAddress = selectedCompromisedWallet.wallet.address;
    wallets.safeWalletAddress = selectedSafeWallet.wallet.address;

}

async function checkWalletConfigure() {
  let res = await validateSelectedRescueWallets();
  if (res.status) {
    if (!res.allExist) {
      showToast({ message: "rescueWallets not have in storage", type: 2 });
      return;
    }

    if (!res.allSelected) {
      let missingSelections = res.missingSelections;
      if (missingSelections.length > 0) {
        for (let i = 0; i < missingSelections.length; i++) {
          const singleMissing = missingSelections[i];
          let displayTag = document.querySelector(`#${singleMissing}Address`);
          displayTag.innerHTML = "Not Configured";
        }
      }
    }

    let safeAddressTag = document.querySelector("#safeAddress");
    let compromisedAddressTag = document.querySelector("#compromisedAddress");
    let sponsorAddressTag = document.querySelector("#sponsorAddress");

    if (res.selectedWalletAddress.safe) {
      safeAddressTag.innerHTML = res.selectedWalletAddress.safe;
    }
    if (res.selectedWalletAddress.compromised) {
      compromisedAddressTag.innerHTML = res.selectedWalletAddress.compromised;
    }
    if (res.selectedWalletAddress.sponsor) {
      sponsorAddressTag.innerHTML = res.selectedWalletAddress.sponsor;
    }
  } else {
    showToast({ message: res.message, type: 2 });
    return;
  }
}

async function setNetTxCreate() {
  let newTransaction = document.querySelector("#newTransaction");
  newTransaction.addEventListener("click", async function () {
    await controller({ controller: "rescue", page: "erc20Rescue" });
  });
}

async function setConfigureRedirect() {
  let walletConfigureBtns = document.querySelectorAll(".walletConfigureBtns");
  walletConfigureBtns.forEach(async (element) => {
    element.addEventListener("click", async function () {
      await controller({ controller: "site", page: "rescueWallets" });
    });
  });
}

function loadTermsIntoModal(rescueTermsData) {
  const container = document.getElementById("termsContent");
  container.innerHTML = "";

  rescueTermsData.forEach((group, index) => {
    const groupDiv = document.createElement("div");
    groupDiv.className = "terms-group";

    groupDiv.innerHTML = `
        <div class="terms-group-header">
            <span>Section ${index + 1}: ${group.section}</span>
            <svg width="20" height="20" viewBox="0 0 24 24">
                <path d="M12 15.5L5 8.5H19L12 15.5Z" fill="currentColor"/>
            </svg>
        </div>
        <div class="terms-group-body"></div>
    `;

    const body = groupDiv.querySelector(".terms-group-body");

    group.items.forEach((item) => {
      body.innerHTML += `
          <div class="terms-item">
              <div class="terms-item-icon">
                  <svg width="14" height="14" viewBox="0 0 24 24">
                      <path d="M9 16.2l-3.5-3.5L4 14.2l5 5 12-12-1.5-1.5L9 16.2z" fill="white"/>
                  </svg>
              </div>

              <div>
                  <div class="terms-item-title">${item.title}</div>
                  <div class="terms-item-message">${item.message}</div>
              </div>
          </div>
      `;
    });

    container.appendChild(groupDiv);
  });

  setupAccordion();
}

function setupAccordion() {
  const groups = document.querySelectorAll(".terms-group");

  groups.forEach((group) => {
    const header = group.querySelector(".terms-group-header");
    const body = group.querySelector(".terms-group-body");

    header.addEventListener("click", () => {
      group.classList.toggle("open");

      if (group.classList.contains("open")) {
        body.style.maxHeight = body.scrollHeight + "px";
      } else {
        body.style.maxHeight = "0px";
      }
    });
  });
}


function setupTermsModal() {
  const openBtn = document.getElementById("readPrerequisites");
  const closeBtn = document.getElementById("closeTermsModal");
  const acceptBtn = document.getElementById("acceptTermsBtn");
  const modal = document.getElementById("termsModal");

  openBtn.addEventListener("click", () => {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
    loadTermsIntoModal(rescueTermsData);
  });

  const closeModal = () => {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  closeBtn.addEventListener("click", closeModal);
  acceptBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

async function iniErc20RescuePage() {
  await initErc20RescueStorage();
  await clearErcRescue();

  await setupTermsModal();  
  await setConfigureRedirect();
  await setNetTxCreate();
  await checkWalletConfigure();

  let wallesVerifyBtn = document.querySelector("#verifyWalletsBtn");
  wallesVerifyBtn.addEventListener("click", async function () {
    wallesVerifyBtn.innerHTML = "Verifying...";
    let res = await readyForWalletsNext(wallesVerifyBtn);
    if (!res) {
      wallesVerifyBtn.innerHTML = "Verify";
    }
  });

  await setWalletAddress();

  await setRpcValidation();
  await verifyErc20ContractAddress();
  await configForWalletSimulations();
}

export { iniErc20RescuePage };
