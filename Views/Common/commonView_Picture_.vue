<script>
//******************************************************************************//
//  This file is created by Yusu Chen 2019.08.05                                //
//  common Picture such as JPEG, png...                                         //
//******************************************************************************//
</script>

<template></template>

<script>
import $ from 'jquery';
import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';
import { clearTimeout } from 'timers';

export default {
  name:'commonView_Picture',
  extends:commonView_Component,


  data(){
    return {
      loadTimer    :null
     ,resizeTimer  :null
     ,srcObject    :null
     ,pictureObject:null

     ,calc_verRatio:0.5          //vertical adaptation ratio of the center of gravity of the screen
     ,calc_horRatio:0.5          //horizontal adaptation ratio of the center of gravity of the screen
     ,autoFit      :false        //Automatic adaptation(the picture is not distorted)
     ,allInclude   :false        //when true, all pixels of the source image are included, and the insufficient areas are blank
     ,repair_count :0            //the count of fix IE get width and height
    }
  },
   
  components:{commonView_Component},
  methods:{
    set_onClick(paramClick){
      if (!paramClick) return;
      if (this.pictureObject) {
        this.pictureObject.onclick=paramClick;
        this.pictureObject.style.cursor='pointer';
      };  
      if (this.srcObject) {
        this.srcObject.onclick=paramClick;
        this.srcObject.style.cursor='pointer';
      };
    },

    do_Init(){
      if ( this.Inited) return;
      this.srcObject=this.srcObject||document.createElement('Img');
      this.srcObject.src   =this.dataSource_Url;
      this.srcObject.onload=this.proc_picLoad;
      if (!this.$displayInfo) return;
      if ((this.$displayInfo.display_supportCanvas)&&(this.autoFit)){
        this.pictureObject=this.pictureObject||document.createElement('canvas');
        this.pictureObject.style.width ='100%';
        this.pictureObject.style.height='100%';
        this.pictureObject.classList.add('commonView_Picture');
        this.$el.appendChild(this.pictureObject);
      }
      else{
        this.srcObject.style.width ='100%';
        this.srcObject.style.height='100%';
        this.$el.appendChild(this.srcObject);
      };
      this.Inited=true;
    },

    try_reloadPic(){
      if (!this.autoFit) return;
      if (!this.srcObject.complete) return;
      if ((this.do_reloadPic)&&(typeof this.do_reloadPic=='function')){
        this.do_reloadPic(); 
        return;
      }
      if (!this.Inited) return;
      if (!this.$displayInfo) return;
      if (!this.$displayInfo.display_supportCanvas) return;

      let tempLeft  =0;
      let tempTop   =0;
      let tempWidth =0;
      let tempHeight=0;

      let temp_newWidth =this.$el.scrollWidth ;
      let temp_newHeight=this.$el.scrollHeight;

      // add by jyyang 2021/05/21
      // fix parent-child component rendering order cause scrollWIdth and Height is 0 in IE
      if (temp_newWidth === 0 || temp_newHeight === 0) {
        if (this.repair_count > 10) {
          return;
        } else {
          this.repair_count++;
          setTimeout(() => {
            this.try_reloadPic();
          }, 0);
          return;
        }
      }
      this.repair_count = 0;
      // end

      if ((this.pictureObject.width==temp_newWidth)&&(this.pictureObject.height==temp_newHeight)) return;
      this.pictureObject.width =temp_newWidth;
      this.pictureObject.height=temp_newHeight;
      if (temp_newWidth <=0) return;
      if (temp_newHeight<=0) return;

      let temp_oldWidth =this.srcObject.width ;
      let temp_oldHeight=this.srcObject.height;
      if (temp_oldWidth <=0) return;
      if (temp_oldHeight<=0) return;

      let temp_newRatio=temp_newWidth/temp_newHeight;
      if (temp_newRatio==0) return;
      let temp_oldRatio=temp_oldWidth/temp_oldHeight;
      if (temp_oldRatio==0) return;

      if (!this.allInclude){
        if (temp_newRatio>=temp_oldRatio){
          tempWidth =temp_oldWidth;
          tempHeight=temp_oldWidth/temp_newRatio;
          tempLeft=0; 
          tempTop =(temp_oldHeight-tempHeight) *this.calc_verRatio;
        }
        else{
          tempHeight=temp_oldHeight;
          tempWidth =temp_oldHeight*temp_newRatio;
          tempTop =0;
          tempLeft=(temp_oldWidth-tempWidth) *this.calc_horRatio;
        }

        let tempContext=this.pictureObject.getContext('2d');
        tempContext.save();

        tempContext.drawImage(this.srcObject,tempLeft,tempTop,tempWidth,tempHeight,0,0,temp_newWidth,temp_newHeight);

        tempContext.restore();
      }
      else {
        if (temp_newRatio>=temp_oldRatio){
          tempTop   =0;
          tempHeight=temp_newHeight;
          tempWidth =temp_newHeight*temp_oldRatio;
          tempLeft  =(temp_newWidth-tempWidth)/2;
        }
        else{
          tempLeft  =0;
          tempWidth =temp_newWidth;
          tempHeight=temp_newWidth/temp_oldRatio;
          tempTop   =(temp_newHeight-tempHeight)/2;
        }
        
        let tempContext=this.pictureObject.getContext('2d');
        tempContext.save();
        tempContext.drawImage(this.srcObject,0,0,temp_oldWidth,temp_oldHeight,tempLeft,tempTop,tempWidth,tempHeight);

        tempContext.restore();
      }  

    },

    proc_picLoad() {
      if (this.loadTimer != null) clearTimeout(this.loadTimer);
      if (!this.srcObject.complete) { 
        this.loadTimer = setTimeout(this.proc_picLoad,100);
      } 
      else{
        this.try_reloadPic();
      } 
    },  

    do_reSize(){
      if (!this.autoFit) return;
      if (!this.srcObject) return;   
      if (!this.srcObject.complete) return;   
      if (!this.$displayInfo.display_supportCanvas) return;
      this.try_reloadPic();
      this.resizeTimer=setTimeout(this.try_reloadPic,500); 
    }
  },

  created:function(){
  },

  mounted:function(){
    this.do_Init();    
  },

  beforeDesotry:function(){
    if (this.loadTimer  ) clearTimeout(this.loadTimer  );
    if (this.resizeTimer) clearTimeout(this.resizeTimer);
  }
}

</script>