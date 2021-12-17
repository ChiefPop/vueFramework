<template >
  <div style="background-color:#fff"></div>
</template>
<script>
const __className__ = "baseCpn_singleMore";

import commonView_Component from "@/Projects/Frameworks/Views/Common/commonView_Component_";
import baseCpn_titleBar from "@/Projects/Frameworks/Views/Base/zyyan/Common/baseCpn_titleBar_";
import baseCpn_Addgroupchat from "@/Projects/Frameworks/Views/Base/zyyan/Components/IM/ip/singleMore/baseCpn_Addgroupchat_";
import baseCpn_textInco from "@/Projects/Frameworks/Views/Base/zyyan/Common/baseCpn_textInco_";

export default {
  name: __className__,
  className: __className__,
  extends: commonView_Component,
  components: { baseCpn_titleBar, baseCpn_Addgroupchat, baseCpn_textInco },
  data() {
    return {
      instance_titleBar: null,
      instance_Addgroupchat: null,
      instance_textInco: null,
    };
  },

  methods: {
     auto_reSize: function (paramOptions) {

      if (!paramOptions) return;
    
      paramOptions.container_clientLeft = 0;
      paramOptions.container_clientTop = 0;

      this.Width = "%W%*0.3";
      this.Height = "%H%*0.3";
      this.Left = "%W%*0.05";
      this.Top = "%H%*0.3"
    },
   
  },
  created() {
    this.positionState = "absolute";
    this.instance_titleBar = this.new_Component(baseCpn_titleBar);
    this.instance_Addgroupchat = this.new_Component(baseCpn_Addgroupchat);
    this.instance_textInco = this.new_Component(baseCpn_textInco);
    
  },
  mounted() {
  
  },
};
</script>

