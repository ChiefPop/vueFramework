<script>
  //******************************************************************************//
   //  This file is created by ziyi Yan 2021.07.19                                //
   //  base Offer                                                               //
   //  get_Offer_allData()：
   //  function: this.$Instances.offer.get_Offer_allData();
   //  You can get all the data of the publishing task;
   //

  //  get_offerStatus(paramStatus) :
  //  function:Return according to the dispatch order status
  //
//******************************************************************************//
</script>

<template></template>

<script>
  import common_Offer from '@/Projects/Frameworks/Models/Common/common_Offer_'
  import bus from '@/Projects/Xsj/Electrics/Common/Js/bus';
  export default {
    name: 'base_Offer',
    components: { common_Offer },
    extends: common_Offer,

    data() {
      return {

      }
    },

    methods: {
      get_Offer_allData() {
        return this.Offers;
      },
      save_userData() {
        this.Users = [];
        var userInformations = this.$Instances.addressBook.getMemberList();
        // console.log(userInformations)
        for (var i = 0; i < userInformations.length; i++) {
          this.Users.push(userInformations[i]);
        }
      },
      create_randomOffer(paramCount) {
        this.Offers = [];
        this.save_userData();
         let userName ;
         for(var i = 0 ;i<this.Users.length;i++){
           userName = this.Users[i].name
         }
        // for (var i = 0; i < this.Users.length; i++) {
          for (var i = 0; i < paramCount; i++) {
            // let userName = this.Users[i].name;
            // let userID = this.Users[i].id;
            var tempOffer = {};
            tempOffer.taskID = this.get_randomID();
            tempOffer.taskTitle = '线路维修';
            tempOffer.taskCommont = '今日需要检查电路情况，有损坏及时进行维修';
            tempOffer.task_startTime = '2021-4-1';
            tempOffer.task_endTime = '2021-5-1';

            tempOffer.taskPosition = '上海市浦东新区金沙路';
            // tempOffer.userID = userID;
            tempOffer.task_Executive = userName;
            tempOffer.task_Assistant =userName;
            this.Offers.push(tempOffer);
          // }
        }
      },
      
      add_newOffer(paramTask) {
        if (!paramTask) return;

        this.Offers.push(paramTask);
      },

      remove_offerItem(paramID) {
        if (!paramID) return;

        return this.Offers.delete(paramID);

      },
      get_offerItem(paramID) {
        if (!paramID) return;

        return this.Offers.find(item => item.taskID === paramID);
      },
     
    //  This method is used to modify the dispatch order component data
      updateOffers(paramIndex, paramData) {
        if (!this.Offers) return;
        if (paramIndex < 0) return;
        if (paramIndex >= this.Offers.length) return;

        const tempData = paramData[paramIndex];

        this.Offers.filter((elem, index) => {
          if (paramIndex === index) {
            for (var i = 0; i < this.Offers.length; i++) {
              this.Offers[i].taskTitle = tempData.taskTitle;
              this.Offers[i].taskCommont = tempData.taskCommont;
              this.Offers[i].task_startTime = tempData.task_startTime;
              this.Offers[i].task_endTime = tempData.task_endTime;
              this.Offers[i].taskPosition = tempData.taskPosition;
              this.Offers[i].task_Executive = tempData.task_Executive;
              this.Offers[i].task_Assistant = tempData.task_Assistant;
            }
          }
        })
      },
      get_offerStatus(paramStatus) {
        if (!this.Offers) return;
        let temp_offerData = [];

        if (!paramStatus) return this.get_Offer_allData();
        for (var i = 0; i < this.Offers.length; i++) {
          if (paramStatus) {
            temp_offerData = this.Offers.filter(function (item) {
              return (JSON.stringify(item).indexOf(val) > -1);
            })
            this.Offers = temp_offerData;
          }
        }

      },

    },

    created: function () {
      // this.create_randomOffer(1)
    },

  }
</script>