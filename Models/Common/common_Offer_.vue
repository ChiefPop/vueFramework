<script>
  //******************************************************************************//
  //  This file is created by ziyi Yan 2021.07.19           
  //  common Offer

   //  get_Offer_byIndex(paramIndex):
   //  function:this.$Instances.offer.get_Offer_byIndex();
   //  Fetch data by subscript
   //

   //  get_Offer_byID(paramID)                                                      //
   //  function:this.$Instances.offer.get_Offer_byIndex();
  //
  //******************************************************************************//
</script>

<template></template>

<script>
  import common_Object from '@/Projects/Frameworks/Models/Common/common_Object_';
  const __className__ = 'common_Offer';
  export default {
    name: __className__,
    className: __className__,
    extends: common_Object,
    components: { common_Object },

    data() {
      return {
        Users: [],
        Offers: [],
      }
    },

    methods: {
      get_offerCount() {
        if (!this.Offers) return 0;
        return this.Offers.length;
      },
      get_userCount() {
        if (!this.Users) return 0;
        return this.Users.length;
      },
      get_Offer_byIndex(paramIndex) {
        if (!this.Offers) return;
        if (paramIndex < 0) return;
        if (paramIndex >= this.Offers.length) return;
        return this.Offers[paramIndex];
      },
      get_Offer_byID(paramID) {
        if (!paramID) return null;
        let result = null;

        for (var i = 0; i < this.Offers.length; i++) {
          if (this.Offers[i].taskID === paramID) {
            result = this.Offers[i];
            break;
          }
        }
        return result;
      },

      get_Offer_byName(paramName) {
        if (!this.Offers) retuen;
        if (!this.Offers[paramName]) return;

        return this.Offers[paramName];
        
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