<template lang="pug">
  include baseView_dateManager_
</template>

<script>

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

export default {
  extends: commonView_Component,
  
  data() {
    return {
      date: new Date(),

      dialogVisible: false,

      active: 0,

      selectedDay: null,

      todoList: {
        '2020-08-14': 3,
        '2020-08-15': 4,
        '2020-08-16': 1,
      },

      firstDayOfWeek: 1,

      testIf: false,
    }
  },

  methods: {
    handleClick() {
      
    },

    showDateManager(day) {
      this.selectedDay = day;
      this.dialogVisible = true;
    }
  },

  watch: {
    // value: function (val, oldVal) {
    //   this.dialogVisible = true;
    // }
  },

  created() {
    
  },

  mounted() {
    // let test = document.getElementById('test');
    // test.addEventListener('click', this.handleClick, false);
  }
}
</script>
