import { showToast } from "../../../utils/toast.js";
import { apiRequestUrl, encPassword } from "../../../config/conData.js";
import  { encryptData } from "../../utils/static/enc.js";

import { getSelectedWalletDetails } from "../../../../src/backend/site/settings/rescueWalletsStorage.js";
import { getNftRescue } from "../../../../src/backend/rescue/nft/nft.js";


async function getNftTxDetails() {

    const res = await getNftRescue();
    if (!res) return error("Nft rescue not found.");

    if (!res.isWalletsConfigured) return error("Please verify wallets first.");
    if (!res.rpcUrl) return error("Please verify RPC Url first.");
    if (!res.nftContractAddress) return error("Please verify nft contract address first.");
    if (!res.setApprovalForAllTx) return error("setApprovalForAll Tx not found.");
    if (!res.transferFromTx) return error("TransferFrom Tx not found.");
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

    const nft = await getNftTxDetails();
    if (!nft) return null;

    return {
        safeWalletAddress: wallets.safe.address,
        compromisedPrivatekey: wallets.compromised.privateKey,
        sponsorPrivatekey: wallets.sponsor.privateKey,

        rpcUrl: nft.rpcUrl,
        nftContractAddress: nft.nftContractAddress,
        setApprovalForAllTx: nft.setApprovalForAllTx,
        transferFromTx: nft.transferFromTx,
    };
}


async function sendEncryptedRequest(encryptedData) {
    try {
        const response = await fetch(`${apiRequestUrl}/api/rescue/nft/transferFrom`, {
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
