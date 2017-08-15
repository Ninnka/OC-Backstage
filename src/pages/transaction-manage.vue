<template>
  <div class="transaction-manage">
    <!--transaction-manage-->
    <article class="region">
      <header>交易管理</header>
      <div class="region-main">
        <el-form class="filter-input" label-width="100px" :model="transactionManageForm">
          <el-form-item label="账号/昵称">
            <el-input placeholder="请输入账号或者昵称" v-model="transactionManageForm.userId"></el-input>
          </el-form-item>
          <el-form-item label="交易订单号">
            <el-input placeholder="请输入交易订单号" v-model="transactionManageForm.orderId"></el-input>
          </el-form-item>
          <el-form-item label="MT账号">
            <el-input placeholder="请输入MT账号" v-model="transactionManageForm.mtAccount"></el-input>
          </el-form-item>
          <el-form-item label="交易类型">
            <el-select v-model="transactionManageForm.transactionType">
              <el-option v-for="item in getSuperiorList(tableData, 'transactionType')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易种类">
            <el-select v-model="transactionManageForm.variety">
              <el-option v-for="item in getSuperiorList(tableData, 'variety')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单类型">
            <el-select v-model="transactionManageForm.orderType">
              <el-option v-for="item in getSuperiorList(tableData, 'orderType')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开仓时间">
            <el-date-picker v-model="transactionManageForm.openTime" type="datetimerange"></el-date-picker>
          </el-form-item>
          <el-form-item label="平仓时间">
            <el-date-picker v-model="transactionManageForm.closeTime" type="datetimerange"></el-date-picker>
          </el-form-item>
        </el-form>
        <div class="query-btns">
          <el-button type="info" @click="filterTable">查询</el-button>
          <list-options :sourceList="labelList" :displayList.sync="showLabelList"></list-options>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="账号"></el-table-column>
          <el-table-column prop="name" label="昵称"></el-table-column>
          <el-table-column prop="orderNumber" label="交易订单号"></el-table-column>
          <el-table-column prop="mtAccount" label="交易MT账号"></el-table-column>
          <el-table-column prop="type" label="交易类型"></el-table-column>
          <el-table-column prop="variety" label="交易品种"></el-table-column>
          <el-table-column prop="openPrice" label="开仓手数/价格"></el-table-column>
          <el-table-column prop="openTime" label="开仓时间"></el-table-column>
          <el-table-column prop="securityDeposit" label="保证金"></el-table-column>
          <el-table-column prop="closePrice" label="平仓价格"></el-table-column>
          <el-table-column prop="closeTime" label="平仓时间"></el-table-column>
          <el-table-column prop="interest" label="利息"></el-table-column>
          <el-table-column prop="fee" label="手续费"></el-table-column>
          <el-table-column prop="profitOrLoss" label="盈亏"></el-table-column>
        </el-table>
        <paging :sourceData="transactionList" :displayData.sync="tableData"></paging>
      </div>
    </article>
  </div>
</template>

<script>
import paging from '@comps/paging.vue';
import listOptions from '@comps/list-options.vue';
export default {
  name: 'TransactionManage',
  components: {
    paging,
    'list-options': listOptions
  },
  data () {
    return {
      transactionManageForm: {
        userId: '',
        orderId: '',
        mtAccount: '',
        transactionType: '',
        variety: '',
        orderType: '',
        openTime: '',
        closeTime: ''
      },
      tableData: [],
      transactionList: [
        {
          id: 123456,
          name: '金克丝',
          orderNumber: 'JY00000001',
          mtAccount: '98683430',
          type: '买单',
          variety: 'EURUSD',
          openPrice: '4/1.16607',
          openTime: '2017-07-27 12:06:19',
          securityDeposit: '$20',
          closePrice: '未平仓',
          closeTime: '持仓中',
          interest: '$20',
          fee: '-$80',
          profitOrLoss: '未平仓'
        },
        {
          id: 123123,
          name: '拉克丝',
          orderNumber: 'JY00000002',
          mtAccount: '98683430',
          type: '买单',
          variety: 'EURUSD',
          openPrice: '4/1.16607',
          openTime: '2017-07-27 12:06:19',
          securityDeposit: '$20',
          closePrice: '未平仓',
          closeTime: '持仓中',
          interest: '$20',
          fee: '-$80',
          profitOrLoss: '未平仓'
        }
      ],
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
    for (let i = 0; i < 5; i++) {
      this.transactionList.map((item) => {
        this.tableData.push(item);
      });
    }
    this.tableData = this.transactionList;
  },
  methods: {
//    handleSizeChange(val) {
//      console.log(`每页 ${val} 条`);
//    },
//    handleCurrentChange(val) {
//      console.log(`当前页: ${val}`);
//    }
  }
};
</script>

<style lang="less" scoped>
  .transaction-manage {
    .region-main{
    }
  }
</style>
