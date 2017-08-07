<template>
  <div class="mention-start-audit">
    <article class="nav">
      <header>
          <span>
            <h2>
            出金初审
            </h2>
          </span>
      </header>
      <div></div>
    </article>
    <div class="main">
      <div class="form-qurey">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="出金单号">
            <el-input v-model="form.num" placeholder="请输入出金单号"></el-input>
          </el-form-item>
          <el-form-item label="申请人">
            <el-input v-model="form.applicant" placeholder="请输入申请人账号（交易账号／MT账号／代理账号）"></el-input>
          </el-form-item>
          <el-form-item label="出金状态">
            <el-select v-model="form.outStatus" placeholder="全部">
              <el-option label="全部" value="shanghai"></el-option>
              <el-option label="XX" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            placeholder="选择日期范围">
          </el-date-picker>
          </el-form-item>
          <el-form-item label="所属代理商">
            <el-input v-model="form.belong" placeholder="代理商"></el-input>
          </el-form-item>
          <el-checkbox v-model="form.include">包含间接交易商</el-checkbox>
          <el-form-item>
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
            <el-button type="primary" @click="findSubmit">查询</el-button>
            <el-button type="primary" @click="guideonSubmit">导出</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <div class="dateTable">
          <template>
            <el-table
              ref="multipleTable"
              :data="tableData3"
              border
              tooltip-effect="light"
              style="width: 100%"
              @selection-change="handleSelectionChange">

              <el-table-column
                type="selection"
                width="55">
              </el-table-column>

              <el-table-column
                prop="orderNumber"
                label="出金单号"
                width="130">
              </el-table-column>

              <el-table-column
                label="申请人"
                width="250">
                <template scope="scope">
                  <div slot="reference" class="name-wrapper">
                    <el-tag>{{ scope.row.character }}</el-tag>
                  </div>
                  <div>
                    <span>
                      账号：{{ scope.row.userNum }}
                      <p>MT账号：{{ scope.row.userMtnum }}</p>
                    </span>
                  </div>
                </template>
              </el-table-column>

              <el-table-column
                prop="phoneNunber"
                label="联系方式"
                width="130">
              </el-table-column>

              <el-table-column
                label="出金金额／到账金额"
                width="170">
                <template scope="scope">
                  {{ scope.row.accessMoneyout }}/
                  {{ scope.row.accessMoneyin }}
                </template>
              </el-table-column>

              <el-table-column
                label="出金银行卡"
                width="185">
                <template scope="scope">{{ scope.row.bankCardname }}</template>
                <template scope="scope">{{ scope.row.bankCardnum }}</template>
              </el-table-column>

              <el-table-column
                label="风控状态"
                width="120">
                  <template scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>ok</p>
                      <div slot="reference" class="name-wrapper">
                        {{ scope.row.dangerStatus }}
                      </div>
                    </el-popover>
                  </template>
              </el-table-column>

              <el-table-column
                label="申请时间"
                width="120">
                <template scope="scope">{{ scope.row.applicationDate }}</template>
              </el-table-column>
              
              <el-table-column
                label="操作"
                width="120">
                <template scope="scope">
                  <el-button
                    @click.native.prevent="byPassed(scope.$index, scope.row)"
                    type="text"
                    size="small">
                    通过
                  </el-button>
                  <el-button
                    @click.native.prevent="notPassed(scope.$index, scope.row)"
                    type="text"
                    size="small">
                    驳回
                  </el-button>
                </template>
              </el-table-column>

            </el-table>
            <div class="table-botton">
                <el-button @click="toggleSelection()">全选</el-button>
                <el-button @click="byPassedAll()">通过</el-button>
                <el-button @click="notPassedAll()">驳回</el-button>
            </div>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
              </el-pagination>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var tableField = ['出金单号', '申请人', '联系方式', '出金金额／到账金额 ', '出金银行卡', '风控状态', '申请时间', '操作'];
