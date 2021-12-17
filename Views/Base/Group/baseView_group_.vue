<template>
  <div>
    <header class="">

    </header>

    <main>
      <baseGroup_item v-for="item in group.children" :key="item.id" :group="item" />
    </main>

  </div>
</template>

<script>
const __className__ = 'baseView_group';

import base_group from "@/Projects/Frameworks/Models/Base/base_group_";

import baseGroup_item from "@/Projects/Frameworks/Views/Base/Group/baseGroup_item_";

export default {
  name: __className__,

  components: { baseGroup_item },

  data() {
    return {
      group: null
    }
  },

  methods: {
    getSelect() {
      let resultArr = [];

      this.group.children.forEach(item => {
        resultArr = resultArr.concat(item.getCheckedChildren());
      });

      this.group.children.forEach(item => {
        item.checked = false;
        item.setAllChilrenUnchecked();
      });

      return resultArr;
    }
  },

  created() {
    const group = base_group.generateTestData(); 
    this.group = group;
  },

  mounted() {

  }
}
</script>

<style>

</style>