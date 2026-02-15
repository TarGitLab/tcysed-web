import { showToast } from "../../../utils/toast.js";
import { apiRequestUrl, encPassword } from "../../../config/conData.js";
import  { encryptData } from "../../utils/static/enc.js";

import { getSelectedWalletDetails } from "../../../../src/backend/site/settings/rescueWalletsStorage.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function error(message, type = 3) {
    showToast({ message, type, duration: 5 });
    return null;
}

async function getWallets() {

    const compromised = await getSelectedWalletDetails("compromised");
    const sponsor = await getSelectedWalletDetails("sponsor");

    if (!compromised.status) return error(compromised.message);
    if (!sponsor.status) return error(sponsor.message);

    return {
        compromised: compromised.wallet,
        sponsor: sponsor.wallet,
    };
}

async function buildRequestBody() {

    const wallets = await getWallets();
    if (!wallets) return null;

    return {
      compromisedPrivatekey: wallets.compromised.privateKey,
      sponsorPrivatekey: wallets.sponsor.privateKey,
    };
}


async function sendEncryptedRequest(encryptedData) {
    try {
        const response = await fetch(`${apiRequestUrl}/api/rescue/wallets/revoke`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                payload: encryptedData, 
            }),
        });

        const result = await response.json();

        if (!response.ok) {
            showToast({ message: result.message || "Server error", type: 3, duration: 5 });
            return null;
        }

        return result;

    } catch (err) {
        showToast({ message: "Network error: " + err.message, type: 3, duration: 5 });
        return null;
    }
}

let revokeBtnInner = `  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
    <path
      d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
      fill="currentColor"
    ></path>
  </svg>
  Revoke Access`;

async function readyForSendingTxRequest() {

  let revokeBtns = document.querySelectorAll(".revoke-single-btn");
  if(revokeBtns.length <= 0){
    showToast({message: "No delegated ca.", type: 3, duration: 10});
    return;
  }

  for (let index = 0; index < revokeBtns.length; index++) {
    let btn = revokeBtns[index];

    let transactionStatus = document.querySelector("#transactionStatus");
    transactionStatus.innerHTML = "";

    btn.addEventListener('click', async function(){

      
      const rawBody = await buildRequestBody();
      if (!rawBody) return error("Request creating error.");
      
      rawBody.rpcUrl = btn.dataset.rpcurl;
      
      const encryptedRes = encryptData(rawBody, encPassword);
      if (!encryptedRes.status) {
        showToast({  message: encryptedRes.message,  type: 3,  duration: 5,});
        return;
      }
      let encryptedBody = encryptedRes.data;
      
      btn.innerHTML = "Processing...";
      const response = await sendEncryptedRequest(encryptedBody);
    
      if (response) {
        if (response.status) {
          showToast({ message: response.message, type: 1, duration: 5 });

          transactionStatus.innerHTML = response.data;
          transactionStatus.style.backgroundColor = "var(--success_bg)";
          transactionStatus.style.color = "var(--success)";

          btn.innerHTML = revokeBtnInner;
          let revokeRow = btn.closest(".delegation-row");
          revokeRow.remove();
          return;
        } else {
          showToast({ message: response.message, type: 3, duration: 5 });

          transactionStatus.innerHTML = response.message;
          transactionStatus.style.backgroundColor = "var(--danger_bg)";
          transactionStatus.style.color = "var(--danger)";
          
          btn.innerHTML = revokeBtnInner;
          return;
        }
      }
        
    })

  }


}


export { readyForSendingTxRequest };
