<script>
  //******************************************************************************//
  //  This file is created by ziyi Yan 2021.08.30           
  //  common alarmReminder

    //   get_alarmReminder_byIndex(paramIndex):
   //  function:this.$Instances.message.get_alarmReminder_byIndex();
   //  Fetch data by subscript
   //

   //  get_alarmReminder_byID(paramID)                                                     
   //  function:this.$Instances.message.get_alarmReminder_byID();
   //  Get data by ID                                              
  //
  //******************************************************************************//
</script>

<template></template>

<script>
  const __className__ = 'common_alarmReminder';
  import common_Object from '@/Projects/Frameworks/Models/Common/common_Object_';

  export default {
    name: __className__,
    className: __className__,
    extends: common_Object,
    components: { common_Object },

    data() {
      return {
        alarmReminders: [],
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
    },

    created: function () {

    },

    mounted: function () {

    },

    beforeDestroy: function () {

    }


  }

</script>