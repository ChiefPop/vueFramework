<template >
  <div></div>
</template>

<script>
const __className__ = "baseCpn_IM";
const _index_Chats_ = 0;
const _index_signleChat_ = 1;
const _index_signleChat_more_ = 2;
const _index_groupChat_ = 3;
const _index_groupChat_more_ = 4;
const _index_personDetails_ = 5;

import commonView_Component from "@/Projects/Frameworks/Views/Common/commonView_Component_";
import baseCpn_chatInterface from "@/Projects/Frameworks/Views/Base/zyyan/Components/IM/baseCpn_chatInterface_";
import baseCpn_signleChat from "@/Projects/Frameworks/Views/Base/zyyan/Components/IM/baseCpn_signleChat_";
import baseCpn_singleMore from "@/Projects/Frameworks/Views/Base/zyyan/Components/IM/baseCpn_singleMore_";
import baseCpn_groupChat from "@/Projects/Frameworks/Views/Base/zyyan/Components/IM/baseCpn_groupChat_";
import baseCpn_groupMore from "@/Projects/Frameworks/Views/Base/zyyan/Components/IM/baseCpn_groupMore_";
import baseCpn_personDetails from "@/Projects/Frameworks/Views/Base/zyyan/Components/IM/baseCpn_personDetails_";

export default {
  name: __className__,
  className: __className__,
  extends: commonView_Component,
  components: {
    baseCpn_chatInterface,
    baseCpn_signleChat,
    baseCpn_singleMore,
    baseCpn_groupChat,
    baseCpn_groupMore,
    baseCpn_personDetails,
  
  },
  data() {
    return {
      instance_Chats: null,
      instance_signleChat: null,
      instance_signleChat_more: null,
      instance_groupChat: null,
      instance_groupChat_more: null,
      instance_personDetails: null,
      
    };
  },
  props:{
    Chats: {
      default:100,
    },
    signleChat:{
       default:200,
    },
     signleChat_more:{
       default:200,
    },
     groupChat:{
       default:200,
    },
     groupChat_more:{
       default:200,
    },
     personDetails:{
       default:200,
    },
 

  },

 watch: {
    Chats(){
      if(this.Chats!=false){
        this.instance_Chats.$el.style.display= 'none'
      }
    },
    signleChat() {
      if(this.signleChat!=false){
        this.instance_signleChat.$el.style.display= 'none'
      }
    },
    signleChat_more(){
      if(this.signleChat_more!=false){
        this.instance_signleChat_more.$el.style.display= 'none'
      }
    },
    groupChat(){
       if(this.groupChat!=false){
        this.instance_groupChat.$el.style.display= 'none'
      }
    },
    groupChat_more(){
      if(this.groupChat_more!=false){
        this.instance_groupChat_more.$el.style.display= 'none'
      }
    },
    personDetails(){
      if(this.personDetails!=false){
        this.instance_personDetails.$el.style.display= 'none'
      }
    }
  },
  
  
  methods: {

    auto_reSize: function (paramOptions) {
      if (!paramOptions) return;

      paramOptions.container_clientLeft = 0;
      paramOptions.container_clientTop = 0;

      this.Width = "%W%*0.8";
      this.Height = "%H%*0.9";
      this.Left = "%W%*0.1";
      this.Top = "%H%*0.02";
    },

    hide_all_subComponents(paramIndex) {
      if (!this.subComponents) return;
      var i;

      for (i = 0; i < this.subComponents.length; i++) {
        if (paramIndex == i) continue;
      
          // this.subComponents[i].$el.style.display = "none"; //yanyanyan
       

        //show this.subComponents[i]
      }
    },
    show_Chats() {},
    show_signleChat() {},
    show_signleChat_more() {
      alert("222");
    },
    show_groupChat() {},
    show_groupChat_more() {
      alert("444");
    },
    show_personDetails() {
      alert("555");
    },

    launch_Chats() {
      this.show_Chats();
      this.hide_all_subComponents(_index_Chats_);
    },
    launch_signleChat() {
      this.show_signleChat();
      this.hide_all_subComponents(_index_signleChat_);
    },
    launch_signleChat_more() {
      this.show_signleChat_more();
      this.hide_all_subComponents(_index_signleChat_more_);
    },
    launch_groupChat() {
      this.show_groupChat();
      this.hide_all_subComponents(_index_groupChat_);
    },
    launch_groupChat_more() {
      this.show_groupChat_more();
      this.hide_all_subComponents(_index_groupChat_more_);
    },
    launch_personDetails() {
      this.show_personDetails();
      this.hide_all_subComponents(_index_personDetails_);
    },
   
   chatlist(){
      if(i==0){

     
      this.subComponents[0].$el.style.display = "block"; //yanyanyan
       }
   }
    

  },

  created: function () {
    this.positionState = "absolute";
   
    this.instance_Chats = this.new_Component(baseCpn_chatInterface);
    this.instance_signleChat = this.new_Component(baseCpn_signleChat);
    this.instance_signleChat_more = this.new_Component(baseCpn_singleMore);
    this.instance_groupChat = this.new_Component(baseCpn_groupChat);
    this.instance_groupChat_more = this.new_Component(baseCpn_groupMore);
    this.instance_personDetails = this.new_Component(baseCpn_personDetails);
    
  },
  mounted() {
    this.instance_Chats.$el.addEventListener("click", this.launch_Chats);
    this.instance_signleChat.$el.addEventListener("click",this.launch_signleChat);
    this.instance_signleChat_more.$el.addEventListener("click", this.launch_signleChat_more);
    this.instance_groupChat.$el.addEventListener("click", this.launch_groupChat);
    this.instance_groupChat_more.$el.addEventListener("click", this.launch_groupChat_more);
    this.instance_personDetails.$el.addEventListener("click", this.launch_personDetails);

    
    this.on_event("chatlist",this.chatlist,this);
   
  },
};
</script>

<style>
.baseCpn_IM {
  background-color: red;
}
</style>
