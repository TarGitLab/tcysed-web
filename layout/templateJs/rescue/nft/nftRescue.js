import { showToast } from "../../../utils/toast.js";
import { controller } from "../../../layoutController/layoutController.js";
import { rescueTermsData } from "./nftRescueTC.js";

import { ethers } from "../../../../src/libary/ethers@6.5.0.js";
import { evmNetworks } from "../../../config/chains.js";
import { readyForSendingTxRequest } from "./txSend.js";

import { validateSelectedRescueWallets, getSelectedWalletDetails } from "../../../../src/backend/site/settings/rescueWalletsStorage.js";
import { getNFTName } from "../../../../src/backend/rescue/nft/getNftName.js";
import { initNftRescueStorage , setNftRescueValue, getNftRescueValue, clearNftRescue} from "../../../../src/backend/rescue/nft/nft.js";
import { checkRpc } from "../../../../src/backend/utils/static/checkRpcUrl.js";
import { encodeNftSetApprovalForAll } from "../../../../src/backend/rescue/nft/encodeSetAA.js";

let nftRescueKeys = [
  "isWalletsConfigured",
  "rpcUrl",
  "nftContractAddress",
  "setApprovalForAllTx",
  "transferFromTx",
  "isSimulate"
];
let selectedWalletType = ["safe","compromised","sponsor"];
let provider;
let chainId;
let Txs = {
  setApproveForAll: {},
  transferFrom: {},
}
let wallets = {};

