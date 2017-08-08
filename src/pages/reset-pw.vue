<template>
  <div class="reset-pw--wrap">
    <div class="popup popup-cus-bg" v-show="showResetPWForm">
      <article class="popup-main posi-rel">
        <article class="popup-main popup-shadow"></article>
        <header>
          重置密码
        </header>
        <div class="popup-content">
          <div class="form--main-wrap">
            <el-form ref="resetPWForm" :model="resetPWInfo" :rules="resetPWRules" label-width="90px">
              <el-form-item label="交易账号" prop="account">
                <el-input v-model="resetPWInfo.account" placeholder="请输入您想要注册的交易账号"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="tel">
                <el-input v-model="resetPWInfo.tel" placeholder="请输入您预留的手机号码"></el-input>
              </el-form-item>
              <el-form-item label="验证码" class="form-tel" prop="validateTelCode">
                <el-row>
                  <el-col :span="16">
                    <el-input v-model="resetPWInfo.validateTelCode" placeholder="请输入您手机上收到的验证码"></el-input>
                  </el-col>
                  <el-col :span="8"><div class="additional-action">获取验证码</div></el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="新密码" prop="password">
                <el-input v-model="resetPWInfo.password" placeholder="请输入您设置的新密码"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="ensurePassword">
                <el-input v-model="resetPWInfo.ensurePassword" placeholder="请再次输入您设置的新密码"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <div class="form--buttons-wrap">
            <button class="complete--btn" @click="submitReset('resetPWForm')">完成</button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showResetPWForm: true,
      validateTelCode: '',
      resetPWInfo: {
        account: '',
        tel: '',
        validateTelCode: '',
        password: '',
        ensurePassword: ''
      },
      resetPWRules: {
        account: [{
          required: true,
          message: '交易账号不能为空',
          trigger: 'blur'
        }],
        tel: [{
          required: true,
          message: '手机号不能为空',
          trigger: 'blur'
        }],
        validateTelCode: [{
          validator: this.checkValidateTelCode
        }],
        password: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }],
        ensurePassword: [{
          required: true,
          message: '确认密码不能为空',
          trigger: 'blur'
        }, {
          validator: this.ensurePassword,
          trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    ensurePassword (rule, value, callback) {
      if (value !== this.resetPWInfo.password) {
      }
    },
    checkValidateTelCode (rule, value, callback) {
      this.validateTelCode === this.resetPWInfo.validateTelCode;
    },
    submitReset (formName) {
      // TODO: 已设置表单验证的雏形
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less">
.posi-rel {
  position: relative;
}
.reset-pw--wrap {
  height: 100%;
  button {
    cursor: pointer;
    margin: 0 24px;
  }
  .complete--btn {
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
  bottom: -16px;
  left: -16px;
  width: 552px !important;
  z-index: -1;
  background: rgba(0, 0, 0, 0.5);
}
.form--main-wrap {
  position: relative;
  // height: 500px;
}
.form-tel {
  .additional-action {
    margin-left: 12px;
    text-align: center;
    cursor: pointer;
    background: #202228;
  }
}
.form--buttons-wrap {
  margin-top: 12px;
}
</style>
