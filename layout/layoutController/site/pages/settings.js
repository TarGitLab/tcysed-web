import { showContent } from "../../a/showContent.js";
import { getSkeleton } from "../../../utils/skeleton.js";
import { showToast } from "../../../utils/toast.js";

import { settingsTemplate } from "../../../template/template.js";
import { iniSettingsPage } from "../../../templateJs/template.js";

async function settingsPage(data = {}) {
  try {
    await showContent(getSkeleton(4));
    let settingsHtml = await settingsTemplate(data);

    await showContent(settingsHtml);
    await iniSettingsPage({});

    return settingsHtml;
  } catch (error) {
    showToast({  message: "An error occurred while loading the page.",  type: 3,  duration: 5,});
  }
}

export { settingsPage };
