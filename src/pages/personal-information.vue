<template>
  <div class="personal-information">
    <!--personal-information-->
    <div class="notice" v-if="showNotice">
      <article>
        <header>通知</header>
        <div class="notice-content">
          <div class="attention-icon">!</div>
          <p>您已申请启用头寸功能，分成比例为 20%，启用该设置需要缴纳保证金 $50,000</p>
          <div class="append-btn" @click="showAppend = true">追加保证金</div>
        </div>
        <div class="close-icon" @click="close">×</div>
      </article>
    </div>
    <div class="user-left">
      <article class="region user-message">
        <header>我的信息</header>
        <div class="region-main">
          <ul class="user-list">
            <li class="align-top">
              <div class="user-label">我的头像：</div>
              <div class="user-mes">
                <div class="user-img">
                  <img src="../assets/img/user.jpg" alt="" />
                </div>
              </div>
              <button class="modify-btn" type="submit">修改</button>
            </li>
            <li>
              <!--<div class="user-label">交易账号：</div>-->
              <!--<div class="user-mes">852456</div>-->
            </li>
            <li>
              <!--<div class="user-label">昵称：</div>-->
              <!--<div class="user-mes">陈晨</div>-->
              <!--<button class="modify-btn" type="submit">修改</button>-->
              <modify-input :label="'昵称'" :value="userMes.userName" :doneEvent="modify"></modify-input>
            </li>
            <li>
              <!--<div class="user-label">密码：</div>-->
              <!--<div class="user-mes">********</div>-->
              <!--<button class="modify-btn" type="submit">修改</button>-->
              <modify-input :label="'密码'" :value="userMes.pas" :doneEvent="modify"></modify-input>
            </li>
            <li>
              <div class="user-label">手机号码：</div>
              <div class="user-mes">13600000000</div>
            </li>
            <li>
              <!--<div class="user-label">邮箱地址：</div>-->
              <!--<div class="user-mes">molehe_1024@163.com</div>-->
              <!--<button class="modify-btn" type="submit">修改</button>-->
              <modify-input :label="'邮箱地址'" :value="userMes.email" :doneEvent="modify"></modify-input>
            </li>
            <li>
              <div class="user-label">类型：</div>
              <div class="user-mes">个人</div>
            </li>
            <li>
              <div class="user-label">开户时间：</div>
              <div class="user-mes">2017-07-07 10:12:13</div>
            </li>
          </ul>
          <ul class="user-list">
            <li>
              <div class="user-label">姓名：</div>
              <div class="user-mes">谢霆锋</div>
            </li>
            <li>
              <div class="user-label">证件编号：</div>
              <div class="user-mes">[身份证]440111111111111111</div>
            </li>
            <li>
              <div class="user-label">证件有效期：</div>
              <div class="user-mes">2025年3月1日</div>
            </li>
            <li class="align-top">
              <div class="user-label">证件照片：</div>
              <div class="user-mes is-flex">
                <div class="add-card-btn">
                  <div class="add-icon">+</div>
                  <p>添加身份证正面</p>
                </div>
                <div class="add-card-btn">
                  <div class="add-icon">+</div>
                  <p>添加身份证反面</p>
                </div>
              </div>
            </li>
            <li>
              <!--<div class="user-label">投递地址：</div>-->
              <!--<div class="user-mes">广东省 广州市 荔湾区1850创意园</div>-->
              <!--<button class="modify-btn" type="submit">修改</button>-->
              <modify-input :label="'投递地址'" :value="userMes.address" :doneEvent="modify"></modify-input>
            </li>
          </ul>
          <ul class="user-list">
            <li>
              <div class="user-label">银行卡：</div>
              <div class="user-mes">已绑定张</div>
              <div class="add-card" @click="showAddBank = true">
                <div class="add-icon">+</div>
                <p>添加银行卡</p>
              </div>
            </li>
            <li class="band-card-list">
              <el-carousel height="150px" :autoplay=false>
                <el-carousel-item>
                  <div class="bank-card">
                    <div class="bank-head">
                      <i class="bank-icon">
                        <svg class="icon" aria-hidden="true">
                          <use></use>
                        </svg>
                      </i>
                      <span class="bank-text">中国建设银行</span>
                      <i class="iconfont icon-shanchu" @click="showDelBank = true"></i>
                    </div>
                    <p>张三</p>
                    <p>123456789</p>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </li>
          </ul>
        </div>
      </article>
      <article class="region funds-info">
        <header>资金情况</header>
        <div class="region-main">
          <ul class="user-list user-list-two">
            <li>
              <div class="user-label">余额：</div>
              <div class="user-mes">$999.999.000</div>
            </li>
            <li>
              <div class="user-label">保证金：</div>
              <div class="user-mes">$999.999.000</div>
              <div class="append-btn" @click="showAppend = true">追加保证金</div>
            </li>
            <li>
              <div class="user-label">总入金：</div>
              <div class="user-mes">$999.999.000</div>
            </li>
            <li>
              <div class="user-label">总出金：</div>
              <div class="user-mes">$999.999.000</div>
            </li>
            <li>
              <div class="user-label">未结佣金：</div>
              <div class="user-mes">$999.999.000</div>
            </li>
            <li>
              <div class="user-label">已结佣金：</div>
              <div class="user-mes">$999.999.000</div>
            </li>
          </ul>
        </div>
      </article>
      <article class="region configuration">
        <header>配置</header>
        <div class="region-main">
          <ul class="user-list">
            <li>
              <div class="user-label">佣金配置：</div>
              <div class="user-mes">20%</div>
            </li>
            <li>
              <div class="user-label">红利配置：</div>
              <div class="user-mes">未生效</div>
            </li>
          </ul>
        </div>
      </article>
    </div>
    <div class="user-right">
      <invited :title="'邀请信息'" :invitationCode="'888'" :invitationUrl="'http://www.baidu.com'"></invited>
    </div>
    <!--追加保证金弹框-->
    <popup :show.sync="showAppend" :needCancel=true :title="'追加保证金'" :confirmText="'追加'" :cancelText="'取消'" v-on:confirmEvent="test" v-on:cancelEvent="test">
      <template slot="content" >
        <p class="del-text">
          <el-form ref="form" :model="appendForm" label-width="100px">
            <el-form-item label="追加金额">
              <el-input v-model="appendForm.money"></el-input>
            </el-form-item>
            <!--验证码组件-->
            <!--api说明：-->
            <!--parentVerify：父组件验证码定义变量-->
            <!--parentPhone：父组件号码定义变量-->
            <!--needPhone：是否需要输入手机号码，默认为false-->
            <verify :parentVerify.sync="appendForm.verify" :parentPhone.sync="appendForm.phone" :needPhone="true"></verify>
            <p>追加保证金后，系统将对应扣除您的余额，该操作不可逆转。</p>
            <p>保证金无法出金，需要减少保证金，请联系：400-400-400</p>
          </el-form>
        </p>
      </template>
    </popup>
    <!--添加银行卡-->
    <add-bank :show.sync="showAddBank"></add-bank>
    <!--删除银行卡弹框-->
    <popup :show.sync="showDelBank" :needCancel=true :title="'删除银行卡'" :confirmText="'确定'" :cancelText="'取消'" v-on:confirmEvent="test" v-on:cancelEvent="test">
      <template slot="content" >
        <p class="del-text">
          您正在申请删除银行卡：
        </p>
        <div class="bank-card">
          <div class="bank-head">
            <i class="bank-icon">
              <svg class="icon" aria-hidden="true">
                <use></use>
              </svg>
            </i>
            <span class="bank-text">中国建设银行</span>
          </div>
          <p>张三</p>
          <p>123456789</p>
        </div>
        <p>删除后，您将无法通过此银行卡进行出金，是否要删除该银行卡？</p>
      </template>
    </popup>
  </div>
