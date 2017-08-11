<template>
  <div class="recharge-record">
    <article class="nav">
      <header>
          <span>
            <h2>
            入金纪录
            </h2>
          </span>
      </header>
      <div></div>
    </article>
    <div class="man">
      <div class="form-qurey">
        <el-form ref="form" :model="form" label-width="100px">

         <!-- 条件输入框-->
          <el-form-item label="时间范围">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
          </el-form-item>

          <el-form-item label="账号">
            <el-row class="demo-autocomplete">
              <el-col :span="12">
                <el-autocomplete
                  class="inline-input"
                  v-model="userIputText"
                  :fetch-suggestions="querySearch"
                  placeholder="交易商账号/MT账号/代理商账号"
                  :trigger-on-focus="false"
                  @select="handleSelect"
                  :icon="iconStyle"
                ></el-autocomplete>
              </el-col>
            </el-row>
          </el-form-item>

          <el-checkbox v-model="form.includeProxy">包含下级代理商</el-checkbox>
          <el-checkbox v-model="form.includeTransaction">包含下级交易商</el-checkbox>

          <el-form-item label="用户类型">
            <el-select v-model="form.category" placeholder="交易商／代理商">
              <el-option label="交易商" value="transaction"></el-option>
              <el-option label="代理商" value="proxy"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
          <!-- 条件输入框 结束-->

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

            <el-button type="primary" @click="findSubmit">查询</el-button>
          </el-form-item>
        </el-form>
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
              prop="getMoneyNum"
              label="入金编号"
              width="130">
            </el-table-column>

            <el-table-column
              label="用户"
              width="250">
              <template scope="scope">
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
            </el-table-column>

            <el-table-column
              prop="time"
              label="时间"
              width="120">
            </el-table-column>

            <el-table-column
              prop="balance"
              label="余额"
              width="120">
            </el-table-column>

            <el-table-column
              prop="Fee"
              label="手续费"
              width="120">
            </el-table-column>

            <el-table-column
              prop="Money"
              label="金额"
              width="120">
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
          
          <!--合计总计-->
           <div class="table-sum">
             <div> 
                <span>合计：</span>
                <span>交易商：{{  pageSum.trader }}</span> 
                <span>代理商：{{ pageSum.proxy }}</span>
                <span>入金：{{ pageSum.recharge }}笔</span>
                <span>总手续费：{{ pageSum.sumFee}}</span>
                <span>总入金： ${{ pageSum.sumRecharge }}</span>
                <span>
                  <p>未知：{{ pageSum.unknown }}</p>
                  <p>成功：{{ pageSum.success }}</p>
                </span>
             </div>
            <div>
              <span>总计：</span>
              <span>交易商：{{  sum.trader }}</span>
              <span>代理商：{{ sum.proxy }}</span>
              <span>入金：{{ sum.recharge }}笔</span>
              <span>总手续费：{{ sum.sumFee }}</span>
              <span>总入金： ${{ sum.sumRecharge }}</span>
              <span>
                <p>未知：{{ sum.unknown }}</p>
                <p>成功：{{ sum.success }}</p>
              </span>
            </div>
           </div>

          <div class="table-Footer">
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="sizesPage"
                :page-size="sizesPage[0]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="sumPage">
              </el-pagination>
            </div>
          </div>
        </template>
      </div>

    </div>
  </div>
</template>

<script>
var tableField = ['入金编号', '用户', '时间', '余额 ', '手续费', '金额', '汇率', '状态', '说明'];
export default {
  name: 'RechargeRecord',
  components: {
  },
  data () {
    return {
      currentPage: 1,
      sizesPage: [10, 30, 50, 70],
      statusPage: 0,
      maxPage: 10,
      restaurants: [],
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
      let list = this.tableDataAll().slice(this.statusPage, this.maxPage);
      console.log(list.length);
      return list;
    },
    sum () {
      let [trader, proxy, recharge, sumFee, sumRecharge, unknown, success] = [9999, 9999, 9999, 9999, 9999, 9999, 9999];
      return {
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
        trader,
        proxy,
        recharge,
        sumFee,
        sumRecharge,
        unknown,
        success
      };
    }
  },
  created: function () {
    this.restaurants = this.loadAll();
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
    querySearch (queryString, cb) {
      this.iconStyle = 'caret-bottom';
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.indexOf(queryString.toLowerCase()) === 0);
      };
    },
    loadAll () {
      return [
        { 'value': '1004441522' },
        { 'value': '4546546546' }
      ];
    },
    handleSelect (item) {
      this.iconStyle = 'caret-top';
      console.log(item);
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
        description: '审核通过 12:23:34'
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
        description: '审核通过'
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
        description: '审核通过'
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
        description: '审核通过'
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
        description: '审核通过'
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
        description: '审核通过'
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
        description: '审核通过'
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
    .nav{
      background:#272a31;
      width:100%;
      height:49px;
      width: 100%;
      margin-bottom: 17px;
      header{
        width: 200px;
        height: 100%;
        span{
          font-family:PingFangSC-Medium;
          font-size:14px;
          letter-spacing:0;
          color:#52e3ff;
          letter-spacing:0; 
          height: 100%;
          display: inline-block;
          h2{
            width: 100px;
            padding-top: 15px;
            margin-right: 50px;
          }
        }
      }
      div{
         background-image:linear-gradient(-90deg, #00e2b8 0%, #009acd 100%);
         width:100%;
         height:2px;
       }
    }
    .man{
      background:#272a31;
      .form-qurey{
        background:#272a31;
        padding: 20px 0 10px 0;
        width: 100%;
        form{
          display: -webkit-flex;
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          div{
            margin-left: 10px;
            &:last-child{
              width: 100%;
              >button{
                float: right;
                margin: 0 17px;
              }
              div.el-dropdown{
                width: 100px;
                height: 40px;
                margin: 0 20px;
                display: inline-block;
                float: right;
              }
            }
          }
          div.el-input{
            .el-inputed;
          }
          div.el-select{
            .el-inputed;
          }
          label.el-checkbox{
            margin-left: 20px;
            margin-top: 10px;
            color: white;
          }
          div.demo-autocomplete{
            .el-inputed;
            div{
              margin-left: 0;
            }
          }
        }
        .el-button{
          .el-buttoned;
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
        .table-sumed{
          span:nth-child(1){ margin-left: 10%;}
          span:nth-child(3){ margin-left: 15px; }
          span:nth-child(4){ margin-left: 6%; }
          span:nth-child(5){ margin-left: 4%; }
          span:nth-child(6){ margin-left: 8%; }
          span:nth-child(7){ margin: auto 10%;}
        }
        .table-sum{
          margin-top: 30px;
          div:nth-of-type(1){
            background-color: #622332;
            display: -webkit-flex; /* Safari */
            display: flex;
            .table-sumed;
          }
          div:nth-of-type(2){
            background-color: #0b415b; 
            display: -webkit-flex; /* Safari */
            display: flex;
            .table-sumed;
          }
          span{
            display: inline-block;
            font-family:PingFangSC-Regular;
            font-size:14px;
            letter-spacing:0;
            margin: auto 0;
            float: left;
          }
          div{
            height: 56px;
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
