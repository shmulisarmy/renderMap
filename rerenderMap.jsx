


class RenderMap{
    /**
     * @param {HTMLElement} parentElement
     * @param {Map<string, any>} map
     * @param {function} createChildrenWith
     * @param {string} itemType example: user or post blog
     * */
    constructor(parentElement, map, createChildrenWith, itemType){
        assert(map instanceof Map, `${map} is not a Map`)

        this.itemType = itemType
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
    deleteLink(key){
        return `/${this.itemType}/${key}`
    }
    async deleteChild(key){
        if (!(confirm(`Are you sure you want to delete ${this.itemType} ${key} from the list?`))){
            return
        }
        // const res = await fetch(this.deleteLink(key), {method: "DELETE"})
        // if (!(res.ok)) {
        //     alert(`Failed to delete ${this.itemType} ${key}`)
        //     return
        // }
        const child = this.childMap.get(key)
        child.classList.add("deleting")

        setTimeout(() => {
            this.parentElement.removeChild(child)
            this.childMap.delete(key)
            this.map.delete(key)
        }, 500)
    }
}


