import { showContent } from "../../a/showContent.js";
import { getSkeleton } from "../../../utils/skeleton.js";
import { showToast } from "../../../utils/toast.js";

import { telegramOwnerUsername } from "../../../config/conData.js";

import { nftRescuePageLayout } from "../../../template/template.js";
import { iniNftRescuePage } from "../../../templateJs/template.js";

async function nftRescuePage(data = {}) {
  try {
    await showContent(getSkeleton(3));

    data.ownerTgContact = telegramOwnerUsername;
    let nftRescueHtml = await nftRescuePageLayout(data);

    await showContent(nftRescueHtml);
    await iniNftRescuePage(data);

    return nftRescueHtml;
  } catch (error) {
    showToast({message: "An error occurred while loading the page.",type: 3,duration: 5,});
  }
}

export { nftRescuePage };
