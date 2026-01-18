import { showToast } from "../../utils/toast.js";
import { render404 } from "../../template/template.js";
import { showContent } from "../a/showContent.js";
import { iniPageBackBtn } from "../../templateJs/template.js";
import { ini404 } from "../../templateJs/template.js";

import { nftRescuePage } from "./nft/nftRescue.js";
import { erc20RescuePage } from "./erc20/erc20.js";
import { walletDelegationRevokePage } from "./wallet/revokeDelegations.js";

let pages = {
  nftRescue: nftRescuePage,
  erc20Rescue: erc20RescuePage,
  revokeDelegations : walletDelegationRevokePage,
};

async function rescueController(data) {
  try {
    let defaultPage = "erc20Rescue";
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
export { rescueController };
