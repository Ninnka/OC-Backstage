<template>
  <div class="transaction-manage">
    <!--transaction-manage-->
    <article class="region">
      <header>交易管理</header>
      <div class="region-main">
        <el-form class="filter-input" label-width="100px">
          <el-form-item label="账号/昵称">
            <el-input placeholder="请输入账号或者昵称"></el-input>
          </el-form-item>
          <el-form-item label="交易订单号">
            <el-input placeholder="请输入交易订单号"></el-input>
          </el-form-item>
          <el-form-item label="MT账号">
            <el-input placeholder="请输入MT账号"></el-input>
          </el-form-item>
          <el-form-item label="交易类型">
            <el-select>
              <el-option value="">买单</el-option>
              <el-option value="">卖单</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="交易种类">
            <el-select>
              <el-option value="">CNYHKD</el-option>
              <el-option value="">USOil</el-option>
              <el-option value="">Forex</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单类型">
            <el-select>
              <el-option value="">全部</el-option>
              <el-option value="">持仓中</el-option>
              <el-option value="">已平仓</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开仓时间">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="平仓时间">
            <el-input></el-input>
          </el-form-item>
        </el-form>
        <div class="query-btn">
          <el-button type="info" @click="filterTable">查询</el-button>
          <el-select>
            <el-option>1111111</el-option>
          </el-select>
        </div>
        <el-table :data="TxList" stripe style="width: 100%">
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
        <div class="block">
          <el-pagination
            @size-change=""
            @current-change=""
            :current-page="currentPage4"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="80">
          </el-pagination>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'TransactionManage',
  components: {
  },
  data () {
    return {
      currentPage4: 4,
      TxList: [
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
      ]
    };
  },
  computed: {
  },
  created: function () {
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
      width: 100%;
    }
  }
</style>
