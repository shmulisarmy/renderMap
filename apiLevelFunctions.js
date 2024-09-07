const RenderGroups = new Map()




function CreateRenderGroup(holding, data, createChildrenWith) {
    const key = `${holding}-container`;
    if (RenderGroups.has(key)) {
        return RenderGroups.get(key)
    }
    const parentElement = document.createElement("div")
    parentElement.id = key
    const renderMap = new RenderMap(parentElement, data, createChildrenWith, holding)

    RenderGroups.set(key, parentElement)
    return parentElement
}


HTMLElement.prototype.morphe = function (TopLevelComponent) {
    if (!document.contains(this)) {
        throw new Error("this element has been removed from the dom")
    }
    /**
     * @type {HTMLElement} used for removing the render groups one at a time (but not all at once with querySelectorAll because we only want one layer (non recursive))
     */
    let RenderGroup;

    while (RenderGroup = this.querySelector(".container")) {
        document.body.appendChild(RenderGroup)
        
    }

    const newElement = TopLevelComponent()
    this.parentElement.replaceChild(newElement, this)
    newElement.loadAllContainers()

}