<template>
  <div class="open-account">
    <div class="region simulation-account-setting">
      <article class="item__header">
        <header>
          模拟账户设置
          <span class="header__sub">开启红利后，需要缴纳对应保证金以启用账户</span>
        </header>
      </article>
      <div class="setting-content">
        <el-form label-width="120px">
          <el-form-item label="初始金额">
            <el-input v-model="simulationAccountSetting.initialAmount"></el-input>
          </el-form-item>
          <el-form-item label="有效期">
            <el-select v-model="simulationAccountSetting.validity" placeholder="">
              <el-option v-for="month in getMonths" :key="month" :label="month + '个月'" :value="month"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="region open-account-setting">
      <article class="item__header">
        <header>
          开户设置
          <span class="header__sub">交易商账户设置</span>
        </header>
      </article>
      <div class="setting-content">
        <el-form label-width="120px">
          <el-form-item label="激活额度">
            <el-input v-model="openAccountSetting.activeQuota"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="region mt-account-setting">
      <article class="item__header">
        <header>
          开户设置
          <span class="header__sub">交易商账户设置</span>
        </header>
      </article>
      <div class="setting-content">
        <el-form label-width="120px">
          <el-form-item label="MT账号申请">
            <el-switch v-model="MTAccountSetting.apply"></el-switch>
          </el-form-item>
          <el-form-item label="MT账号数量限制">
            <el-input v-model="MTAccountSetting.limit" placeholder="输入0位不限制"></el-input>
          </el-form-item>
        </el-form>
        <el-form label-width="120px" class="align-start">
          <el-form-item label="默认杠杆">
            <el-input v-model="MTAccountSetting.lever" placeholder="10:100"></el-input>
          </el-form-item>
          <el-form-item label="可选杠杆">
            <el-input type="textarea" :autosize="{minRows: 4, maxRows: 6}" placeholder="输入可选杠杆值，用逗号隔开" v-model="MTAccountSetting.leverOptional"></el-input>
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
      name: 'open-account',
      simulationAccountSetting: {
        initialAmount: '0',
        validity: '12'
      },
      openAccountSetting: {
        activeQuota: '0'
      },
      MTAccountSetting: {
        apply: false,
        limit: '',
        lever: '',
        leverOptional: ''
      }
    };
  },
  computed: {
    getMonths () {
      let months = new Array(12).fill(0);
      return months.map((v, i, a) => {
        return i + 1;
      });
    }
  }
};
</script>

<style lang="less">
.open-account {
  > div:not(:last-child) {
    margin-bottom: 20px;
  }
}
.simulation-account-setting .setting-content,
.open-account-setting .setting-content,
.mt-account-setting .setting-content {
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
  .el-form-item__content {
    text-align: left;
  }
}
</style>
