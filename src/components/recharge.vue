<template>
  <article class="popup recharge" v-show="show">
    <div class="popup-main">
      <header>
        入金
        <i class="close" @click="close">×</i>
      </header>
      <div class="popup-content">
        <el-form ref="form" :model="rechargeForm" label-width="100px">
          <el-form-item label="支付方式">
            <el-radio-group v-model="rechargeForm.type">
              <el-radio class="radio" v-for="item in rechargeList" :key="item.type" :label="item.type">{{item.name}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="$入金金额">
            <el-input v-model="rechargeForm.amount" placeholder="请输入金额"></el-input>
          </el-form-item>
          <el-form-item :label="'￥汇率：'+rechargeDeploy.exchange">
            <!--<el-input v-model="rechargeForm.amount*rechargeDeploy.exchange" :disabled="true"></el-input>-->
            <p>{{rechargeForm.amount*rechargeDeploy.exchange}}</p>
          </el-form-item>
          <el-form-item label="￥手续费">
            <p>{{rechargeForm.amount*rechargeDeploy.exchange*rechargeDeploy.fee}}</p>
            <!--<el-input v-model="rechargeForm.amount*rechargeDeploy.exchange*rechargeDeploy.fee" :disabled="true"></el-input>-->
          </el-form-item>
          <el-form-item label="￥实际支付">
            <p>{{rechargeForm.amount*rechargeDeploy.exchange*(1+rechargeDeploy.fee)}}</p>
            <!--<el-input v-model="rechargeForm.amount*rechargeDeploy.exchange*(1+rechargeDeploy.fee)" :disabled="true"></el-input>-->
          </el-form-item>
          <el-form-item label="入金目标">
            <el-select v-model="rechargeForm.region" placeholder="请选择目标">
              <el-option label="上海" value="上海"></el-option>
              <el-option label="北京" value="北京"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <button class="sure-btn" @click="close">入金</button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'recharge',
  data () {
    return {
      rechargeList: [
        {
          name: '微信支付',
          type: 'wechat'
        },
        {
          name: '支付宝',
          type: 'alipay'
        },
        {
          name: '银联',
          type: 'bank'
        }
      ],
      rechargeDeploy: {
        fee: 0.02,
        exchange: 6
      },
      rechargeForm: {
        amount: '',
        region: '',
        type: ''
      }
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
  .recharge{
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
