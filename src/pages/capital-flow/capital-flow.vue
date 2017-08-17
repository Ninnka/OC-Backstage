<template>
  <div class="capital-flow">
    <article class="region has-total">
      <header>
        资金流水
      </header>
      <div class="region-main">
        <!--查询输入框-->
        <el-form class="filter-input" :model="capitalFlowForm" label-width="100px">
          <el-form-item label="类型">
            <el-select v-model="capitalFlowForm.category" placeholder="全部">
              <el-option label="全部" value="all"></el-option>
              <el-option label="交易商" value="transaction"></el-option>
              <el-option label="代理商" value="proxy"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用户类型">
            <el-select v-model="capitalFlowForm.userCategory" placeholder="交易商／代理商">
              <el-option label="交易商" value="transaction"></el-option>
              <el-option label="代理商" value="proxy"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="开户时间">
            <el-date-picker v-model="capitalFlowForm.timeRange" type="datetimerange" placeholder="时间范围" ></el-date-picker>
          </el-form-item>

          <el-form-item label="账号">
            <el-select v-model="capitalFlowForm.account" filterable :filter-method="userNumSearch" placeholder="请选择">
              <el-option
                v-for="item in UserNumoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="">
            <el-checkbox v-model="capitalFlowForm.includeProxy">包含下级代理商</el-checkbox>
          </el-form-item>
          
          <el-form-item label="">
            <el-checkbox v-model="capitalFlowForm.includeTransaction">包含下级交易商</el-checkbox>
          </el-form-item>
        </el-form>
        <!--查询输入框 结束-->
        <div class="query-btns">
          <el-button type="info" @click="findSubmit">查询</el-button>

          <list-options :sourceList="labelList" :displayList.sync="showLabelList"></list-options>
        </div>
        <!--数据表格 -->
        <el-table
          ref="multipleTable"
          :data="capitalTableDate"
          stripe
          style="width: 100%"
          >

            <el-table-column v-for="col in showLabelList" :label="col.label" :width="getTableColumnWidth (col.label)" :key="col.key">
              <template scope="scope">
                <template v-if="col.label === '流水编号'">
                  <template v-if="scope.row.objSymbol === 'pagaSum'">
                    <span>合计：</span>
                  </template>
                  <template v-else-if="scope.row.objSymbol === 'sum'">
                    <span>总计：</span>
                  </template>
                  <template v-else>
                    <span>{{ scope.row.waterMoneyNum }}</span>
                  </template>
                </template>
                <template v-if="col.label === '用户'">
                  <template v-if="scope.row.objSymbol">
                      <span>
                        交易商：{{ scope.row.trader }} 个
                      </span>
                      <br>
                      <span>
                        代理商：{{ scope.row.proxy }} 个
                      </span>
                  </template>
                  <template v-else>
                    <div slot="reference" class="name-wrapper">
                      <el-tag>{{ scope.row.userName }}</el-tag>
                      <div>
                        <span>
                          账号：{{ scope.row.userNum }}
                        </span>
                        <span>
                          MT账号：{{ scope.row.userMtnum }}
                        </span>
                      </div>
                    </div>
                  </template>
                </template>
                <template v-else-if="col.label === '时间'">
                  <template v-if="scope.row.objSymbol">
                    <div>
                      <span>
                        入金：{{ scope.row.recharge }}笔
                      </span>
                      <br>
                      <span>
                        金额：{{ scope.row.rechargeMoney }}
                      </span>
                    </div>
                  </template>
                  <template v-else>
                    <span>
                      {{ scope.row.dateTime }}
                    </span>
                  </template>
                </template>
                <template v-else-if="col.label === '类型'">
                  <template v-if="scope.row.objSymbol">
                   <span>入金续费：{{ scope.row.inFee}}</span>
                   <br>
                   <span>出金手续费: {{ scope.row.outFee }}</span>  
                  </template>
                  <template v-else>
                    <div slot="reference" class="name-wrapper">
                      <el-tag>{{ scope.row.userName }}</el-tag>
                    </div>
                  </template>
                </template>
                <template v-else-if="col.label === '余额'">
                  <template v-if="scope.row.objSymbol">
                    <span>佣金：{{ scope.row.commission }}</span>
                  </template>
                  <template v-else>
                    <span>
                      {{ scope.row.overMoney }}
                    </span>
                  </template>
                </template>

                <template v-else-if="col.label === '变动金额'">
                  <template v-if="scope.row.objSymbol">
                   <span>红利盈利：{{ scope.row.profitWin }} </span>
                  </template>
                  <template v-else>
                    <span>{{ scope.row.changeMoney }}</span>
                  </template>
                </template>

                <template v-else-if="col.label === '说明'">
                  <template v-if="scope.row.objSymbol">
                    红利亏损：{{ scope.row.profitLose }}
                  </template>
                  <template v-else>
                    {{ scope.row.description }}，汇率 {{ scope.row.exchangeRate }}
                  </template>
                </template>

                <template v-else>
                  {{ scope.row[col.key] }}
                </template>
              </template>
            </el-table-column>
          
        </el-table>
        <!--数据表格 结束-->
        
        <!--分页 -->
        <paging :sourceData="tableData" :displayData.sync="pageTableData"></paging>
         <!--分页 结束-->
      </div>
    </article>
  </div>
