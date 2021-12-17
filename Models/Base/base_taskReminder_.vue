<script>
  //******************************************************************************//
   //  This file is created by ziyi Yan 2021.08.31                                //
   //  base taskReminder   

//******************************************************************************//
</script>

<template></template>

<script>
  import common_taskReminder from '@/Projects/Frameworks/Models/Common/common_taskReminder_.vue'
  export default {
    name: 'base_taskReminder',
    components: { common_taskReminder },
    extends: common_taskReminder,

    data() {
      return {

      }
    },
    created: function () {

    },
    methods: {
      create_randomReminders(paramCount) {
        this.taskReminders = [];
        for (var i = 0; i < paramCount; i++) {
          var tempReminder = {};
          tempReminder.taskID = '';
          tempReminder.taskState = '';
          tempReminder.taskName = '';
          tempReminder.taskTitle = '';
          tempReminder.taskComment = '';
          tempReminder.task_creatDate = '';
          this.taskReminders.push(tempReminder)
        }
      },
      get_taskReminder_allData() {
        return this.taskReminders;
      },
      remove_taskReminderItem(paramID) {
        if (!paramID) return;
        return this.taskReminders.delete(paramID)
      }

    },



  }
</script>