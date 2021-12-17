<template>
    <div>
      <table
        width="100%"
        height="100%"
        style="border-collapse: collapse; margin: 0; padding: 0"
      >
        <tr>
          <td class="top-left-corner"></td>
          <td></td>
          <td class="top-right-corner"></td>
        </tr>
        <tr>
          <td></td>
          <td><div class="dialog"></div></td>
          <td></td>
        </tr>
        <tr>
          <td class="lower-left-corner"></td>
          <td></td>
          <td class="lower-right-corner"></td>
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  const __className__ = "baseFrame_whitearcDialog";
  import commonView_Frame from "@/Projects/Frameworks/Views/Common/commonView_Frame_";
  
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
          this.$el.children[0].style.width = paramWidth.toString() + "px";
          this.$el.children[0].style.height = paramHeight.toString() + "px";
          this.$el.children[0].style.left = paramLeft.toString() + "px";
          this.$el.children[0].style.top = paramTop.toString() + "px";
        }
  
      },
    },
  
    created() {
    },
  
    mounted() {},
  };
  </script>
  
  <style scoped>
  table {
    position: absolute;
    border-radius: 4px;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  
  .top-left-corner,
  .top-right-corner,
  .lower-left-corner,
  .lower-right-corner {
    width:5%;
    height: 10%;
  }
  </style>