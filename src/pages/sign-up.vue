<template>
  <div class="sign-up--wrap">
    <div class="popup popup-cus-bg" v-show="showSignUpForm">
      <article class="popup-main posi-rel">
        <article class="popup-main popup-shadow"></article>
        <header>
          实盘开户
          <span class="popup--additional-action" @click="simulationOpenAccount">模拟开户</span>
        </header>
        <div class="popup-content popup-content--norrow-gutter">
          <el-steps :center="true" :align-center="true" :active="activeStep" :space="135" finish-status="finish">
            <el-step title="基本资料"></el-step>
            <el-step title="身份信息"></el-step>
            <el-step title="交易信息"></el-step>
            <el-step title="完成"></el-step>
          </el-steps>

          <div class="form--main-wrap">
            <el-form v-show="activeStep === 0" ref="basicInfoForm" :model="basicInfo" label-width="90px">
              <el-form-item label="交易账号">
                <el-input v-model="basicInfo.account" placeholder="请输入您想要注册的交易账号"></el-input>
              </el-form-item>
              <el-form-item label="昵称">
                <el-input v-model="basicInfo.nickName" placeholder="请输入您想设置的昵称"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="basicInfo.password" placeholder="请输入您的交易密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码">
                <el-input v-model="basicInfo.ensurePassword" placeholder="请在此输入您的交易密码"></el-input>
              </el-form-item>
              <el-form-item label="手机号码">
                <el-input v-model="basicInfo.tel" placeholder="请输入您的手机号码"></el-input>
              </el-form-item>
              <el-form-item label="验证码" class="form-tel">
                <el-row>
                  <el-col :span="16">
                    <el-input v-model="basicInfo.validateTelCode" placeholder="请输入您手机上收到的验证码"></el-input>
                  </el-col>
                  <el-col :span="8"><div class="additional-action">获取验证码</div></el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="邮箱地址">
                <el-input v-model="basicInfo.email" placeholder="请输入您的邮箱地址"></el-input>
              </el-form-item>
              <el-form-item label="推荐码">
                <el-input v-model="basicInfo.recommendCode" placeholder="请输入您的推荐人编码"></el-input>
              </el-form-item>
              <el-form-item label="开户协议" class="form-protocol">
                <el-checkbox v-model="basicInfo.protocol">
                  我已同意<span class="hight-light">《交易商开户协议》</span>和<span class="hight-light">《实盘交易协议》</span>
                </el-checkbox>
              </el-form-item>
            </el-form>
            <el-form v-show="activeStep === 1" ref="identityInfoForm" :model="identityInfo" label-width="100px">
              <el-form-item label="姓名">
                <el-input v-model="identityInfo.name" placeholder="请输入你的真实姓名"></el-input>
              </el-form-item>
              <el-form-item label="证件类型">
                <el-select v-model="identityInfo.certificatesType" placeholder="身份证/港澳通行证/护照">
                  <el-option label="身份证" value="1"></el-option>
                  <el-option label="港澳通行证" value="2"></el-option>
                  <el-option label="护照" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="证件编号">
                <el-input v-model="identityInfo.certificatesCode" placeholder="请输入您的证件编号"></el-input>
              </el-form-item>
              <el-form-item label="证件有效期">
                <el-date-picker v-model="identityInfo.certificatesValidity" type="daterange" placeholder="请选择您的证件有效期"></el-date-picker>
              </el-form-item>
              <el-form-item label="证件照片" class="form-mult--columns">
                <upload-image cusClass="upload-image__idcard" @fileLoaded="idCardFileLoaded">
                  <template slot="upload-image__slot">
                    <div class="upload-image__cus-wrap">
                      <i class="el-icon-plus"></i>
                      <div class="">添加身份证正面</div>
                    </div>
                  </template>
                </upload-image>
                <upload-image cusClass="upload-image__idcard" @fileLoaded="idCardFileLoaded">
                  <template slot="upload-image__slot">
                    <div class="upload-image__cus-wrap">
                      <i class="el-icon-plus"></i>
                      <div class="">添加身份证反面</div>
                    </div>
                  </template>
                </upload-image>
              </el-form-item>
              <el-form-item label="账单投递地址" class="form-mult--columns">
                <el-select v-model="identityInfo.province" placeholder="请选择省份">
                  <el-option label="广东" value="1"></el-option>
                </el-select>
                <el-select v-model="identityInfo.city" placeholder="请选择城市">
                  <el-option label="深圳" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="identityInfo.address" placeholder="请输入详细地址信息"></el-input>
              </el-form-item>
            </el-form>
            <el-form v-show="activeStep === 2" ref="dealInfoForm" :model="dealInfo" label-width="100px">
              <el-form-item label="开户银行">
                <el-select v-model="dealInfo.bankName" placeholder="请选择您的开户银行">
                  <el-option label="广发银行" value="1"></el-option>
                  <el-option label="中国建设银行" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="开户支行" class="form-mult--columns">
                <el-select v-model="dealInfo.bankProvince" placeholder="请选择省份">
                  <el-option label="广东" value="1"></el-option>
                </el-select>
                <el-select v-model="dealInfo.bankCity" placeholder="请选择城市">
                  <el-option label="深圳" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="">
                <el-input v-model="dealInfo.bankBranch" placeholder="请输入支行名称"></el-input>
              </el-form-item>
              <el-form-item label="开户账号">
                <el-input v-model="dealInfo.bankAccount" placeholder="请输入您的证书编号"></el-input>
              </el-form-item>
              <el-form-item label="银行卡照片" class="form-mult--columns">
                <upload-image cusClass="upload-image__idcard" @fileLoaded="bankCardFileLoaded">
                  <template slot="upload-image__slot">
                    <div class="upload-image__cus-wrap">
                      <i class="el-icon-plus"></i>
                      <div class="">添加银行卡正面</div>
                    </div>
                  </template>
                </upload-image>
                <upload-image cusClass="upload-image__idcard" @fileLoaded="bankCardFileLoaded">
                  <template slot="upload-image__slot">
                    <div class="upload-image__cus-wrap">
                      <i class="el-icon-plus"></i>
                      <div class="">添加银行卡反面</div>
                    </div>
                  </template>
                </upload-image>
              </el-form-item>
              <el-form-item label="开户人姓名" class="form-mult--columns">
                <el-input v-model="dealInfo.accountName" placeholder="请输入开户人姓名"></el-input>
              </el-form-item>
              <el-form-item label="预留手机">
                <el-input v-model="dealInfo.accountTel" placeholder="请输入您在开户时预留的手机号"></el-input>
              </el-form-item>
            </el-form>
            <div v-show="activeStep === 3" class="form--complete">
               <i class="el-icon-check"></i>
               <p class="">您的资料已成功提交！</p>
               <p class="">我们正在加紧进行审核，审核结果将发送至预留的手机和邮箱，敬请留意。</p>
            </div>
          </div>

          <div class="form--buttons-wrap">
            <button v-show="activeStep !== 0" class="pre--btn" @click="preStep">上一步</button>
            <button v-show="activeStep !== 3" class="next--btn" @click="nextStep">下一步</button>
            <button v-show="activeStep === 3" class="complete--btn" @click="completeStep">完成</button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import uploadImage from '@comps/upload-image';

