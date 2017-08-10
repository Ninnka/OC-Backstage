<template>
  <div class="user-information">
    <div class="user-left">
      <article class="region user-message">
        <header>代理商信息</header>
        <div class="region-main">
          <ul class="user-list">
            <li class="align-top">
              <div class="user-label">代理商头像：</div>
              <div class="user-mes">
                <div class="user-img">
                  <img src="../../assets/img/user.jpg" alt="" />
                </div>
              </div>
            </li>
            <li>
              <div class="user-label">账号：</div>
              <div class="user-mes">{{agentMes.account}}</div>
            </li>
            <li>
              <div class="user-label">昵称：</div>
              <div class="user-mes">{{agentMes.nickName}}</div>
            </li>
            <li>
              <div class="user-label">手机号码：</div>
              <div class="user-mes">{{agentMes.phone}}</div>
            </li>
            <li>
              <div class="user-label">邮箱地址：</div>
              <div class="user-mes">{{agentMes.email}}</div>
            </li>
            <li>
              <div class="user-label">类型：</div>
              <div class="user-mes">{{agentMes.type}}</div>
            </li>
            <li>
              <div class="user-label">开户时间：</div>
              <div class="user-mes">{{agentMes.openTime}}</div>
            </li>
          </ul>
          <ul class="user-list">
            <li>
              <div class="user-label">姓名：</div>
              <div class="user-mes">{{agentMes.realName}}</div>
            </li>
            <li>
              <div class="user-label">证件编号：</div>
              <div class="user-mes">{{'['+agentMes.Documents.type+']'+agentMes.Documents.num}}</div>
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
              <div class="user-label">投递地址：</div>
              <div class="user-mes">广东省 广州市 荔湾区1850创意园</div>
            </li>
          </ul>
          <ul class="user-list">
            <li>
              <div class="user-label">银行卡：</div>
              <div class="user-mes">已绑定{{agentMes.bankList.length}}张</div>
            </li>
            <li class="band-card-list">
              <el-carousel height="150px" :autoplay=false>
                <el-carousel-item v-for="item in agentMes.bankList" :key="item.id">
                  <div class="bank-card">
                    <div class="bank-head">
                      <i class="bank-icon">
                        <svg class="icon" aria-hidden="true">
                          <use :xlink:href="'#'+item.bankMes.icon"></use>
                        </svg>
                      </i>
                      <p class="bank-text">{{item.bankMes.bankTitle}}</p>
                    </div>
                    <p>{{item.name}}</p>
                    <p>{{item.card}}</p>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </li>
          </ul>
        </div>
      </article>
      <article class="region">
        <header>资金情况</header>
        <div class="region-main">
          <ul class="user-list user-list-two">
            <li>
              <div class="user-label">余额：</div>
              <div class="user-mes">$999999</div>
            </li>
            <li>
              <div class="user-label">保证金：</div>
              <div class="user-mes">$999999</div>
            </li>
            <li>
              <div class="user-label">已结佣金：</div>
              <div class="user-mes">$999999</div>
            </li>
            <li>
              <div class="user-label">未结佣金：</div>
              <div class="user-mes">$999999</div>
            </li>
          </ul>
        </div>
      </article>
      <article class="region">
        <header>团队信息</header>
        <div class="region-main">
          <ul class="user-list user-list-two">
            <li>
              <div class="user-label">下级代理数量：</div>
              <div class="user-mes">$999999</div>
            </li>
            <li>
              <div class="user-label">总入金：</div>
              <div class="user-mes">$999999</div>
            </li>
            <li>
              <div class="user-label">交易量：</div>
              <div class="user-mes">50000手/$999999</div>
            </li>
            <li>
              <div class="user-label">交易商数量：</div>
              <div class="user-mes">$999999</div>
            </li>
            <li>
              <div class="user-label">总出金：</div>
              <div class="user-mes">$999999</div>
            </li>
          </ul>
        </div>
      </article>
      <article class="region">
        <header>配置</header>
        <div class="region-main">
          <ul class="user-list">
            <li>
              <modify-input :label="'佣金配置'" :value="agentMes.commissionDeploy*100+'%'" v-on:doneEvent="modify('commissionDeploy')"></modify-input>
            </li>
            <li>
              <modify-input :label="'红利配置'" :value="agentMes.dividendDeploy*100+'%'" v-on:doneEvent="modify('dividendDeploy')"></modify-input>
            </li>
          </ul>
        </div>
      </article>
      <article class="region">
        <header>账号权限控制</header>
        <div class="region-main">
          <el-table :data="permissionControlList" style="width: 100%">
            <el-table-column prop="fun" label="功能"></el-table-column>
            <el-table-column label="操作">
              <template scope="scope">
                <el-switch v-model="scope.row.operation" on-text="" off-text=""></el-switch>
              </template>
            </el-table-column>
            <el-table-column prop="description" label="说明"></el-table-column>
          </el-table>
        </div>
      </article>
    </div>
    <div class="user-right">
      <invited :title="'代理商邀请'" :invitationCode="'888'" :invitationUrl="'http://www.baidu.com'"></invited>
      <invited :title="'交易商信息'" :invitationCode="'666'" :invitationUrl="'http://www.baidu.com'"></invited>
    </div>
  </div>
</template>

<script>
import invited from '@comps/invited';
import modifyInput from '@comps/modify-input';
export default {
  name: 'UserInformation',
  components: {
    invited,
    'modify-input': modifyInput
  },
  data () {
    return {
      ifCommissionDeploy: false,
      commissionDeploy: 0.02,
      dividendDeploy: 0.02,
      inviteUrl: 'https://www.douban.com/group/topic/96482147/',
      permissionControlList: [
        {
          fun: '账号使用',
          operation: true,
          description: '禁用后将不能登录账号'
        },
        {
          fun: '出金',
          operation: true,
          description: '禁用后将不能出金'
        },
        {
          fun: '邀请代理',
          operation: true,
          description: '禁用将不能邀请代理'
        },
        {
          fun: '推广交易商',
          operation: true,
          description: '禁用将不能推广交易商'
        }
      ]
    };
  },
  computed: {
    agentMes () {
      return this.$store.state.AgentManage.agentMes;
    }
  },
  created: function () {
    console.log(this.agentMes);
  },
  methods: {
    modify (key) {
      console.log(key);
    }
  }
};
</script>

<style lang="less" scoped>
  .user-information {
    align-items: flex-start;
    display: flex;
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
      flex-basis:33%;
    }
  }
</style>
