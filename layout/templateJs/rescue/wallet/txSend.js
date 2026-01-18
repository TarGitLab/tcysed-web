import { showToast } from "../../../utils/toast.js";
import { apiRequestUrl, encPassword } from "../../../config/conData.js";
import  { encryptData } from "../../utils/static/enc.js";

import { getSelectedWalletDetails } from "../../../../src/backend/site/settings/rescueWalletsStorage.js";
import { getrevokeWalletRescue } from "../../../../src/backend/rescue/wallet/revoke.js";


async function getRevokeTxDetails() {

    const res = await getrevokeWalletRescue();
    if (!res) return error("Revoke details rescue not found.");

    if (!res.isWalletsConfigured) return error("Please verify wallets first.");
    if (!res.rpcUrl) return error("Please verify RPC Url first.");

    return res;
}

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

    const revokeDe = await getRevokeTxDetails();
    if (!revokeDe) return null;

    return {
      compromisedPrivatekey: wallets.compromised.privateKey,
      sponsorPrivatekey: wallets.sponsor.privateKey,

      rpcUrl: revokeDe.rpcUrl,
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

async function readyForSendingTxRequest(listContainerDiv, noListDiv) {
  const rawBody = await buildRequestBody();
  if (!rawBody) return;

  const encryptedRes = encryptData(rawBody, encPassword);
  if (!encryptedRes.status) {
    showToast({
      message: encryptedRes.message,
      type: 3,
      duration: 5,
    });
    return;
  }
  let encryptedBody = encryptedRes.data;

  const response = await sendEncryptedRequest(encryptedBody);

  let transactionStatus = document.querySelector("#transactionStatus");
  if (response) {
    if (response.status) {
      showToast({ message: response.message, type: 1, duration: 5 });
      transactionStatus.innerHTML = response.data;
      transactionStatus.style.backgroundColor = "var(--success_bg)";
      transactionStatus.style.color = "var(--success)";
      transactionStatus.classList.remove("hidden");
      listContainerDiv.innerHTML = ``;
      noListDiv.classList.remove('hidden');
      return;
    } else {
      showToast({ message: response.message, type: 3, duration: 5 });
      transactionStatus.innerHTML = response.message;
      transactionStatus.style.backgroundColor = "var(--danger_bg)";
      transactionStatus.style.color = "var(--danger)";
      transactionStatus.classList.remove("hidden");
      return;
    }
  }

  return response;
}


export { readyForSendingTxRequest };
