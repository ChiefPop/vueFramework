//******************************************************************************//
//  This file is created by jyyang 2021.06.22                                   //
//  the meeting object                                                          //
//******************************************************************************//

class common_meeting {
  constructor(paramMeeting) {
    paramMeeting = paramMeeting || {};

    this.meetingID = paramMeeting.meetingID || null;
    this.meetingName = paramMeeting.meetingName || null;
    this.meetingComment = paramMeeting.meetingComment || null;
    this.meetingState = paramMeeting.meetingState || null;
    this.meetingManager = paramMeeting.meetingManager || [];
    this.meetingMember = paramMeeting.meetingMember || [];
    this.meeting_muteList = paramMeeting.meeting_muteList || [];

    this.meeting_muteList = paramMeeting.meeting_muteList || [];

    this.meetingPermission = paramMeeting.meetingPermission || [];
  }

  addMemberToMeeting(meetingMember) {
    if (Array.isArray(meetingMember)) {
      for (let item of meetingMember) {
        this.meetingMember.push(item);
      }
    }
  }

  removeMemberFromMeeting(paramMember) {
    if (Array.isArray(paramMember)) {
      paramMember.forEach(item => {
        this.meetingMember.filter(mem => {
          mem.id != item;
        })
      })
    }
  }

  muteMember(paramMemberList) {
    if (Array.isArray(paramMemberList)) {
      paramMemberList.forEach(item => {
        this.meeting_muteList.push(item);
      })
    }
  }

  unmuteMember(paramMemberList) {
    if (Array.isArray(paramMemberList)) {
      paramMemberList.forEach(item => {
        this.meeting_muteList.filter(member => member.id != item);
      })
    }
  }

  muteAllMember() {
    this.meeting_muteList = this.meetingMember;
  }
}