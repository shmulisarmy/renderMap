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


class rerenderList{
    /**
     * @param {HTMLElement} parentElement
     * @param {any[]} list
     * @param {function} createChildrenWith
     * */
    constructor(parentElement, list, createChildrenWith){
        this.parentElement = parentElement
        this.list = list
        this.createChildrenWith = createChildrenWith
        this.initialRender()
    }
    initialRender(){
        this.parentElement.innerHTML = ""
        this.list.forEach(item => {
            const newElement = this.createChildrenWith(item)
            newElement.rerenderer = this.createChildrenWith
            newElement.props = item
            newElement.classList.add("component")
            this.parentElement.appendChild(newElement)
        })
    }
    /**
     * @param {any} item
     * */
    push(item){
        this.list.push(item)
        const newElement = this.createChildrenWith(item)
        this.parentElement.appendChild(newElement)
    }
    insertByIndex(index, item){
        this.list.splice(index, 0, item)
        const newElement = this.createChildrenWith(item)
        this.parentElement.insertBefore(newElement, this.parentElement.children[index])
    }
    deleteByIndex(index){
        this.list.splice(index, 1)
        this.parentElement.removeChild(this.parentElement.children[index])
    }
}

// const handler = {
//     set (target, prop, value) {
//         target[prop] = value
//         HTMLElement.prototype[prop] = value
//     }
// }

HTMLElement.prototype.rerender = function () {
    const newElement = this.rerenderer(this.props)
    this.parentElement.replaceChild(newElement, this)
}

HTMLElement.prototype.set = function (key, value) {
    this.props[key] = value
    const newElement = this.rerenderer(this.props)
    this.parentElement.replaceChild(newElement, this)
}

HTMLElement.prototype.update = function (signalName, value) {
    this.dataset[signalName] = value
    const allChildrenSubscribedToSignal = this.querySelectorAll(`[signal=${signalName}]`)
    for (const child of allChildrenSubscribedToSignal) {
        child.textContent = value
    }
}

HTMLElement.prototype.component = function () {
    return this.closest(".component")
}

HTMLElement.prototype.reset = function (key, value) {
    if (this.classList.contains("component")) {
        this.set(key, value)
    } else {
        this.closest(".component").set(key, value)
    }
}






