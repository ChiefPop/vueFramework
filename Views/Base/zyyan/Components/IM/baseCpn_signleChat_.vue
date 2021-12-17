<template >
  <div style="background-color: blue"></div>
</template>

<script>
const __className__ = "baseCpn_signleChat";
import commonView_Component from "@/Projects/Frameworks/Views/Common/commonView_Component_";
import baseCpn_titleBar from "@/Projects/Frameworks/Views/Base/zyyan/Common/baseCpn_titleBar_";
import baseCpn_signleChats from "@/Projects/Frameworks/Views/Base/zyyan/Components/IM/ip/signleChat/baseCpn_signleChats_";
import baseCpn_sendMessage from "@/Projects/Frameworks/Views/Base/zyyan/Common/baseCpn_sendMessage_";

export default {
  name: __className__,
  className: __className__,
  extends: commonView_Component,

  components: {
    baseCpn_titleBar,
    baseCpn_signleChats,
    baseCpn_sendMessage,
   
  },
  data() {
    return {
      instance_titleBar: null,
      instance_signleContent: null,
      instance_sendMessage: null,

    };
  },

  methods: {
    auto_reSize: function (paramOptions) {
      if (!paramOptions) return;

      paramOptions.container_clientLeft = 0;
      paramOptions.container_clientTop = 0;

      this.Width = "%W%*0.45";
      this.Height = "%H%*0.25";
      this.Left = "%W%*0.5";
      this.Top = "%H%*0.02";
    },

    show_Details() {},

    hide_signleChats() {

    },

    launch_Detail() {
      alert("111");

      this.show_Details();
      this.hide_signleChats();
    
    },
  },
  created: function () {
    this.positionState = "absolute";
    this.instance_titleBar = this.new_Component(baseCpn_titleBar);
    this.instance_signleContent = this.new_Component(baseCpn_signleChats);
    this.instance_sendMessage = this.new_Component(baseCpn_sendMessage);
  },
  mounted() {
    this.instance_titleBar.$el.addEventListener("click", this.launch_Talk);
    this.instance_signleContent.$el.addEventListener( "click",this.launch_Detail);

    console.log(this.subComponents);
  },
};
</script>

<style scoped>
</style>
