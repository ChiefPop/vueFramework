<script>
  //******************************************************************************//
  //  This file is created by ziyi Yan 2021.08.30           
  //  common Message
  //******************************************************************************//
</script>

<template></template>

<script>
  const __className__ = 'common_Message';
  import common_Object from '@/Projects/Frameworks/Models/Common/common_Object_';

  export default {
    name: __className__,
    className: __className__,
    extends: common_Object,
    components: { common_Object },

    data() {
      return {
        alarmReminders: [],
        taskReminders: [],
      }
    },

    methods: {
      get_alarmReminderCount() {
        if (!this.alarmReminders) return 0;
        return this.alarmReminders.length;
      },
      get_alarmReminder_byID(paramID) {
        if (!paramID) return null;
        let result = null;

        for (var i = 0; i < this.alarmReminders.length; i++) {
          if (this.alarmReminders[i].messageID === paramID) {
            result = this.alarmReminders[i];
            break;
          }
        }
        return result;
      },
      get_alarmReminder_byIndex(paramIndex){
        if(!paramIndex) return ;
        if(paramIndex < 0) return;
        if(paramIndex >= this.alarmReminders.length) return;
        return this.alarmReminders[paramIndex]
      },
      get_taskReminderCount() {
        if (!this.taskReminders) return 0;
        return this.taskReminders.length;
      },

      get_taskReminder_byIndex(paramIndex) {
        if (!this.taskReminders) return;
        if (paramIndex < 0) return;
        if (paramIndex >= this.taskReminders.length) return;
        return this.taskReminders[paramIndex];
      },

      get_taskReminder_byID(paramID) {
        if (!paramID) return null;
        let result = null;
        for (var i = 0; i < this.taskReminders.length; i++) {
          if (this.taskReminders[i].taskID === paramID) {
            result = this.taskReminders[i];
            break;
          }
        }
        return result;
      },

    },

    created: function () {

    },

    mounted: function () {

    },

    beforeDestroy: function () {

    }


  }

</script>