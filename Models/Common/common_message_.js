//******************************************************************************//
//  This file is created by jyyang 2021.06.22                                   //
//  the message object                                                          //
//******************************************************************************//

class common_message {
  constructor(paramMessage) {
    paramMessage = paramMessage || {};

    this.messageID = paramMessage.messageID || null;
    this.messageName = paramMessage.messageName || null;
    this.messageText = paramMessage.messageText || null;
    this.messageComment = paramMessage.messageComment || null;
    this.messageLevel = paramMessage.messageLevel || null;
    this.messageTimestamp = paramMessage.messageTimestamp || null;
    this.message_createdDate = paramMessage.message_createdDate || null;

    this.message_caseAssign = paramMessage.message_caseAssign || null;
    this.message_linkAssign = paramMessage.message_linkAssign || null;
    this.message_userAssign = paramMessage.message_userAssign || null;
    this.message_taskAssign = paramMessage.message_taskAssign || null;

    this.messagePermission = paramMessage.Permission || null;
  }

  static getNewMessageInfo(paramMessageList, param_lastMessage_readedDate) {
    let tempNewMessageNumber = 0;
    const tempNewMessageList = [];

    if (Array.isArray(paramMessageList)) {
      const tempMessageList = paramMessageList.filter(item => item);
      tempMessageList.sort((a, b) => b.messageTimestamp - a.messageTimestamp);
      for (let item of tempMessageList) {
        if (item.message_createdDate > param_lastMessage_readedDate) {
          tempNewMessageList.push(item);
          tempNewMessageNumber++;
        } else {
          break;
        }
      }
    }

    return { newMessageList: tempNewMessageList, newMessageNumber: tempNewMessageNumber };
  }

  static getMessageByLevel(paramMessageList, paramLevel) {
    if (Array.isArray(paramMessageList)) {
      const tempMessageList = paramMessageList.filter(item => item.messageLevel > paramLevel);
      return tempMessageList;
    }

    return [];
  }

  static sortMessageByLevel(paramMessageList) {
    if (Array.isArray(paramMessageList)) {
      const tempMessageList = paramMessageList.filter(item => item instanceof common_message);
      tempMessageList.sort((a, b) => b.messageTimestamp - a.messageTimestamp);
      return tempMessageList;
    }

    return [];
  }
}