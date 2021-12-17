<script>
//******************************************************************************//
//  This file is created by Jiayu Yang 2020.12.09                               //
//  baseCpn Mail                                                                //
//******************************************************************************//
</script>

<template>
  <div>
    <!-- <el-button icon="el-icon-search" size="mini"></el-button> -->
    <el-table
    :data="tableData"
    @row-click="personListClick"
    @selection-change="handleSelectionChange"
    border
    style="width: 100%">
      <el-table-column
        v-if="columsConfig.checkbox"
        type="selection"
        width="40">
      </el-table-column>

      <el-table-column v-for="(item, index) in tableColumns" :key="index" :prop="item.prop" :label="item.label" :width="item.width">

      </el-table-column>

      <el-table-column
        v-if="columsConfig.btnList"
        label="Opitions"
        width="120">
          <template slot="header">
            <el-button size="mini" @click="addNewInfo">add</el-button>
          </template>
          
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editRow(scope.$index, tableData)"
              type="text"
              size="small">
              edit
            </el-button>
            
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"
              type="text"
              size="small">
              remove
            </el-button>
          </template>
      </el-table-column>
    </el-table>



    <el-dialog
      :title="dialogTitle"
      :visible.sync="centerDialogVisible"
      :modal-append-to-body="false"
      :closeOnClickModal="false"
      width="30%"
      center>
      
      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="name" v-show="columsConfig.name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="role" v-show="columsConfig.role">
          <el-input v-model="form.role"></el-input>
        </el-form-item>
        <el-form-item label="group" v-show="columsConfig.group">
          <el-input v-model="form.group"></el-input>
        </el-form-item>
        <el-form-item label="email" v-show="columsConfig.email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">Cancel</el-button>
        <el-button type="primary" @click="closeDiaLog">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const __COLUMN_NAME_ = { 
  prop: 'name',
  label: 'name',
  width: '180'
};

const __COLUMN_ROLE_ = {
  prop: 'role',
  label: 'role',
  width: '180'
};

const __COLUMN_GROUP_ = {
  prop: 'group',
  label: 'group',
  width: '180'
};

const __COLUMN_EMAIL_ = {
  prop: 'email',
  label: 'email',
  width: '180'
}
;
import commonView_Component from '@/Projects/Frameworks/Views/Common/commonView_Component_';

export default {
  extends: commonView_Component,

  data() {
    return {
      tableColumns: [],

      tableData: [],

      tableSelections: null,

      centerDialogVisible: false,

      labelPosition: 'right',

      form: {
        name: '',

        role: '',

        group: '',

        email: ''
      },

      columsConfig: {
        name: false,

        role: false,

        group: false,

        email: false,

        checkbox: false,

        btnList: false
      },

      editorMutex: false,
      editSelectedRow: null,

      dialogTitle: 'Prompt'
    }
  },

  methods: {
    personListClick() {
      
    },

    handleSelectionChange(selection) {
      this.tableSelections = selection;
    },

    setColumns(paramConfig) {
      if (!paramConfig || typeof paramConfig != 'object') return;

      let tableColumns = []
      if (paramConfig.name) {
        this.columsConfig.name = true;
        tableColumns.push(__COLUMN_NAME_);
      }
      if (paramConfig.role) {
        this.columsConfig.role = true;
        tableColumns.push(__COLUMN_ROLE_);
      }
      if (paramConfig.group) {
        this.columsConfig.group = true;
        tableColumns.push(__COLUMN_GROUP_);
      }
      if (paramConfig.email) {
        this.columsConfig.email = true;
        tableColumns.push(__COLUMN_EMAIL_);
      }
      if (paramConfig.checkbox) {
        this.columsConfig.checkbox = true;
      }
      if (paramConfig.btnList) {
        this.columsConfig.btnList = true;
      }


      if (tableColumns.length > 0) {
        this.tableColumns = tableColumns;
      }
    },

    deleteRow(paramIndex, paramTableData) {
      event.stopPropagation();

      this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: 'Delete completed!'
        });

        this.tableData = this.tableData.filter((elem, index) => {
          if (index === paramIndex) {
            return false;
          } else {
            return true;
          }
        });
      })
    },

    editRow(paramIndex, paramTableData) {
      this.dialogTitle = 'edit'

      const tempData = paramTableData[paramIndex];
      this.editSelectedRow = paramIndex;

      this.form.name = tempData.name;
      this.form.role = tempData.role;
      this.form.group = tempData.group;
      this.form.email = tempData.email;

      this.editorMutex = true;
      this.centerDialogVisible = true;
    },

    addNewInfo() {
      this.dialogTitle = 'add'
      this.centerDialogVisible = true;
    },

    insertRow(paramData) {
      if (Array.isArray(this.tableData)) {
        this.tableData.push({
          name: this.form.name,
          role: this.form.role,
          group: this.form.group,
          email: this.form.email
        });
      }
    },

    closeDiaLog() {
      this.centerDialogVisible = false;

      if (this.editorMutex) {
        this.$set(this.tableData, this.editSelectedRow, {
          name: this.form.name,
          role: this.form.role,
          group: this.form.group,
          email: this.form.email
        })

        this.editorMutex = false;
        this.editSelectedRow = null;
        this.form.name = '';
        this.form.role = '';
        this.form.group = '';
        this.form.email = '';
      } else {
        this.insertRow(this.form);
        this.form.name = '';
        this.form.role = '';
        this.form.group = '';
        this.form.email = '';
      }
    },

    cancelDialog() {
      this.centerDialogVisible = false;
      this.form.name = '';
      this.form.role = '';
      this.form.group = '';
      this.form.email = '';
    }
  },

  created() {

  },

  mounted() {
    
  }
}
</script>

<style scoped>

</style>