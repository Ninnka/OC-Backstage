<template>
  <div class="sign-in--wrap">
    <div class="sign-in--head">
      <img src="~@assets/img/logo.png" alt="云软CRM登录LOGO">
      <div class="head--desc">
        <p class="">广州云软数据科技有限公司</p>
        <p class="">Guangzhou Cloudsoft Data Technalogy Limited</p>
      </div>
    </div>
    <div class="sign-in--module__wrap">
      <div class="sign-in--module">
        <div class="module__head">
          <p>运营中心</p>
          <p>金融后台系统</p>
          <div class="head--sperator sperator-half"></div>
          <div class="head--sperator sperator-full"></div>
        </div>
        <div class="module__form">
          <el-form ref="signInForm" :model="signInInfo" :rules="signInRules" label-width="80px">
            <el-form-item label="实盘账号" prop="account">
              <el-input v-model="signInInfo.account" type="text" ></el-input>
            </el-form-item>
            <el-form-item label="交易密码" prop="password">
              <el-input v-model="signInInfo.password" type="password" ></el-input>
            </el-form-item>
            <el-row :gutter="16">
              <el-col :span="16">
                <el-form-item label="验证码" prop="validCode">
                  <el-input v-model="signInInfo.validCode" type="text" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <canvas id="sign-in--valid-canvas" class="sign-in--valid-canvas"></canvas>
              </el-col>
            </el-row>
            <button class="sign-in--submit" @click="submitSignIn">登录</button>
          </el-form>
          <div class="form--additional-action" @click="goRouter('resetPw')">忘记密码？</div>
        </div>
        <div class="module__signup" @click="goRouter('signUp')">注册账号</div>
      </div>
    </div>
    <div class="crm-ver--fixed">Version 1.0</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      signInInfo: {
        account: '',
        password: '',
        validCode: ''
      },
      signInRules: {
        account: [{
          required: true,
          message: '账号不能为空',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur'
        }],
        validCode: [{
          validator: this.checkValidCode,
          trigger: 'change'
        }]
      }
    };
  },
  methods: {
    goRouter (name) {
      this.$router.push({name: name});
    },
    submitSignIn () {
      // TODO: 登录
      this.$store.commit('updateUser', {'name': this.signInInfo.account});
      this.$router.push('tab/personal-information');
    },
    checkValidCode () {
      // TODO: 判断code
    }
  }
};
</script>

<style lang="less">
.clear-float {
  content: '';
  height: 0;
  clear: both;
  display: block;
}
.sign-in--head {
  text-align: left;
  > div {
    vertical-align: middle;
    display: inline-block;
  }
  img {
    vertical-align: middle;
    height: 31px;
    width: 81px;
    margin-left: 24px;
  }
  .head--desc {
    margin-left: 12px;
    color: #ffffff;
    p {
      text-align: left;
      &:first-child {
        font-size: 20px;
      }
      &:last-child {
        font-size: 12px;
      }
    }
  }
}
.sign-in--wrap {
  background-image: url(../assets/img/bg.png);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100%;
  overflow: hidden;
}
.sign-in--head {
  margin-top: 34px;
  height: 40px;
}
.sign-in--module__wrap {
  width: 618px;
  height: 840px;
  margin: 15px 40% 0;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(../assets/img/bg-float.png);
  // background: #34bbff;
}
.sign-in--module {
  // background: rgba(100, 100, 100, .2);
  width: 490px;
  height: 750px;
  margin: 45px auto 0 24px;
  overflow: hidden;
  > div {
    box-sizing: border-box;
    padding-left: 30px;
  }
  .module__head {
    text-align: left;
    margin-top: 185px;
    p {
      &:nth-child(1) {
        font-size: 30px;
        color: #52e3ff;
      }
      &:nth-child(2) {
        font-size: 18px;
        color: #ffffff;
      }
    }
  }
  .module__form {
    position: relative;
    padding-right: 167px;
    margin-top: 34px;
    text-align: left;
    .el-form .el-form-item .el-form-item__label {
      color: #94959a !important;
      text-align: left;
    }
    .form--additional-action {
      position: absolute;
      right: 78px;
      top: 66px;
      color: #94959a !important;
      text-decoration: underline;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .sperator-half {
    margin-top: 4px;
    background: #52e3ff;
    width: 98px;
    height: 3px;
  }
  .sperator-full {
    width: 236px;
    height: 1px;
    background:#648d94;
    border-radius:4px;
    position: relative;
    top: -1px;
  }
}
.sign-in--valid-canvas {
  height: 35px;
  width: 82px;
}
.sign-in--submit{
  width: 100px;
  height: 40px;
  color: #fff;
  font-size: 16px;
  background-image: linear-gradient(-90deg, #00e2b8 0%, #009acd 100%);
  border-radius: 4px;
  margin: 32px 0 0 56px;
  cursor: pointer;
}
.module__signup {
  cursor: pointer;
  padding: 0 !important;
  text-align: left;
  text-indent: 10px;
  color: #ffffff;
  font-size: 14px;
  height: 125px;
  width: 91px;
  line-height: 125px;
  margin: 36px auto 0 241px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(../assets/img/signin-module-signup.png);
}
.crm-ver--fixed {
  position: fixed;
  bottom: 35px;
  right: 50px;
  color: #ffffff;
  font-size: 18px;
}
</style>
