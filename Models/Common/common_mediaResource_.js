//******************************************************************************//
//  This file is created by jyyang 2021.06.22                                   //
//  the media resource object                                                   //
//******************************************************************************//

const attachmentsToMediaResourceHash = new Map([
  ['attachmentID', 'mediaResource_ID'],
  ['attachmentName', 'mediaResource_Name'],
  ['attachmentSize', 'mediaResource_Size'],
  ['attachmentType', 'mediaResource_Type'],
  ['attachmentComment', 'mediaResource_Comment'],
  ['attachmentData', 'mediaResource_Data'],
  ['attachmentMD5', 'mediaResource_MD5'],
  ['attachmentURL', 'mediaResource_URL'],
  ['lastModified', 'mediaResource_lastModified'],
  ['lastModifiedDate', 'mediaResource_lastModifiedDate'],
  ['caseAssign', 'mediaResource_caseAssign'],
  ['linkAssign', 'mediaResource_linkAssign'],
  ['userAssign', 'mediaResource_userAssign'],
  ['parentAssign', 'mediaResource_parentAssign']
]);

const mediaResourceHashToattachments = new Map([
  ['mediaResource_ID', 'attachmentID'],
  ['mediaResource_Name', 'attachmentName'],
  ['mediaResource_Size', 'attachmentSize'],
  ['mediaResource_Type', 'attachmentType'],
  ['mediaResource_Comment', 'attachmentComment'],
  ['mediaResource_Data', 'attachmentData'],
  ['mediaResource_MD5', 'attachmentMD5'],
  ['mediaResource_URL', 'attachmentURL'],
  ['mediaResource_lastModified', 'lastModified'],
  ['mediaResource_lastModifiedDate', 'lastModifiedDate'],
  ['mediaResource_caseAssign', 'caseAssign'],
  ['mediaResource_linkAssign', 'linkAssign'],
  ['mediaResource_userAssign', 'userAssign'],
  ['mediaResource_parentAssign', 'parentAssign']
]);

function formatAttachmentToMediaResource(paramAttachment) {
  const tempMediaResource = {};

  Object.keys(paramAttachment).forEach(key => {
    tempMediaResource[attachmentsToMediaResourceHash.get(key)] = paramAttachment[key];
  });

  return tempMediaResource;
}

class common_mediaResource {
  constructor(paramMediaResource) {
    paramMediaResource = paramMediaResource || {};

    this.mediaResource_ID = paramMediaResource.mediaResource_ID || null;
    this.mediaResource_Name = paramMediaResource.mediaResource_Name || null;
    this.mediaResource_Size = paramMediaResource.mediaResource_Size || null;
    this.mediaResource_Type = paramMediaResource.mediaResource_Type || null;
    this.mediaResource_Comment = paramMediaResource.mediaResource_Comment || null;
    this.mediaResource_Data = paramMediaResource.mediaResource_Data || null;
    this.mediaResource_MD5 = paramMediaResource.mediaResource_MD5 || null;
    this.mediaResource_URL = paramMediaResource.mediaResource_URL || null;
    this.mediaResource_lastModified = paramMediaResource.lastModified || null;
    this.mediaResource_lastModifiedDate = paramMediaResource.mediaResource_lastModifiedDate || null;

    this.mediaResource_caseAssign = paramMediaResource.mediaResource_caseAssign || null;
    this.mediaResource_linkAssign = paramMediaResource.mediaResource_linkAssign || null;
    this.mediaResource_userAssign = paramMediaResource.mediaResource_userAssign || null;
    this.mediaResource_parentAssign = paramMediaResource.mediaResource_parentAssign || null;

    this.mediaResource_Permission = paramMediaResource.mediaResource_Permission || [];

    this.changedItem = [];
  }

  static generateMediaResourceListByAttachments(paramAttachments) {
    let tempMediaResourceList = [];
    
    if (Array.isArray(paramAttachments)) {
      paramAttachments.forEach(item => {
        const tempMediaResource = formatAttachmentToMediaResource(item);
        tempMediaResourceList.push(new common_mediaResource(tempMediaResource));
      });
    } else {
      console.error('attachments must be an array');
    }

    return tempMediaResourceList;
  }

  getMediaResourceUrl() {
    if (this.mediaResource_URL) return this.mediaResource_URL;

    if (this.mediaResource_Data) {
      let tempMeidaUrl = URL.createObjectURL(this.mediaResource_Data);
      return tempMeidaUrl;
    }

    console.error('media rousource data is null');
    return null;
  }

  formatToAttachment() {
    const tempAttachment = {};
    const tempKey = 0;
    const tempValue = 1;

    for (let item of attachmentsToMediaResourceHash) {
      tempAttachment[item[tempKey]] = this[item[tempValue]];
    }

    return tempAttachment;
  }

  getUpdatedAttachment() {
    let tempAttachement = {};
    tempAttachement.attachmentID = this.mediaResource_ID;

    this.changedItem.forEach(item => {
      tempAttachement[item] = this[mediaResourceHashToattachments.get(item)];
    });

    return tempAttachement;
  }

  updateMediaResourceAttr(paramAttrs) {
    Object.keys(paramAttrs).forEach(key => {
      if (this[key] != undefined) {
        this[key] = paramAttrs[key];
        this.changedItem.push(key);
      }
    })
  }
}