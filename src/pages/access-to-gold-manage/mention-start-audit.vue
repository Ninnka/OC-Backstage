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
            <el-button type="info" @click="guideonSubmit">导出</el-button>
            <el-button type="info" @click="findSubmit">查询</el-button>
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
                  fixed="right">
                  <template scope="scope">
                    <el-button
                      @click="review (scope.$index, scope.row)"
                      type="text"
                      size="small">
                      通过/驳回
                    </el-button>
                  </template>
                </el-table-column>

              </el-table>

              <popup  :show.sync="showDelMt"  :needCancel=true :title="'出金初审意见'"   :cancelText="'驳回'"   v-on:cancelEvent="reviewRefuse"  v-on:confirmEvent="reviewBy"  :confirmText="'通过'">
                <template slot="content" >

                  <p class="del-text">
                    <el-form ref="form" :model="reviewFrom" label-width="100px">
                      <el-form-item label="审核意见">
                        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 7 }" v-model="reviewFrom.reviewOpinion"></el-input>
                      </el-form-item>

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
var tableField = ['出金单号', '申请人', '联系方式', '出金金额／到账金额 ', '出金银行卡', '风控状态', '申请时间', '操作'];
import popup from '@comps/popup.vue';
import verify from '@comps/verify.vue';
import paging from '@comps/paging.vue';
export default {
  name: 'mentionStartAudit',
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
        userNum: '',
        reviewOpinion: ''
      },
      showDelMt: false, // 控制弹出框
      show: false, // 控制弹出框
      currentPage4: 1, // 开始页
      cloumnChoose: {
        isIndeterminate: true,
        checkedCities: tableField,
        lists: tableField,
        checkAll: true
      },
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
      }],
      thisTableData: [],
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
      this.multipleSelection = val;
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
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
      console.log(`选中的用户 ${this.multipleSelection}`);
    },
    notPassedAll () {
      console.log('点击一键驳回');
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
  .el-input-specification{
    width: 230px;
    height: 38px;
  }
  .mention-start-audit {
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
    }  
  }
  .table-botton{
    margin: 52px 0 0 20px;
    float: left;
    display: inline-block;
  }
</style>
