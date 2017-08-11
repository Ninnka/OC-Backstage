<template>
  <div class="user-audit">
    <user-audit-popup :showAudit.sync="showAuditPopup" :auditMes="userMes"></user-audit-popup>
    <article class="region">
      <header>
        用户审核
      </header>
      <div class="region-main">
        <el-form class="filter-input" :model="userAuditForm" label-width="100px">
          <el-form-item label="账号/昵称">
            <el-input v-model="userAuditForm.nickName" placeholder="请输入账号或者昵称"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="userAuditForm.realName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="userAuditForm.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model="userAuditForm.cardId" placeholder="请输入证件号码"></el-input>
          </el-form-item>
          <el-form-item label="邀请人">
            <el-input v-model="userAuditForm.invitingPeople" placeholder="请输入邀请人姓名"></el-input>
          </el-form-item>
          <el-form-item label="开户时间">
            <el-date-picker v-model="userAuditForm.timeRange" type="datetimerange" placeholder="请选择时间范围"></el-date-picker>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="userAuditForm.auditStatus" placeholder="请选择审核状态">
              <el-option  v-for="item in auditStatusList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="query-btn">
          <el-button type="info" @click="filterTable">查询</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="account" label="账号"></el-table-column>
          <el-table-column prop="nickName" label="昵称"></el-table-column>
          <el-table-column prop="realName" label="真实姓名"></el-table-column>
          <el-table-column label="证件">
            <template scope="scope">
              <p>{{scope.row.Documents.type}}</p>
              <p>{{scope.row.Documents.num}}</p>
            </template>
          </el-table-column>
          <el-table-column label="银行卡">
            <template scope="scope">
              <p>{{scope.row.banks.type}}</p>
              <p>{{scope.row.banks.num}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="requestTime"  label="申请时间" width="200"></el-table-column>
          <el-table-column prop="invitingPeople" label="邀请人"></el-table-column>
          <el-table-column label="审核状态">
            <template scope="scope">
              <span class="status">{{scope.row.auditStatus}}</span>
              <span class="status" v-if="scope.row.auditStatus==='待审'">{{scope.row.auditNum === 1?'首次申请':'再次申请'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="processTime"  label="处理时间" width="200"></el-table-column>
          <el-table-column label="操作" fixed="right">
            <template scope="scope">
              <el-button @click="viewUserMes(scope.row)" type="text" size="small">{{scope.row.auditStatus === '待审'?'审核':'查看'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <paging :sourceData="userAuditList" :displayData.sync="tableData"></paging>
      </div>
    </article>
  </div>
</template>

<script>
  import paging from '@comps/paging.vue';
  import UserAuditPopup from './user-audit-popup.vue';
  import userManageData from './user-manage-data-mixin';
  export default {
    name: 'UserAudit',
    mixins: [
      userManageData
    ],
    components: {
      paging,
      'user-audit-popup': UserAuditPopup
    },
    data () {
      return {
        showAuditPopup: false,
        userAuditForm: {
          nickName: '',
          realName: '',
          phone: '',
          cardId: '',
          invitingPeople: '',
          timeRange: '',
          auditStatus: ''
        },
        auditStatusList: [
          '全部',
          '待审',
          '已通过',
          '已驳回'
        ],
        tableData: [],
        userMes: {}
      };
    },
    computed: {
    },
    created: function () {
      for (let i = 0; i < 3; i++) {
        this.userAuditList.map((item) => {
          this.userAuditList.push(item);
        });
      }
      this.tableData = this.userList;
    },
    methods: {
      filterTable () {
        console.log(this.userAuditForm.timeRange);
      },
      viewUserMes (mes) {
        this.userMes = mes;
        this.showAuditPopup = true;
      },
      handleSizeChange (val) {
        console.log(val);
      },
      handleCurrentChange (val) {
        console.log(val);
      }
    }
  };
</script>

<style lang="less" scoped>
  .user-audit {
  }
</style>
