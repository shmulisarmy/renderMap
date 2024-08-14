function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

const cleanHTMLMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
};
function cleanHTML(input) {
    if (typeof input !== 'string') return input;
    return input.replace(/[&<>"']/g, function(match) {
        return cleanHTMLMap[match];
    });
}

/**
 * @type {Map<string, HTMLElement>}
 */
const HTMLElements = new Map();

function stringClean(strings, args) {
    let result = '';

    for (let i = 0; i < strings.length; i++) {
        if (strings[i][strings[i].length - 1] == "/"){
            const substring = strings[i].substring(0, strings[i].length - 1);
            if (substring != false) {
                result += substring;
            }
        } else {
            result += strings[i];
        }

        if (args[i] instanceof HTMLElement) {
            const key = `element-${HTMLElements.size.toString()}`;
            const placeholderElement = /*html*/`<div class="placeholder" id="${key}">loading</div>`;
            HTMLElements.set(key, args[i]);
            result += placeholderElement;
            continue
        }

        if (i < args.length) {
            if (strings[i][strings[i].length - 1] == "/"){
                result += args[i];
            } else {
                result += cleanHTML(args[i]);
            }
        }
    }

    return result;
}

function html(strings, ...args) {
    const htmlString = stringClean(strings, args);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString.trim();
    return tempDiv.firstChild;
}


class RenderMap{
    /**
     * @param {HTMLElement} parentElement
     * @param {Map<string, any>} map
     * @param {function} createChildrenWith
     * */
    constructor(parentElement, map, createChildrenWith){
        this.parentElement = parentElement
        this.map = map
        this.childMap = new Map()
        this.createChildrenWith = createChildrenWith
        this.render()
        parentElement.renderType = "container-map"
        parentElement.RenderMap = this
    }
    render(){
        // also rerender
        this.parentElement.innerHTML = ""
        this.map.forEach((item, key) => {
            const newElement = this.createChildrenWith(item)
            newElement.rerenderer = this.createChildrenWith
            newElement.props = item
            newElement.classList.add("component")
            newElement.key = key
            console.log("key", key, this)
            newElement.RenderMap = this
            this.childMap.set(key, newElement)
            this.parentElement.appendChild(newElement)
        })
    }
    /**
     * @param {any} item
     * */
    setChild(key, item){
        const newElement = this.createChildrenWith(item)
        if (this.childMap.has(key)) {
            const oldElement = this.childMap.get(key)
            this.parentElement.replaceChild(newElement, oldElement)
        } else{
            this.parentElement.appendChild(newElement)
        }
        newElement.key = key
        this.childMap.set(key, newElement)
        this.map.set(key, item)
    }
    deleteChild(key){
        console.log("deleting", key)
        console.log(this.childMap)
        console.log(this.childMap.get(key))
        this.parentElement.removeChild(this.childMap.get(key))
        this.childMap.delete(key)
        this.map.delete(key)
    }
}

function CreateRenderGroup(holding, data, createChildrenWith) {
    const parentElement = document.createElement("div")
    parentElement.id = `${holding}-container`
    const renderMap = new RenderMap(parentElement, data, createChildrenWith)
    console.log({parentElement})
    return parentElement
}


HTMLElement.prototype.rerender = function () {
    const newElement = this.rerenderer(this.props)
    this.parentElement.replaceChild(newElement, this)
}

HTMLElement.prototype.set = function (key, value) {
    let component = this.classList.contains("component") ? this : this.closest(".component")
    component.props[key] = value
    const newElement = component.rerenderer(component.props)
    component.parentElement.replaceChild(newElement, component)
}

HTMLElement.prototype.component = function () {
    if (this.classList.contains("component")) {
        return this
    }
    return this.closest(".component")
}

HTMLElement.prototype.parentContainer = function () {
    let returnElement;
    if (this.classList.contains("component")) {
        returnElement = this.parentElement
    } else{
        returnElement = this.closest(".component").parentElement
    }
    assert(returnElement.renderType == "container-map" || returnElement.renderType == "container-list")
    return returnElement
}


HTMLElement.prototype.reset = function (key, value) {
    this.component().set(key, value)
}

HTMLElement.prototype.update = function (signalName, value) {
    this.dataset[signalName] = value
    const allChildrenSubscribedToSignal = this.querySelectorAll(`[signal=${signalName}]`)
    for (const child of allChildrenSubscribedToSignal) {
        child.textContent = value
    }
}


HTMLElement.prototype.delete = function () {
    const component = this.component()
    console.log(component)
    const key = component.key
    component.RenderMap.deleteChild(key)
}

HTMLElement.prototype.loadAllContainers = function () {
    const allplaceholders = document.querySelectorAll(".placeholder")
    for (const placeholder of allplaceholders) {
        const key = placeholder.id
        console.log(key)
        console.log(placeholder)
        const actual_container = HTMLElements.get(key)
        console.log({actual_container})
        
        placeholder.parentElement.replaceChild(actual_container, placeholder)
    }
}

