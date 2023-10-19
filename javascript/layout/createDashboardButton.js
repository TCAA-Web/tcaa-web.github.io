import { newEl } from "../helpers/newEl.js";

export function createDashboardLogo(_isDesktop){
    let logo = newEl({type:'a'})
    logo.setAttribute('href', '/pages/dashboard')
    logo.classList.add(!_isDesktop ? 'dashboardBtn' : 'desktopDashboardBtn')
    logo.innerHTML = `<img src="../../assets/appIcons/windows11/Square150x150Logo.scale-100.png"/>`
    return logo
}