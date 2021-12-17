//******************************************************************************//
//  This file is created by jyyang 2021.11.25                                   //
//                                                                              //
//******************************************************************************//

import base_tree from "./base_tree_";

let testData = [
  {
    id: guid(),
    name: '报警预警一群',
    memberList: [
      {
        id: guid(),
        name: '阮慕蕊'
      },
      {
        id: guid(),
        name: '杞飞雪'
      },
      {
        id: guid(),
        name: '奚幻儿'
      },
      {
        id: guid(),
        name: '万雨石'
      },
      {
        id: guid(),
        name: '荣安福'
      }
    ]
  },
  {
    id: guid(),
    name: '施工队组长',
    memberList: [
      {
        id: guid(),
        name: '危蔼'
      },
      {
        id: guid(),
        name: '孙寄云'
      },
      {
        id: guid(),
        name: '墨珠'
      },
      {
        id: guid(),
        name: '胥学'
      },
      {
        id: guid(),
        name: '豆方仪'
      },
      {
        id: guid(),
        name: '锁天工'
      }
    ]
  },
  {
    id: guid(),
    name: '维修队组长',
    memberList: [
      {
        id: guid(),
        name: '费鸿远'
      },
      {
        id: guid(),
        name: '邶孤阳'
      },
      {
        id: guid(),
        name: '用惜玉'
      },
      {
        id: guid(),
        name: '实俊爽'
      }
    ]
  }
]

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

class base_group extends base_tree.base_tree {
  constructor(paramGroup = {}) {
    super();

    this.name = paramGroup.name || '';
    this.userInfo = paramGroup.userInfo || {};
    this.isDep = paramGroup.isDep || false;
    this.checked = paramGroup.checked || false;
  }

  setAllChilrenChecked() {
    this.children.forEach(item => {
      item.checked = true;
    })
  }

  setAllChilrenUnchecked() {
    this.children.forEach(item => {
      item.checked = false;
    })
  }

  getCheckedChildren() {
    return this.children.filter(item => {
      return item.checked;
    })
  }
}

function generateTestData() {
  const root = new base_group({
    name: '上海电力',
    isDep: true
  });

  testData.forEach(item => {
    const node = new base_group({
      name: item.name,
      isDep: true
    });

    item.memberList.forEach(elem => {
      const user = new base_group({
        name:elem.name,
        isDep: false
      });

      node.addChildren([user]);
    })

    root.addChildren([node]);
  })

  return root;
}

export default { base_group, generateTestData }