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

          <!-- 条件输入框 结束-->    
        </el-form>

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
              :data="thisTableData"
              border
              style="width: 100%"
              >
              <el-table-column
                label="出金编号"
                width="130">
                <template scope="scope">
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
              </el-table-column>

              <el-table-column
                label="用户"
                width="250"
                v-if="tableColumnShow.user">
                <template scope="scope">
                    <template v-if="scope.row.objSymbol === 'pagaSum'">
                        <span>
                          交易商：{{ scope.row.trader }} 个
                        </span>
                        <br>
                        <span>
                          代理商：{{ scope.row.proxy }} 个
                        </span>
                    </template>
                    <template v-else-if="scope.row.objSymbol === 'sum'">
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
              </el-table-column>

              <el-table-column
                prop="time"
                label="时间"
                width="140"
                v-if="tableColumnShow.datetime">
                <template scope="scope">
                    <template v-if="scope.row.objSymbol === 'pagaSum'">
                      <div>
                        <span>
                          入金：{{ scope.row.recharge }}笔
                        </span>
                      </div>
                    </template>
                    <template v-else-if="scope.row.objSymbol === 'sum'">
                      <div>
                        <span>
                          入金：{{ scope.row.recharge }}笔
                        </span>
                      </div>
                    </template>
                    <template v-else>
                      <span>
                        {{ scope.row.time }}
                      </span>
                    </template>
                </template>
              </el-table-column>

              <el-table-column
                prop="balance"
                label="余额"
                width="150"
                v-if="tableColumnShow.datetime">
                <template scope="scope">
                    <template v-if="scope.row.objSymbol === 'pagaSum'">
                      <div>
                        <span>
                          总手续费：{{ scope.row.sumFee }}
                        </span>
                      </div>
                    </template>
                    <template v-else-if="scope.row.objSymbol === 'sum'">
                      <div>
                        <span>
                          总手续费：{{ scope.row.sumFee }}
                        </span>
                      </div>
                    </template>
                    <template v-else>
                      <span>
                        {{ scope.row.Fee }}
                      </span>
                    </template>
                </template>
              </el-table-column>

              <el-table-column
                label="手续费"
                width="150"
                v-if="tableColumnShow.datetime">
                <template scope="scope">
                    <template v-if="scope.row.objSymbol === 'pagaSum'">
                      <div>
                        <span>
                          总入金：${{ scope.row.sumRecharge }}
                        </span>
                      </div>
                    </template>
                    <template v-else-if="scope.row.objSymbol === 'sum'">
                      <div>
                        <span>
                          总入金：${{ scope.row.sumRecharge }}
                        </span>
                      </div>
                    </template>
                    <template v-else>
                      <span>
                        {{ scope.row.Fee }}
                      </span>
                    </template>
                </template>
              </el-table-column>

              <el-table-column
                prop="Money"
                label="金额"
                width="150"
                v-if="tableColumnShow.datetime">
                <template scope="scope">
                    <template v-if="scope.row.objSymbol === 'pagaSum'">
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
                    <template v-else-if="scope.row.objSymbol === 'sum'">
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
                        {{ scope.row.Fee }}
                      </span>
                    </template>
                </template>
              </el-table-column>

              <el-table-column
                prop="exchangeRate"
                label="汇率"
                width="120"
                v-if="tableColumnShow.datetime">
              </el-table-column>
              
              <el-table-column
                prop="status"
                label="状态"
                width="120"
                v-if="tableColumnShow.datetime">
              </el-table-column>

              <el-table-column
                prop="description"
                label="说明"
                width="185"
                v-if="tableColumnShow.datetime"
                show-overflow-tooltip>
              </el-table-column>

            </el-table>

            <div class="table-Footer">
              <paging :sourceData="thisTableData" :displayData.sync="thisTabData"></paging>
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
      currentPage: 1,
      sizesPage: [10, 30, 50, 70],
      statusPage: 0,
      maxPage: 10,
      UserNumoptions: [],
      thisTabData: [],
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
          label: '时间',
          key: 'time',
          canSelect: false,
          show: true
        },
        {
          label: '余额',
          key: 'balance',
          canSelect: true,
          show: true
        },
        {
          label: '手续费',
          key: 'Fee',
          canSelect: true,
          show: true
        },
        {
          label: '金额',
          key: 'Money',
          canSelect: true,
          show: true
        },
        {
          label: '汇率',
          key: 'applicationDate',
          canSelect: true,
          show: true
        },
        {
          label: '状态',
          key: 'applicationDate',
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
    thisTableData () {
      // 表格数据
      // trader/proxy/recharge/rechargeMoney/inFee/outFee/commission/profitWin/profitLose/total
      let TableDate = this.tableDataAll();
      let [trader, proxy, recharge, sumFee, sumRecharge, unknown, success] = [9999.00, 9999.00, 9999.00, 9999.00, 9999.00, 9999.00, 9999.00];
      let sumPage = this.pageSum();
      let sum = this.sum();
      TableDate.push(sumPage);
      TableDate.push(sum);
      return TableDate;
    },
    tableColumnShow: {
      get: function () {
        return {
          outMoneyNum: true,
          user: true,
          datetime: true,
          balance: true,
          Fee: true,
          Money: true,
          exchangeRate: true,
          status: true,
          description: true
        };
      },
      set: function (cloumn) {
      }
    }
  },
  created: function () {
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
    tableDataAll () {
      return [{
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        time: '2017-01-01 10:00:00',
        balance: 500,
        Fee: 300,
        Money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理 12:23:34万死亡我我是大集合啊啥的啊'
      }, {
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        time: '2017-01-01 10:00:00',
        balance: 500,
        Fee: 300,
        Money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理'
      }, {
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        time: '2017-01-01 10:00:00',
        balance: 500,
        Fee: 300,
        Money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理'
      }, {
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        time: '2017-01-01 10:00:00',
        balance: 500,
        Fee: 300,
        Money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理'
      }, {
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        time: '2017-01-01 10:00:00',
        balance: 500,
        Fee: 300,
        Money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理'
      }, {
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        time: '2017-01-01 10:00:00',
        balance: 500,
        Fee: 300,
        Money: 999999,
        exchangeRate: 6.667,
        status: '成功',
        description: '自动出金失败，手动处理'
      }, {
        outMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        time: '2017-01-01 10:00:00',
        balance: 500,
        Fee: 300,
        Money: 999999,
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
