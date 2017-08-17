<template>
  <div class="mention-start-audit">
    <article class="region">
      <header>
        出金初审
      </header>
      <div class="region-main">
          
          <el-form class="filter-input" ref="form" :model="form" label-width="100px">
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
              <el-date-picker v-model="form.date" type="datetimerange" placeholder="请选择时间范围"></el-date-picker>
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
                v-loading.lock="false"
                stripe
                tooltip-effect="light"
                style="width: 100%"
                @selection-change="handleSelectionChange">

                <el-table-column
                  type="selection"
                  width="50"
                  >
                </el-table-column>
                
                <el-table-column v-for="col in showLabelList" :label="col.label" :width="getTableColumnWidth (col.label)" :key="col.key">
                  <template scope="scope">
                    <template v-if="col.label === '申请人'">
                      <div slot="reference" class="name-wrapper" v-if="col.label === '申请人'">
                        <el-tag>{{ scope.row.character }}</el-tag>
                        <div>
                          <span @click="viewUserMes (scope.row.userNum)">
                            账号：{{ scope.row.userNum }}
                          </span>
                          <span @click="viewUserMes (scope.row.userMtnum)">
                            MT账号：{{ scope.row.userMtnum }}
                          </span>
                        </div>
                      </div>
                    </template>
                    <template v-if="col.label === '出金银行卡'">
                      <p>{{ scope.row.bankCardname }}</p>
                      {{ scope.row.bankCardnum }}
                    </template>
                    <template v-else-if="col.label === '风控状态'">
                      <el-popover trigger="hover" placement="bottom" v-if="scope.row.dangerStatus !== '正常'">  
                          <p>有风险</p>
                          <div slot="reference">
                            {{ scope.row.dangerStatus }}
                          </div>
                      </el-popover>
                      <div v-else>
                        {{ scope.row.dangerStatus }}
                      </div>
                    </template>
                    <template v-else-if="col.label === '出金金额／到账金额'">
                      {{ scope.row.accessMoneyout }}/
                      {{ scope.row.accessMoneyin }}
                    </template>
                    <template v-else>
                      {{ scope.row[col.key] }}
                    </template>
                  </template>
                </el-table-column>

                <el-table-column
                  label="操作"
                  width="120"
                  fixed="right"
                  >
                  <template scope="scope">
                    <el-button
                      @click="review (scope.$index, scope.row)"
                      type="text"
                      size="small"
                      >
                      通过/驳回
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
    <popup  :show.sync="showDelMt"  :needCancel=true :title="'出金初审意见'"  :cancelText="'驳回'"   v-on:cancelEvent="reviewRefuse"  v-on:confirmEvent="reviewBy"  :confirmText="'通过'">
      <template slot="content" >
        <ul class="user-list">
        <li>
          <div class="user-label">审核意见：</div>
          <div class="user-mes">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 7 }" v-model="reviewFrom.remarks"></el-input>
          </div>
        </li>
        </ul>
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
  name: 'mentionStartAudit',
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
      reviewFrom: { // 弹出框数据
        userNum: '',
        reviewOpinion: ''
      },
      showDelMt: false, // 控制弹出框
      show: false, // 控制弹出框
      labelList: [
        {
          label: '出金单号',
          key: 'orderNumber',
          canSelect: false,
          show: true
        },
        {
          label: '申请人',
          key: '',
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
          label: '出金金额／到账金额',
          key: '',
          canSelect: true,
          show: true
        },
        {
          label: '出金银行卡',
          key: '',
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
  },
  created: function () {
    this.tableData = this.tableAll();
  },
  methods: {
    toggleSelection () {
      this.tableData.forEach(row => {
        this.$refs.multipleTable.toggleRowSelection(row);
      });
    },
    handleSelectionChange (val) {
      console.log(val);
      this.multipleSelection = val;
    },
    review (index, row) {
      // 审核
      console.log(`当前选中的用户: ${row.userMtnum}`);
      let num = row.userMtnum;
      let phone = row.phoneNunber;
      this.reviewFrom = {
        userNum: row.userMtnum,
        reviewOpinion: ''
      };
      this.showDelMt = true;
    },
    findSubmit () {
      console.log('点击查询');
    },
    guideonSubmit () {
      console.log('点击导出');
    },
    byPassedAll () {
      console.log('点击一键通过');
      console.log(`选中的用户 ${this.multipleSelection}`);
    },
    notPassedAll () {
      console.log('点击一键驳回');
      console.log(this.showLabelList[0].show);
    },
    reviewBy () {
      console.log(this.reviewFrom);
      this.showDelMt = false;
      this.reviewFrom = this.clearedObject(this.reviewFrom);
      this.$message({
        type: 'success',
        message: '已通过!'
      });
    },
    reviewRefuse () {
      console.log(this.reviewFrom);
      this.showDelMt = false;
      this.reviewFrom = this.clearedObject(this.reviewFrom);
      this.$message({
        type: 'success',
        message: '已驳回!'
      });
    },
    clearedObject (object) {
      for (let obj in object) {
        object[obj] = '';
      }
      return object;
    },
    viewUserMes (mes) {
      this.$router.push('personal-information');
    },
    openLoading () {
      this.tableLoading = true;
      setInterval(() => {
        this.tableLoading = false;
      }, 2000);
    },
    getTableColumnWidth (val) {
      let width = 0;
      switch (val) {
        case '出金单号':
          width = 130;
          break;
        case '申请人':
          width = 250;
          break;
        case '联系方式':
          width = 130;
          break;
        case '出金金额／到账金额':
          width = 170;
          break;
        case '出金银行卡':
          width = 185;
          break;
        case '风控状态':
          width = 120;
          break;
        case '申请时间':
          width = 120;
          break;
      }
      return width;
    },
    tableAll () {
      this.openLoading();
      return [{
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
        dangerStatus: '不正常',
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
      }];
    }
  }
};
</script>

<style lang="less" scoped>
  .mention-start-audit {
    .region-main{
      .table-Footer{
        height: 155px;
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
                  margin-left: 4px;
                  text-align: center;
                  &:hover{
                    color: #436EEE;
                  }
                }
              }
            }
          }
        }
      }
    }  
  }
  .table-botton{
    margin: 52px 0 0 20px;
    float: left;
    display: inline-block;
  }
</style>
