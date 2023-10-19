import { newEl } from "../helpers/newEl.js";

export function createSettingsButton(_isDesktop){
    let settings = newEl({type:'a'})
    settings.setAttribute('href', '/pages/settings')
    settings.classList.add(!_isDesktop ? 'settingsButton' : 'desktopSettingsButton')
    settings.innerHTML = `<img src="../../assets/appIcons/gear-solid.svg"/>`
    return settings
}