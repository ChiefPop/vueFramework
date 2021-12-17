//******************************************************************************//
//  This file is created by jyyang 2021.06.22                                   //
//  the task object                                                             //
//******************************************************************************//

class common_task {
  constructor(paramTask) {
    paramTask = paramTask || {};

    this.taskID = paramTask.taskID || null;
    this.taskName = paramTask.taskName || null; 
    this.taskDescription = paramTask.taskDescription || null;
    this.taskComment = paramTask.taskComment || null;
    this.taskState = paramTask.taskState || null;
    this.task_startDate = paramTask.task_startDate || null;
    this.task_endDate = paramTask.task_endDate || null;
    this.taskLevel = paramTask.taskLevel || null;
    this.task_messageList = paramTask.task_messageList || [];

    this.taskStep = paramTask.taskStep || [];
    this.taskType = paramTask.taskType || [];
    this.dispatchObject = param.dispatchObject || [];
    this.targetObject = paramTask.targetObject || [];

    this.task_caseAssign = paramTask.task_caseAssign || null;
    this.task_linkAssign = paramTask.task_linkAssign || null;
    this.task_userAssign = paramTask.task_userAssign || null;

    this.taskPermission = paramTask.Permission || [];
  }

  static sortTaskByLevel(paramTaskList) {
    if (Array.isArray(paramTaskList)) {
      const tempTaskList = paramTaskList.filter(item => item instanceof common_task);
      tempTaskList.sort((a, b) => b.taskLevel - a.taskLevel);
      return tempTaskList;
    }

    return [];
  }

  complete() {
    this.taskState = 'compelte';
  }
}