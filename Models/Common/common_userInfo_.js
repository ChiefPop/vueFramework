//******************************************************************************//
//  This file is created by jyyang 2021.06.22                                   //
//  the user info object                                                        //
//******************************************************************************//

class common_userInfo {
  constructor(paramUserInfo) {
    paramUserInfo = paramUserInfo || {};

    this.userID = paramUserInfo.userID || null;
    this.userName = paramUserInfo.userName || null;
    this.userPassword = paramUserInfo.userPassword || null;
    this.user_nickName = paramUserInfo.user_nickName || null;
    this.userToken = paramUserInfo.userToken || null;
    this.userSession = paramUserInfo.userSession || null;
    this.userRoles = paramUserInfo.userRoles || {};

    // common_contacts 
    this.userGroups = paramUserInfo.userGroups || [];

    this.signAuto = paramUserInfo.signAuto || false;
    this.signConfig = paramUserInfo.signConfig || {};
    this.signConfig_needSave = paramUserInfo.signConfig_needSave || false;
    this.signed_In = paramUserInfo.signed_In || false;

    this.lastMessage_readedDate = paramUserInfo.lastMessage_readedDate || false;
  }
}