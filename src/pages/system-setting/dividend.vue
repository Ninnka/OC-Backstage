<template>
  <div class="dividend">
    <div class="content--main__item basic-setting">
      <article class="item__header">
        <header>
          基本设置
        </header>
      </article>
      <div class="setting-content">
        <el-form label-width="180px">
          <el-form-item label="是否允许修改下级头寸信息">
            <el-switch v-model="basicSetting.allowChangeMaxPosition"></el-switch>
          </el-form-item>
        </el-form>
        <el-form label-width="100px">
          <el-form-item label="默认预警阈值">
            <el-input v-model="basicSetting.threshold" placeholder="请输入预警阈值"></el-input>
          </el-form-item>
          <el-form-item label="头寸最大层级">
            <el-input v-model="basicSetting.maxPosition" placeholder="请输入头寸最大层级"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="content--main__item explosion-setting">
      <article class="item__header">
        <header>
          爆仓设置
        </header>
      </article>
      <div class="setting-content">
        <el-form label-width="105px">
          <el-form-item label="爆仓处理方式">
            <el-select v-model="explosionSetting.resolve" placeholder="">
              <el-option v-for="resolve in resolveArr" :key="resolve" :label="resolve" :value="resolve"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="爆仓判定标准">
            <div class="el-form-item__custom-wrap">
              <el-select v-model="explosionSetting.judgment" placeholder="">
                <el-option v-for="judgment in judgmentArr" :key="judgment" :label="judgment" :value="judgment"></el-option>
              </el-select>
              <el-select v-model="explosionSetting.judgeType" placeholder="" v-show="explosionSetting.resolve === '平台回收寸头'">
                <el-option v-for="judgeType in judgeTypeArr" :key="judgeType" :label="judgeType" :value="judgeType"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="" v-show="explosionSetting.resolve === '平台回收寸头'">
            <el-input class="dbsize" v-model="explosionSetting.customJudgeValue" :placeholder="explosionSetting.judgeType === '持续时间' ? '请输入持续时间' : '请输入触发次数'"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    defaultSetting: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {
      name: 'dividend',
      basicSetting: {
        allowChangeMaxPosition: false,
        threshold: '',
        maxPosition: ''
      },
      explosionSetting: {
        resolve: '平台回收寸头',
        judgment: '以持仓计算',
        judgeType: '触发次数',
        customJudgeValue: ''
      },
      resolveArr: ['上级回收寸头', '平台回收寸头'],
      judgmentArr: ['以平仓计算', '以持仓计算'],
      judgeTypeArr: ['持续时间', '触发次数']
    };
  }
};
</script>

<style lang="less">
.dividend {
  color: #ffffff;
  > div:not(:last-child) {
    margin-bottom: 20px;
  }
}
.basic-setting .setting-content {
  .el-form {
    margin-bottom: 20px;
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
.explosion-setting .setting-content {
  // .el-form {
  //   display: flex;
  //   justify-content: flex-start;
  //   align-items: center;
  //   &.align-start {
  //     align-items: flex-start;
  //   }
  // }
  .el-form-item {
    flex-grow: 1;
    flex-shrink: 1;
    margin: 0 16px 20px;
    text-align: left;
    .el-form-item__label {
      text-align: left;
    }
    .el-input, .el-select {
      width: 302px !important;
      &.dbsize {
        width: 624px !important;
      }
    }
  }
}
.el-form-item__custom-wrap {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  > div {
    &:not(:first-child) {
      margin-left: 20px;
    }
    flex-shrink: 0;
    flex-grow: 0;
  }
}
</style>
