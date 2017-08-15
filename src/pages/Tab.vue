<template>
  <div class="tab">
    <mention :show.sync="showMention"></mention>
    <matter :show.sync="openMatters" :matterList="matterList"></matter>
    <header class="tab-head is-flex">
      <h1>
        <img src="../assets/img/logo.png" :alt="DeployApi.SystemName">
      </h1>
      <h2>{{DeployApi.SystemName}}</h2>
      <nav class="is-flex">
        <ul class="is-flex">
          <li v-for="item in navList" :key="item.icon" @click="userAction(item.index)">
            <div class="iconfont nav-icon tixing-icon" :class="item.icon">
              <div class="tixing-num" v-if="item.index==='tixing'">{{matterList.length}}</div>
            </div>
          </li>
        </ul>
        <div class="user-menu">
          <el-dropdown @command="userAction">
          <span class="el-dropdown-link">
            <img src="../assets/img/user.jpg" />
            {{user.name}}
            <i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personalInformation">个人信息</el-dropdown-item>
              <el-dropdown-item command="exit">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </nav>
    </header>
    <div class="tab-main">
      <div class="tab-nav">
        <el-menu :default-active="defaultRoute" class="el-menu-vertical-demo" @select="goRouter">
          <el-submenu index="user">
            <template slot="title"><i class="iconfont icon-yonghuguanli"></i>用户管理</template>
            <el-menu-item index="user-manage"><p>用户管理</p></el-menu-item>
            <el-menu-item index="user-audit"><p>用户审核</p></el-menu-item>
          </el-submenu>
          <el-menu-item index="mt-manage">
            <i class="iconfont icon-Mtzhanghao"></i>MT账号管理
          </el-menu-item>
          <el-submenu index="agent">
            <template slot="title"><i class="iconfont icon-dailishang"></i>代理商管理</template>
            <el-menu-item index="agent-manage"><p>代理商管理</p></el-menu-item>
            <el-menu-item index="agent-audit"><p>代理商审核</p></el-menu-item>
          </el-submenu>
          <el-menu-item index="transaction-manage">
            <i class="iconfont icon-jiaoyiguanli"></i>交易管理
          </el-menu-item>
          <el-submenu index="access-to-gold-manage">
            <template slot="title"><i class="iconfont icon-churujinguanli-"></i>出入金管理</template>
            <el-menu-item index="mention-start-audit"><p>出金初审</p></el-menu-item>
            <el-menu-item index="mention-end-audit"><p>出金终审</p></el-menu-item>
            <el-menu-item index="recharge-record"><p>入金记录</p></el-menu-item>
            <el-menu-item index="mention-record"><p>出金记录</p></el-menu-item>
          </el-submenu>
          <el-submenu index="capital">
            <template slot="title"><i class="iconfont icon-zijinliushui"></i>资金流水</template>
            <el-menu-item index="capital-flow"><p>资金流水</p></el-menu-item>
            <el-menu-item index="mt-capital-flow"><p>MT资金流水</p></el-menu-item>
          </el-submenu>
          <el-submenu index="report">
            <template slot="title"><i class="iconfont icon-baobiao"></i>报表</template>
            <el-menu-item index="dealer-report"><p>交易商报表</p></el-menu-item>
            <el-menu-item index="agent-report"><p>代理商商报表</p></el-menu-item>
          </el-submenu>
          <el-menu-item index="commi-manage">
            <i class="iconfont icon-yongjinguanli"></i>佣金管理
          </el-menu-item>
          <el-menu-item index="dividend-manage">
            <i class="iconfont icon-hongliguanli"></i>红利管理
          </el-menu-item>
          <el-menu-item index="system-setting">
            <i class="iconfont icon-xitongshezhi"></i>系统设置
          </el-menu-item>
          <el-menu-item index="test">
            <i class="iconfont icon-xitongshezhi"></i>公共样式
          </el-menu-item>
        </el-menu>
      </div>
      <div class="tab-content">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import mention from '@comps/mention.vue';
