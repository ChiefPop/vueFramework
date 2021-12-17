
<template>
    <div>
        <table
          width="100%"
          height="100%"
          style="border-collapse: collapse; margin: 0; padding: 0"
        >
          <tr>
            <td class="top-left-Pic"></td>
            <td class="border-top"></td>
            <td class="top-right-Pic"></td>
          </tr>
          <tr>
            <td class="border-left"></td>
            <td class="middle-part-Pic">
              <div></div>
            </td>
            <td class="border-right"></td>
          </tr>
          <tr>
            <td class="lower-left-Pic"></td>
            <td class="border-bottom"></td>
            <td class="lower-right-Pic"></td>
          </tr>
        </table>
    </div>
  </template>
  
  <script>
  const __className__ = "baseFrame_blueframeDialog";
  
  import $ from "jquery";
  import commonView_Frame from "@/Projects/Frameworks/Views/Common/commonView_Frame_";
  
  export default {
    name: __className__,
    className: __className__,
    extends: commonView_Frame,
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
    },
  
    created: function () {},
  
    mounted: function () {
    },
  };
  </script>
  <style scoped>
  .top-left-Pic {
    width: 28px;
    height: 28px;
    background: url("../../../Resources/pics/topleft.png") no-repeat right bottom;
  }
  .top-right-Pic {
    width: 28px;
    height: 28px;
    background: url("../../../Resources/pics/righttop.png") no-repeat bottom left;
  }
  .lower-left-Pic {
    width: 28px;
    height: 28px;
    background: url("../../../Resources/pics/bottomleft.png") no-repeat right top;
  }
  .lower-right-Pic {
    width: 28px;
    height: 28px;
    background: url("../../../Resources/pics/bottomright.png") no-repeat;
  }
  .middle-part-Pic {
    background: url("../../../Resources/pics/middle.png") 100% 100%;
  }
  .border-top {
    background: url("../../../Resources/pics/bordertop.png") repeat-x bottom;
  }
  .border-left {
    background: url("../../../Resources/pics/borderleft.png") repeat-y right;
  }
  
  .border-right {
    background: url("../../../Resources/pics/borderright.png") repeat-y left;
  }
  .border-bottom {
    background: url("../../../Resources/pics/borderbottom1.png") repeat-x;
  }
  </style>