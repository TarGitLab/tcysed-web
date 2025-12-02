import { controller } from "../../layoutController/layoutController.js";

async function ini404(data) {
  let goHomeBtn = document.querySelector("#home_404_btn");

  if (goHomeBtn) {
    goHomeBtn.addEventListener("click", async function () {
      controller({ controller: data.controller, page: data.page });
    });
  }
}

export { ini404 };
