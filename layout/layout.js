import { controller } from "./layoutController/layoutController.js";

async function layout() {

  try {
    let defaultController = "site";
    let layoutHtml = await controller({ controller: defaultController });
    return layoutHtml;
  } catch (error) {
    console.log("Layout Error: ", error);
  }
  
}

export { layout };
