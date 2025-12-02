import { controller } from "../../../layoutController/layoutController.js";

async function iniSettingsPage(data){
    try {
        let allSettingsCard = document.querySelectorAll(".settings-card");
        allSettingsCard.forEach(singleSettingCard => {
            singleSettingCard.addEventListener('click', async function(){

                let controllerName = singleSettingCard.getAttribute("data-controller");
                let pageName = singleSettingCard.getAttribute("data-page");

                if(!controllerName || !pageName) {
                    return;
                }

                let data = {
                    controller: controllerName,
                    page: pageName,
                };

                let layoutHtml = await controller(data);

                return layoutHtml; 

            });
        });
    } catch (error) {
        
    }
}

export { iniSettingsPage };