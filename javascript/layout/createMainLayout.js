import { getWindowSize } from "../helpers/getWindowSize.js";
import { routes } from "../static/routes.js";
import { createFooter } from "./createFooter.js";
import { createNavbar } from "./createNavbar.js";
import { createSettingsButton } from "./createSettingsButton.js";

export function createMainLayout(_children) {
  let main = document.getElementById("mainContainer");
  main.classList.add("mainContainer");
  main.innerHTML = ""
  let _isDesktop = window.onresize = getWindowSize()

  if (_isDesktop){
    main.append(createNavbar());
    main.append(..._children);
    main.append(createFooter('inkl.'))
  }
  if (!_isDesktop){
    // The main layout in order
    main.append(createNavbar(routes));
    main.append(createSettingsButton());
    main.append(..._children);
    main.append(createFooter('inkl.'))
    return main
  }
  return main
}
