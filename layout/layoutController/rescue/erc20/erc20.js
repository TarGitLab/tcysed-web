import { showContent } from "../../a/showContent.js";
import { getSkeleton } from "../../../utils/skeleton.js";
import { showToast } from "../../../utils/toast.js";

import { telegramOwnerUsername } from "../../../config/conData.js";

import { erc20RescuePageLayout } from "../../../template/template.js";
import { iniErc20RescuePage } from "../../../templateJs/template.js";

async function erc20RescuePage(data = {}) {
  try {
    await showContent(getSkeleton(3));

    data.ownerTgContact = telegramOwnerUsername;
    let erc20RescueHtml = await erc20RescuePageLayout(data);

    await showContent(erc20RescueHtml);
    await iniErc20RescuePage(data);

    return erc20RescueHtml;
  } catch (error) {
    showToast({message: "An error occurred while loading the page.",type: 3,duration: 5,});
  }
}

export { erc20RescuePage };