export default {
  components: {
    uploadImage
  },
  data () {
    return {
      showSignUpForm: true,
      activeStep: 0,
      basicInfo: {
        account: '',
        nickName: '',
        password: '',
        ensurePassword: '',
        tel: '',
        validateTelCode: '',
        email: '',
        recommendCode: '',
        protocol: false
      },
      identityInfo: {
        name: '',
        certificatesType: '',
        certificatesCode: '',
        certificatesValidity: ['', ''],
        province: '',
        city: '',
        address: ''
      },
      idCardList: [],
      dealInfo: {
        bankName: '',
        bankProvince: '',
        bankCity: '',
        bankBranch: '',
        bankAccount: '',
        accountName: '',
        accountTel: ''
      },
      bankCardList: []
    };
  },
  methods: {
    simulationOpenAccount () {
      // TODO:
      console.log('simulationOpenAccount');
    },
    idCardFileLoaded (param) {
      for (let i = 0; i < this.idCardList.length; i++) {
        if (this.idCardList[i].symbolId === param.symbolId) {
          this.idCardList[i] = param;
          return;
        }
      }
      this.idCardList.push(param);
    },
    bankCardFileLoaded (param) {
      for (let i = 0; i < this.bankCardList.length; i++) {
        if (this.bankCardList[i].symbolId === param.symbolId) {
          this.bankCardList[i] = param;
          return;
        }
      }
      this.bankCardList.push(param);
    },
    submitInfo () {
      // TODO: 提交信息
    },
    preStep () {
      this.activeStep -= 1;
    },
    nextStep () {
      if (this.activeStep === 0 && !this.basicInfo.protocol) {
        this.$message({
          showClose: true,
          duration: 2000,
          type: 'error',
          message: '请先同意开户协议'
        });
        return;
      }
      this.activeStep === 2 && this.submitInfo();
      this.activeStep += 1;
    },
    completeStep () {
      // TODO: 跳转到登录页
      this.$router.replace('signin');
    }
  }
};
</script>

