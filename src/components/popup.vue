<template>
  <article class="popup" v-show="show">
    <div class="popup-main">
      <header>
        {{title}}
        <i class="close" @click="close">×</i>
      </header>
      <div class="popup-content">
        <slot name="content"></slot>
        <div class="btns" :class="{'btn':needCancel}">
          <button class="hot-bg" @click="cancel" v-if="needCancel">{{cancelText}}</button>
          <button class="cold-bg" @click="confirm" v-if="needConfirm">{{confirmText}}</button>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'popup',
  data () {
    return {
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    needCancel: {
      type: Boolean,
      default: false
    },
    needConfirm: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '标题'
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  computed: {
  },
  created: function () {
  },
  methods: {
    cancel () {
      if (this.cancelText === '取消') {
        this.close();
      } else {
        this.$emit('cancelEvent');
      }
    },
    confirm () {
      this.$emit('confirmEvent');
    },
    close () {
      this.$emit('update:show', false);
    }
  }
};
</script>

<style lang="less" scoped>
  .popup{
    position: absolute;
    z-index: 100;
    width: 100%;
    height: 100%;
    top:0;
    left: 0;
    background: rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content:center;
    .popup-main{
      min-width: 520px;
      height: auto;
      text-align: center;
      border-radius: 8px;
      header{
        position: relative;
        height: 45px;
        line-height: 45px;
        font-size: 18px;
        color: #fff;
        text-align: center;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        background-image:linear-gradient(-90deg, #00e2b8 0%, #009acd 100%);
        .close{
          position: absolute;
          width: 60px;
          height: 45px;
          top:0;
          right: 0;
          font-size: 30px;
        }
      }
      .popup-content{
        box-sizing: border-box;
        padding: 30px 20px;
        background: #272a31;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        color: #fff;
        .btns{
          margin-top: 20px;
        }
      }
    }
  }
</style>
