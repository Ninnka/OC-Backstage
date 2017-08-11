<template>
  <article class="popup matter" v-show="show">
    <div class="popup-main">
      <header>
        待办事项
        <i class="close" @click="close">×</i>
      </header>
      <div class="popup-content">
        <el-table :data="matterList" style="width: 100%">
          <el-table-column prop="time" label="时间"></el-table-column>
          <el-table-column prop="account" label="用户"></el-table-column>
          <el-table-column prop="type" label="类型"></el-table-column>
          <el-table-column label="操作">
            <template scope="scope">
              <el-button @click="operation(scope.row)" type="text" size="small">操作</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'mention',
  data () {
    return {
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    matterList: Array
  },
  computed: {
  },
  created: function () {
  },
  methods: {
    operation () {
      this.$message({
        type: 'success',
        message: '操作成功!'
      });
      this.$emit('update:show', false);
    },
    close () {
      this.$emit('update:show', false);
    }
  }
};
</script>

<style lang="less" scoped>
  .matter{
  }
</style>
