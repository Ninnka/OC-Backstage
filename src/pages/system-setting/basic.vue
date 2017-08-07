<template>
  <div class="basic">
    <div class="content--main__item avatar-setting">
      <article class="item__header">
        <header>
          默认头像设置
        </header>
      </article>
      <div class="setting-content">
        <div class="avatar--wrap">
          <img src="" alt="">
        </div>
        <div class="avatar--control">修改</div>
      </div>
    </div>

    <div class="content--main__item currency-setting">
      <article class="item__header">
        <header>
          货币设置
          <span class="header__sub">开启红利后，需要缴纳对应保证金以启用账户</span>
        </header>
      </article>
      <div class="setting-content">
        <el-form label-width="80px">
          <el-form-item label="交易币种">
            <el-select v-model="currentcySetting.currencyType" placeholder="">
              <el-option v-for="currentType in currencyTypeArr" :key="currentType" :label="currentType" :value="currentType"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="入金汇率">
            <el-input v-model="currentcySetting.exchangeInRate"></el-input>
          </el-form-item>
          <el-form-item label="出金汇率">
            <el-input v-model="currentcySetting.exchangeOutRate"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="content--main__item dealer-setting">
      <article class="item__header">
        <header>
          交易设置
          <span class="header__sub">交易商账户设置</span>
        </header>
      </article>
      <div class="setting-content">
        <div class="setting-content__item">
          <div class="item-left">
            <el-checkbox v-model="allowDeal"></el-checkbox>
          </div>
          <div class="item-right">
            <p>允许交易</p>
            <p>全局开关，对所有商品，所有交易生效</p>
          </div>
        </div>
        <div class="setting-content__item">
          <div class="item-left">
            <el-checkbox v-model="allowAgent"></el-checkbox>
          </div>
          <div class="item-right">
            <p>开启经纪人</p>
            <p>开启后，交易商可以申请成为交易商经纪人会员</p>
          </div>
        </div>
      </div>
    </div>

    <div class="content--main__item other-setting">
      <article class="item__header">
        <header>
          其他设置
        </header>
      </article>
      <div class="setting-content">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'basic',
      currentcySetting: {
        currencyType: '',
        exchangeInRate: '',
        exchangeOutRate: ''
      },
      currencyTypeArr: [
        '人民币(CNY)',
        '美元',
        '日元'
      ],
      allowDeal: false,
      allowAgent: false
    };
  },
  methods: {
  }
};
</script>

<style lang="less">
.basic {
  color: #ffffff;
  > div {
    margin-bottom: 20px;
  }
}
.setting-content {
  box-sizing: border-box;
  padding: 10px 32px 16px;
  margin-top: 12px;
}
.avatar-setting .setting-content {
  .avatar--wrap {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    background: #DADADA;
  }
  .avatar--control {
    color: #ffffff;
    text-align: center;
    width: 80px;
    margin-top: 12px;
    font-size: 14px;
  }
}
.currency-setting .setting-content {
  .el-form {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .el-form-item {
    flex-grow: 1;
    flex-shrink: 1;
    max-width: 32%;
    margin: 0 16px;
    .el-form-item__label {
      text-align: left;
    }
  }
}
.dealer-setting .setting-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .setting-content__item {
    max-width: 32%;
    margin: 0 16px;
    flex-shrink: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    > div {
      text-align: left;
      background: #202228;
      p {
        margin: 3px 0;
      }
      p:first-child {
        font-size: 14px;
        color: #ffffff;
        font-weight: bold;
      }
      p:last-child {
        font-size: 12px;
        color: #FBFBFB;
      }
    }
    .item-left {
      background: #94959a;
      height: 72px;
      width: 32px;
      flex-grow: 0;
      flex-shrink: 0;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .item-right {
      flex-grow: 1;
      flex-shrink: 1;
      height: 72px;
      box-sizing: border-box;
      padding: 0 45px 0 20px;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
}
</style>
