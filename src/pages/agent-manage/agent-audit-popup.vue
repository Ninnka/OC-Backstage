<template>
  <div class="agent-audit-popup">
    <popup :show.sync="show" :needConfirm="auditMes.auditStatus==='待审'" :needCancel=true :title="'用户申请信息'" :confirmText="'通过'" :cancelText="auditMes.auditStatus==='待审'?'拒绝':'取消'" v-on:confirmEvent="pass" v-on:cancelEvent="refuse">
      <template slot="content">
        <ul class="user-list user-list-three">
          <li>
            <div class="user-label">账号：</div>
            <div class="user-mes">{{auditMes.account}}</div>
          </li>
          <li>
            <div class="user-label">昵称：</div>
            <div class="user-mes">{{auditMes.nickName}}</div>
          </li>
          <li>
            <div class="user-label">类型：</div>
            <div class="user-mes">{{auditMes.type}}</div>
          </li>
          <li>
            <div class="user-label">名称：</div>
            <div class="user-mes">{{auditMes.realName}}</div>
          </li>
          <li>
            <div class="user-label">联系方式：</div>
            <div class="user-mes">{{auditMes.phone}}</div>
          </li>
          <li>
            <div class="user-label">邮箱地址：</div>
            <div class="user-mes">molehe_1024@163.com</div>
          </li>
          <li>
            <div class="user-label">申请时间：</div>
            <div class="user-mes">2017-10-10 12:12:13</div>
          </li>
        </ul>
        <ul class="user-list">
          <div class="id-card">
            <img src="../../assets/img/id-card.jpg" alt="身份证背面">
          </div>
          <li>
            <div class="user-label">证件类型：</div>
            <div class="user-mes">身份证</div>
          </li>
          <li>
            <div class="user-label">证件号码：</div>
            <div class="user-mes">446333201707272635</div>
          </li>
          <li>
            <div class="user-label">证件有效期：</div>
            <div class="user-mes">2020.08.06</div>
          </li>
          <li>
            <div class="user-label">账单投递地址：</div>
            <div class="user-mes">广东省广州市荔湾区芳村大道200号</div>
          </li>
        </ul>
        <ul class="user-list">
          <div class="bank-card">
            <div class="bank-head">
              <i class="bank-icon">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-zhongguoyinhang"></use>
                </svg>
              </i>
              <p class="bank-text">中国银行</p>
            </div>
            <p>张三</p>
            <p>123456789</p>
          </div>
          <li>
            <div class="user-label">开户银行：</div>
            <div class="user-mes">招商银行</div>
          </li>
          <li>
            <div class="user-label">开户支行：</div>
            <div class="user-mes">广东省广州市芳村支行</div>
          </li>
          <li>
            <div class="user-label">开户人姓名：</div>
            <div class="user-mes">陈晨</div>
          </li>
          <li>
            <div class="user-label">预留手机：</div>
            <div class="user-mes">18822223333</div>
          </li>
        </ul>
        <ul class="user-list" v-if="auditMes.auditStatus==='待审'">
          <li>
            <div class="user-label">邀请人：</div>
            <div class="user-mes">{{auditMes.invitingPeople}}</div>
          </li>
          <li>
            <div class="user-label">审核意见：</div>
            <div class="user-mes">
              <el-input v-model="auditViews" placeholder="请输入本次审核意见"></el-input>
            </div>
          </li>
        </ul>
        <ul class="user-list" v-if="auditMes.auditStatus!=='待审'">
          <li>
            <div class="user-label">邀请人：</div>
            <div class="user-mes">{{auditMes.invitingPeople}}</div>
          </li>
          <li>
            <div class="user-label">状态：</div>
            <div class="user-mes">{{auditMes.auditStatus}}</div>
          </li>
          <li>
            <div class="user-label">处理时间：</div>
            <div class="user-mes">{{auditMes.processTime}}</div>
          </li>
          <li>
            <div class="user-label">审核人：</div>
            <div class="user-mes">abbychen</div>
          </li>
          <li>
            <div class="user-label">审核意见：</div>
            <div class="user-mes">{{auditMes.auditStatus}}</div>
          </li>
        </ul>
      </template>
    </popup>
  </div>
</template>

<script>
import popup from '@comps/popup.vue';
export default {
  name: 'UserAuditPopup',
  components: {
    popup
  },
  data () {
    return {
      auditViews: '',
      show: false
    };
  },
  props: {
    showAudit: {
      type: Boolean,
      default: false
    },
    auditMes: {}
  },
  computed: {
  },
  created: function () {
  },
  methods: {
    pass () {
      this.$message({
        type: 'success',
        message: '通过成功!'
      });
      this.$emit('update:showAudit', false);
    },
    refuse () {
      this.$message({
        type: 'success',
        message: '拒绝成功!'
      });
      this.$emit('update:showAudit', false);
    }
  },
  watch: {
    showAudit (val) {
      console.log(val);
      this.show = val;
    },
    show (val) {
      this.$emit('update:showAudit', val);
    }
  }
};
</script>

<style lang="less" scoped>
  .agent-audit-popup{
    .user-list{
      position: relative;
      .id-card{
        width: 25%;
        height: auto;
        position: absolute;
        top:10px;
        right: 10px;
        img{
          border-radius: 10px;
        }
      }
      .bank-card{
        position: absolute;
        top:10px;
        right:10px;
      }
    }
    .rejectList{
      .user-mes{
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        span{
          display: block;
          i{
            font-size: 14px;
            color:#ff3b6a;
            margin-right: 10px;
          }
          &:nth-last-of-type(1){
            color:#ff3b6a;
          }
        }
      }
    }
  }
</style>