export default {
  name: 'mentionStartAudit',
  components: {
  },
  data () {
    return {
      form: {
        num: '',
        applicant: '',
        outStatus: '',
        date: '',
        include: false,
        belong: ''
      },
      currentPage4: 4,
      cloumnChoose: {
        isIndeterminate: true,
        checkedCities: tableField,
        lists: tableField,
        checkAll: true
      },
      tableData3: [{
        orderNumber: 'CJ000000001',
        character: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        phoneNunber: '13589646871',
        accessMoneyout: 500,
        accessMoneyin: 300,
        bankCardname: '招商银行',
        bankCardnum: '6228480402564890018',
        dangerStatus: '正常',
        applicationDate: '2016-05-03 12:23:34'
      }, {
        orderNumber: 'CJ000000001',
        character: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        phoneNunber: '13589646871',
        accessMoneyout: 500,
        accessMoneyin: 300,
        bankCardname: '招商银行',
        bankCardnum: '6228480402564890018',
        dangerStatus: '正常',
        applicationDate: '2016-05-03'
      }, {
        orderNumber: 'CJ000000001',
        character: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        phoneNunber: '13589646871',
        accessMoneyout: 500,
        accessMoneyin: 300,
        bankCardname: '招商银行',
        bankCardnum: '6228480402564890018',
        dangerStatus: '正常',
        applicationDate: '2016-05-03'
      }, {
        orderNumber: 'CJ000000001',
        character: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        phoneNunber: '13589646871',
        accessMoneyout: 500,
        accessMoneyin: 300,
        bankCardname: '招商银行',
        bankCardnum: '6228480402564890018',
        dangerStatus: '正常',
        applicationDate: '2016-05-03'
      }, {
        orderNumber: 'CJ000000001',
        character: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        phoneNunber: '13589646871',
        accessMoneyout: 500,
        accessMoneyin: 300,
        bankCardname: '招商银行',
        bankCardnum: '6228480402564890018',
        dangerStatus: '正常',
        applicationDate: '2016-05-03'
      }, {
        orderNumber: 'CJ000000001',
        character: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        phoneNunber: '13589646871',
        accessMoneyout: 500,
        accessMoneyin: 300,
        bankCardname: '招商银行',
        bankCardnum: '6228480402564890018',
        dangerStatus: '正常',
        applicationDate: '2016-05-03'
      }, {
        orderNumber: 'CJ000000001',
        character: '交易商',
        userNum: '某某某',
        userMtnum: '65421',
        phoneNunber: '13589646871',
        accessMoneyout: 500,
        accessMoneyin: 300,
        bankCardname: '招商银行',
        bankCardnum: '6228480402564890018',
        dangerStatus: '正常',
        applicationDate: '2016-05-03'
      }],
      multipleSelection: []
    };
  },
  computed: {
  },
  created: function () {
  },
  methods: {
    toggleSelection () {
      this.tableData3.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
    },
    byPassed (index, row) {
      console.log(`当前选中通过的用户: ${row}`);
    },
    notPassed (index, row) {
      console.log(`当前选中不通过的用户: ${row}`);
    },
    handleCheckAllChange (event) {
      // 点击全选的方法
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
    findSubmit () {
      console.log('点击查询');
    },
    guideonSubmit () {
      console.log('点击导出');
    },
    byPassedAll () {
      console.log('点击一键通过');
    },
    notPassedAll () {
      console.log('点击一键驳回');
    }
  }
};
</script>

<style lang="less" scoped>
  .mention-start-audit {
    margin:16px;
    .nav{
      background:#272a31;
      width:100%;
      height:49px;
      width: 100%;
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
    .main{
      margin-top:16px;
    }
    .form-qurey{
      background:#272a31;
      padding: 20px 0;
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
              margin: 0 20px;
            }
            div.el-dropdown{
              width: 100px;
              height: 40px;
              margin: 0 20px;
              display: inline-block;
              float: right;
            }
          };
        }
        div.el-input{
          width: 230px;
          height: 38px;
        }
        label.el-checkbox{
          margin-left: 20px;
          margin-top: 10px;
          color: white;
        }
      }
      .dateTable{
        width: 100%;
      }
      .el-button{
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
    }
  }
  .el-table{
    .cell{
      div{
        display: inline-block;
      }
      .name-wrapper{
        .el-tag{
          width: 80px;
        }
      }
    }
  }
  .table-botton{
    margin: 20px 0 0 20px;
    float: left;
    display: inline-block;
  }
  div.block{
    margin-top: 20px;
    display: inline-block;
    float: right;
  }
</style>
