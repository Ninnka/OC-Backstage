<template>
  <div class="dealer-report">
    <div class="content--main__item manage--record">
      <article class="item__header">
        <header>
          资金管理
        </header>
      </article>
      <div class="record__form">
        <el-form class="module__form" ref="agentReportForm" :model="dealerReportFormInfo" label-width="80px">
          <div class="el-form-item-combine">
            <el-form-item label="编号">
              <el-input v-model="dealerReportFormInfo.code" placeholder="请输入编号"></el-input>
            </el-form-item>
            <el-form-item label="账号-昵称">
              <el-input v-model="dealerReportFormInfo.nickName" placeholder="请选择输入编号或者用户昵称"></el-input>
            </el-form-item>
            <el-form-item label="时间范围">
              <el-date-picker v-model="dealerReportFormInfo.timeRange" type="datetimerange" placeholder="选择查询的时间范围"></el-date-picker>
            </el-form-item>
          </div>
          <div class="el-form-item-combine">
            <el-form-item label="交易次数">
              <el-col :span="11">
                <el-input v-model="dealerReportFormInfo.dealerFrequency[0]" placeholder=""></el-input>
              </el-col>
              <el-col class="line" :span="2">
                <div class="line-content"></div>
              </el-col>
              <el-col :span="11">
                <el-input v-model="dealerReportFormInfo.dealerFrequency[1]" placeholder=""></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="交易量">
              <el-col :span="11">
                <el-input v-model="dealerReportFormInfo.dealerAmount[0]" placeholder=""></el-input>
              </el-col>
              <el-col class="line" :span="2">
                <div class="line-content"></div>
              </el-col>
              <el-col :span="11">
                <el-input v-model="dealerReportFormInfo.dealerAmount[1]" placeholder=""></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="入金总额">
              <el-col :span="11">
                <el-input v-model="dealerReportFormInfo.shiftIn[0]" placeholder=""></el-input>
              </el-col>
              <el-col class="line" :span="2">
                <div class="line-content"></div>
              </el-col>
              <el-col :span="11">
                <el-input v-model="dealerReportFormInfo.shiftIn[1]" placeholder=""></el-input>
              </el-col>
            </el-form-item>
          </div>
          <div class="el-form-item-combine">
            <el-form-item label="出金总额">
              <el-col :span="11">
                <el-input v-model="dealerReportFormInfo.rollOut[0]" placeholder=""></el-input>
              </el-col>
              <el-col class="line" :span="2">
                <div class="line-content"></div>
              </el-col>
              <el-col :span="11">
                <el-input v-model="dealerReportFormInfo.rollOut[1]" placeholder=""></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="盈利总额">
              <el-col :span="11">
                <el-input v-model="dealerReportFormInfo.profitTotal[0]" placeholder=""></el-input>
              </el-col>
              <el-col class="line" :span="2">
                <div class="line-content"></div>
              </el-col>
              <el-col :span="11">
                <el-input v-model="dealerReportFormInfo.profitTotal[1]" placeholder=""></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="亏损总额">
              <el-col :span="11">
                <el-input v-model="dealerReportFormInfo.lossTotal[0]" placeholder=""></el-input>
              </el-col>
              <el-col class="line" :span="2">
                <div class="line-content"></div>
              </el-col>
              <el-col :span="11">
                <el-input v-model="dealerReportFormInfo.lossTotal[1]" placeholder=""></el-input>
              </el-col>
            </el-form-item>
          </div>
          <div class="el-form-item-combine">
            <el-form-item label="盈利率">
              <el-col :span="11">
                <el-input v-model="dealerReportFormInfo.profitRate[0]" placeholder=""></el-input>
              </el-col>
              <el-col class="line" :span="2">
                <div class="line-content"></div>
              </el-col>
              <el-col :span="11">
                <el-input v-model="dealerReportFormInfo.profitRate[1]" placeholder=""></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="所属上级">
              <el-input v-model="dealerReportFormInfo.superiorng" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
              <el-checkbox v-model="dealerReportFormInfo.isIncludeIndirect">包含间接交易商</el-checkbox>
            </el-form-item>
          </div>
        </el-form>
        <div class="el-form--buttons">
          <el-button type="info">查询</el-button>
        </div>

      </div>
      <div class="record__table">
        <el-table :data="dealerReportTableData" style="width: 100%" header-align="center" :row-class-name="tableRowClassName">
          <el-table-column prop="code" label="编号"></el-table-column>
          <el-table-column prop="account" label="账号"></el-table-column>
          <el-table-column prop="nickName" label="昵称"></el-table-column>
          <el-table-column prop="agentName" label="名称"></el-table-column>
          <el-table-column prop="superior" label="所属上级"></el-table-column>
          <el-table-column prop="dealerFrequency" label="交易次数"></el-table-column>
          <el-table-column prop="dealerAmount" label="交易量"></el-table-column>
          <el-table-column prop="charge" label="手续费"></el-table-column>
          <el-table-column prop="profitFrequency" label="红利盈利次数"></el-table-column>
          <el-table-column prop="profitTotal" label="红利盈利总额"></el-table-column>
          <el-table-column prop="lossFrequency" label="红利亏损次数"></el-table-column>
          <el-table-column prop="lossTotal" label="红利亏损总额"></el-table-column>
          <el-table-column prop="drawFrequency" label="平手次数"></el-table-column>
          <el-table-column prop="drawTotal" label="平手总额"></el-table-column>
          <el-table-column prop="interest" label="利息"></el-table-column>
          <el-table-column prop="epicycle" label="红利总盈亏"></el-table-column>
          <el-table-column prop="profitRate" label="盈利率"></el-table-column>
          <el-table-column prop="shiftInFrequency" label="入金次数"></el-table-column>
          <el-table-column prop="shiftInTotal" label="入金总额"></el-table-column>
          <el-table-column prop="shiftInCharge" label="入金手续费"></el-table-column>
          <el-table-column prop="rollOutFrequency" label="出金次数"></el-table-column>
          <el-table-column prop="rollOutTotal" label="出金总额"></el-table-column>
          <el-table-column prop="rollOutCharge" label="出金手续费"></el-table-column>
        </el-table>
      </div>
      <div class="record__total">
        <div class="total--currentpage">
          <el-row>
            <el-col :span="6">
              合计：10
            </el-col>
            <el-col :span="6">
              2
            </el-col>
            <el-col :span="6" style="text-align: right;">
              +999.999.00
            </el-col>
            <el-col :span="6" style="text-align: left;">
              <div class="c-lineheight-wrap">
                <p class="c-lineheight">未知：1</p>
                <p class="c-lineheight">成功：9</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="total--allpage">
          <el-row>
            <el-col :span="6">
              总计：10
            </el-col>
            <el-col :span="6">
              6
            </el-col>
            <el-col :span="6" style="text-align: right;">
              +999.999.00
            </el-col>
            <el-col :span="6" style="text-align: left;">
              <div class="c-lineheight-wrap">
                <p class="c-lineheight">未知：0</p>
                <p class="c-lineheight">成功：99</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="record__pagination">
        <el-pagination
          @size-change="recordTabelSizeChange"
          @current-change="recordTabelCurrentChange"
          :current-page="recordTabelCurrentPage"
          :page-sizes="[5, 10, 20]"
          :page-size="5"
          layout="total, sizes, prev, pager, next, jumper"
          :total="50">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import tmpDealerReportTableDataMixins from '@mixins/tmp--dealer-report--table-data-mixins';