import matter from '@comps/matter.vue';
import { mapGetters } from 'vuex';
export default {
  name: 'Tab',
  components: {
    mention,
    matter
  },
  data () {
    return {
      defaultRoute: 'personal-information',
      openMatters: false,
      navList: [
        {
          icon: 'icon-tixing',
          index: 'tixing'
        },
        {
          icon: 'icon-tixian',
          index: 'mention'
        }
      ],
      navLeftList: [
        {
          index: 'user',
          icon: 'icon-shouye',
          name: '用户管理',
          submenu: [
            {
              index: 'user-manage',
              name: '用户管理'
            },
            {
              index: 'user-audit',
              name: '用户审核'
            }
          ]
        }
      ],
      matterList: [
        {
          time: '2017-07-07 10:12:13',
          account: 'zhou1',
          type: '注册审核'
        },
        {
          time: '2017-07-07 10:12:13',
          account: 'zhou2',
          type: '出金审核'
        }
      ],
      showMention: false
    };
  },
  computed: {
    ...mapGetters(['user'])
  },
  created: function () {
  },
  methods: {
    userAction (command) {
      switch (command) {
        case 'mention' :
          this.showMention = true;
          break;
        case 'tixing' :
          this.openMatters = true;
          break;
        case 'personalInformation' :
          this.defaultRoute = '';
          this.$router.push('/tab/personal-information');
          break;
        case 'exit' :
          this.defaultRoute = '';
          this.$router.replace('/signin');
          break;
      }
    },
    goRouter (index) {
      this.$router.push('/tab/' + index);
    }
  }
};
</script>

<style lang="less">
.tab {
  width: 100%;
  height: 100%;
  position: relative;
  .tab-head{
    width: 100%;
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #000;
    position: relative;
    color:#94959a;
    background:#23262d;
    box-sizing: border-box;
    h1{
      width: 60px;
      margin: 0 20px;
      height: auto;
    }
    h2{
      height: 100%;
      font-size:18px;
      font-weight: 600;
      color:#00a4ca;
    }
    nav{
      position: absolute;
      width: auto;
      height: 60px;
      line-height: 60px;
      right: 30px;
      top: 0;
      color: #94959a;
      ul{
        flex: 1;
        justify-content: space-around;
        li{
          margin-right: 40px;
          width: 25px;
          height: auto;
          .nav-icon{
            font-size: 25px;
          }
          .tixing-icon{
            position: relative;
            .tixing-num{
              position: absolute;
              width: 16px;
              height: 16px;
              top:15%;
              right:-6px;
              line-height: 16px;
              text-align: center;
              border-radius: 50%;
              background:#ff3b6a;
              font-size: 12px;
              color: #fff;
            }
          }
        }
      }
      .user-menu{
        width: auto;
        height: 60px;
        display: flex;
        img{
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }
        .icon{
          width: 30px;
          height: 30px;
        }
        .el-dropdown{
          width: auto;
          height: 60px;
          line-height: 60px;
          color: #94959a;
          text-align: left;
          font-size: 16px;
          i{
            font-size: 12px;
          }
        }
      }
    }
  }
  .tab-main{
    width: 100%;
    height: calc(~"100% - 60px");
    display: flex;
    .tab-nav{
      width: 200px;
      height: 100%;
      background:#30333c;
      overflow: auto;
      font-size: 14px;
      .el-menu{
        background-color: #30333c;
        text-align: left;
        .el-menu-item,.el-submenu__title{
          padding: 0 !important;
          color:#5e718d;
          &:before{
            content:'';
            display: inline-block;
            vertical-align: top;
            width: 6px;
            height: 100%;
          }
          .iconfont{
            font-size: 20px;
            margin:0 10px 0 20px;
          }
        }
        .el-submenu{
          .el-menu{
            background: #26282f;
            .el-menu-item{
              font-size: 12px;
              display: flex;
              &:before{
                display: block;
              }
              p{
                width: calc(~"100% - 6px");
                text-align: center;
              }
            }
          }
        }
        .el-menu-item:hover{
          background-color: #1d1f25;
          color:#52e3ff;
        }
        .el-submenu__title:hover{
          background-color: #30333c;
          color:#52e3ff;
        }
        .el-menu-item.is-active{
          background-color: #1d1f25;
          color:#52e3ff;
          &:before{
            background-image:linear-gradient(-180deg, #00e2b8 0%, #009acd 100%);
          }
        }
      }
    }
    .tab-content{
      flex: 1;
      background: #212227;
      box-shadow: inset 4px 2px 4px 0 rgba(0,0,0,0.50);
      height: 100%;
      padding: 20px;
      box-sizing: border-box;
      overflow: auto;
    }
  }
}
</style>
