<template>
  <div class="personal-information">
    <!--personal-information-->
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
              <div class="user-label">交易账号：</div>
              <div class="user-mes">852456</div>
            </li>
            <li>
              <div class="user-label">昵称：</div>
              <div class="user-mes">陈晨</div>
              <button class="modify-btn" type="submit">修改</button>
            </li>
            <li>
              <div class="user-label">密码：</div>
              <div class="user-mes">********</div>
              <button class="modify-btn" type="submit">修改</button>
            </li>
            <li>
              <div class="user-label">手机号码：</div>
              <div class="user-mes">13600000000</div>
            </li>
            <li>
              <div class="user-label">邮箱地址：</div>
              <div class="user-mes">molehe_1024@163.com</div>
              <button class="modify-btn" type="submit">修改</button>
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
              <div class="user-label">投递地址：</div>
              <div class="user-mes">广东省 广州市 荔湾区1850创意园</div>
              <button class="modify-btn" type="submit">修改</button>
            </li>
          </ul>
          <ul class="user-list">
            <li>
              <div class="user-label">银行卡：</div>
              <div class="user-mes">已绑定张</div>
              <div class="add-card" @click="">
                <div class="add-icon">+</div>
                <p>添加银行卡</p>
              </div>
            </li>
            <li class="band-card-list">
              <el-carousel height="150px" :autoplay=false>
                <el-carousel-item v-for="">
                  <div class="band-cards is-flex">
                    <div class="band-card cold-bg">
                      <div class="card-header">
                        <div class="band-name">
                          <svg class="icon" aria-hidden="true">
                            <use :xlink:href="'#'"></use>
                          </svg>
                        </div>
                        <i class="iconfont icon-shanchu" @click=""></i>
                      </div>
                      <div class="card-mes">
                        <p></p>
                        <p></p>
                      </div>
                    </div>
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
          <ul class="user-list">
            <li>
              <div class="user-label">余额：</div>
              <div class="user-mes">$999.999.000</div>
            </li>
            <li>
              <div class="user-label">总入金：</div>
              <div class="user-mes">$99.999.000</div>
            </li>
            <li>
              <div class="user-label">未结佣金：</div>
              <div class="user-mes">$99.999.000</div>
            </li>
          </ul>
          <ul class="user-list">
            <li>
              <div class="user-label">保证金：</div>
              <div class="user-mes">$999.999.000</div>
              <div class="append-btn">追加保证金</div>
            </li>
            <li>
              <div class="user-label">总出金：</div>
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
      <article class="region">
        <header>代理商邀请</header>
        <div class="region-main">
          <div class="img-qrCode">
            <img src="">
          </div>
          <div class="invite-mes">
            邀请码：888888865
            <p>邀请链接：{{inviteUrl}}</p>
          </div>
          <button class="copy-btn hot-bg" v-clipboard="inviteUrl" @success="" @error="">复制推广链接</button>
        </div>
      </article>
      <article class="region">
        <header>交易商邀请</header>
        <div class="region-main">
          <div class="img-qrCode">
            <img src="">
          </div>
          <div class="invite-mes">
            邀请码：888888865
            <p>邀请链接：{{inviteUrl}}</p>
          </div>
          <button class="copy-btn hot-bg" v-clipboard="inviteUrl" @success="" @error="">复制推广链接</button>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalInformation',
  components: {
  },
  data () {
    return {
      inviteUrl: 'https://www.douban.com/group/topic/96482147/'
    };
  },
  computed: {
  },
  created: function () {
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
  .personal-information {
    padding: 20px;
    align-items: flex-start;
    display: flex;
    .user-list{
      box-sizing: border-box;
      width:100%;
      height: auto;
      padding: 0px 20px 20px 20px;
      border-bottom: 2px solid #22232a;
      overflow:hidden;
      .align-top{
        align-items: flex-start;
      }
      li{
        width: 100%;
        margin: 10px 0;
        text-align: left;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .user-label{
          width: 100px;
          font-size:14px;
          color:#94959a;
          text-align: right;
        }
        .user-mes{
          flex: 1;
          font-size:18px;
          color:#ffffff;
          .user-img{
            width: 70px;
            height: 70px;
            margin-top: -10px;
            border-radius: 50%;
            img{
              border-radius: 50%;
            }
          }
        }
        .append-btn{
          flex: 1;
        }
        .add-card{
          color: #fff;
          display: flex;
          align-items: center;
          .add-icon{
            display: inline-block;
            margin-right: 10px;
            font-size: 20px;
          }
        }
        .modify-btn{
          width: 60px;
          height: 25px;
          line-height: 25px;
          border:1px solid #55565c;
          border-radius:6px;
          background: #272a31;
          color: #94959a;
          fon-size:12px;
        }
      }
      .band-card-list{
        width:100%;
        height:150px;
        display:block;
        .band-cards{
          width: 100%;
          justify-content: space-around;
        }
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
      .region-main{
        width:100%;
        text-align:center;
        padding-top: 43px;
        padding-bottom:40px;
        .img-qrCode{
          img{
            border:1px solid #55565c;
            width:150px;
            height:150px;
          }
        }
        .invite-mes{
          margin-top: 25px;
          font-size: 18px;
          color:#94959a;
          p{
            margin-top: 10px;
            font-size:14px;
          }
        }
        .copy-btn{
          margin-top: 30px;
          font-size: 16px;
          color: #ffffff;
          width:190px;
          height:40px;
          border-radius: 4px;
        }
      }
    }
  }
</style>
