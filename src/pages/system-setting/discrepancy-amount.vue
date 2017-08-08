<template>
  <div class="discrepancy-amount">
    <div class="content--main__item in-amount-setting">
      <article class="item__header">
        <header>
          入金设置
        </header>
      </article>
      <div class="setting-content">
        <el-form label-width="80px">
          <el-form-item label="最小额度">
            <el-input v-model="inAmountSetting.minQuota"></el-input>
          </el-form-item>
          <el-form-item label="手续费">
            <el-input v-model="inAmountSetting.charge">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="content--main__item out-amount-setting">
      <article class="item__header">
        <header>
          出金设置
        </header>
      </article>
      <div class="setting-content">
        <el-form label-width="90px">
          <el-form-item label="最大额度">
            <el-input v-model="outAmountSetting.maxQuota"></el-input>
          </el-form-item>
          <el-form-item label="最小额度">
            <el-input v-model="outAmountSetting.minQuota"></el-input>
          </el-form-item>
          <el-form-item label="日限额">
            <el-input v-model="outAmountSetting.limitAmount"></el-input>
          </el-form-item>
          <el-form-item label="日次数限制">
            <el-input v-model="outAmountSetting.limitTimes"></el-input>
          </el-form-item>
          <el-form-item label="手续费">
            <el-input v-model="outAmountSetting.charge">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="content--main__item out-time-setting">
      <article class="item__header">
        <header>
          出金时间设置
        </header>
      </article>
      <div class="setting-content">
        <el-form label-width="100px">
          <el-form-item v-for="week in weeks" :key="week.value">
            <div slot="label">
              <el-checkbox v-model="outTimeSetting[week.value].include">{{ week.week }}</el-checkbox>
            </div>
            <el-input :disabled="!outTimeSetting[week.value].include" v-model="outTimeSetting[week.value].time" :placeholder="!outTimeSetting[week.value].include ? '' : '请输入时间段，例：09:00-16:30'"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="content--main__item discrepency-rate-setting">
      <article class="item__header">
        <header>
          出入金汇率设置
        </header>
      </article>
      <div class="setting-content">
        <el-form label-width="80px">
          <el-form-item label="入金汇率">
            <el-input v-model="discrepencyRateSetting.inRate"></el-input>
          </el-form-item>
          <el-form-item label="出金汇率">
            <el-input v-model="discrepencyRateSetting.outRate"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'discrepancy-amount',
      inAmountSetting: {
        minQuota: '',
        charge: ''
      },
      outAmountSetting: {
        maxQuota: '',
        minQuota: '',
        limitAmount: '',
        limitTimes: '',
        charge: ''
      },
      outTimeSetting: {
        monday: {
          include: false,
          time: ''
        },
        tuesday: {
          include: false,
          time: ''
        },
        wednesday: {
          include: false,
          time: ''
        },
        thursday: {
          include: false,
          time: ''
        },
        friday: {
          include: false,
          time: ''
        },
        saturday: {
          include: false,
          time: ''
        },
        sunday: {
          include: false,
          time: ''
        }
      },
      weeks: [{
        week: '星期一',
        value: 'monday'
      }, {
        week: '星期二',
        value: 'tuesday'
      }, {
        week: '星期三',
        value: 'wednesday'
      }, {
        week: '星期四',
        value: 'thursday'
      }, {
        week: '星期五',
        value: 'friday'
      }, {
        week: '星期六',
        value: 'saturday'
      }, {
        week: '星期日',
        value: 'sunday'
      }],
      discrepencyRateSetting: {
        inRate: '',
        outRate: ''
      }
    };
  }
};
</script>

<style lang="less">
.discrepancy-amount {
  color: #ffffff;
  > div:not(:last-child) {
    margin-bottom: 20px;
  }
}
.in-amount-setting .setting-content, .discrepency-rate-setting .setting-content {
  .el-form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &.align-start {
      align-items: flex-start;
    }
  }
  .el-form-item {
    flex-grow: 1;
    flex-shrink: 1;
    max-width: 47%;
    margin: 0 16px;
    .el-form-item__label {
      text-align: right;
    }
  }
}
.out-amount-setting .setting-content {
  .el-form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    &.align-start {
      align-items: flex-start;
    }
  }
  .el-form-item {
    flex-grow: 1;
    flex-shrink: 1;
    max-width: 30%;
    min-width: 30%;
    margin: 0 16px 20px;
    .el-form-item__label {
      text-align: right;
    }
  }
}
.out-time-setting .setting-content {
  .el-form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    &.align-start {
      align-items: flex-start;
    }
  }
  .el-form-item {
    flex-grow: 1;
    flex-shrink: 1;
    max-width: 22%;
    min-width: 22%;
    margin: 0 16px 20px;
    .el-form-item__label {
      text-align: left;
    }
  }
}
</style>
