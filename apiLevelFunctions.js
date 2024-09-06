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
    const allRenderGroups = this.querySelectorAll(".container")

    for (const renderGroup of allRenderGroups) {
        document.body.appendChild(renderGroup)
    }


    const newElement = TopLevelComponent()
    this.parentElement.replaceChild(newElement, this)
    newElement.loadAllContainers()

}