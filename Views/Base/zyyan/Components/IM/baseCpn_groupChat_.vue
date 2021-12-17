<template >
  <div style="background-color: #aaa" >group chat</div>
</template>

<script>
const __className__ = "baseCpn_groupChat";
import commonView_Component from "@/Projects/Frameworks/Views/Common/commonView_Component_";
// import baseCpn_titleBar from "@/Projects/Frameworks/Views/Base/zyyan/Common/baseCpn_titleBar_";
// import baseView_groupChat from "@/Projects/Frameworks/Views/Base/zyyan/Components/IM/ip/groupChat/baseView_groupChat_";
// import baseCpn_sendMessage from "@/Projects/Frameworks/Views/Base/zyyan/Common/baseCpn_sendMessage_";

export default {
  name: __className__,
  className: __className__,
  extends: commonView_Component,
 
  data() {
    return {
     
    };
  },

  methods: {
    auto_reSize: function (paramOptions) {

      if (!paramOptions) return;
    
      paramOptions.container_clientLeft = 0;
      paramOptions.container_clientTop = 0;

      this.Width = "%W%*0.4";
      this.Height = "%H%*0.3";
      this.Left = "%W%*0.55";
      this.Top = "%H%*0.3"
    },
  },
  created: function () {
     this.positionState = "absolute";
  
  },
  mounted() {
    
  },
};
</script>

<style>

</style>
