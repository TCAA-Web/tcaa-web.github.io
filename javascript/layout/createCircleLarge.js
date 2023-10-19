import { newEl } from "../helpers/newEl.js";

export function createCircleLarge(_text){
    let container = newEl({type: 'div'})
    let circle1 = newEl({type: 'div'})
    let circle2 = newEl({type:'div'})
    let text = newEl({type:'h4'})
    let subText = newEl({type: 'h5'})
    subText.innerText = "pr. kWh"
    container.classList.add('circleLarge')
    container.append(circle1)
    circle1.append(circle2)
    circle2.append(text)
    circle2.append(subText)
    text.innerText = `${_text}`
    return container
}