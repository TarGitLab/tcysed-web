import  { layout } from "../../layout/layout.js";
import { setupSideBar } from "./pages/index.js";

(async () => {

   await setupSideBar();
   await layout();

})();
