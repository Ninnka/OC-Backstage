<template>
  <div class="system-setting">
    <el-tabs v-model="activeTabName" @tab-click="tabClick">
      <el-tab-pane v-for="tab in tabs" :key="tab.label" :label="tab.label" :name="tab.label">
        <component :is="getTabInnerComp(tab.tabCompName)" :ref="tab.tabCompName"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTabName: '基本设置',
      tabs: [{
        label: '基本设置',
        tabCompName: 'basic'
      }, {
        label: '开户设置',
        tabCompName: 'open-account'
      }, {
        label: '出入金设置',
        tabCompName: 'discrepancy-amount'
      }, {
        label: '风控设置',
        tabCompName: 'risk-management'
      }, {
        label: '红利设置',
        tabCompName: 'dividend'
      }]
    };
  },
  methods: {
    tabClick (tab, event) {
      // console.log('tab', tab);
      // console.log('event', event);
    },
    getTabInnerComp (name) {
      return require('@pages/system-setting/' + name);
    }
  }
};
</script>

<style lang="less">
@main-theme-sub: #94959a;
.system-setting {
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  .el-tabs {
    height: 100%;
  }
  .el-tabs__content {
    height: calc(~"100% - 57px");
    .el-tab-pane {
      height: 100%;
      overflow: auto;
    }
  }
}
.item__header {
  .header__sub {
    margin-left: 48px;
    color: @main-theme-sub;
    font-size: 12px;
  }
}
.el-tabs__header {
  border: none;
  background: #272a31;
}
.el-tabs__item {
  padding: 6px 40px;
  height: auto;
  color: @main-theme-sub;
  &.is-active {
    color: #52e3ff;
  }
}
.el-tabs__active-bar {
  background-image: linear-gradient(-90deg, #00e2b8 0%, #009acd 100%);
  height: 2px;
}
</style>
