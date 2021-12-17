function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}


class base_tree {
  constructor(paramTree = {}) {
    this.treeID = paramTree.id || guid();
    this.parent = paramTree.parent || null;
    this.children = paramTree.children || [];
  }

  addChildren(paramTrees) {
    if (!paramTrees) return;
    if (!Array.isArray(paramTrees)) return;
    if (!paramTrees.every(elem => elem instanceof base_tree)) return;

    paramTrees.forEach(item => {
      this.children.push(item);
      item.parent = this;
    });
  }

  removeChild(paramTrees) {
    if (!paramTrees) return;
    if (!Array.isArray(paramTrees)) return;
  }

  getNodeByID(paramID) {
    if (!paramID || typeof paramID != 'string') { reject(`paramID is ${paramID}`); return; }
      
    let resultNode = null;
    if (this.treeID = paramID) {
      resultNode = this;
    } else {
      for (let i = 0; i < this.children.length; ++i) {
        if (resultNode) {
          break;
        }
        const item = this.children[i];
        resultNode = item.getNodeByID(paramID);
      }
    }

    return resultNode;
  }
}

export default { base_tree }