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
          <button class="hot-bg" @click="close" v-if="needCancel">取消</button>
          <button class="cold-bg" @click="confirm">{{confirmText}}</button>
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
    title: {
      type: String,
      default: '标题'
    },
    confirmText: {
      type: String,
      default: '确认'
    }
  },
  computed: {
  },
  created: function () {
  },
  methods: {
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
  .modify-mt{
    .verify-input{
      text-align: left;
      .el-input{
        width: 60%;
        margin-right: 5%;
      }
      .verify-img{
        display: inline-block;
        width: 24%;
        height: auto;
      }
    }
  }
</style>
