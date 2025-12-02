import { showToast } from "../utils/toast.js";

import { siteController } from "./site/siteController.js";
import { rescueController } from "./rescue/rescue.js";

let layoutControllers = {
  site: siteController,
  rescue: rescueController,
};

async function controller(data) {

 try {
   let defaultController = "site";
   data.controller = data.controller || defaultController;
   const controllerName = data.controller.trim();

   const selectedController = layoutControllers[controllerName];

   if (!selectedController) {
     throw new Error(`Controller '${templateName}' not found`);
   }

   let layoutHtmlStatus = await selectedController(data);
   return layoutHtmlStatus;
   
 } catch (error) {
    showToast({ message: "An error occurred while loading the layout.", type: 3, duration: 5 });
 }
  
}

export { controller };
