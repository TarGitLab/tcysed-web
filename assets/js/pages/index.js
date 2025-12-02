import { controller } from "../../../layout/layoutController/layoutController.js"

async function setupSideBar() {


  let sideBarActionButton = document.querySelector(".sideBarActionButton");
  sideBarActionButton.addEventListener("click", async () => {
    let sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebar_active");
  });


  let navItems = document.querySelectorAll(".nav-item");
  navItems.forEach((item) => {
    item.addEventListener("click", async () => {
    
      let controllerName = item.getAttribute("data-controller");
      let pageName = item.getAttribute("data-page");

      if(!controllerName || !pageName) {
        return;
      }

      let data = {
        controller: controllerName,
        page: pageName,
      };

      let layoutHtml = await controller(data);

      if(layoutHtml){
        navItems.forEach((nav) => nav.classList.remove("active"));
        item.classList.add("active");
      }

      return layoutHtml;

    });
  });

  let listIdeabtn = document.querySelector("#listIdeabtn");
  listIdeabtn.addEventListener('click', async function(){
    await controller({controller: "site", page: "contactUs"});
  })


}

export { setupSideBar };
