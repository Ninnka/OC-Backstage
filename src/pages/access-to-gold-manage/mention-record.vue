<template>
  <div class="mention-record">
    <article class="region has-total">
      <header>
        出金纪录
      </header>
      <div class="region-main">
        <el-form class="filter-input" ref="form" :model="form" label-width="100px">
         <!-- 条件输入框-->
          <el-form-item label="账号">
            <el-select v-model="form.account" filterable :filter-method="userNumSearch" placeholder="请选择">
              <el-option
                v-for="item in UserNumoptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="用户类型">
            <el-select v-model="form.category" placeholder="交易商／代理商">
              <el-option label="交易商" value="transaction"></el-option>
              <el-option label="代理商" value="proxy"></el-option>
            </el-select>
          </el-form-item>
          
          <el-form-item label="时间范围">
            <el-date-picker v-model="form.date" type="datetimerange" placeholder="请选择时间范围"></el-date-picker>
          </el-form-item>

          <el-form-item label="">
            <el-checkbox v-model="form.includeProxy">包含下级代理商</el-checkbox>
          </el-form-item>

          <el-form-item label="">
          <el-checkbox v-model="form.includeTransaction">包含下级交易商</el-checkbox>
          </el-form-item>  
        </el-form>
        <!-- 条件输入框 结束-->


        <div class="query-btns">
          <el-button type="info" @click="findSubmit">查询</el-button>
          <!--下拉选择列-->
          <list-options :sourceList="labelList" :displayList.sync="showLabelList"></list-options>
          <!--下拉选择列 结束-->
        </div>

        <div class="dateTable">
          <template>
            <el-table
              ref="multipleTable"
              :data="getTableData"
              border
              style="width: 100%"
              >

              <el-table-column v-for="col in showLabelList" :label="col.label" :width="getTableColumnWidth (col.label)" :key="col.key">
                <template scope="scope">
                  <template v-if="col.label === '出金编号'">
                    <template v-if="scope.row.objSymbol === 'pagaSum'">
                      <span>合计：</span>
                    </template>
                    <template v-else-if="scope.row.objSymbol === 'sum'">
                      <span>总计：</span>
                    </template>
                    <template v-else>
                      <span>{{ scope.row.outMoneyNum }}</span>
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
                      </div>
                    </template>
                    <template v-else>
                      <span>
                        {{ scope.row.datetime }}
                      </span>
                    </template>
                  </template>
                  <template v-else-if="col.label === '余额'">
                    <template v-if="scope.row.objSymbol">
                      <div>
                        <span>
                          总手续费：{{ scope.row.sumFee }}
                        </span>
                      </div>
                    </template>
                    <template v-else>
                      <span>
                        {{ scope.row.balance }}
                      </span>
                    </template>
                  </template>
                  <template v-else-if="col.label === '手续费'">
                    <template v-if="scope.row.objSymbol">
                      <div>
                        <span>
                          总入金：${{ scope.row.sumRecharge }}
                        </span>
                      </div>
                    </template>
                    <template v-else>
                      <span>
                        {{ scope.row.fee }}
                      </span>
                    </template>
                  </template>

                  <template v-else-if="col.label === '金额'">
                    <template v-if="scope.row.objSymbol">
                      <div>
                        <span>
                          未知：{{ scope.row.sumRecharge }}
                        </span>
                        <br>
                        <span>
                          成功：{{ scope.row.success }}
                        </span> 
                      </div>
                    </template>
                    <template v-else>
                      <span>
                        {{ scope.row.money }}
                      </span>
                    </template>
                  </template>

                  <template v-else>
                    {{ scope.row[col.key] }}
                  </template>
                </template>
              </el-table-column>

            </el-table>

            <div class="table-Footer">
              <paging :sourceData="tableData" :displayData.sync="pageTabData"></paging>
            </div>
          </template>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import paging from '@comps/paging.vue';
