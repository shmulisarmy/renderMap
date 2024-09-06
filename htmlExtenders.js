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
    const closestComponent = this.closest(".component")
    assert(closestComponent instanceof HTMLElement, "closest is not an HTMLElement")
    return closestComponent
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
    assert(component instanceof HTMLElement, "component is not an HTMLElement")
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
    assert(component instanceof HTMLElement, "component is not an HTMLElement")
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

