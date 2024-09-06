
function CreateRenderGroup(holding, data, createChildrenWith) {
    const parentElement = document.createElement("div")
    parentElement.id = `${holding}-container`
    const renderMap = new RenderMap(parentElement, data, createChildrenWith, holding)
    console.log({parentElement})
    return parentElement
}


HTMLElement.prototype.morphe = function (TopLevelComponent) {
    this.parentElement.replaceChild(TopLevelComponent(), this)
    this.loadAllContainers()

}