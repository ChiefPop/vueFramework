<template>
    <div>
     
    </div>
  </template>
  
  <script>
  const __className__ = "baseFrame_whitebullectDialog";
  import commonView_Frame from "@/Projects/Frameworks/Views/Common/commonView_Frame_";
  import baseView_whitebullectDialog from '@/Projects/Frameworks/Views/Base/zyyan/Components/whitebullectDialog/baseView_whitebullectDialog_';
  
  export default {
    extends: commonView_Frame,
    name: __className__,
    className: __className__,
  
    data() {
      return {};
    },
  
    components: {},
  
    methods: {
      auto_reSize: function () {
          this.Left='0';
          this.Top ='0';
          this.Width='%W%';
          this.Height='%H%';
      },
  
      set_Position(paramWidth, paramHeight, paramLeft, paramTop) {
        if (!this.$el) return;
        if (this.$el) {
          this.$el.children[0].children[0].style.width = paramWidth.toString() + "px";
          this.$el.children[0].children[0].style.height = paramHeight.toString() + "px";
          this.$el.children[0].children[0].style.left = paramLeft.toString() + "px";
          this.$el.children[0].children[0].style.top = paramTop.toString() + "px";
        }
  
      },
    },
  
    created() {
      // this.push_cssRule("background:#fff;");
      this.new_Component(baseView_whitebullectDialog)
    },
  
    mounted() {},
  };
  </script>
  
  