<script>
//******************************************************************************//
//  This file is created by Jiayu Yang 2020.11.23                               //
//  baseCpn Mail                                                                //
//******************************************************************************//
</script>

<template>
  <div>

  </div>
</template>

<script>
const __className__ = 'baseCpn_AddressBook';

import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

import base_addressBook from '@/Projects/Frameworks/Models/addressBook/base_addressBook_';
import baseAddressBook_personList from '@/Projects/Frameworks/Views/Base/AddressBook/baseAddressBook_personList_';
import baseAddressBook_groups from '@/Projects/Frameworks/Views/Base/AddressBook/baseAddressBook_groups_';
import { keys } from 'highcharts';

export default {
  extends: commonView_Component,

  className: __className__,

  mixins: [ base_addressBook ],

  data() {
    return {
      cpn_personList: null,
      cpn_groups: null,


      // cpn_personList
      event_personListClick: () => {
        
      },

      personTableColumns: [
        
      ],

      personTableData: [
        
      ],

      // cpn_groups
      groupsTreeData: [

      ]
    }
  },

  watch: {
    // cpn_personList
    event_personListClick(val) {
      this.cpn_personList.personListClick = val;
    },

    personTableData(val) {
      this.cpn_personList.tableData = this.personTableData;
    },

    personTableColumns(val) {
      this.cpn_personList.tableColumns = this.personTableColumns;

      if (Array.isArray(val)) {
        let form = {};

        val.forEach(item => {
          
        })
      }
    },

    // cpn_groups
    groupsTreeData(val) {
      this.cpn_groups.data = val;
    },
  },

  methods: {
    showPersonList() {
      this.cpn_personList.$el.classList.remove('addressBookHiddenBlock');
    },

    showGroups() {
      this.cpn_groups.$el.classList.remove('addressBookHiddenBlock');
    },

    hidePersonList() {
      this.cpn_personList.$el.classList.add('addressBookHiddenBlock');
    },

    hideGroups() {
      this.cpn_groups.$el.classList.add('addressBookHiddenBlock');
    },

    personListClick(row, column, event) {
      console.log(row);
    },

    setGroupsTreeData(paramData) {
      this.cpn_groups.setTree(paramData);
    },

    getPersonListSelections() {
      return this.cpn_personList.tableSelections;
    },

    setPersonListDelete(paramFunc) {
      if (typeof paramFunc != 'function') {
        return;
      }

      this.cpn_personList.deleteRow = paramFunc;
    },

    setPersonListEdit(paramFunc) {
      if (typeof paramFunc != 'function') {
        return;
      }

      this.cpn_personList.editRow = paramFunc;
    },

    setPersonColumns(paramConfig) {
      this.cpn_personList.setColumns(paramConfig);
    },


    deletePersonListRow(paramIndex) {
      const tableData = this.cpn_personList.tableData;

      if (Array.isArray(tableData)) {
        console.log(tableData);
        let arr =  tableData.filter((elem, index) => {
          if (index == paramIndex) {
            return false;
          } else {
            return true;
          }
        });

        this.cpn_personList.tableData = arr;
      }
    },


    addCpn_personList() {
      this.cpn_personList = this.new_subComponent(baseAddressBook_personList);
    },

    addCpn_groups() {
      this.cpn_groups = this.new_subComponent(baseAddressBook_groups);
    }
  },

  created() {
    // this.cpn_personList = this.new_subComponent(baseAddressBook_personList);
    // this.cpn_groups = this.new_subComponent(baseAddressBook_groups);
  },

  mounted() {
    this._signIn();
  }
}
</script>

<style>
.addressBookHiddenBlock {
  display: none;
}
</style>