<style lang="less">
@main-theme-sub: #94959a;
@step-main-theme: #52e3ff;

.posi-rel {
  position: relative;
}
.sign-up--wrap {
  height: 100%;
  button {
    cursor: pointer;
    margin: 0 24px;
  }
  .pre--btn {
    background-image: linear-gradient(-90deg, #ff5862 0%, #e54f9a 100%);
    border-radius: 4px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
  }
  .next--btn, .complete--btn {
    background-image: linear-gradient(-90deg, #00e2b8 0%, #009acd 100%);
    border-radius: 4px;
    width: 100px;
    height: 40px;
    line-height: 40px;
    color: #ffffff;
  }
}
.popup-cus-bg {
  background-image: url(../assets/img/bg.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
.popup-shadow {
  position: absolute;
  top: -16px;
  left: -16px;
  width: 552px !important;
  height: 772px !important;
  z-index: -1;
  background: rgba(0, 0, 0, 0.5);
}
.popup--additional-action {
  font-size: 14px;
  color: #ffffff;
  position: absolute;
  top: 0;
  right: 10px;
  cursor: pointer;
}
.form-tel {
  .additional-action {
    margin-left: 12px;
    text-align: center;
    cursor: pointer;
    background: #202228;
  }
}
.form-protocol {
  span.el-checkbox__label {
    color: #ffffff;
  }
  .hight-light {
    color: @step-main-theme !important;
  }
}
.popup-content {
  &--norrow-gutter {
    padding: 30px 8% !important;
  }
  .el-steps {
    margin-bottom: 28px;
  }
}
.form--main-wrap {
  position: relative;
  height: 500px;
  display: flex;
  justify-content: center;
  align-content: center;
}
.form--buttons-wrap {
  margin-top: 12px;
}
.el-step__icon {
  width: 21px;
  height: 21px;
  line-height: 21px;
}
.el-step__head {
  width: 21px;
  height: 21px;
  border-width: 1px !important;
  font-size: 14px !important;
  background: initial !important;
  &.is-process {
    color: #333333 !important;
    background-color: @step-main-theme !important;
    border-color: @step-main-theme !important;

  }
  &.is-finish {
    color: @step-main-theme !important;
    background-color: initial !important;
    border-color: @step-main-theme !important;
    .el-step__line-inner {
      width: 100% !important;
      height: 1px !important;
      background-color: @step-main-theme !important;
    }
  }
}
.el-step__line {
  &.is-horizontal {
    top: 11px;
    height: 1px;
    left: 23px;
    right: 0;
    margin: 0 24px 0 12px !important;
  }
  .el-step__line-inner {
    border: none;
  }
}
.el-step__title {
  color: #ffffff;
  &.is-process {
    color: #ffffff !important;
  }
  &.is-finish {
    color: @step-main-theme !important;
  }
}
.form-mult--columns {
  .el-form-item__content{
    display: flex;
    justify-content: space-between;
    > div {
      flex-basis: 50%;
      flex-grow: 1;
      flex-shrink: 1;
      &:nth-child(1) {
        margin-right: 12px;
      }
    }
  }
}
.form-mult--columns {
  .el-form-item__content {
    display: flex;
    justify-content: space-between;
    > div {
      flex-basis: 50%;
      flex-grow: 1;
      flex-shrink: 1;
      &:nth-child(1) {
        margin-right: 12px;
      }
    }
  }
}
.form--complete {
  text-align: center;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  i {
    font-size: 120px;
    margin-bottom: 20px;
  }
  p {
    margin: 10px auto;
    &:nth-child(2) {
      max-width: 50%;
      font-size: 18px;
    }
    &:nth-child(3) {
      max-width: 65%;
      font-size: 14px;
      color: #00dfb9;
    }
  }
}
.upload-image__idcard {
  width: auto;
  height: auto;
}
.upload-image__cus-wrap {
  text-align: center;
  height: 95px;
  border-radius: 9px;
  border: 1px solid #55565c;
  background: initial;
  color: @main-theme-sub;
  i {
    font-size: 20px;
    margin-top: 24px;
  }
}
.el-form-item__content {
  .el-date-editor {
    width: 100%;
  }
}
</style>
