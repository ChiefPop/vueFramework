<template >
   <div  style="background-color:pink"></div> 
</template>

<script>
const __className__ = 'baseCpn_personDetails'

import baseCpn_titleBar from "@/Projects/Frameworks/Views/Base/zyyan/Common/baseCpn_titleBar_";
import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';
import baseCpn_personDetails from "@/Projects/Frameworks/Views/Base/zyyan/Components/IM/ip/personDetails/baseCpn_personDetails_";
export default {
  name: __className__,
  className: __className__,
  extends: commonView_Component,
  components: {
    baseCpn_titleBar,
    baseCpn_personDetails,
  },
  data() {
    return {
        instance_titleBar: null,
        instance_personDetails:null,
    }
  },
  methods: {
     auto_reSize: function (paramOptions) {

      if (!paramOptions) return;
    
      paramOptions.container_clientLeft = 0;
      paramOptions.container_clientTop = 0;

      this.Width = "%W%*0.35";
      this.Height = "%H%*0.3";
      this.Left = "%W%*0.55";
      this.Top = "%H%*0.65"
    },
  },
  created: function () {
     this.positionState = "absolute";
     this.instance_titleBar = this.new_Component(baseCpn_titleBar);
      this.instance_personDetails = this.new_Component(baseCpn_personDetails);
  },
  mounted:function(){
    
    
  },

 
}
</script>

<style>

</style>
