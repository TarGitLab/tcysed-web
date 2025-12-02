import { showToast } from "../../utils/toast.js";
import { render404 } from "../../template/template.js";
import { showContent } from "../a/showContent.js";
import { iniPageBackBtn } from "../../templateJs/template.js";
import { ini404 } from "../../templateJs/template.js";

import { homePage } from "./pages/home.js";
import { settingsPage } from "./pages/settings.js";
import { rescueWalletsPage } from "./settings/rescueWallets.js";
import { contactUsPage } from "./pages/contactus.js";

let pages = {
  home: homePage,
  settings: settingsPage,
  rescueWallets: rescueWalletsPage,
  contactUs: contactUsPage,
};

async function siteController(data) {
  try {
    let defaultPage = "home";
    data.page = data.page || defaultPage;
    const pageName = data.page.trim();

    let selectedPage = pages[pageName];

    if (!selectedPage) {
      let render404Page = await render404();
      await showContent(render404Page);
      ini404({controller: "site", page: "home"});
      return false;
    }

    let selectedpageResult = await selectedPage(data);
    await iniPageBackBtn();
    return selectedpageResult;
  } catch (error) {
    showToast({ message: "An error occurred while loading the page.", type: 3, duration: 5 });
  }
}
export { siteController };
