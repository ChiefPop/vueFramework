<template>
  <div class="base-group-item">

    <header class="base-group-item-title">
      <el-checkbox v-model="group.checked" :indeterminate="isIndeterminate" @change="handleGroupValueChange">

      </el-checkbox>

      <header>
        <i :class="isOpen ? 'el-icon-caret-bottom' :'el-icon-caret-right'" @click.stop="handleClickCaret"></i>
      </header>

      <header class="base-group-item-avatar">
        <i class="el-icon-s-platform"></i>
      </header>

      <main class="base-group-item-content">
        {{ group.name }}
      </main>

      <footer>
        <i class="el-icon-circle-plus-outline" style="color: red; font-size: 25px"
          title="新增人员" @click="handleClickNewMember" v-show="isEdit"></i>

        <i class="el-icon-delete" title="删除群组" style="color: red; font-size: 25px"
          @click="handleClickRemoveGroup" v-show="isEdit">
        </i>
      </footer>
    </header>

    <main class="base-group-item-member-wrapper" v-show="isOpen">

      <div class="base-group-item-member" v-for="item in group.children" :key="item.treeID">
        <el-checkbox v-model="item.checked" @change="handleUserValueChange">

        </el-checkbox>

        <div class="base-group-item-avatar">
          <i class="el-icon-s-custom"></i>
        </div>

        <div class="base-group-item-member-content">
          {{ item.name }}
        </div>

        <div>
          <i class="el-icon-delete" title="删除人员" style="color: red; font-size: 25px" v-show="isEdit"></i>
        </div>

      </div>

      

    </main>

  </div>
</template>

<script>
const __className__ = 'baseGroup_item'

export default {
  name: __className__,

  data() {
    return {
      isOpen: false,

      isIndeterminate: false
    }
  },

  props: {
    isEdit: {
      type: Boolean,
      default: false
    },

    group: {
      type: Object,
      required: true
    }
  },

  methods: {
    handleGroupValueChange(val) {
      if (val) {
        this.isIndeterminate = false;
        this.group.setAllChilrenChecked();
      } else {
        this.group.setAllChilrenUnchecked();
      }
    },

    handleUserValueChange(val) {
      if (val) {
        this.isIndeterminate = true;
      } else {
        
      }

      const checkedList = this.group.getCheckedChildren();

      if (checkedList.length === this.group.children.length) {
        this.isIndeterminate = false;
        this.group.checked = true;
      } else {
        if (checkedList.length) {
          this.isIndeterminate = true;
        } else {
          this.isIndeterminate = false;
          this.group.checked = false;
        }
      }
    },

    handleClickCaret() {
      if (this.isOpen) {
        this.closeGroup();
      } else {
        this.openGroup();
      }
    },

    openGroup() {
      this.isOpen = true;
    },

    closeGroup() {
      this.isOpen = false;
    },
    
    handleClickNewMember() {
    
    },

    handleClickRemoveGroup() {

    }
  },

  created() {

  },

  mounted() {

  }
}
</script>

<style>
.base-group-item {
  width: 100%;
}

.base-group-item-title {
  display: flex;
  align-items: center;

  width: 100%;
  padding: 5px;
  box-sizing: border-box;
  text-align: left;
}

.base-group-item-title:hover {
  cursor: pointer;
  background-color: gray;
}

.base-group-item-avatar {
  width: 40px;
  height: 40px;
  font-size: 40px;
}

.base-group-item-content {
  flex-grow: 1;
  margin-left: 5px;
}

.base-group-item-member {
  display: flex;
  align-items: center;

  width: 100%;
  padding: 5px 5px 5px 45px;
  box-sizing: border-box;
  text-align: left;
}

.base-group-item-member-wrapper {
  width: 100%;
}

.base-group-item-member-content {
  flex-grow: 1;
  margin-left: 5px;
}
</style>