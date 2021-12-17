<script>
  //******************************************************************************//
   //  This file is created by ziyi Yan 2021.08.30                                //
   //  base alarmReminder
   //
   // get_alarmReminder_allData()
   // function: this.$Instances.message.get_alarmReminder_allData();
   // Return all alarm data
   //
   // get_alarmReminder_byLevel(paramLevel) 
   // function:this.$Instances.message.get_alarmReminder_byLevel();
   // Alarm data returned according to level

   //  get_alarmReminder_byMajor(paramMajor)
   // function:this.$Instances.message. get_alarmReminder_byMajor();
   // According to the alarm data returned by the specialty


//******************************************************************************//
</script>

<template></template>

<script>
  import common_alarmReminder from '@/Projects/Frameworks/Models/Common/common_alarmReminder_.vue'
  export default {
    name: 'base_alarmReminder',
    components: { common_alarmReminder },
    extends: common_alarmReminder,

    data() {
      return {

      }
    },
    created: function () {
      this.create_randomalarmReminder(2)

    },
    methods: {
      create_randomalarmReminder(paramCount) {
        this.alarmReminders = [];
        for (var i = 0; i < paramCount; i++) {
          var tempReminder = {};
          tempReminder.alarmID = '';
          tempReminder.alarmState = '';
          tempReminder.alarm_createdDate = '';
          tempReminder.alarmName = '';
          tempReminder.alarmAdress = '';
          tempReminder.alarmText = '';        //yuan yin
          tempReminder.alarmLevel = '';       //deng ji 
          tempReminder.alarmMajor = '';      //zhaun ye
          tempReminder.alarmRisk = '';       //feng xian 

          this.alarmReminders.push(tempReminder);
        }

      },
      get_alarmReminder_allData() {
        return this.alarmReminders;
      },

      get_alarmReminder_byLevel(paramLevel) {
        const tempMessageList = this.alarmReminders.filter(item => item.alarmLevel === paramLevel);
        return tempMessageList;
      },

      get_alarmReminder_byMajor(paramMajor) {
        const tempMessageList = this.alarmReminders.filter(item => item.alarmMajor === paramMajor);
        return tempMessageList;
      },

      sort_alarmReminderInfo(param_lastMessage_readedDate) {
        let tempNewMessageNumber = 0;
        const tempNewMessageList = [];
          const tempMessageList = this.alarmReminders.filter(item => item);
          tempMessageList.sort((a, b) => b.alarm_createdDate - a.alarm_createdDate);
          for (let item of tempMessageList) {
            if (item.alarm_createdDate > param_lastMessage_readedDate) {
              tempNewMessageList.push(item);
              tempNewMessageNumber++;
            } else {
              break;
              
            }
          }
      },

      remove_alarmReminderItem(paramID) {
        if (!paramID) return;
        return this.alarmReminders.delete(paramID );
      },
    }



  }
</script>