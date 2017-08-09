<template>
  <article class="region invited">
    <header>{{title}}</header>
    <div class="region-main">
      <div class="img-qrCode">
        <img :src="qrUrl">
      </div>
      <div class="invite-mes">
        邀请码：{{invitationCode}}
        <p>邀请链接：{{invitationUrl}}</p>
      </div>
      <button class="copy-btn hot-bg" v-clipboard="invitationUrl" @success="" @error="">复制推广链接</button>
    </div>
  </article>
</template>

<script>
import QRious from 'qrious';
export default {
  name: 'invited',
  data () {
    return {
      qrUrl: ''
    };
  },
  props: {
    title: {
      type: String,
      default: '邀请信息'
    },
    invitationCode: {
      type: String,
      default: ''
    },
    invitationUrl: {
      type: String,
      default: ''
    }
  },
  computed: {
  },
  created: function () {
    const qr = new QRious({
      value: this.invitationUrl,
      padding: 5,
      size: 135
    });
    this.qrUrl = qr.toDataURL();
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
  .invited{
    .region-main{
      width:100%;
      text-align:center;
      padding-top: 43px;
      padding-bottom:40px;
      .img-qrCode{
        img{
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
</style>
