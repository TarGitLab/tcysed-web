import { showContent } from "../../a/showContent.js";
import { getSkeleton } from "../../../utils/skeleton.js";
import { showToast } from "../../../utils/toast.js"; 

import { rescueWalletsTemplate } from "../../../template/template.js";
import { iniRescueWalletsPage } from "../../../templateJs/template.js";

async function rescueWalletsPage(data = {}) {
  try {
    await showContent(getSkeleton(3));

    let rescueWalletsHtml = await rescueWalletsTemplate(data);
    
    await showContent(rescueWalletsHtml);
    await iniRescueWalletsPage(data);

    return rescueWalletsHtml;
  } catch (error) {
    showToast({  message: "An error occurred while loading the page.",  type: 3,  duration: 5,});
  }
}

export { rescueWalletsPage };
