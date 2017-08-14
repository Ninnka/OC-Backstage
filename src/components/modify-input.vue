<template>
  <article class="modify-input">
    <div class="user-label">{{label}}：</div>
    <div class="user-mes">
      <el-input v-if="ifInput" v-model="inputValue" placeholder="请输入"></el-input>
      <div v-else>{{value}}</div>
    </div>
    <button class="modify-btn" @click="doModify">{{ifInput?'完成':'修改'}}</button>
  </article>
</template>

<script>
export default {
  name: 'ModifyInput',
  data () {
    return {
      inputValue: '',
      ifInput: false
    };
  },
  props: {
    label: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    }
  },
  computed: {
  },
  created: function () {
    this.inputValue = this.value;
  },
  methods: {
    doModify () {
      this.$emit('doneEvent');
      this.ifInput = !this.ifInput;
    }
  }
};
</script>

<style lang="less">
  .modify-input{
    width: 100%;
    height: 36px;
    line-height: 36px;
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
      .el-input__inner{
        background: #202228;
        border: none;
        border-radius: 0;
        color: #fff;
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
      font-size:12px;
    }
  }
</style>
