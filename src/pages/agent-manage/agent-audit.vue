<template>
  <div class="agent-audit">
    <agent-audit-popup :showAudit.sync="showAuditPopup" :auditMes="agentMes"></agent-audit-popup>
    <article class="region">
      <header>
        代理商审核
      </header>
      <div class="region-main">
        <el-form class="filter-input" :model="agentAuditForm" label-width="100px">
          <el-form-item label="账号/昵称">
            <el-input v-model="agentAuditForm.nickName" placeholder="请输入账号或者昵称"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="agentAuditForm.realName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="agentAuditForm.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model="agentAuditForm.cardId" placeholder="请输入证件号码"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="agentAuditForm.type" placeholder="请选择代理商类型">
              <el-option  v-for="item in agentTypeList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间">
            <el-date-picker v-model="agentAuditForm.timeRange" type="datetimerange" placeholder="请选择时间范围"></el-date-picker>
          </el-form-item>
          <el-form-item label="审核状态">
            <el-select v-model="agentAuditForm.auditStatus" placeholder="请选择审核状态">
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
          <el-table-column label="类型">
            <template scope="scope">
              <div class="table-type">{{scope.row.type}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="realName" label="名称"></el-table-column>
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
              <el-button @click="viewAgentMes(scope.row)" type="text" size="small">{{scope.row.auditStatus === '待审'?'审核':'查看'}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="nowPage"
          :page-sizes="[10, 15, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length">
        </el-pagination>
      </div>
    </article>
  </div>
</template>

<script>
  import AgentAuditPopup from './agent-audit-popup.vue';
  import agentManageData from './agent-manage-data-mixin';
  export default {
    name: 'UserAudit',
    components: {
      'agent-audit-popup': AgentAuditPopup
    },
    mixins: [
      agentManageData
    ],
    data () {
      return {
        agentAuditForm: {
          nickName: '',
          realName: '',
          type: '',
          phone: '',
          cardId: '',
          timeRange: '',
          auditStatus: ''
        },
        agentTypeList: [
          '个人',
          '公司'
        ],
        auditStatusList: [
          '全部',
          '待审',
          '已通过',
          '已驳回'
        ],
        tableData: [],
        nowPage: 1,
        agentMes: {},
        showAuditPopup: false
      };
    },
    computed: {
    },
    created: function () {
      for (let i = 0; i < 5; i++) {
        this.agentAuditList.map((item) => {
          this.tableData.push(item);
        });
      }
    },
    methods: {
      filterTable () {
        console.log(this.agentAuditForm.timeRange);
      },
      viewAgentMes (mes) {
        this.agentMes = mes;
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
