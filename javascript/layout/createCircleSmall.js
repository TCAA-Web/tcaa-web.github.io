import { newEl } from "../helpers/newEl.js";

export function createCircleSmall(_text, _outerText){
    let container = newEl({type: 'div'})
    let circle = newEl({type: 'div'})
    let text = newEl({type: 'h4'})
    let subText = newEl({type: 'h5'})
    let outerText = newEl({type: 'p', text: _outerText})
    subText.innerText = "pr. kWh"
    container.classList.add('circleSmall')
    container.append(circle)
    circle.append(text)
    circle.append(subText)
    container.append(outerText)
    text.innerText = `${_text}`
    return container
}