<template lang="pug">
include baseView_uploadAvator_
</template>

<script>
import commonView_Component from "@/Projects/Frameworks/Views/Common/commonView_Component_";

export default {
  extends: commonView_Component,

  data() {
    return {
      radius: 200,

      uploadAvatorParam: {
        
      },

      url: null,
      
      srcList: [],

      imageStyle: {
        width: "100px",
        height: "100px",
      },

      defaultTextStyle: {
        width: "100%",
        height: "100%",
        fontSize: "12px",
        textAlign: "center",
      },

      textClass: "",

      accpetSuffix: ".jpg,.png,.gif",

      showColoseFullScreenDiv: false,

      
      /** @type {HTMLCanvasElement} */
      canvas: null,

      content: null,

      imageDOM: null,

      pointer: null,
    };
  },

  methods: {
    destoryAvatorResource() {
      this.canvas = null;
      this.content = null;
      this.imageDOM = null;
      this.pointer = null;
    },

    clickHandlerOfDefault() {
      let uploadFile = document.getElementById("uploadFile");
      let event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      uploadFile.dispatchEvent(event);
    },

    changeHandlerOfUploadFile() {
      let file = event.target.files[0];
      if (!file) {
        return;
      }

      let img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      let wrapper = document.createElement("div");
      wrapper.setAttribute("id", "wrapper");
      wrapper.classList.add("uploadAvatorCanvas");

      img.onload = () => {
        this.imageDOM = img;
        let canvas = document.createElement("canvas");
        // store canvas station
        this.canvas = canvas;
        this.drawCanvas(wrapper);

        document.addEventListener("mousedown", this.eventHanlderOfMouseDown, false);

        document.addEventListener("mouseup", this.eventHanlderOfMouseUp, false);
      };
    },

    drawCanvas(wrapper, pointer, cilpFlg) {
      let img = this.imageDOM;
      let canvas = this.canvas;

      const rate = img.width / img.height;
      if (img.height > document.documentElement.clientHeight) {
        img.height = document.documentElement.clientHeight;
        img.width = img.height * rate;
      }

      canvas.id = "avatorCanvas";
      canvas.height = document.documentElement.clientHeight;
      canvas.width = img.width > (this.radius * 2) ? img.width : (this.radius * 3);
      canvas.classList.add("avatorCanvs");

      if (!pointer) {
        let obj = {
          x: canvas.width / 2,
          y: canvas.height / 2
        }
        pointer = obj;
      }
      this.pointer = pointer;

      let content = this.content ? this.content : canvas.getContext("2d");
      // store content
      content.fillStyle = '#FFF';
      content.fillRect(0, 0, canvas.width, canvas.height);
      
      if (cilpFlg) {
        content.beginPath();
        content.arc(pointer.x, pointer.y, this.radius, 0, 2 * Math.PI);
        content.clip();
        content.closePath();
      }

      content.drawImage(
        img,
        0,
        canvas.height / 2 - img.height / 2,
        img.width,
        img.height
      );
      content.beginPath();
      content.arc(pointer.x, pointer.y, this.radius, 0, 2 * Math.PI);
      content.stroke();
      this.content = content;

      wrapper.appendChild(canvas);
      document.body.appendChild(wrapper);
      this.showColoseFullScreenDiv = true;
    },

    clickHandlerOfRemoveFullScreenDiv() {
      let wrapper = document.getElementById("wrapper");
      if (wrapper) {
        document.body.removeChild(wrapper);
        this.showColoseFullScreenDiv = false;
        this.canvas.removeEventListener('mousedown', this.eventHanlderOfMouseDown);
        this.canvas.removeEventListener('mouseup', this.eventHanlderOfMouseUp);
      }
      // remove document listener
      document.removeEventListener('mousedown', this.eventHanlderOfMouseDown);
      document.removeEventListener('mouseup', this.eventHanlderOfMouseUp);

      this.destoryAvatorResource();
    },

    getLocation(x, y) {
      if (!this.canvas) {
        return;
      }
      let canvas = this.canvas;
      let bbox = canvas.getBoundingClientRect();
      return {
        x: (x - bbox.left) * (canvas.width / bbox.width),
        y: (y - bbox.top) * (canvas.height / bbox.height),
      };
    },

    eventHanlderOfMouseDown() {
      this.canvas.addEventListener("mousemove", this.eventHanlderOfMouseMove, false);
    },

    eventHanlderOfMouseUp() {
      this.canvas.removeEventListener('mousemove', this.eventHanlderOfMouseMove, false);
    },

    eventHanlderOfMouseMove() {
      let pointer = this.getLocation(event.clientX, event.clientY);
      let wrapper = document.getElementById('wrapper');

      this.drawCanvas(wrapper, pointer);
    },

    clickHanderOfUploadAvator() {
      let wrapper = document.getElementById('wrapper');

      this.drawCanvas(wrapper, this.pointer, true);
      this.exportCanvasPNG();
    },

    exportCanvasPNG() {
      let img = this.imageDOM;
      let canvas = this.canvas;

      const rate = img.width / img.height;
      if (img.height > document.documentElement.clientHeight) {
        img.height = document.documentElement.clientHeight;
        img.width = img.height * rate;
      }

      canvas.id = "avatorCanvas";
      canvas.height = document.documentElement.clientHeight;
      canvas.width = img.width > (this.radius * 2) ? img.width : (this.radius * 3);
      canvas.classList.add("avatorCanvs");
      
      let content = this.content ? this.content : canvas.getContext("2d");
      content.fillStyle = '#FFF';
      content.fillRect(0, 0, canvas.width, canvas.height);

      content.drawImage(
        img,
        0,
        canvas.height / 2 - img.height / 2,
        img.width,
        img.height
      );



      let imageData = this.content.getImageData(this.pointer.x - this.radius, this.pointer.y - this.radius, (this.radius * 2), (this.radius * 2));
      let tempCanvas = document.createElement('canvas');
      tempCanvas.width = imageData.width;
      tempCanvas.height = imageData.height;
      let ctx = tempCanvas.getContext('2d');
      ctx.putImageData(imageData, 0, 0);

      
      let base64 = tempCanvas.toDataURL();

      let Attachments = [{
        attachmentID: this.get_randomID(),
        attachmentName: 'avatar',
        attachmentType: 'pic',
        attachmentData: base64,
      }];

      if (this.uploadAvatorParam) {
        for (let i in this.uploadAvatorParam) {
          Attachments[0][i] = this.uploadAvatorParam[i];
        }
      }

      this.submitAttachments(Attachments)
      .then((result) => {
        tempCanvas.toBlob((blob) => {
          let url = URL.createObjectURL(blob);
          this.url = url;
          this.srcList.push(url);
          this.clickHandlerOfRemoveFullScreenDiv();
        })
      })
      .catch((result) => {

      })

    },

    getAttachments(IDs) {
      return new Promise((resolve, reject) => {
        this.server_jsonFunction(
          0,
          {
            Function: 'get_Attachments',
            IDs: IDs
          },
          (result) => { if (result.responseJSON.Result) { resolve(result); } else { reject(result); } }
        )
      })
    },

    submitAttachments(Attachments) {
      return new Promise((reslove, reject) => {
        this.server_jsonFunction(
          0,
          {
            Function: 'submit_Attachments',
            Attachments: Attachments
          },
          (result) => { if (result.responseJSON.Result) { reslove(result); } else { reject(result); } }
        )
      })
    },

    deleteAttachments(IDs) {
      return new Promise((resolve, reject) => {
        this.server_jsonFunction(
          0,
          {
            Function: 'delete_Attachments',
            IDs: IDs
          },
          (result) => { if (result.responseJSON.Result) { resolve(result); } else { reject(result); } }
        )
      })
    }
  },

  created() {

  },

  mounted() {

  },
    

  beforeDestroy() {
    this.destoryAvatorResource();
  }
};
</script>

<style>
.image-slot {
  width: 100%;
  height: 100%;
}

.uploadAvatorCanvas {
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0px;
  left: 0px;
  background-color: rgba(80, 80, 80, 0.3);
  z-index: 999;
  display: flex;
  justify-content: center;
}

.avatorCanvs {
  opacity: 1;
}

.closeFullScreenDiv {
  font-size: 30px;
  position: fixed;
  top: 20px;
  right: 20px;
  color: black;
  z-index: 1000;
}

.uploadAvator {
  font-size: 30px;
  position: fixed;
  top: 20px;
  right: 60px;
  color: black;
  z-index: 1000;
}

.closeFullScreenDiv:hover {
  cursor: pointer;
}

.uploadAvator:hover {
  cursor: pointer;
}
</style>