import { newEl } from "../helpers/newEl.js";
import { createDashboardLogo } from "./createDashboardButton.js";
import { createSettingsButton } from "./createSettingsButton.js";

export function createNavbar(_routes) {
  let location = window.location.href;
  let nav = newEl({type: "nav"});
  nav.classList.add(_routes ? "navbarStyle" : 'desktopNavbarStyle');
  if (_routes){
    
    nav.innerHTML =
      `<img src="../../assets/appIcons/windows11/Square150x150Logo.scale-100.png"/>` +
      _routes
        .map((item, index) => {
          return `<a href=${item.link} class=${
            location.includes(item.link.slice(5)) ? "active" : ""
          }>${item.name}</a>`;
        })
        .join("");
    return nav;
  }
  if (!_routes){
    
    nav.append(createDashboardLogo(true))
    nav.append(createSettingsButton(true))
  }
  return nav
}