import listOptions from '@comps/list-options.vue';
export default {
  name: 'RechargeRecord',
  components: {
    paging,
    'list-options': listOptions
  },
  data () {
    return {
      UserNumoptions: [],
      tableData: [],
      pageTabData: [],
      userIputText: '',
      iconStyle: 'caret-top',
      form: {
        account: '', // 账号
        category: '', // 用户类型
        date: '', // 时间范围
        includeProxy: false, // 是否包含下级代理
        includeTransaction: false // 是否包含下级交易
      },
      labelList: [
        {
          label: '出金编号',
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
          key: '',
          canSelect: false,
          show: true
        },
        {
          label: '余额',
          key: '',
          canSelect: true,
          show: true
        },
        {
          label: '手续费',
          key: 'fee',
          canSelect: true,
          show: true
        },
        {
          label: '金额',
          key: 'money',
          canSelect: true,
          show: true
        },
        {
          label: '汇率',
          key: 'exchangeRate',
          canSelect: true,
          show: true
        },
        {
          label: '状态',
          key: 'status',
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
      showLabelList: []
    };
  },
  computed: {
    sumPage () {
      return this.tableDataAll().length;
    },
    getTableData () {
      // 表格数据
      // trader/proxy/recharge/rechargeMoney/inFee/outFee/commission/profitWin/profitLose/total
      let TableDate = this.pageTabData;
      let [trader, proxy, recharge, sumFee, sumRecharge, unknown, success] = [9999.00, 9999.00, 9999.00, 9999.00, 9999.00, 9999.00, 9999.00];
      let sumPage = this.pageSum();
      let sum = this.sum();
      TableDate.push(sumPage);
      TableDate.push(sum);
      return TableDate;
    }
  },
  created: function () {
    this.tableData = this.tableDataAll();
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
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
      };
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
    handleSelect (item) {
      this.iconStyle = 'caret-top';
      console.log(item);
    },
    sum () {
      let [trader, proxy, recharge, sumFee, sumRecharge, unknown, success] = [9999, 9999, 9999, 9999, 9999, 9999, 9999];
      return {
        objSymbol: 'sum',
        trader,
        proxy,
        recharge,
        sumFee,
        sumRecharge,
        unknown,
        success
      };
    },
    pageSum () {
      let [trader, proxy, recharge, sumFee, sumRecharge, unknown, success] = [9999, 9999, 9999, 9999, 9999, 9999, 9999];
      return {
        objSymbol: 'pagaSum',
        trader,
        proxy,
        recharge,
        sumFee,
        sumRecharge,
        unknown,
        success
      };
    },
    getTableColumnWidth (val) {
      let width = 0;
      switch (val) {
        case '出金编号':
          width = 130;
          break;
        case '用户':
          width = 250;
          break;
        case '时间':
          width = 150;
          break;
        case '余额':
          width = 150;
          break;
        case '手续费':
          width = 150;
          break;
        case '金额':
          width = 150;
          break;
        case '汇率':
          width = 120;
          break;
        case '状态':
          width = 120;
          break;
        case '说明':
          width = 200;
          break;
      }
      return width;
    },
    tableDataAll () {
      return [{
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        datetime: '2017-01-01 10:00:00',
        balance: 500,
        fee: 300,
        money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理 12:23:34万死亡我我是大集合啊啥的啊'
      }, {
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        datetime: '2017-01-01 10:00:00',
        balance: 500,
        fee: 300,
        money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理'
      }, {
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        datetime: '2017-01-01 10:00:00',
        balance: 500,
        fee: 300,
        money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理'
      }, {
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        datetime: '2017-01-01 10:00:00',
        balance: 500,
        fee: 300,
        money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理'
      }, {
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        datetime: '2017-01-01 10:00:00',
        balance: 500,
        fee: 300,
        money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理'
      }, {
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        datetime: '2017-01-01 10:00:00',
        balance: 500,
        fee: 300,
        money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理'
      }, {
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        datetime: '2017-01-01 10:00:00',
        balance: 500,
        fee: 300,
        money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理'
      }, {
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        datetime: '2017-01-01 10:00:00',
        balance: 500,
        fee: 300,
        money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理'
      }, {
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        datetime: '2017-01-01 10:00:00',
        balance: 500,
        fee: 300,
        money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理'
      }, {
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        datetime: '2017-01-01 10:00:00',
        balance: 500,
        fee: 300,
        money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理'
      }, {
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        datetime: '2017-01-01 10:00:00',
        balance: 500,
        fee: 300,
        money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理'
      }, {
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        datetime: '2017-01-01 10:00:00',
        balance: 500,
        fee: 300,
        money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理'
      }];
    }
  }
};
</script>

<style lang="less" scoped>
  .mention-record {
    .region-main{
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
      div.dateTable{
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
      }
    }
  }
</style>
