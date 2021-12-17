<script>
  //******************************************************************************//
  //  This file is created by ziyi Yan 2021.08.30           
  //  common taskReminder                                          
  //
  //   get_taskReminder_byIndex(paramIndex):
   //  function:this.$Instances.message. get_taskReminder_byIndex();
   //  Fetch data by subscript
   //
   //  get_taskReminder_byID(paramID)                                                     
   //  function:this.$Instances.message.get_taskReminder_byID();
   //  Get data by ID                                              
  //
  //******************************************************************************//
</script>

<template></template>

<script>
  const __className__ = 'common_taskReminder';
  import common_Object from '@/Projects/Frameworks/Models/Common/common_Object_';

  export default {
    name: __className__,
    className: __className__,
    extends: common_Object,
    components: { common_Object },

    data() {
      return {
        taskReminders: [],
      }
    },

    methods: {
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