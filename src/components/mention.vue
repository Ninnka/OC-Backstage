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
          <el-form-item label="出金金额" class="has-escription-input">
            <ul>
              <li>
                <div class="currency-symbol">$</div>
                <el-input v-model="mentionForm.amount" placeholder="请输入金额"></el-input>
              </li>
              <li>
                <div class="currency-symbol">￥</div>
                <div class="currency-text">汇率：{{mentionDeploy.exchange}}</div>
                <div class="no-input">{{mentionForm.amount*mentionDeploy.exchange}}</div>
              </li>
              <li>
                <div class="currency-symbol">￥</div>
                <div class="currency-text">手续费：{{mentionDeploy.fee}}%</div>
                <div class="no-input">{{mentionForm.amount*mentionDeploy.exchange*mentionDeploy.fee}}</div>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="实际出金" class="has-escription-input">
            <ul>
              <li>
                <div class="currency-symbol">￥</div>
                <div class="no-input">{{mentionForm.amount*mentionDeploy.exchange*(1+mentionDeploy.fee)}}</div>
              </li>
            </ul>
          </el-form-item>
          <el-form-item label="目标账号" style="margin-bottom: 0"></el-form-item>
          <div class="bank-list-select">
            <ul>
              <li class="bank-card" v-for="item in bankList" :key="item.id">
                <div class="bank-head">
                  <i class="bank-icon">
                    <svg class="icon" aria-hidden="true">
                      <use :xlink:href="'#'+item.bank.icon"></use>
                    </svg>
                  </i>
                  <p class="bank-text">{{item.bank.name}}</p>
                </div>
                <p>{{item.name}}</p>
                <p>{{item.card}}</p>
              </li>
            </ul>
          </div>
          <verify :parentVerify.sync="mentionForm.verify"></verify>
        </el-form>
        <button class="sure-btn" @click="close">出金</button>
      </div>
    </div>
  </article>
  <!--<popup :show.sync="show" :needCancel=true :title="'弹出框'" :confirmText="'申请出金'" v-on:confirmEvent="test">-->

  <!--</popup>-->
</template>

<script>
// import popup from '@comps/popup.vue';
import verify from '@comps/verify.vue';
export default {
  name: 'mention',
  components: {
//    popup,
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
            icon: 'icon-nongyeyinxing1',
            name: '中国农业银行',
            code: 1000
          }
        },
        {
          name: '张三',
          id: 1,
          card: '622568032300026316',
          bank: {
            icon: 'icon-nongyeyinxing1',
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
  .bank-card{
    position: relative;
    height: 90px;
    box-sizing: border-box;
    padding: 10px;
    background-image:linear-gradient(-90deg, #00e2b8 0%, #009acd 100%);
    border-radius:6px;
    .bank-head{
      height: 24px;
      display: flex;
      align-items: center;
      .bank-icon{
        display: block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(255,255,255,0.80);
        .icon{
          width: 20px;
          height: 20px;
          margin: 2px;
        }
      }
      .bank-name{
        font-size: 14px;
        color: #fff;
      }
    }
    p{
      background: transparent;
      color: #fff;
      font-size: 14px;
      color: #fff;
      text-align: right;
      height: 16px;
    }
  }
  .mention{
    .popup-content{
      .has-escription-input{
        ul{
          width: 100%;
          height: auto;
          li{
            width: 100%;
            display: flex;
            height: 36px;
            margin-bottom: 20px;
            .currency-symbol{
              width: 36px;
              height: 36px;
              font-size: 16px;
              color: #fff;
              background:#303136;
              border:1px solid #202328;
              box-sizing: border-box;
            }
            .currency-text{
              width: 120px;
              height: 36px;
              box-sizing: border-box;
              font-size:14px;
              color:#94959a;
              text-align:center;
              background:#303136;
              border:1px solid #202328;
            }
            .no-input{
              flex: 1;
            }
          }
          li:nth-last-of-type(1){
            margin-bottom: 0;
          }
        }
      }
      .bank-list-select{
        /*width: 90%;*/
        /*margin-left: 5%;*/
        /*height: 100px;*/
        /*margin-bottom: 20px;*/
        /*overflow-x: auto;*/
        ul{
          width: 300px;
          height: 100px;
          .bank-card{
            width: 300px;
            margin-right: 20px;
            display: inline-block;
          }
        }
      }
      .no-input{
        width: 100%;
        background: #202228;
        font-size:14px;
        color:#94959a;
        text-align: left;
        text-indent: 14px;
      }
    }
  }
</style>
