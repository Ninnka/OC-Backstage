<template>
  <div class="list-options">
    <el-dropdown trigger="click" :hide-on-click="false" :divided="true" @command="filterData">
      <el-button>
        列表选项<i class="el-icon-caret-bottom el-icon--right"></i>
      </el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="col in optionsList" :key="col.label">
          <el-checkbox v-model="col.show">{{ col.label }}</el-checkbox>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: 'ListOptions',
  data () {
    return {
      inputValue: '',
      ifInput: false
    };
  },
  props: {
    sourceList: {
      type: Array,
      default: function () {
        return [];
      }
    },
    displayList: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  computed: {
    optionsList () {
      return this.sourceList.filter((item) => {
        if (item.canSelect) {
          return item;
        }
      });
    }
  },
  created: function () {
    this.$emit('update:displayList', this.sourceList.filter((item) => {
      if (item.show) {
        return item;
      }
    }));
  },
  methods: {
    filterData () {
      this.$emit('update:displayList', this.sourceList.filter((item) => {
        if (item.show) {
          return item;
        }
      }));
    }
  }
};
</script>

<style lang="less" scoped>
  .list-options{
    display: inline-block;
  }
</style>
