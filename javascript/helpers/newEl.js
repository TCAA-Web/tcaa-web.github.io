/* export function newEl(_type, _html = "", _attr, _attrValue, _event, _func, _class){
    let el = document.createElement(_type)
    if (_html) el.innerHTML = _html
    if (_class) el.classList.add(_class)
    if (_attr && _attrValue) el.setAttribute(_attr, _attrValue)
    if (_func && _event) el.addEventListener(_event, _func)
    return el
} */

/**
 * Create a new HTML Element from these parameters
 * @param {Object} options
 * @param {String} options.type
 * @param {Array} options.append
 * @param {String} options.class  
 * @param {String} option.text
 * @param {String} options.html
 * @param {Object} options.attr // name and value
 * @param {Object} options.event // name and func
 * @returns HTML Element
 */
export function newEl(options){
    let el = document.createElement(options.type)
    if (options.append) options.append.forEach(item => {
        el.append(item)        
    });
    if (options.html) el.innerHTML = options.html
    if (options.text) el.innerText = options.text
    if (options.class) el.classList.add(options.class)
    if (options.attr) options.attr.map((option) => {
        el.setAttribute(option.name, option.value)
    }) 
    if (options.event) el.addEventListener(options.event.name, options.event.func)
    return el
}