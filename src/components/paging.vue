<template>
  <div class="paging">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="nowPage"
      :page-sizes="[10,15,20]"
      :page-size="nowPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="sourceData.length">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'paging',
  data () {
    return {
      nowPage: 1,
      nowPageSize: 10
    };
  },
  props: {
    sourceData: {
      type: Array,
      default: function () {
        return [];
      }
    },
    displayData: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  created: function () {
    let data = this.handleSizeChangeData(this.nowPage, this.nowPageSize, this.sourceData);
    this.$emit('update:displayData', data);
  },
  methods: {
    handleSizeChange (val) {
      this.nowPageSize = val;
      let data = this.handleSizeChangeData(this.nowPage, this.nowPageSize, this.sourceData);
      this.$emit('update:displayData', data);
    },
    handleCurrentChange (val) {
      this.nowPage = val;
      let data = this.handleSizeChangeData(this.nowPage, this.nowPageSize, this.sourceData);
      this.$emit('update:displayData', data);
    }
  }
};
</script>

<style lang="less" scoped>
  .paging{
  }
</style>
