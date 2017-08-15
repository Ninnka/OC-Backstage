<template>
  <div class="mention-end-audit">
    <article class="region">
      <header>
        出金终审
      </header>
      <div class="region-main">
        <el-form class="filter-input" ref="form" :model="form" label-width="100px">
          <el-form-item label="出金单号">
            <el-input v-model="form.num" placeholder="请输入出金单号"></el-input>
          </el-form-item>
          <el-form-item label="申请人">
            <el-input v-model="form.applicant" placeholder="请输入申请人账号（交易账号／MT账号／代理账号）"></el-input>
          </el-form-item>
          <el-form-item label="审核状态">
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
        </el-form>

        <div class="query-btn">
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
          <el-button type="info" @click="findSubmit">查询</el-button>
          <el-button type="info" @click="guideonSubmit">导出</el-button>
        </div>
        <div class="dateTable">
          <template>
            <el-table
              ref="multipleTable"
              :data="tableData"
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
                label="申请时间"
                width="120">
                <template scope="scope">{{ scope.row.applicationDate }}</template>
              </el-table-column>

              <el-table-column
                label="审核状态"
                width="120">
                  <template scope="scope">
                    <div slot="reference" class="name-wrapper">
                      <el-tag>{{ scope.row.applicationStatus }}</el-tag>
                    </div>
                  </template>
              </el-table-column>

              <el-table-column
                label="处理时间"
                width="120">
                <template scope="scope">{{ scope.row.dealWithTime }}</template>
              </el-table-column>

              <el-table-column
                prop="auditorNme"
                label="审核人"
                width="120">
              </el-table-column>
              
              <el-table-column
                label="操作"
                width="120"
                fixed="right">
                <template scope="scope">
                  <el-button
                    @click.native.prevent="review(scope.$index, scope.row)"
                    type="text"
                    size="small"
                    v-if="scope.row.applicationStatus === '待审核'">
                    审核
                  </el-button>
                  <el-button
                    @click.native.prevent="examine(scope.$index, scope.row)"
                    type="text"
                    size="small"
                    v-else>
                    查看
                  </el-button>
                </template>
              </el-table-column>

            </el-table>

            <popup :show.sync="showDelMt" :needCancel="needCancel" :title="'出金详情'" v-on:confirmEvent="reviewBy" :confirmText="'通过'" :cancelText="'拒绝'" v-on:cancelEvent="reviewRefuse">
              <template slot="content" >

                <p class="del-text">
                  <el-row :gutter="20">
                    <el-col :span="6">
                    <div class="grid-content bg-purple">联系方式：{{ reviewFrom.userDate.orderNumber }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">昵称：{{ reviewFrom.userDate.userNum }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">MT账户：{{ reviewFrom.userDate.userMtnum }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">联系方式：{{ reviewFrom.userDate.phoneNunber }}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="grid-content bg-purple">出金／到账金额：{{ reviewFrom.userDate.accessMoneyout }}／{{ reviewFrom.userDate.accessMoneyin }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">汇率：{{ reviewFrom.userDate.exchangeRate }}</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="grid-content bg-purple">出金银行卡：{{ reviewFrom.userDate.bankCardname }} {{ reviewFrom.userDate.bankCardnum }}</div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="grid-content bg-purple">状态：{{ reviewFrom.userDate.applicationStatus }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">申请时间：{{ reviewFrom.userDate.applicationDate }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">处理时间：{{ reviewFrom.userDate.dealWithTime === '' ? '未处理':'已处理' }}</div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple">审核人：{{ reviewFrom.userDate.auditorNme === '' ? '无':reviewFrom.userDate.auditorNme }}</div>
                    </el-col>
                  </el-row>

                  <el-form ref="form" :model="reviewFrom" label-width="100px">
                    <el-form-item label="备注">
                      <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 7 }" v-model="reviewFrom.remarks"></el-input>
                    </el-form-item>

                    <verify :parentVerify.sync="reviewFrom.verify = this.reviewVerify" :parentPhone.sync="managePhone" ></verify>
                  </el-form>
                </p>
              </template>
            </popup>

            <div class="table-Footer">
              <div class="table-botton">
                  <el-button type="info" @click="toggleSelection()">全选</el-button>
                  <el-button type="info" @click="byPassedAll()">通过</el-button>
                  <el-button type="info" @click="notPassedAll()">驳回</el-button>
              </div>
              <paging :sourceData="tableData" :displayData.sync="thisTableData"></paging>
            </div>
          </template>
        </div>
        </div>
    </article>
  </div>
</template>

<script>
var tableField = ['出金单号', '申请人', '联系方式', '出金金额／到账金额 ', '汇率', '出金银行卡', '申请时间', '审核状态', '处理时间', '审核人', '操作'];
import popup from '@comps/popup.vue';
import verify from '@comps/verify.vue';
import paging from '@comps/paging.vue';
export default {
  name: 'MentionEndAudit',
  components: {
    popup,
    verify,
    paging
  },
  data () {
    return {
      form: { // 输入查询数据
        num: '',
        applicant: '',
        outStatus: {},
        date: '',
        include: false,
        belong: ''
      },
      reviewFrom: { // 弹出框数据
        remarks: '',
        userDate: {
          orderNumber: '', // 出金单号
          character: '', // 申请人类别
          userNum: '', // 账号
          userMtnum: '', // MT账号
          phoneNunber: '', // 联系方式
          accessMoneyout: '', // 出金
          accessMoneyin: '', // 到账
          exchangeRate: '', // 汇率
          bankCardname: '', // 银行名字
          bankCardnum: '', // 银行账号
          applicationDate: '', // 申请时间
          applicationStatus: '', // 审核状态
          dealWithTime: '', // 处理时间
          auditorNme: '' // 处理人
        },
        verify: 0
      },
      managePhone: '13726989665',
      showDelMt: false, // 控制弹出框
      show: false, // 控制弹出框
      currentPage4: 1, // 开始页
      needCancel: true, // 是否显示取消按钮
      cloumnChoose: {
        isIndeterminate: true,
        checkedCities: tableField,
        lists: tableField,
        checkAll: true
      },
      tableData: [],
      multipleSelection: []
    };
  },
  computed: {
    reviewVerify () {
      return Math.random(1000 * 9999).toString();
    }
  },
  created: function () {
    this.tableData = this.getTableDate();
  },
  methods: {
    toggleSelection () {
      this.tableData.forEach(row => {
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
    examine (index, row) {
      this.reviewFrom.userDate = row;
      this.needCancel = false;
      this.showDelMt = true;
      console.log(`当前选中查看的用户: ${row}`);
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
    },
    review (index, row) {
      // 审核
      console.log(`当前选中的用户: ${row.orderNumber}`);
      this.reviewFrom.userDate = row;
      this.needCancel = true;
      this.showDelMt = true;
    },
    reviewBy () {
      console.log(this.reviewFrom);
      this.showDelMt = false;
      this.reviewFrom = this.clearedObject(this.reviewFrom);
      this.$message({
        type: 'success',
        message: '操作成功!'
      });
    },
    reviewRefuse () {
      console.log(this.reviewFrom);
      this.showDelMt = false;
      this.reviewFrom = this.clearedObject(this.reviewFrom);
      this.$message({
        type: 'success',
        message: '操作成功!'
      });
    },
    getTableDate () {
      return [{
        orderNumber: 'CJ000000001', // 出金单号
        character: '交易商', // 申请人类别
        userNum: '某某某', // 账号
        userMtnum: '65421', // MT账号
        phoneNunber: '13589646871', // 联系方式
        accessMoneyout: 500, // 出金
        accessMoneyin: 300, // 到账
        exchangeRate: 6.667, // 汇率
        bankCardname: '招商银行', // 银行名字
        bankCardnum: '6228480402564890018', // 银行账号
        applicationDate: '2016-05-03 12:23:34', // 申请时间
        applicationStatus: '待审核', // 审核状态
        dealWithTime: '', // 处理时间
        auditorNme: '' // 处理人
      }, {
        orderNumber: 'CJ000000002222', // 出金单号
        character: '交易商', // 申请人类别
        userNum: '某某某', // 账号
        userMtnum: '65421', // MT账号
        phoneNunber: '13589646871', // 联系方式
        accessMoneyout: 500, // 出金
        accessMoneyin: 300, // 到账
        exchangeRate: 6.667, // 汇率
        bankCardname: '招商银行', // 银行名字
        bankCardnum: '6228480402564890018', // 银行账号
        applicationDate: '2016-05-03 12:23:34', // 申请时间
        applicationStatus: '已审核', // 审核状态
        dealWithTime: '', // 处理时间
        auditorNme: '' // 处理人
      }];
    },
    clearedObject (object) {
      for (let obj in object) {
        if (object[obj] === Object) {
          return this.clearedObject(object);
        } else {
          object[obj] = '';
        }
      }
      return object;
    }
  }
};
</script>

<style lang="less" scoped>
  .mention-end-audit {
    .region-main{
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
                  margin-left: 6px;
                }
              }
            }
          }
        }
      }
      .table-Footer{
        height: 155px;
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
    margin: 52px 34px 0 20px;
    float: left;
    display: inline-block;
  }
  .popup-main{
    width: 900px;
  }
  div.block{
    margin: 52px 34px 0 0;
    display: inline-block;
    float: right;
  }
</style>