</template>

<script>
import paging from '@comps/paging.vue';
import listOptions from '@comps/list-options.vue';
export default {
  name: 'CapitalFlow',
  components: {
    paging,
    'list-options': listOptions
  },
  data () {
    return {
      UserNumoptions: [],
      capitalFlowForm: {
        account: '', // 账号
        category: '', // 用户类型
        timeRange: '', // 时间范围
        includeProxy: false, // 是否包含下级代理
        includeTransaction: false, // 是否包含下级交易
        userCategory: ''
      },
      labelList: [
        {
          label: '流水编号',
          key: '',
          canSelect: false,
          show: true
        },
        {
          label: '用户',
          key: '',
          canSelect: false,
          show: true
        },
        {
          label: '时间',
          key: 'dateTime',
          canSelect: true,
          show: true
        },
        {
          label: '类型',
          key: '',
          canSelect: true,
          show: true
        },
        {
          label: '余额',
          key: 'overMoney',
          canSelect: true,
          show: true
        },
        {
          label: '变动金额',
          key: 'changeMoney',
          canSelect: true,
          show: true
        },
        {
          label: '说明',
          key: 'description',
          canSelect: true,
          show: true
        }
      ],
      showLabelList: [],
      tableData: [],
      pageTableData: []
    };
  },
  computed: {
    sumPage () {
      // 计算共几条
      return this.getTableDate().length;
    },
    capitalTableDate () {
      // 表格数据
      // trader/proxy/recharge/rechargeMoney/inFee/outFee/commission/profitWin/profitLose/total
      let TableDate = this.pageTableData;
      let [trader, proxy, recharge, rechargeMoney, inFee, outFee, commission, profitWin, profitLose, total] = [9999.00, 9999.00, 9999.00, 9999.00, 9999.00, 9999.00, 9999.00, 9999.00, 9999.00, 9999.00];
      let sumPage = {
        objSymbol: 'pagaSum',
        trader, // 涉及交易商
        proxy, // 涉及代理商
        recharge, // 入金金额
        rechargeMoney, // 合计多少笔
        inFee, // 入金手续费
        outFee, // 出金手续费
        commission, // 佣金
        profitWin, // 红利盈利
        profitLose, // 红利亏损
        total // 交易笔数合计
      };
      let sum = this.sum();
      TableDate.push(sumPage);
      TableDate.push(sum);
      return TableDate;
    }
  },
  created: function () {
    this.tableData = this.getTableDate();
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
      this.maxPage = Number(val);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.statusPage = Number(val) - 1;
    },
    findSubmit () {
      console.log('点击查询');
      this.UserNumoptions = [];
    },
    userNumSearch (value) {
      // 账号输入框输入后模糊查找账号的方法
      this.UserNumoptions = [];
      this.UserNumoptions = [{
        value: '选项1',
        label: '454653'
      }, {
        value: '选项2',
        label: '654'
      }, {
        value: '选项3',
        label: '897'
      }, {
        value: '选项4',
        label: '213'
      }, {
        value: '选项5',
        label: '550656'
      }];
    },
    sum () {
      // 总计
      let [trader, proxy, recharge, rechargeMoney, inFee, outFee, commission, profitWin, profitLose, total] = [5000000, 5000000, 5000000, 5000000, 5000000, 5000000, 5000000, 5000000, 5000000, 5000000];
      return {
        objSymbol: 'sum',
        trader, // 涉及交易商
        proxy, // 涉及代理商
        recharge, // 入金金额
        rechargeMoney, // 合计多少笔
        inFee, // 入金手续费
        outFee, // 出金手续费
        commission, // 佣金
        profitWin, // 红利盈利
        profitLose, // 红利亏损
        total // 交易笔数合计
      };
    },
    getTableColumnWidth (val) {
      let width = 0;
      switch (val) {
        case '流水编号':
          width = 150;
          break;
        case '用户':
          width = 230;
          break;
        case '时间':
          width = 150;
          break;
        case '类型':
          width = 170;
          break;
        case '余额':
          width = 150;
          break;
        case '变动金额':
          width = 160;
          break;
        case '说明':
          width = 200;
          break;
      }
      return width;
    },
    getTableDate () {
      return [{
        waterMoneyNum: 'LS00000001', // 流水编号
        userName: '交易商', // 用户
        userNum: '某某某',
        userMtnum: '65421',
        dateTime: '2017-01-01 10:00:00', // 时间
        moneyType: '入金', // 类型
        overMoney: 999999, // 余额
        changeMoney: +99999, // 变动余额
        exchangeRate: 6.667, // 汇率
        description: '用户入金' // 说明
      }, {
        waterMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        dateTime: '2017-01-01  10:00:00',
        moneyType: '入金',
        overMoney: 999999,
        changeMoney: +99999,
        exchangeRate: 6.667,
        description: '用户入金'
      }, {
        waterMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        dateTime: '2017-01-01  10:00:00',
        moneyType: '入金',
        overMoney: 999999,
        changeMoney: +99999,
        exchangeRate: 6.667,
        description: '用户入金'
      }, {
        waterMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        dateTime: '2017-01-01  10:00:00',
        moneyType: '入金',
        overMoney: 999999,
        changeMoney: +99999,
        exchangeRate: 6.667,
        description: '用户入金'
      }, {
        waterMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        dateTime: '2017-01-01  10:00:00',
        moneyType: '入金',
        overMoney: 999999,
        changeMoney: +99999,
        exchangeRate: 6.667,
        description: '用户入金'
      }, {
        waterMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        dateTime: '2017-01-01 10:00:00',
        moneyType: '入金',
        overMoney: 999999,
        changeMoney: +99999,
        exchangeRate: 6.667,
        description: '用户入金'
      }, {
        waterMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        dateTime: '2017-01-01 10:00:00',
        moneyType: '入金',
        overMoney: 999999,
        changeMoney: +99999,
        exchangeRate: 6.667,
        description: '用户入金'
      }, {
        waterMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        dateTime: '2017-01-01 10:00:00',
        moneyType: '入金',
        overMoney: 999999,
        changeMoney: +99999,
        exchangeRate: 6.667,
        description: '用户入金'
      }, {
        waterMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        dateTime: '2017-01-01 10:00:00',
        moneyType: '入金',
        overMoney: 999999,
        changeMoney: +99999,
        exchangeRate: 6.667,
        description: '用户入金'
      }, {
        waterMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        dateTime: '2017-01-01 10:00:00',
        moneyType: '入金',
        overMoney: 999999,
        changeMoney: +99999,
        exchangeRate: 6.667,
        description: '用户入金'
      }, {
        waterMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        dateTime: '2017-01-01 10:00:00',
        moneyType: '入金',
        overMoney: 999999,
        changeMoney: +99999,
        exchangeRate: 6.667,
        description: '用户入金'
      }, {
        waterMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        dateTime: '2017-01-01 10:00:00',
        moneyType: '入金',
        overMoney: 999999,
        changeMoney: +99999,
        exchangeRate: 6.667,
        description: '用户入金'
      }, {
        waterMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        dateTime: '2017-01-01 10:00:00',
        moneyType: '入金',
        overMoney: 999999,
        changeMoney: +99999,
        exchangeRate: 6.667,
        description: '用户入金'
      }, {
        waterMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        dateTime: '2017-01-01 10:00:00',
        moneyType: '入金',
        overMoney: 999999,
        changeMoney: +99999,
        exchangeRate: 6.667,
        description: '用户入金'
      }];
    }
  }
};
</script>

<style lang="less" scoped>
  .capital-flow {
    .el-table{
      .cell{
        .name-wrapper{
          display: -webkit-flex;
          display: flex;
          flex-wrap: wrap;
          .el-tag{
            width: 60px;
            height: 30px;
            margin: auto 0;
            text-align: center;
          }
          div{
            width: 60%;
            span{
              display: block;
              margin-left: 5px;
            }
          }
        }
      }
    }
    .sum-background{
      background-color: #22242a;
      color: white;
      font-size: 14px;
      height: 56px;
    }
  }
</style>
