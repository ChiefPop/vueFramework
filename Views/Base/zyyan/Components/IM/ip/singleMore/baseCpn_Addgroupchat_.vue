<template >
  <div style="background-color:#fff000" >new chat</div>
</template>

<script>
const __className__ = "baseCpn_Addgroupchat";

import commonView_Component from "@/Projects/Frameworks/Views/Common/commonView_Component_";

export default {
  name: __className__,
  className: __className__,
  extends: commonView_Component,

  data() {
    return {};
  },

 methods: {
    auto_reSize: function (paramOptions) {
      if (!paramOptions) return;

      paramOptions.container_clientLeft = 0;
      paramOptions.container_clientTop = 0;
      this.Width = "%W%*0.8";
      this.Height = "%H%*0.25";
      this.Left = "%W%*0.1"
      this.Top = "%H%*0.25";
    },

  },
  created: function () {
    this.positionState = "absolute";
  },
  mounted: function () {
 
  },
};
</script>

<style scoped>

</style>
