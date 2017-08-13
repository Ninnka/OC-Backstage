<template>
  <div class="dividend-manage">
    <!--dividend-manage-->
    <article class="region">
      <header>红利管理</header>
      <div class="region-main">
        <el-form class="filter-input" label-width="100px" :model="dividendManageForm">
          <el-form-item label="红利单号">
            <el-input placeholder="请输入佣金单号" v-model="dividendManageForm.dividendId"></el-input>
          </el-form-item>
          <el-form-item label="交易订单号">
            <el-input placeholder="请输入交易订单号" v-model="dividendManageForm.orderId"></el-input>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-date-picker v-model="dividendManageForm.timeRange" type="datetimerange" placeholder="请选择需要查询的时间范围"></el-date-picker>
          </el-form-item>
          <el-form-item label="红利状态">
            <el-select placeholder="请选择红利状态" v-model="dividendManageForm.status">
              <el-option v-for="item in getSuperiorList(tableData, 'status')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="红利代理商" >
            <el-input placeholder="请输入代理商名称" v-model="dividendManageForm.agents"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="dividendManageForm.aboutAgents">包含下级所有代理商</el-checkbox>
          </el-form-item>
        </el-form>
        <div class="query-btn">
          <el-button type="info" @click="">查询</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="user" label="交易用户"></el-table-column>
          <el-table-column prop="mtAccount" label="MT账号"></el-table-column>
          <el-table-column prop="orderNumber" label="交易订单号"></el-table-column>
          <el-table-column prop="agents" label="红利代理商"></el-table-column>
          <el-table-column prop="distribution" label="红利配置"></el-table-column>
          <el-table-column prop="profitOrLoss" label="红利盈亏"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
        </el-table>
        <paging :sourceData="dividendList" :displayData.sync="tableData"></paging>
      </div>
    </article>
  </div>
</template>

<script>
import paging from '@comps/paging.vue';
export default {
  name: 'DividendManage',
  components: {
    paging
  },
  data () {
    return {
      currentPage4: 2,
      dividendManageForm: {
        dividendId: '',
        orderId: '',
        timeRange: '',
        status: '',
        agents: '',
        aboutAgents: ''
      },
      tableData: [],
      dividendList: [
        {
          id: 'YJ000000001',
          user: 'dfhlsdaf',
          mtAccount: '54321',
          orderNumber: 'JY00000001',
          distribution: '20%',
          profitOrLoss: '$99.999.00',
          status: '已入账'
        },
        {
          id: 'YJ000000002',
          user: 'dfhlds',
          mtAccount: '54322',
          orderNumber: 'JY00000002',
          distribution: '20%',
          profitOrLoss: '$99.999.00',
          status: '未入账'
        }
      ]
    };
  },
  computed: {
  },
  created: function () {
    for (let i = 0; i < 5; i++) {
      this.dividendList.map((item) => {
        console.log(item);
        this.tableData.push(item);
      });
    }
    this.tableData = this.dividendList;
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
  .dividend-manage {
  }
</style>