async function transferTxSendDetails(){

  let sendTransaction = document.querySelector("#sendTransaction");
  sendTransaction.addEventListener('click', async () =>{

    if(!getNftRescueValue(nftRescueKeys[5])){
      showToast({message: "You must simulate the transaction before proceeding.", type: 2, duration: 5});
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

async function checkServiceFee(){

  let simulateServiceFeeResult = document.querySelector('#simulateServiceFeeResult');
  simulateServiceFeeResult.innerHTML = "Successfull";
  simulateServiceFeeResult.style.backgroundColor = "var(--success_bg)";
  simulateServiceFeeResult.style.color = "var(--success)";
  simulateServiceFeeResult.classList.remove('hidden');

  await setNftRescueValue(nftRescueKeys[5], true);
  await transferTxSendDetails();

}

function getNativeToken(chainId) {
  const network = evmNetworks.find((n) => n.chainId === chainId);
  return network ? network.nativeToken : null;
}

async function checkGasFeeForTx() {
  
  let simulateGasResult = document.querySelector("#simulateGasResult");

  simulateGasResult.innerHTML = "Successfull";
  simulateGasResult.style.backgroundColor = "var(--success_bg)";
  simulateGasResult.style.color = "var(--success)";
  simulateGasResult.classList.remove("hidden");

  return;

  // get tx fees
  const gas1 = await provider.estimateGas(Txs.setApproveForAll);
  const gas2 = await provider.estimateGas(Txs.transferFrom);

  const feeData = await provider.getFeeData();
  const gasPrice = feeData.gasPrice;

  const fee1Wei = gas1 * gasPrice;
  const fee2Wei = gas2 * gasPrice;

  const totalFee = fee1Wei + fee2Wei;
  const doubleTotalFee = totalFee * 2n;  


  let networksNT = getNativeToken(chainId);
  const totalFeeNative = ethers.formatEther(doubleTotalFee);
  
  // get wallet balance
  let walletBalance = await provider.getBalance(wallets.sponsorWalletAddress);              
 

  if(walletBalance < doubleTotalFee){
    showToast({
      message:
        `Sponsor wallet does not have enough ${networksNT} for the transaction. ` +
        `Wallet balance: ${ethers.formatEther(walletBalance)} ${networksNT}. ` +
        `Gas fee required: ${totalFeeNative} ${networksNT}.`,
      type: 3,
      duration: 30,
    });
    simulateGasResult.innerHTML = "Error";
    simulateGasResult.style.backgroundColor = "var(--danger_bg)";
    simulateGasResult.style.color = "var(--danger)";
    simulateGasResult.classList.remove("hidden");
    return;
  }else{
    simulateGasResult.innerHTML = "Successfull";
    simulateGasResult.style.backgroundColor = "var(--success_bg)";
    simulateGasResult.style.color = "var(--success)";
    simulateGasResult.classList.remove('hidden');

    return;
  }


}

async function simulateTxByProvider(){

  if(!Txs.setApproveForAll){
    showToast({message: "setApprovalForAll Tx not found.",  type: 3});
    return;
  }

  if(!Txs.transferFrom){
    showToast({message: "TransferFrom Tx not found.", type: 3});
    return;
  }

  if(!provider){
    showToast({message: "Provider not set.", type: 3});
    return;
  }

  let simu1 = true;                            // remove when multiple simulate success
  let simu2 = true;                         // remove when multiple simulate success
  let error1,error2;

  // try {
  //   const result1 = await provider.call(Txs.setApproveForAll);
  //   simu1 = true;
  // } catch (error) {
  //   error1 = error.message
  //   showToast({ message: error.message, type: 3, duration: 30 });
  // }

  // try {
  //   const result2 = await provider.call(Txs.transferFrom);
  //   simu2 = true;
  // } catch (error) {
  //   error2 = error.message;
  //   showToast({ message: error.message, type: 3, duration: 30 });
  // }

  let simulateTxResult = document.querySelector("#simulateTxResult");
  if(simu1 && simu2){
    simulateTxResult.innerHTML = "Successfull";
    simulateTxResult.style.backgroundColor = "var(--success_bg)";
    simulateTxResult.style.color = "var(--success)";
    simulateTxResult.classList.remove('hidden');

    await setNftRescueValue(nftRescueKeys[3],JSON.stringify(Txs.setApproveForAll));
    await setNftRescueValue(nftRescueKeys[4],JSON.stringify(Txs.transferFrom));
    
    return;

  }else{
    simulateTxResult.innerHTML = `${error1 || error2}`;
    simulateTxResult.style.backgroundColor = "var(--danger_bg)";
    simulateTxResult.style.color = "var(--danger)";
    simulateTxResult.classList.remove('hidden');
    return;
  }

}

async function getNftTransferTx(txData, spoWallet) {
  let nftCaAddress = await getNftRescueValue(nftRescueKeys[2]);
  if (!nftCaAddress) {
    showToast({
      message: "Nft contract address not found.",
      type: 3,
      duration: 5,
    });
  }

  let spoWalletAddress = spoWallet.wallet.address;

  let tx = {
    from: spoWalletAddress,
    to: nftCaAddress,
    data: txData,
  };

  return tx;
}

async function getSetApproveForAllTx(txData, coWallet){

  let nftCaAddress = await getNftRescueValue(nftRescueKeys[2]);
  if(!nftCaAddress){
    showToast({message: "Nft contract address not found.", type: 3, duration: 5})
  }

  let coWalletAddress = coWallet.wallet.address;

  let tx = {
    from: coWalletAddress,
    to: nftCaAddress,
    data: txData,
  }

  return tx;

}

async function simulateApproveAndTransData(nftTxData){
  let selectedSafeWallet = getSelectedWalletDetails(selectedWalletType[0]);
  let selectedCompromisedWallet = getSelectedWalletDetails(selectedWalletType[1])
  let selectedSponsorWallet = getSelectedWalletDetails(selectedWalletType[2]);

  if(!selectedSafeWallet.status){
    showToast({message: selectedSafeWallet.message, type: 3, duration: 5});
    return;
  }

  if (!selectedCompromisedWallet.status) {
    showToast({ message: selectedCompromisedWallet.message, type:  3, duration: 5});
    return;
  }

  if (!selectedSponsorWallet.status) {
    showToast({ message: selectedSponsorWallet.message, type: 3, duration: 5 });
    return;
  }

  wallets.sponsorWalletAddress = selectedSponsorWallet.wallet.address;
  wallets.compromisedWalletAddress = selectedCompromisedWallet.wallet.address;
  wallets.safeWalletAddress = selectedSafeWallet.wallet.address;

  let selectedSponsorWalletAddress = selectedSponsorWallet.wallet.address;
  let encodedSetapprovalForAllTxData = await encodeNftSetApprovalForAll(selectedSponsorWalletAddress,true);
  if(!encodedSetapprovalForAllTxData.status){
    showToast({message: encodedSetapprovalForAllTxData.message, type: 3, duration: 5});
    return;
  }

  let approveAllTx = await getSetApproveForAllTx(encodedSetapprovalForAllTxData.data, selectedCompromisedWallet);
  let transferTx = await getNftTransferTx(nftTxData, selectedSponsorWallet);

  Txs.setApproveForAll = approveAllTx;
  Txs.transferFrom = transferTx;

  return;
  

}

async function configForWalletSimulations(){
  let simulateBtn = document.querySelector("#simulateBtn");
  simulateBtn.addEventListener("click", async function () {

    simulateBtn.innerHTML = "Simulating...";

    let isWalletsConfiguredSts = await getNftRescueValue(nftRescueKeys[0]);
    if (!isWalletsConfiguredSts) {
      showToast({ message: "Please verify wallets first", type: 3 });
      return;
    }

    let isRpcUrlConfigureSts = await getNftRescueValue(nftRescueKeys[1]);
    if(!isRpcUrlConfigureSts){
      showToast({ message: "Please verify RPC Url first", type: 3 });
      return;
    }

    let isNftCaConfigureSts = await getNftRescueValue(nftRescueKeys[2]);
    if (!isNftCaConfigureSts) {
      showToast({ message: "Please verify nft contract address first", type: 3 });
      return;
    }

    let nftTransaDataTextArea = document.querySelector('#nftTransactionDataTextarea');
    if(!nftTransaDataTextArea.value){
      showToast({message: "Please enter nft transaction data. ", type: 2});
      return;
    }

    await simulateApproveAndTransData(nftTransaDataTextArea.value.trim());

    await simulateTxByProvider();
    await checkGasFeeForTx();
    await checkServiceFee();

    simulateBtn.innerHTML = "Run Simulation";

  });
}

async function verifyNftContractAddress() {
  let verifyNftCaBtn = document.querySelector("#verifyNftAddress");
  verifyNftCaBtn.addEventListener("click", async function () {

    let isRpcUrlConfigureSts = await getNftRescueValue(nftRescueKeys[1]);
    if(!isRpcUrlConfigureSts){
      showToast({ message: "Please verify RPC Url first", type: 3 });
      return;
    }

    let nftContractInputTag = document.querySelector("#nftContractInputTag");
    if (!nftContractInputTag.value) {
      showToast({ message: "Please enter nft contract address.", type: 2 });
      return;
    }

    verifyNftCaBtn.innerHTML = "Verifying...";
    let nftName = await getNFTName(provider,nftContractInputTag.value.trim());
    if(nftName.status){

      let nftNameValue = document.querySelector("#nftNameValue");
      nftNameValue.innerHTML = nftName.name;
      let nftNameDisplay = document.querySelector("#nftNameDisplay");
      nftNameDisplay.classList.remove('hidden');

      verifyNftCaBtn.innerHTML = "Verified";
      verifyNftCaBtn.style.backgroundColor = "var(--success)";
      await setNftRescueValue(nftRescueKeys[2],nftContractInputTag.value.trim());
    }

    return true;

  });
}

async function setRpcValidation() {
  let rpcUrlInputTag = document.querySelector("#rpcUrlInputTag");
  let verifyRpc = document.querySelector("#verifyRpc");

  verifyRpc.addEventListener("click", async function () {

    let isWalletsConfiguredSts = await getNftRescueValue(nftRescueKeys[0]);
    if(!isWalletsConfiguredSts){
      showToast({message: "Please verify wallets first", type: 3});
      return;
    }

    if(!rpcUrlInputTag.value){
      showToast({message: "Please enter rpc url", type: 3});
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

    if(!res.status){
      showToast({message: res.error, type: 3});
      return;
    }

    await setNftRescueValue(nftRescueKeys[1],rpcUrlInputTag.value.trim());
    provider = res.provider;
    chainId = res.chainId;
    verifyRpc.style.backgroundColor = "var(--success)";
    verifyRpc.innerHTML = `Verified`;

    let chainIdValue = document.querySelector("#chainIdValue");
    chainIdValue.innerHTML = chainId;
    let chainIdDisplay = document.querySelector("#chainIdDisplay");
    chainIdDisplay.classList.remove("hidden");

  })
  
}

async function readyForWalletsNext(wallesVerifyBtn){
  let res = await validateSelectedRescueWallets();
  if(!res.status){
    showToast({message: res.message, type: 2});
    return;
  }

  if(!res.allSelected || res.missingSelections.length > 0){
    showToast({ message: `Please configure ${res.missingSelections} Wallets first`, type: 3 });
    return;
  }

  if(res.missingWallets.length > 0){
    showToast({message: "rescueWallets not have in storage", type: 2});
    return;
  }

  wallesVerifyBtn.innerHTML = "Verified";
  wallesVerifyBtn.style.backgroundColor = "var(--success)";

  await setNftRescueValue(nftRescueKeys[0],true);

  return true;

}

async function checkWalletConfigure(){
  let res =  await validateSelectedRescueWallets();
  if(res.status){
    
    if(!res.allExist){
      showToast({message: "rescueWallets not have in storage", type: 2 });
      return;
    }

    if(!res.allSelected){
      let missingSelections = res.missingSelections;
      if(missingSelections.length > 0 ){
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

    if(res.selectedWalletAddress.safe){
      safeAddressTag.innerHTML = res.selectedWalletAddress.safe;
    }
    if(res.selectedWalletAddress.compromised){
      compromisedAddressTag.innerHTML = res.selectedWalletAddress.compromised;
    }
    if(res.selectedWalletAddress.sponsor){
      sponsorAddressTag.innerHTML = res.selectedWalletAddress.sponsor;
    }


  }else{
    showToast({ message: res.message, type: 2 });
    return;
  }
}

async function setNetTxCreate(){
  let newTransaction = document.querySelector("#newTransaction");
  newTransaction.addEventListener("click", async function () {  
     await controller({ controller: "rescue", page: "nftRescue" });
  })
}

async function setConfigureRedirect(){
  let walletConfigureBtns = document.querySelectorAll(".walletConfigureBtns");
  walletConfigureBtns.forEach( async (element) => {
     element.addEventListener("click", async function () {
       await controller({controller: "site", page: "rescueWallets"});
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

async function iniNftRescuePage() {

  await initNftRescueStorage();
  await clearNftRescue();

  await setupTermsModal();
  await setConfigureRedirect();
  await setNetTxCreate();
  await checkWalletConfigure();

  let wallesVerifyBtn = document.querySelector("#verifyWalletsBtn");
  wallesVerifyBtn.addEventListener("click", async function () {
    wallesVerifyBtn.innerHTML = "Verifying...";
    let res = await readyForWalletsNext(wallesVerifyBtn);
    if(!res){
      wallesVerifyBtn.innerHTML = "Verify";
    }
  });

  await setRpcValidation();
  await verifyNftContractAddress();
  await configForWalletSimulations();

}

export { iniNftRescuePage };
