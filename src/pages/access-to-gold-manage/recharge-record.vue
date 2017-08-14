<template>
  <div class="recharge-record">
    <article class="region">
      <header>
        入金纪录
      </header>
      <div></div>

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

          <el-checkbox v-model="form.includeProxy">包含下级代理商</el-checkbox>
          <el-checkbox v-model="form.includeTransaction">包含下级交易商</el-checkbox>

          <el-form-item label="时间范围">
            <el-date-picker v-model="form.date" type="datetimerange" placeholder="请选择时间范围"></el-date-picker>
          </el-form-item>
          <!-- 条件输入框 结束-->    
        </el-form>
        <div class="query-btn">
          <el-button type="info" @click="findSubmit">查询</el-button>
          <!--下拉选择列-->
          <el-dropdown trigger="hover" :hide-on-click="false">
            <el-button type="primary">
            列表选项<i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-checkbox :indeterminate="cloumnChoose.isIndeterminate" v-model="cloumnChoose.checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
              </el-dropdown-item>
              <el-dropdown-item v-for="field in cloumnChoose.lists" :key="field">
                <el-checkbox-group v-model="cloumnChoose.checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox :label="field" :key="field">{{field}}</el-checkbox>
                </el-checkbox-group>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
                label="入金编号"
                width="130">
                <template scope="scope">
                    <template v-if="scope.row.objSymbol === 'pagaSum'">
                      <span>合计：</span>
                    </template>
                    <template v-else-if="scope.row.objSymbol === 'sum'">
                      <span>总计：</span>
                    </template>
                    <template v-else>
                      <span>{{ scope.row.getMoneyNum }}</span>
                    </template>
                </template>
              </el-table-column>

              <el-table-column
                label="用户"
                width="250">
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
                label="时间"
                width="140">
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
                width="150">
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
                width="150">
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
                width="150">
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
                width="120">
              </el-table-column>
              
              <el-table-column
                prop="status"
                label="状态"
                width="120">
              </el-table-column>

              <el-table-column
                prop="description"
                label="说明"
                width="185"
                show-overflow-tooltip>
              </el-table-column>

            </el-table>
            
            <div class="table-Footer">
              <paging :sourceData="thisTableData" :displayData.sync="tableData"></paging>
            </div>
          </template>
        </div>

      </div>
    </article>

  </div>
</template>

<script>
var tableField = ['入金编号', '用户', '时间', '余额 ', '手续费', '金额', '汇率', '状态', '说明'];
import paging from '@comps/paging.vue';
export default {
  name: 'RechargeRecord',
  components: {
    paging
  },
  data () {
    return {
      currentPage: 1,
      sizesPage: [10, 30, 50, 70],
      statusPage: 0,
      maxPage: 10,
      UserNumoptions: [],
      tableData: [],
      userIputText: '',
      iconStyle: 'caret-top',
      form: {
        account: '', // 账号
        category: '', // 用户类型
        date: '', // 时间范围
        includeProxy: false, // 是否包含下级代理
        includeTransaction: false // 是否包含下级交易
      },
      cloumnChoose: {
        isIndeterminate: true,
        checkedCities: tableField, // 多选框数据
        lists: tableField,
        checkAll: true
      }
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
    }
  },
  created: function () {
    this.tableData = this.thisTableData;
  },
  methods: {
    handleCheckAllChange (event) {
      // 多选框点击全选的方法
      this.cloumnChoose.checkedCities = event.target.checked ? tableField : [];
      this.cloumnChoose.isIndeterminate = false;
    },
    handleCheckedCitiesChange (value) {
      // 点击多选框的方法
      // console.log(value);
      let checkedCount = value.length;
      this.cloumnChoose.checkAll = checkedCount === this.cloumnChoose.lists.length;
      this.cloumnChoose.isIndeterminate = checkedCount > 0 && checkedCount < this.cloumnChoose.lists.length;
    },
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
        getMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        time: '2017-01-01 10:00:00',
        balance: 500,
        Fee: 300,
        Money: 999999,
        exchangeRate: 6.667,
        status: '通过',
        description: '自动出金失败，手动处理 12:23:34'
      }, {
        getMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        time: '2017-01-01 10:00:00',
        balance: 500,
        Fee: 300,
        Money: 999999,
        exchangeRate: 6.667,
        status: '通过',
        description: '自动出金失败，手动处理'
      }, {
        getMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        time: '2017-01-01 10:00:00',
        balance: 500,
        Fee: 300,
        Money: 999999,
        exchangeRate: 6.667,
        status: '通过',
        description: '自动出金失败，手动处理'
      }, {
        getMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        time: '2017-01-01 10:00:00',
        balance: 500,
        Fee: 300,
        Money: 999999,
        exchangeRate: 6.667,
        status: '通过',
        description: '自动出金失败，手动处理'
      }, {
        getMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        time: '2017-01-01 10:00:00',
        balance: 500,
        Fee: 300,
        Money: 999999,
        exchangeRate: 6.667,
        status: '通过',
        description: '自动出金失败，手动处理'
      }, {
        getMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        time: '2017-01-01 10:00:00',
        balance: 500,
        Fee: 300,
        Money: 999999,
        exchangeRate: 6.667,
        status: '通过',
        description: '自动出金失败，手动处理'
      }, {
        getMoneyNum: 'LS00000001',
        userName: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        time: '2017-01-01 10:00:00',
        balance: 500,
        Fee: 300,
        Money: 999999,
        exchangeRate: 6.667,
        status: '通过',
        description: '自动出金失败，手动处理'
      }];
    }
  }
};
</script>

<style lang="less" scoped>
  .el-inputed{
    width: 230px;
    height: 38px;
  }
  .el-buttoned{
    width: 100px;
    height: 40px;
    color: #FFF;
    background:#444b5b;
    border-color: #444b5b;
    &:hover{
      background:#17191d;
      border-color: #17191d;
    }
    &:focus{
      background:#17191d;
      border-color: #17191d;
    }
    &:active{
      background:#17191d;
      border-color: #17191d;
    }
  }
  .recharge-record {
    .region-main{
      background:#272a31;
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
      div.block{
        margin: 52px 34px 0 0;
        padding-bottom: 74px;
      }
    }
  }
</style>
