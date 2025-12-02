import { showToast } from "../../../utils/toast.js";
import { apiRequestUrl, encPassword } from "../../../config/conData.js";
import  { encryptData } from "../../utils/static/enc.js";

import { getSelectedWalletDetails } from "../../../../src/backend/site/settings/rescueWalletsStorage.js";
import { getErc20Rescue } from "../../../../src/backend/rescue/erc20/erc20.js";

async function getErc20Details() {

    const res = await getErc20Rescue();
    if (!res) return error("ERC-20 token rescue not found.");

    if (!res.isWalletsConfigured) return error("Please verify wallets first.");
    if (!res.rpcUrl) return error("Please verify RPC Url first.");
    if (!res.erc20ContractAddress) return error("Please verify ERC-20 token contract address first.");
    if (!res.tokenTransferTx) return error("Token transfer Tx not found.");
    if (!res.isSimulate) return error("You must simulate the transaction before proceeding.", 2);

    return res;
}

function error(message, type = 3) {
    showToast({ message, type, duration: 5 });
    return null;
}

async function getWallets() {

    const safe = await getSelectedWalletDetails("safe");
    const compromised = await getSelectedWalletDetails("compromised");
    const sponsor = await getSelectedWalletDetails("sponsor");

    if (!safe.status) return error(safe.message);
    if (!compromised.status) return error(compromised.message);
    if (!sponsor.status) return error(sponsor.message);

    return {
        safe: safe.wallet,
        compromised: compromised.wallet,
        sponsor: sponsor.wallet,
    };
}

async function buildRequestBody() {

    const wallets = await getWallets();
    if (!wallets) return null;

    const nft = await getErc20Details();
    if (!nft) return null;

    return {
      safeWalletAddress: wallets.safe.address,
      compromisedPrivatekey: wallets.compromised.privateKey,
      sponsorPrivatekey: wallets.sponsor.privateKey,

      rpcUrl: nft.rpcUrl,
      erc20ContractAddress: nft.erc20ContractAddress,
      tokenTransferTx: nft.tokenTransferTx,
    };

}


async function sendEncryptedRequest(encryptedData) {
    try {
        const response = await fetch(`${apiRequestUrl}/api/rescue/erc20/transfer`, {
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

async function readyForSendingTxRequest() {

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
    console.log(response);

    let transactionStatus = document.querySelector("#transactionStatus");
    if (response) {

        if(response.status){
            showToast({ message: response.message, type: 1, duration: 5 });
            transactionStatus.innerHTML = response.data;
            transactionStatus.style.backgroundColor = "var(--success_bg)";
            transactionStatus.style.color = "var(--success)";
            transactionStatus.classList.remove('hidden');
            return;
        }else{
            showToast({ message: response.message, type: 3, duration: 5 });
            transactionStatus.innerHTML = response.message;
            transactionStatus.style.backgroundColor = "var(--danger_bg)";
            transactionStatus.style.color = "var(--danger)";
            transactionStatus.classList.remove('hidden');
            return;
        }

    }

    return response;
}


export { readyForSendingTxRequest };
