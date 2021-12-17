import metro_networksInfo from '@/Projects/Frameworks/Models/Metro/metro_networksInfo_';

const components =[metro_networksInfo];
let install=function(Vue){
  if (typeof window !=='undefined' && window.Vue){
    install(window.Vue);
    return;
  }

  components.map(
    component=>{Vue.component(component.name,component);}
  );

  Vue.prototype.$networksInfo=Vue.prototype.$networksInfo || new Vue(metro_networksInfo);  
}

export default{install}


