<template>
  <div class="user-manage">
    <article class="region">
      <header>
        代理商管理
      </header>
      <div class="region-main">
        <el-form class="filter-input" :model="agentManageForm" label-width="100px">
          <el-form-item label="账号/昵称">
            <el-input v-model="agentManageForm.nickName" placeholder="请输入账号或者昵称"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="agentManageForm.realName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="agentManageForm.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model="agentManageForm.cardId" placeholder="请输入证件号码"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="agentManageForm.type" placeholder="请选择代理商类型">
              <el-option  v-for="item in agentTypeList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="红利类型">
            <el-select v-model="agentManageForm.dividendType" placeholder="请选择代理商类型">
              <el-option  v-for="item in dividendTypeList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属代理">
            <el-select v-model="agentManageForm.superior" placeholder="请选择所属代理">
              <el-option  v-for="item in getSuperiorList(tableData, 'superior')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="agentManageForm.aboutIndirect">包含间接交易商</el-checkbox>
          </el-form-item>
        </el-form>
        <div class="query-btns">
          <el-button type="info" @click="filterTable">查询</el-button>
          <list-options :sourceList="labelList" :displayList.sync="showLabelList"></list-options>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="account" label="账号"></el-table-column>
          <el-table-column prop="nickName" label="昵称"></el-table-column>
          <el-table-column prop="superior" label="所属上级"></el-table-column>
          <el-table-column label="类型">
            <template scope="scope">
              <div class="table-type">{{scope.row.type}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="realName" label="名称"></el-table-column>
          <el-table-column prop="phone" label="联系方式"></el-table-column>
          <el-table-column prop="balance" label="余额"></el-table-column>
          <el-table-column prop="commissionDeploy" label="佣金配置"></el-table-column>
          <el-table-column label="红利配置">
            <template scope="scope">
              {{scope.row.dividendDeploy}}
            </template>
          </el-table-column>
          <el-table-column label="账号状态">
            <template scope="scope">
              <el-switch v-model="scope.row.accountStatus" on-text="" off-text="" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="出金权限">
            <template scope="scope">
              <el-switch v-model="scope.row.mentionPermission" on-text="" off-text="" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="邀请代理">
            <template scope="scope">
              <el-switch v-model="scope.row.invitationAgent" on-text="" off-text="" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="推广交易商">
            <template scope="scope">
              <el-switch v-model="scope.row.promotStatus" on-text="" off-text="" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template scope="scope">
              <el-button @click="viewAgentMes(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <paging :sourceData="agentList" :displayData.sync="tableData"></paging>
      </div>
    </article>
  </div>
</template>

<script>
import paging from '@comps/paging.vue';
import listOptions from '@comps/list-options.vue';
import AgentManageData from './agent-manage-data-mixin';
export default {
  name: 'AgentManage',
  components: {
    paging,
    'list-options': listOptions
  },
  mixins: [
    AgentManageData
  ],
  data () {
    return {
      agentManageForm: {
        nickName: '',
        realName: '',
        phone: '',
        cardId: '',
        type: '',
        dividendType: '',
        superior: '',
        aboutIndirect: ''
      },
      agentTypeList: [
        '个人',
        '公司'
      ],
      dividendTypeList: [
        '全部',
        '已开启',
        '未开启'
      ],
      tableData: [],
      labelList: [
        {
          label: '日期',
          key: 'date',
          canSelect: false,
          show: true
        },
        {
          label: '姓名',
          key: 'name',
          canSelect: false,
          show: true
        },
        {
          label: '地址',
          key: 'address',
          canSelect: true,
          show: true
        },
        {
          label: '数值',
          key: 'num',
          canSelect: true,
          show: true
        }
      ],
      showLabelList: []
    };
  },
  computed: {
  },
  created: function () {
    this.agentList.forEach((item) => {
      item.bankList.forEach((userbank) => {
        this.CommonApi.bankList.map((bank) => {
          if (userbank.bankCode === bank.bankCode) {
            userbank.bankMes = bank;
          }
        });
      });
      return item;
    });
    for (let i = 0; i < 3; i++) {
      this.agentList.map((item) => {
        this.agentList.push(item);
      });
    }
    this.tableData = this.agentList;
  },
  methods: {
    filterTable () {},
    viewAgentMes (mes) {
      this.$store.commit('AgentManage/update_AgentMes', mes);
      this.$router.push('agent-information');
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
  .agent-manage {
  }
</style>
