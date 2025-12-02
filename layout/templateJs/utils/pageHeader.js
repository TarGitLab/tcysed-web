import { controller } from "../../layoutController/layoutController.js";

async function iniPageBackBtn(data = {}) {
  try {
    let pageBackBtn = document.querySelector("#pageBackBtn");

    if (!pageBackBtn) {
      return;
    }

    pageBackBtn.addEventListener("click", async function () {
      let controllerName = pageBackBtn.dataset.controller;
      let pageName = pageBackBtn.dataset.page;

      if (!controllerName && !pageName) {
        return;
      }

      await controller({ controller: controllerName, page: pageName });
    });
  } catch (error) {}
}

export { iniPageBackBtn };
