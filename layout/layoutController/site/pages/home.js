import { showContent } from "../../a/showContent.js";
import { getSkeleton } from "../../../utils/skeleton.js";
import { showToast } from "../../../utils/toast.js";
 
import { homeTemplate} from "../../../template/template.js";
import { iniHomePage } from "../../../templateJs/template.js";

async function homePage(data = {}) {

  try {
    await showContent(getSkeleton(3));
    let homeHtml = await homeTemplate(data);

    await showContent(homeHtml);
    await iniHomePage(data);
    
    return homeHtml;
  } catch (error) {
    showToast({  message: "An error occurred while loading the page.",  type: 3,  duration: 5,});
  }
  
}

export { homePage };