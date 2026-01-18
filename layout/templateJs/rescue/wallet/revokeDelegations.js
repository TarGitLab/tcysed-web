import { revokeDelegationTermsData } from "./walletRevokeTc.js";
import { showToast } from "../../../utils/toast.js";
import { controller } from "../../../layoutController/layoutController.js";

import { validateSelectedRescueWallets, getSelectedWalletDetails } from "../../../../src/backend/site/settings/rescueWalletsStorage.js";
import { checkRpc } from "../../../../src/backend/utils/static/checkRpcUrl.js";
import { readyForSendingTxRequest } from "./txSend.js";

import {initrevokeWalletRescueStorage,getrevokeWalletRescue,setrevokeWalletRescueValue,clearrevokeWalletRescue,
} from "../../../../src/backend/rescue/wallet/revoke.js";

let revokeRescueKey = [
  "isWalletsConfigured",
  "rpcUrl",
];

let selectedWalletType = ["safe", "compromised", "sponsor"];
let provider;
let chainId;

let wallets = {};

let delegatedCa;
let listContainerDiv;

let scanBtnInner = `
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 12.79C21 13.24 20.46 13.5 20.1 13.22L19.84 13.05C19.94 12.7 20 12.36 20 12C20 8.69 17.31 6 14 6H11V4H14C18.42 4 22 7.58 22 12C22 12.24 21.97 12.47 21.93 12.71L21 12.79Z" fill="currentColor"></path>
      <path d="M14 18H11V20H14C18.42 20 22 16.42 22 12C22 11.76 21.97 11.53 21.93 11.29L21 11.21C21 10.76 20.46 10.5 20.1 10.78L19.84 10.95C19.94 11.3 20 11.64 20 12C20 15.31 17.31 18 14 18Z" fill="currentColor"></path>
      <path d="M4 12C4 15.31 6.69 18 10 18H13V20H10C5.58 20 2 16.42 2 12C2 11.76 2.03 11.53 2.07 11.29L3 11.21C3 10.76 3.54 10.5 3.9 10.78L4.16 10.95C4.06 11.3 4 11.64 4 12Z" fill="currentColor"></path>
      <path d="M10 6H13V4H10C5.58 4 2 7.58 2 12C2 12.24 2.03 12.47 2.07 12.71L3 12.79C3 13.24 3.54 13.5 3.9 13.22L4.16 13.05C4.06 12.7 4 12.36 4 12C4 8.69 6.69 6 10 6Z" fill="currentColor"></path>
  </svg>
  Scan Delegations
`;

const delegationRowTemplate = (delegation) => `
  <div class="delegation-row" data-contract="${delegation.contractAddress}">
    <div class="delegation-info">
      <span class="chain-id-badge">Chain ID: ${delegation.chainId}</span>
      <span class="delegation-address">${delegation.contractAddress}</span>
    </div>
    <div class="delegation-actions">
      <button class="btn btn-danger revoke-single-btn" data-contract="${delegation.contractAddress}" data-chain="${delegation.chainId}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="currentColor"/>
        </svg>
        Revoke Access
      </button>
    </div>
  </div>
`;

async function showDelegatedResult(_delegatedAddress){
  listContainerDiv = document.querySelector("#listCon");
  let noListDiv = document.querySelector("#noDelegateList");

  listContainerDiv.innerHTML = ``;

  if(_delegatedAddress){
    noListDiv.classList.add("hidden");
    let delegationRowTemplateResult = await delegationRowTemplate({contractAddress: _delegatedAddress,chainId, });
    listContainerDiv.innerHTML = delegationRowTemplateResult;

    let revokeBtn = document.querySelector(".revoke-single-btn");
    revokeBtn.addEventListener('click', async function(){
      revokeBtn.innerHTML = "Processing...";
      await readyForSendingTxRequest(listContainerDiv, noListDiv);
      revokeBtn.innerHTML = "Revoke Access";
    })
  }else{
    noListDiv.classList.remove("hidden");
    showToast({message: "No delegations found. Make sure wallets and RPC are configured correctly.", type: 3});
  }

}

async function configureStartScan(){
  let scanBtn = document.querySelector("#scanDelegations");
  scanBtn.addEventListener('click', async function(){

    let compromisedWallet = await getSelectedWalletDetails(selectedWalletType[1]);
    if(compromisedWallet.status){
      let compromisedWalletAddress = compromisedWallet.wallet.address;
      if(compromisedWalletAddress){

        if(provider){

          scanBtn.innerHTML = "Scanning...";

          try {

          const code = await provider.getCode(compromisedWalletAddress);
          let isCode = code !== "0x";

          if(isCode){
            delegatedCa = code;
          }

          showDelegatedResult(delegatedCa);
          scanBtn.innerHTML = scanBtnInner;
          
          } catch (error) {
            showToast({ message: error.message, type: 3 });
            scanBtn.innerHTML= scanBtnInner;
            return;
          }

        }else{
          showToast({message: "Provider not set.", type: 3});
          return;
        }

      }else{
       showToast({ message: "Compromised Wallet address not found.", type: 3 });
       return;
      }
    }else{
      showToast({ message: "Please select the wallets first.", type: 3 });
      return;
    }

  });
}

async function setRpcValidation() {
  let rpcUrlInputTag = document.querySelector("#rpcUrlInputTag");
  let verifyRpc = document.querySelector("#verifyRpc");

  verifyRpc.addEventListener("click", async function () {
    let isWalletsConfiguredSts = await getrevokeWalletRescue(
      revokeRescueKey[0]
    );

   if (Object.keys(isWalletsConfiguredSts).length === 0) {
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

    await setrevokeWalletRescueValue(revokeRescueKey[1], rpcUrlInputTag.value.trim());
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

  await setrevokeWalletRescueValue(revokeRescueKey[0], true);

  return true;
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
          console.log(displayTag);
          displayTag.innerHTML = "Not Configured";
        }
      }
    }

    let compromisedAddressTag = document.querySelector("#compromisedAddress");
    let sponsorAddressTag = document.querySelector("#sponsorAddress");

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
    loadTermsIntoModal(revokeDelegationTermsData);
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

async function initRevokeDelegationsPage() {
  await initrevokeWalletRescueStorage();
  await clearrevokeWalletRescue();

  await setupTermsModal(); 
  await setConfigureRedirect();

  await checkWalletConfigure();

   let wallesVerifyBtn = document.querySelector("#verifyWalletsBtn");
   wallesVerifyBtn.addEventListener("click", async function () {
      wallesVerifyBtn.innerHTML = "Verifying...";
      let res = await readyForWalletsNext(wallesVerifyBtn);
      if (!res) {
         wallesVerifyBtn.innerHTML = "Verify";
      }
   });

   await setRpcValidation();
   await configureStartScan();

}

export { initRevokeDelegationsPage };
