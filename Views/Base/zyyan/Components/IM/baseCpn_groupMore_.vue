<template >
  <div style="background-color:green" >more group chat</div>
</template>

<script>
const __className__ = 'baseCpn_groupMore'

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';


export default {
  name: __className__,
  className: __className__,
  extends: commonView_Component,

  data() {
    return {
       
    }
  },

  methods: {
     auto_reSize: function (paramOptions) {

      if (!paramOptions) return;
    
      paramOptions.container_clientLeft = 0;
      paramOptions.container_clientTop = 0;

      this.Width = "%W%*0.4";
      this.Height = "%H%*0.3";
      this.Left = "%W%*0.05";
      this.Top = "%H%*0.65"
    },
  },
  created: function () {
     this.positionState = "absolute";
  },

 
}
</script>

<style>
</style>
