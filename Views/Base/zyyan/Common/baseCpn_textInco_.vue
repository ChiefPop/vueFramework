<template >
  <div style="background-color:#ccc" >private chat more</div>
</template>

<script>
const __className__ = "baseCpn_textInco";

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
      this.Height = "%H%*0.4";
      this.Left = "%W%*0.1"
      this.Top = "%H%*0.55";
    },

  },
  created: function () {
    this.positionState = "absolute";
  },
  mounted: function () {
 
  },
};
</script>

<style>

</style>
