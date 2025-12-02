import { showContent } from "../../a/showContent.js";
import { getSkeleton } from "../../../utils/skeleton.js";
import { showToast } from "../../../utils/toast.js";

import { contactPageLayout } from "../../../template/template.js";
import { iniContactUsPage } from "../../../templateJs/template.js";

async function contactUsPage(data = {}) {
  try {
    await showContent(getSkeleton(3));
    let contactusHtml = await contactPageLayout(data);

    await showContent(contactusHtml);
    await iniContactUsPage(data);

    return contactusHtml;
  } catch (error) {
    showToast({
      message: "An error occurred while loading the page.",
      type: 3,
      duration: 5,
    });
  }
}

export { contactUsPage };