</template>

<script>
import invited from '@comps/invited';
import modifyInput from '@comps/modify-input';
import verify from '@comps/verify.vue';
import popup from '@comps/popup.vue';
import addBank from '@comps/add-bank.vue';
export default {
  name: 'PersonalInformation',
  components: {
    invited,
    verify,
    popup,
    'modify-input': modifyInput,
    'add-bank': addBank
  },
  data () {
    return {
      showNotice: true,
      showAppend: false,
      showAddBank: false,
      showDelBank: false,
      userMes: {
        userName: '陈晨',
        pas: '*****',
        email: 'molehe_1024@163.com',
        address: '广东省 广州市 荔湾区1850创意园'
      },
      appendForm: {
        money: '',
        verify: '',
        phone: ''
      }
    };
  },
  computed: {
  },
  created: function () {
  },
  methods: {
    modify () {},
    close () {
      this.showNotice = false;
    },
    test () {
      this.$message({
        type: 'success',
        message: '操作成功!'
      });
    }
  }
};
</script>

<style lang="less" scoped>
  .personal-information {
    align-items: flex-start;
    display: flex;
    .notice{
      background:#323740;
      box-shadow:0 1px 6px 0 rgba(0,0,0,0.50);
      border-radius:0 0 8px 8px;
      height:110px;
      position: fixed;
      text-align: left;
      top: 60px;
      left:220px;
      right: 28px;
      article{
        margin: 15px 40px;
        height: 80px;
        header{
          color: #fff;
          font-size: 16px;
          font-weight: bold;
        }
        .notice-content{
          .attention-icon{
            text-align: center;
            color: #fff;
            background-color: #ff3b6a;
            font-size: 10px;
            width: 14px;
            border-radius: 50%;
            display: inline-block;
            margin-right: 20px;
          }
          p{
            display: inline-block;
            margin-top: 10px;
            color: #94959a;
            font-size: 14px;
          }
          .append-btn{
            margin-top: 10px;
            font-size: 14px;
            margin-left: 38px;
            color: #52e3ff;
          }
        }
        .close-icon {
          position: absolute;
          top: 35px;
          right: 20px;
          height: 40px;
          font-size: 40px;
          color: #fff;
        }
      }
    }
    .append-btn{
      flex: 1;
      color: #52e3ff;
      font-size: 14px;
    }
    .band-card-list {
      width: 100%;
      height: 150px;
      display: block;
      .icon-shanchu {
        color: #fff;
        position: absolute;
        right: 0;
      }
    }
    .add-card-btn {
      text-align: center;
      color: #94959a;
      flex: 1;
      margin-right: 20px;
      border:1px solid #55565c;
      border-radius:9px;
      height:130px;
      .add-icon{
        font-size: 60px;
        height: 60px;
        line-height: 60px;
        margin-top: 20px;
      }
      p{
        height: 20px;
        line-height: 20px;
        font-size: 14px;
      }
    }
    .user-left{
      flex: 1;
      margin-right:20px;
      .user-message{
        text-align: center;
        .region-main{
          padding: 0 20px;
        }
      }
      .funds-info{
        margin-top:20px;
        .region-main{
          display: flex;
          flex-direction: row;
        }
      }
      .configuration{
        margin-top: 20px;
      }
    }
    .user-right{
      flex: 0 0 33.3333%;
    }
  }
</style>
