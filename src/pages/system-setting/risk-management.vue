<template>
  <div class="risk-management">
    <div class="content--main__item bond-setting">
      <article class="item__header">
        <header>
          保证金设置
          <span class="header__sub">红利生效限额，开启红利后，需要缴纳对应保证金以启用红利设置</span>
        </header>
      </article>
      <div class="setting-content">
        <el-form label-width="80px">
          <el-form-item label="代理商：">
            <el-input v-model="bondSetting.agent" placeholder="请输入保证金额"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="content--main__item risk-setting">
      <article class="item__header">
        <header>
          风控设置
          <span class="header__sub">设置组织类型对应的风控值，设置后上级无法修改，可实现全系统统一配置</span>
        </header>
      </article>
      <div class="setting-content">
        <el-form label-width="80px" label-position="top">
          <div class="form-item-row-label">代理商：</div>
          <el-form-item label="授信比例">
            <el-input v-model="riskSetting.credit">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="佣金比例">
            <el-input v-model="riskSetting.commission">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
          <el-form-item label="红利比例">
            <el-input v-model="riskSetting.dividend">
              <template slot="append">%</template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="content--main__item safe-setting">
      <article class="item__header">
        <header>
          保证金设置
          <span class="header__sub">红利生效限额，开启红利后，需要缴纳对应保证金以启用红利设置</span>
        </header>
      </article>
      <div class="setting-content">
        <el-checkbox v-model="safeSetting.allowBlackList">黑名单</el-checkbox>
        <el-input :disabled="!safeSetting.allowBlackList" type="textarea" :autosize="{minRows: 4, maxRows: 6}" placeholder="IP地址黑名单，多个用逗号隔开" v-model="safeSetting.blackList"></el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'risk-management',
      bondSetting: {
        agent: ''
      },
      riskSetting: {
        credit: '',
        commission: '',
        dividend: ''
      },
      safeSetting: {
        allowBlackList: false,
        blackList: ''
      }
    };
  }
};
</script>

<style lang="less">
.risk-management {
  color: #ffffff;
  > div {
    margin-bottom: 20px;
  }
}
.bond-setting .setting-content, .risk-setting .setting-content {
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
    max-width: 25%;
    min-width: 25%;
    margin: 0 16px;
    text-align: left;
    .el-form-item__label {
      text-align: left;
    }
  }
  .form-item-row-label {
    flex-grow: 0;
    flex-shrink: 0;
    max-width: initial;
    min-width: initial;
    align-self: flex-end;
    font-size: 14px;
    margin: 0 10px 10px 16px;
  }
}
.safe-setting .setting-content {
  :last-child {
    margin-top: 12px;
  }
}
</style>
