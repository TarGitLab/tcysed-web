import { controller } from "../../../layoutController/layoutController.js";

async function iniHomePage(data = {}) {
   let allRecentLunchedCards = document.querySelectorAll(".recentLunchedCard");
   allRecentLunchedCards.forEach(singleRecentLunchedCard => {
       singleRecentLunchedCard.addEventListener('click', async ()=>{

           let controllerName = singleRecentLunchedCard.dataset.controller;
           let pageName = singleRecentLunchedCard.dataset.page;

           if(!controllerName && !pageName){
             return;
           }

           let recentLunchedCardPageRes = await controller({controller: controllerName,page: pageName});
           return recentLunchedCardPageRes;

       })
   });
}

export { iniHomePage };
