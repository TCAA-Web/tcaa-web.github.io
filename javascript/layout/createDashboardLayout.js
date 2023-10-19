import { newEl } from "../helpers/newEl.js";
import { routes } from "../static/routes.js";
import { createFooter } from "./createFooter.js";
import { createNavbar } from "./createNavbar.js";
import { createSettingsButton } from "./createSettingsButton.js";

export function createDashboardLayout(_arr) {
  let main = document.getElementById("mainContainer");
  main.classList.add("mainContainer");
  main.innerHTML = "";
  console.log(_arr);
  let dashBoardContainer = newEl({ type: "div", class: "dashBoardContainer" });

  // The main layout in order
  main.append(createNavbar(routes));
  main.append(createSettingsButton());
  main.append(dashBoardContainer);
  _arr.map((item, index) => {
    dashBoardContainer.append(
      newEl({ type: "div", class: `innerContainer${index}` })
    );
    return item.map((i) => {
      document.querySelector(`.innerContainer${index}`).append(i);
    });
  });
  main.append(createFooter("inkl."));
  return main;
}
