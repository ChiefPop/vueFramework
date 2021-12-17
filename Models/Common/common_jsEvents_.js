//**************************************************************************************************************************************************//
//  This file is created by Jiayu Yang 2020.11.24                                                                                                   //
//  Global event function                                                                                                                           //
//                                                                                                                                                  //
//  emit event:                                                                                                                                     //
//  this.emit_event(paramType, param),paramType: event name,param: the parameter need send                                                          //
//                                                                                                                                                  //
//  subscribe event:                                                                                                                                //
//  this.on_event(paramType, paramFunc, paramLocation),paramType: event name,paramFunc: callback,paramLoaction: (this)                              //
//                                                                                                                                                  //
//  unsubscribe event:                                                                                                                              //
//  this.off_event(paramType),paramType: event name                                                                                                 //
//**************************************************************************************************************************************************//

let temp_observed_ids = 0;
let temp_observer_ids = 0;

function common_Publish(paramDispatcher) {
  this.dispatcher = paramDispatcher;
  this.id = temp_observed_ids++;
}
common_Publish.prototype.publish = function(paramType, paramMessage) {
  this.dispatcher.publish(paramType, this, paramMessage);
}


function common_Subscriber(paramDispatcher) {
  this.dispatcher = paramDispatcher;
  this.id = temp_observer_ids++;
}
common_Subscriber.prototype.subscribe = function(paramType, paramFunc, paramLocation) {
  this.dispatcher.subscribe(paramType, paramFunc, paramLocation);
}


function common_Dispatcher() {
  this.dispatcher = {};
}

common_Dispatcher.prototype.subscribe = function(paramType, paramFunc, paramLocation) {
  if (!this.dispatcher[paramType]) {
    this.dispatcher[paramType] = [];
  }
  this.dispatcher[paramType].push({
    subscriber: paramLocation,
    func: paramFunc
  });
}

common_Dispatcher.prototype.unsubscribe = function(paramType) {
  this.dispatcher[paramType] = [];
}

common_Dispatcher.prototype.publish = function(type, args, message) {
  let subscribers = this.dispatcher[type];
  if (!subscribers || !subscribers.length) return;
  subscribers.forEach(subscriber => {
    subscriber.func.call(subscriber.subscriber, message)
  });
}


let tempDispatcher = new common_Dispatcher();
let pub = new common_Publish(tempDispatcher);

function $emit(paramType, param) {
  pub.publish(paramType, param);
}

function $on(paramType, func, paramLocation) {
  let sub = new common_Subscriber(tempDispatcher);
  sub.subscribe(paramType, func, paramLocation);
}

function $off(paramType) {
  tempDispatcher.unsubscribe(paramType);
}

export default { $emit, $on, $off }