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