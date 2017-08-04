<template>
  <article class="popup mention" v-show="show">
    <div class="popup-main">
      <header>
        出金
        <i class="close" @click="close">×</i>
      </header>
      <div class="popup-content">
        <el-form ref="form" :model="mentionForm" label-width="100px">
          <el-form-item label="出金账号">
            <el-select v-model="mentionForm.account" placeholder="请选择账号">
              <el-option  v-for="item in accountList" :key="item.name" :label="item.name" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="$出金金额">
            <el-input v-model="mentionForm.amount" placeholder="请输入金额"></el-input>
          </el-form-item>
          <el-form-item :label="'￥汇率：'+mentionDeploy.exchange">
            <!--<el-input v-model="mentionForm.amount*mentionDeploy.exchange" :disabled="true"></el-input>-->
            <p>{{mentionForm.amount*mentionDeploy.exchange}}</p>
          </el-form-item>
          <el-form-item label="￥手续费">
            <p>{{mentionForm.amount*mentionDeploy.exchange*mentionDeploy.fee}}</p>
            <!--<el-input v-model="mentionForm.amount*mentionDeploy.exchange*mentionDeploy.fee" :disabled="true"></el-input>-->
          </el-form-item>
          <el-form-item label="￥实际出金">
            <p>{{mentionForm.amount*mentionDeploy.exchange*(1+mentionDeploy.fee)}}</p>
            <!--<el-input v-model="mentionForm.amount*mentionDeploy.exchange*(1+mentionDeploy.fee)" :disabled="true"></el-input>-->
          </el-form-item>
          <el-form-item label="目标账号">
            <el-select v-model="mentionForm.region" placeholder="请选择银行卡">
              <el-option  v-for="item in bankList" :key="item.name" :label="item.name" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <verify :parentVerify.sync="mentionForm.verify"></verify>
        </el-form>
        <button class="sure-btn" @click="close">出金</button>
      </div>
    </div>
  </article>
</template>

<script>
import verify from '@comps/verify.vue';
export default {
  name: 'mention',
  components: {
    verify
  },
  data () {
    return {
      mentionForm: {
        amount: '',
        account: '',
        region: '',
        verify: ''
      },
      verityBtnMes: '获取验证码',
      mentionDeploy: {
        fee: 0.02,
        exchange: 6
      },
      accountList: [
        {
          name: '1',
          balance: 1000
        },
        {
          name: '2',
          balance: 1000
        },
        {
          name: '3',
          balance: 1000
        }
      ],
      bankList: [
        {
          name: '张三',
          id: 1,
          card: '622568032300026316',
          bank: {
            icon: 'icon-longyeyinghang',
            name: '中国农业银行',
            code: 1000
          }
        },
        {
          name: '张三',
          id: 1,
          card: '622568032300026316',
          bank: {
            icon: 'icon-longyeyinghang',
            name: '中国农业银行',
            code: 1000
          }
        }
      ]
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
  },
  created: function () {
  },
  methods: {
    close () {
      this.$emit('update:show', false);
    }
  }
};
</script>

<style lang="less" scoped>
  .mention{
    .popup-content{
      p{
        background: #202228;
        color: #fff;
        text-align: left;
        text-indent: 14px;
      }
    }
  }
</style>
