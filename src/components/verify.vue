<template>
  <article class="verity">
    <el-form-item label="手机号码" v-if="needPhone">
    <el-input v-model="phone" placeholder="请输入手机号码"></el-input>
    </el-form-item>
    <el-form-item label="验证码" class="ver-code">
      <el-input v-model="verify" placeholder="请输入验证码"></el-input>
      <button class="verity-btn" @click="getVerity" :disabled="isVerity">{{verityBtnMes}}</button>
    </el-form-item>
  </article>
</template>

<script>
export default {
  name: 'verify',
  data () {
    return {
      phone: '',
      verify: '',
      verityBtnMes: '获取验证码',
      isVerity: false,
      verityBtnInter: ''
    };
  },
  props: {
    needPhone: {
      type: Boolean,
      default: false
    },
    parentPhone: {
      type: String,
      default: ''
    },
    parentVerify: {
      type: String,
      default: ''
    }
  },
  computed: {
  },
  created: function () {
  },
  methods: {
    getVerity () {
      this.isVerity = true;
      this.verityBtnMes = 60;
      this.verityBtnInter = setInterval(() => {
        if (this.verityBtnMes > 0) {
          this.verityBtnMes = this.verityBtnMes - 1;
        } else {
          this.verityBtnMes = '获取验证码';
          window.clearInterval(this.verityBtnInter);
          this.isVerity = false;
        }
      }, 1000);
    }
  },
  watch: {
    phone (val) {
      this.$emit('update:parentPhone', val);
    },
    verify (val) {
      this.$emit('update:parentVerify', val);
    }
  }
};
</script>

<style lang="less" scoped>
  .verity{
    text-align: left;
    .ver-code{
      .el-input{
        width: calc(~"100% - 150px");
        margin-right: 20px;
      }
      .verity-btn{
        width: 100px;
        height: 30px;
        background:#3c3e4b;
        border-radius:4px;
        font-size: 14px;
        color: #fff;
      }
    }
  }
</style>