import moment from 'moment';

export default {
  mixins: [tmpDealerReportTableDataMixins],
  data () {
    return {
      dealerReportFormInfo: {
        code: '',
        nickName: '',
        timeRange: ['', ''],
        dealerFrequency: ['', ''],
        dealerAmount: ['', ''],
        shiftIn: ['', ''],
        rollOut: ['', ''],
        profitTotal: ['', ''],
        lossTotal: ['', ''],
        profitRate: ['', ''],
        superiorng: '',
        isIncludeIndirect: false
      },
      recordTabelCurrentPage: 1
    };
  },
  methods: {
    tableRowClassName (row, index) {
      if (index % 2 === 1) {
        return 'even-row';
      }
      return 'odd-row';
    },
    recordTabelSizeChange () {

    },
    recordTabelCurrentChange () {

    }
  },
  computed: {
  }
};
</script>

<style lang="less">
.dealer-report {
  min-height: 100%;
  box-sizing: border-box;
  padding: 20px;
}
// -----------------
.el-form-item-combine {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  > div {
    flex-shrink: 1;
    flex-grow: 1;
    margin: 0 10px 20px;
    max-width: 32%;
  }
}
.el-form-item-combine {
  .el-date-editor--datetimerange.el-input {
    width: 100%;
  }
}
.record__form {
  .line {
    text-align: center;
    color: #ffffff;
    .line-content {
      display: inline-block;
      vertical-align: middle;
      width: 40%;
      height: 1px;
      background: #ffffff;
    }
  }
  .el-checkbox__label {
    color: #ffffff !important;
  }
}
.el-form--buttons {
  text-align: right;
}
</style>
