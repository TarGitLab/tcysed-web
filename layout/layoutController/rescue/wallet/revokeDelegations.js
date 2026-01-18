import { showContent } from "../../a/showContent.js";
import { getSkeleton } from "../../../utils/skeleton.js";
import { showToast } from "../../../utils/toast.js";

import { telegramOwnerUsername } from "../../../config/conData.js";

import { revokeDelegationPageLayout } from "../../../template/template.js";
import { initRevokeDelegationsPage } from "../../../templateJs/rescue/rescue.js";

async function walletDelegationRevokePage(data = {}) {
  try {
    await showContent(getSkeleton(3));

    data.ownerTgContact = telegramOwnerUsername;
    let revokeRescueHtml = await revokeDelegationPageLayout(data);

    await showContent(revokeRescueHtml);
    initRevokeDelegationsPage(data);

    return revokeRescueHtml;
  } catch (error) {
    showToast({message: "An error occurred while loading the page.",type: 3,duration: 5,});
  }

}

export { walletDelegationRevokePage };
