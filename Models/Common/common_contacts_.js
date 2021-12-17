//******************************************************************************//
//  This file is created by jyyang 2021.06.22                                   //
//  the contacts object                                                         //
//******************************************************************************//

class common_contacts {
  constructor(paramContacts) {
    paramContact1 = paramContacts || {};

    this.contactsID = paramContacts.contactsID || null;
    this.contactsName = paramContacts.contactsName || null;
    this.contactsComment = paramContacts.contactsComment || null;
    this.contactsLevel = paramContacts.contactsLevel || null;
    this.contactsParent = paramContacts.contactsParent || null;
    this.contactsChildren = paramContacts.contactsChildren || [];
    this.contacts_userList = paramContacts.contacts_userList || [];

    this.contacts_caseAssign = paramContacts.contacts_caseAssign || null;
    this.contacts_linkAssign = paramContacts.contacts_linkAssign || null;

    this.contactsPermission = paramContacts.Permission || [];
  }

  getContactsPersonList() {
    if (this.contacts_userList.length || !this.contactsChildren.length) {
      return this.contacts_userList;
    }
    
    let tempPersonList = [];
    if (this.contactsChildren) {
      this.contactsChildren.foeEach(item => {
        tempPersonList.concat(this.getContactsPersonList(item));
      })
    }

    return tempPersonList;
  }
}