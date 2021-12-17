<template >
  <div style="background-color: #ff0">chat setcion</div>
</template>

<script>
const __className__ = "baseCpn_chatInterface";

import commonView_Component from "@/Projects/Frameworks/Views/Common/commonView_Component_";

export default {
  name: __className__,
  className: __className__,
  extends: commonView_Component,
  components: {
   
  },
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
      this.Height = "%H%*0.2";
      this.Left = "%W%*0.05";
      this.Top = "%H%*0.05"
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
