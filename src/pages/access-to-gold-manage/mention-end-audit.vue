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
            <el-date-picker v-model="form.date" type="datetimerange" placeholder="请选择时间范围"></el-date-picker>
          </el-date-picker>
          </el-form-item>
          <el-form-item label="所属代理商">
            <el-input v-model="form.belong" placeholder="代理商"></el-input>
          </el-form-item>

          <el-form-item label="">
            <el-checkbox v-model="form.include">包含间接交易商</el-checkbox>
          </el-form-item>

        </el-form>

        <div class="query-btns">
          
          <el-button type="info" @click="findSubmit">查询</el-button>
          <el-button type="info" @click="guideonSubmit">导出</el-button>
          <list-options :sourceList="labelList" :displayList.sync="showLabelList">
          </list-options>
        </div>
        <div class="dateTable">
          <template>
            <el-table
              ref="multipleTable"
              :data="pageTableData"
              border
              tooltip-effect="light"
              style="width: 100%"
              @selection-change="handleSelectionChange">

              <el-table-column
                type="selection"
                width="55"
                >
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

            <div class="table-Footer">
              <div class="table-botton">
                  <el-button type="info" @click="toggleSelection()">全选</el-button>
                  <el-button type="info" @click="byPassedAll()">通过</el-button>
                  <el-button type="info" @click="notPassedAll()">驳回</el-button>
              </div>
              <paging :sourceData="tableData" :displayData.sync="pageTableData"></paging>
            </div>
          </template>
        </div>
        </div>
    </article>
    <popup :show.sync="showDelMt" :needCancel="needCancel" :title="'出金详情'" v-on:confirmEvent="reviewBy" :confirmText="confirmText" :cancelText="'拒绝'" v-on:cancelEvent="reviewRefuse">
      <template slot="content" >
        <ul class="user-list user-list-three" style="width: 1000px;">
          <li>
            <div class="user-label">出金单号：</div>
            <div class="user-mes">{{ reviewFrom.userDate.orderNumber }}</div>
          </li>
          <li>
            <div class="user-label">昵称：</div>
            <div class="user-mes">{{ reviewFrom.userDate.userNum }}</div>
          </li>
          <li>
            <div class="user-label">MT账户：</div>
            <div class="user-mes">{{ reviewFrom.userDate.userMtnum }}</div>
          </li>
          <li>
            <div class="user-label">联系方式：</div>
            <div class="user-mes">{{ reviewFrom.userDate.phoneNunber }}</div>
          </li>
          <li>
              <div class="user-label">出金／到账金额：</div>
              <div class="user-mes">
                {{ reviewFrom.userDate.accessMoneyout }}／
                {{ reviewFrom.userDate.accessMoneyin }}
              </div>
          </li>
          <li>
            <div class="user-label">汇率：</div>
            <div class="user-mes">{{ reviewFrom.userDate.exchangeRate }}</div>
          </li>
          <li>
              <div class="user-label">出金银行卡：</div>
              <div class="user-mes">
                {{ reviewFrom.userDate.bankCardname }} 
                &nbsp;&nbsp;&nbsp;{{ reviewFrom.userDate.bankCardnum }}
              </div>
          </li>
          <li>
            <div class="user-label">状态：</div>
            <div class="user-mes">{{ reviewFrom.userDate.applicationStatus }}</div>
          </li>
          <li>
            <div class="user-label">申请时间：</div>
            <div class="user-mes">{{ reviewFrom.userDate.applicationDate }}</div>
          </li>
          <li>
            <div class="user-label">处理时间：</div>
            <div class="user-mes">
              {{ reviewFrom.userDate.dealWithTime === '' ? '未处理':'已处理' }}
            </div>
          </li>
          <li>
            <div class="user-label">审核人：</div>
            <div class="user-mes">
              {{ reviewFrom.userDate.auditorNme === '' ? '无':reviewFrom.userDate.auditorNme }}
            </div>
          </li>
        </ul> 
        <ul class="user-list">
        <li>
          <div class="user-label">审核意见：</div>
          <div class="user-mes">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 7 }" v-model="reviewFrom.remarks"></el-input>
          </div>
        </li>
        </ul>
        <el-form :model="reviewFrom" label-width="100px">
          <verify :parentVerify.sync="reviewFrom.verify" :parentPhone.sync="managePhone" ></verify>
        </el-form>
      </template>
    </popup>
  </div>
</template>

<script>
import popup from '@comps/popup.vue';
import verify from '@comps/verify.vue';
import paging from '@comps/paging.vue';
import listOptions from '@comps/list-options.vue';
export default {
  name: 'MentionEndAudit',
  components: {
    popup,
    verify,
    paging,
    'list-options': listOptions
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
      confirmText: '通过',
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
        verify: ''
      },
      managePhone: '13726989665',
      showDelMt: false, // 控制弹出框
      show: false, // 控制弹出框
      currentPage4: 1, // 开始页
      needCancel: true, // 是否显示取消按钮
      labelList: [
        {
          label: '流水编号',
          key: 'waterMoneyNum',
          canSelect: false,
          show: true
        },
        {
          label: '联系方式',
          key: 'phoneNunber',
          canSelect: true,
          show: true
        },
        {
          label: '出金银行卡',
          key: 'bankCardname',
          canSelect: true,
          show: true
        },
        {
          label: '风控状态',
          key: 'dangerStatus',
          canSelect: true,
          show: true
        },
        {
          label: '申请时间',
          key: 'applicationDate',
          canSelect: true,
          show: true
        }
      ],
      showLabelList: [],
      tableData: [],
      pageTableData: [],
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
    examine (index, row) {
      this.reviewFrom.userDate = row;
      this.confirmText = '确认';
      this.needCancel = false;
      this.showDelMt = true;
      console.log(`当前选中查看的用户: ${row}`);
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
      this.confirmText = '通过';
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
          text-align: center;
        }
      }
    }
  }
  .table-botton{
    margin: 52px 34px 0 20px;
    float: left;
    display: inline-block;
  }
</style>
