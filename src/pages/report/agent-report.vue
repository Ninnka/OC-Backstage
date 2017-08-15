<template>
  <div class="agent-report">
    <div class="region">
      <article class="item__header">
        <header>
          资金管理
        </header>
      </article>
      <div class="record__form">
        <el-form class="module__form" ref="agentReportForm" :model="agentReportFormInfo" label-width="100px">
          <div class="el-form-item-combine">
            <el-form-item label="编号">
              <el-input v-model="agentReportFormInfo.code" placeholder="请输入编号"></el-input>
            </el-form-item>
            <el-form-item label="时间范围">
              <el-date-picker v-model="agentReportFormInfo.timeRange" type="datetimerange" placeholder="选择查询的时间范围"></el-date-picker>
            </el-form-item>
            <el-form-item label="总返佣">
              <el-col :span="11">
                <el-input v-model="agentReportFormInfo.commissionTotal[0]" placeholder=""></el-input>
              </el-col>
              <el-col class="line" :span="2">
                <div class="line-content"></div>
              </el-col>
              <el-col :span="11">
                <el-input v-model="agentReportFormInfo.commissionTotal[1]" placeholder=""></el-input>
              </el-col>
            </el-form-item>
          </div>
          <div class="el-form-item-combine">
            <el-form-item label="红利盈利次数">
              <el-col :span="11">
                <el-input v-model="agentReportFormInfo.profitFrequency[0]" placeholder=""></el-input>
              </el-col>
              <el-col class="line" :span="2">
                <div class="line-content"></div>
              </el-col>
              <el-col :span="11">
                <el-input v-model="agentReportFormInfo.profitFrequency[1]" placeholder=""></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="红利盈利总额">
              <el-col :span="11">
                <el-input v-model="agentReportFormInfo.profitTotal[0]" placeholder=""></el-input>
              </el-col>
              <el-col class="line" :span="2">
                <div class="line-content"></div>
              </el-col>
              <el-col :span="11">
                <el-input v-model="agentReportFormInfo.profitTotal[1]" placeholder=""></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="红利亏损次数">
              <el-col :span="11">
                <el-input v-model="agentReportFormInfo.lossFrequency[0]" placeholder=""></el-input>
              </el-col>
              <el-col class="line" :span="2">
                <div class="line-content"></div>
              </el-col>
              <el-col :span="11">
                <el-input v-model="agentReportFormInfo.lossFrequency[1]" placeholder=""></el-input>
              </el-col>
            </el-form-item>
          </div>
          <div class="el-form-item-combine">
            <el-form-item label="红利亏损总额">
              <el-col :span="11">
                <el-input v-model="agentReportFormInfo.lossTotal[0]" placeholder=""></el-input>
              </el-col>
              <el-col class="line" :span="2">
                <div class="line-content"></div>
              </el-col>
              <el-col :span="11">
                <el-input v-model="agentReportFormInfo.lossTotal[1]" placeholder=""></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="入金总额">
              <el-col :span="11">
                <el-input v-model="agentReportFormInfo.shiftIn[0]" placeholder=""></el-input>
              </el-col>
              <el-col class="line" :span="2">
                <div class="line-content"></div>
              </el-col>
              <el-col :span="11">
                <el-input v-model="agentReportFormInfo.shiftIn[1]" placeholder=""></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="出金总额">
              <el-col :span="11">
                <el-input v-model="agentReportFormInfo.rollOut[0]" placeholder=""></el-input>
              </el-col>
              <el-col class="line" :span="2">
                <div class="line-content"></div>
              </el-col>
              <el-col :span="11">
                <el-input v-model="agentReportFormInfo.rollOut[1]" placeholder=""></el-input>
              </el-col>
            </el-form-item>
          </div>
          <div class="el-form-item-combine">
            <el-form-item label="账号-名称">
              <el-input v-model="agentReportFormInfo.nickName" placeholder=""></el-input>
            </el-form-item>
            <el-form-item class="el-form-item__no-label">
              <el-checkbox v-model="agentReportFormInfo.isIncludeSub">包含下级代理商</el-checkbox>
            </el-form-item>
          </div>
        </el-form>
        <div class="el-form--buttons">
          <el-button type="info">查询</el-button>
          <list-options :sourceList="tableColsStatus" @update:displayList="updateTableColsStatus"></list-options>
          <!-- <el-dropdown ref="tableColMenu" trigger="click" :hide-on-click="false" :divided="true" @command="menuClickCommand">
            <el-button>
              列表选项<i class="el-icon-caret-bottom el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item class="el-dropdown-item__control-height">
                <div v-for="(col, index) in tableColsName" :key="col">
                  <el-checkbox :disabled="index === 0" v-model="tableColsStatus[col].show">{{ tableColsStatus[col].label }}</el-checkbox>
                </div>
              </el-dropdown-item>
              <el-dropdown-item class="text-center" command="ensure_v2">
                <span class="hightlight-primary">确定</span>
              </el-dropdown-item>
              <el-dropdown-item class="text-center" command="reset_v2">
                <span class="hightlight-warn">重置</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> -->
        </div>

      </div>
      <div class="record__table">
        <el-table :data="resData" style="width: 100%" header-align="center" :row-class-name="tableRowClassName" v-loading.lock="tableLoading" :element-loading-text="elementLoadingText">
          <el-table-column v-for="col in tableColsName" :key="col.key" :prop="col.key" :label="col.label" width="130">
            <template scope="scope">
              <span v-if="col.key === 'code'" :class="getCodeClass(scope)">{{ scope.row[col.key] }}</span>
              <span v-else-if="col.key === 'superior'" :class="getSuperiorClass(scope)">{{ scope.row[col.key] }}</span>
              <span v-else-if="col.key === 'profitRate'">
                {{ scope.row.objSymbol !== 'currentTotal' && scope.row.objSymbol !== 'allTotal' ? scope.row[col.key] * 100 + '%' : scope.row[col.key] }}
              </span>
              <span v-else>{{ scope.row[col.key] }}</span>
            </template>
          </el-table-column>
          <!-- 下面的留下来备用 -->
          <!-- <el-table-column v-if="checkVisibility('code')" prop="code" label="编号" width="120">
            <template scope="scope">
              <span :class="getCodeClass(scope)">{{ scope.row.code }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="checkVisibility('account')" prop="account" label="账号" width="100"></el-table-column>
          <el-table-column v-if="checkVisibility('nickName')" prop="nickName" label="昵称" width="100"></el-table-column>
          <el-table-column v-if="checkVisibility('agentName')" prop="agentName" label="名称" width="130"></el-table-column>
          <el-table-column v-if="checkVisibility('superior')" prop="superior" label="所属上级" width="140">
            <template scope="scope">
              <span v-if="scope.row.objSymbol !== 'currentTotal' && scope.row.objSymbol !== 'allTotal'" class="hightlight-link">{{ scope.row.superior }}</span>
              <span v-else>{{ scope.row.superior }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="checkVisibility('commissionTotal')" prop="commissionTotal" label="总返佣" width="130"></el-table-column>
          <el-table-column v-if="checkVisibility('profitFrequency')" prop="profitFrequency" label="红利盈利次数" width="130"></el-table-column>
          <el-table-column v-if="checkVisibility('profitTotal')" prop="profitTotal" label="红利盈利总额" width="130"></el-table-column>
          <el-table-column v-if="checkVisibility('lossFrequency')" prop="lossFrequency" label="红利亏损次数" width="130"></el-table-column>
          <el-table-column v-if="checkVisibility('lossTotal')" prop="lossTotal" label="红利亏损总额" width="130"></el-table-column>
          <el-table-column v-if="checkVisibility('epicycle')" prop="epicycle" label="红利总盈亏" width="130"></el-table-column>
          <el-table-column v-if="checkVisibility('profitRate')" prop="profitRate" label="盈利率" width="100">
            <template scope="scope">
              <span v-if="scope.row.objSymbol !== 'currentTotal' && scope.row.objSymbol !== 'allTotal'">{{ scope.row.profitRate * 100 + '%' }}</span>
              <span v-else>{{ scope.row.profitRate }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="checkVisibility('shiftInFrequency')" prop="shiftInFrequency" label="入金次数" width="105"></el-table-column>
          <el-table-column v-if="checkVisibility('shiftInTotal')" prop="shiftInTotal" label="入金总额" width="130"></el-table-column>
          <el-table-column v-if="checkVisibility('shiftInCharge')" prop="shiftInCharge" label="入金手续费" width="130"></el-table-column>
          <el-table-column v-if="checkVisibility('rollOutFrequency')" prop="rollOutFrequency" label="出金次数" width="105"></el-table-column>
          <el-table-column v-if="checkVisibility('rollOutTotal')" prop="rollOutTotal" label="出金总额" width="130"></el-table-column>
          <el-table-column v-if="checkVisibility('rollOutCharge')" prop="rollOutCharge" label="出金手续费" width="130"></el-table-column> -->
        </el-table>
      </div>

      <!-- <div class="record__pagination">
        <el-pagination
          @size-change="recordTabelSizeChange"
          @current-change="recordTabelCurrentChange"
          :current-page="recordTabelCurrentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationItemTotal">
        </el-pagination>
      </div> -->

      <paging :sourceData="tableData" @update:displayData="setResData"></paging>

    </div>
  </div>
</template>

<script>
import reportSubpageMixins from '@mixins/report-subpage-mixins';
import tmpAgentReportTableDataMixins from '@mixins/tmp--agent-report--table-data-mixins';

import paging from '@comps/paging';
import listOptions from '@comps/list-options';

import moment from 'moment';

export default {
  components: {
    paging,
    listOptions
  },
  mixins: [reportSubpageMixins, tmpAgentReportTableDataMixins],
  data () {
    return {
      tableColsName: [],
      agentReportFormInfo: {
        code: '',
        nickName: '',
        timeRange: ['', ''],
        commissionTotal: ['', ''],
        shiftIn: ['', ''],
        rollOut: ['', ''],
        profitFrequency: ['', ''],
        profitTotal: ['', ''],
        lossFrequency: ['', ''],
        lossTotal: ['', ''],
        isIncludeSub: false
      }
    };
  },
  methods: {
    getSummaries (resData, total = {}) {
      let nickNames = [];
      let superiors = [];
      resData.forEach((element, index, array) => {
        if (nickNames.indexOf(element.nickName) === -1) {
          nickNames.push(element.nickName);
        }
        if (superiors.indexOf(element.superior) === -1) {
          superiors.push(element.superior);
        }
        total.nickName = nickNames.length;
        total.superior = superiors.length;
        total.commissionTotal += element.commissionTotal;
        total.profitFrequency += element.profitFrequency;
        total.profitTotal += element.profitTotal;
        total.lossFrequency += element.lossFrequency;
        total.lossTotal += element.lossTotal;
        total.epicycle += element.epicycle;
        total.profitRate += element.profitRate;
        total.shiftInFrequency += element.shiftInFrequency;
        total.shiftInTotal += element.shiftInTotal;
        total.shiftInCharge += element.shiftInCharge;
        total.rollOutFrequency += element.rollOutFrequency;
        total.rollOutTotal += element.rollOutTotal;
        total.rollOutCharge += element.rollOutCharge;
        if (index === array.length - 1) {
          total.profitRate = (total.profitRate / array.length).toFixed(2) * 100 + '%';
        }
      });
      return total;
    },
    setAllTotal () {
      let resData = this.tableData;
      let total = {
        objSymbol: 'allTotal',
        code: '总计',
        account: '',
        nickName: 0,
        agentName: '',
        superior: 0,
        commissionTotal: 0,
        profitFrequency: 0,
        profitTotal: 0,
        lossFrequency: 0,
        lossTotal: 0,
        epicycle: 0,
        profitRate: 0,
        shiftInFrequency: 0,
        shiftInTotal: 0,
        shiftInCharge: 0,
        rollOutFrequency: 0,
        rollOutTotal: 0,
        rollOutCharge: 0
      };
      this.allTotalObj = this.getSummaries(resData, total);
      // return this.getSummaries(resData, total);
    },
    setResData (data) {
      if (this.allTotalObj.code === undefined) {
        this.setAllTotal();
      }
      let resData = data;
      let total = {
        objSymbol: 'currentTotal',
        code: '合计',
        account: '',
        nickName: 0,
        agentName: '',
        superior: 0,
        commissionTotal: 0,
        profitFrequency: 0,
        profitTotal: 0,
        lossFrequency: 0,
        lossTotal: 0,
        epicycle: 0,
        profitRate: 0,
        shiftInFrequency: 0,
        shiftInTotal: 0,
        shiftInCharge: 0,
        rollOutFrequency: 0,
        rollOutTotal: 0,
        rollOutCharge: 0
      };
      resData.push(this.getSummaries(resData, total));
      resData.push(this.allTotalObj);
      this.resData = resData;
      console.log('setResData');
      console.log('this.resData', this.resData);
    },
    updateTableColsStatus (param) {
      this.tableColsName = param;
    }
    // agentMenuVisibleChange (visible) {
    //   if (!visible) {
    //     for (let [index, col] of Object.entries(this.tableColsStatus)) {
    //       if (this.tableColsNameControl.indexOf(index) === -1) {
    //         if (index !== 'code') {
    //           col.show = false;
    //         }
    //       }
    //     }
    //   }
    // }
  },
  computed: {
    compuTableData () {
      // let resData = this.tableData.slice((this.recordTabelCurrentPage - 1) * this.pageSize, this.recordTabelCurrentPage * this.pageSize);
      // let total = {
      //   objSymbol: 'currentTotal',
      //   code: '合计',
      //   account: '',
      //   nickName: 0,
      //   agentName: '',
      //   superior: 0,
      //   commissionTotal: 0,
      //   profitFrequency: 0,
      //   profitTotal: 0,
      //   lossFrequency: 0,
      //   lossTotal: 0,
      //   epicycle: 0,
      //   profitRate: 0,
      //   shiftInFrequency: 0,
      //   shiftInTotal: 0,
      //   shiftInCharge: 0,
      //   rollOutFrequency: 0,
      //   rollOutTotal: 0,
      //   rollOutCharge: 0
      // };
      // resData.push(this.getSummaries(resData, total));
      // resData.push(this.allTotalObj);
      // return resData;
    }
  },
  mounted () {
    // this.setAllTotal();
  }
};
</script>

<style lang="less">
.agent-report {
  min-height: 100%;
  box-sizing: border-box;
}
.el-picker-panel__body .el-input__inner {
  color: #1f2d3d !important;
  background-color: #fff !important;
  background-image: none !important;
  border-radius: 4px !important;
  border: 1px solid #bfcbd9 !important;
}
</style>
