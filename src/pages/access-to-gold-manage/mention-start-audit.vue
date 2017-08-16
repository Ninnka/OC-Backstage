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
                stripe
                tooltip-effect="light"
                style="width: 100%"
                @selection-change="handleSelectionChange">

                <el-table-column
                  type="selection"
                  width="50"
                  >
                </el-table-column>
                
                <el-table-column
                  prop="orderNumber"
                  label="出金单号"
                  width="130"
                >
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
                  label="风控状态"
                  width="120">
                    <template scope="scope">
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
                </el-table-column>

                <el-table-column
                  label="申请时间"
                  width="120">
                  <template scope="scope">{{ scope.row.applicationDate }}</template>
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
      tableData: [{
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
      }],
      pageTableData: [],
      multipleSelection: []
    };
  },
  computed: {
  },
  created: function () {
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
