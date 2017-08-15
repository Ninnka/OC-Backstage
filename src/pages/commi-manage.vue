<template>
  <div class="commi-manage">
    <!--commi-manage-->
    <article class="region has-total">
      <header>佣金管理</header>
      <div class="region-main">
        <el-form class="filter-input" label-width="100px" :model="commiManageForm">
          <el-form-item label="佣金单号">
            <el-input placeholder="请输入佣金单号" v-model="commiManageForm.commiId"></el-input>
          </el-form-item>
          <el-form-item label="交易订单号">
            <el-input placeholder="请输入交易订单号" v-model="commiManageForm.orderId"></el-input>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-date-picker v-model="commiManageForm.timeRange" type="datetimerange" placeholder="请选择需要查询的时间范围"></el-date-picker>
          </el-form-item>
          <el-form-item label="返佣关系">
            <el-select placeholder="请选择返佣关系" v-model="commiManageForm.relation">
              <el-option v-for="item in getSuperiorList(tableData, 'relation')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="返佣状态">
            <el-select placeholder="请选择返佣状态" v-model="commiManageForm.status">
              <el-option v-for="item in getSuperiorList(tableData, 'status')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="返佣代理商" >
            <el-input placeholder="请输入代理商名称" v-model="commiManageForm.agents"></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox  v-model="commiManageForm.aboutAgents">包含下级所有代理商</el-checkbox>
          </el-form-item>
        </el-form>
        <div class="query-btns">
          <el-button type="info" @click="filterTable">查询</el-button>
          <list-options :sourceList="labelList" :displayList.sync="showLabelList"></list-options>
        </div>
        <el-table :data="totalData" style="width: 100%">
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="user" label="交易用户"></el-table-column>
          <el-table-column prop="mtAccount" label="MT账号"></el-table-column>
          <el-table-column prop="orderNumber" label="交易订单号"></el-table-column>
          <el-table-column prop="agents" label="收佣代理商"></el-table-column>
          <el-table-column prop="relation" label="返佣关系"></el-table-column>
          <el-table-column prop="details" label="返佣明细"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
        </el-table>
        <paging :sourceData="commiList" :displayData.sync="tableData"></paging>
      </div>
    </article>
  </div>
</template>

<script>
import paging from '@comps/paging.vue';
import listOptions from '@comps/list-options.vue';
export default {
  name: 'CommiManage',
  components: {
    paging,
    'list-options': listOptions
  },
  data () {
    return {
      currentPage4: 2,
      commiManageForm: {
        commiId: '',
        orderId: '',
        timeRange: '',
        relation: '',
        status: '',
        agents: '',
        aboutAgents: '',
        select: ''
      },
      tableData: [],
      commiList: [
        {
          id: 123456,
          user: 'Jinx',
          mtAccount: '54321',
          orderNumber: 'JY00000001',
          agents: 'abbychen',
          relation: '直客',
          details: '20% / $99.999.00',
          status: '未结算'
        },
        {
          id: 123123,
          user: 'Lux',
          mtAccount: '54321',
          orderNumber: 'JY00000001',
          agents: 'CiriDing',
          relation: '直客',
          details: '20% / $99.999.00',
          status: '未结算'
        }
      ],
      labelList: [
        {
          label: '日期',
          key: 'date',
          canSelect: false,
          show: true
        },
        {
          label: '姓名',
          key: 'name',
          canSelect: false,
          show: true
        },
        {
          label: '地址',
          key: 'address',
          canSelect: true,
          show: true
        },
        {
          label: '数值',
          key: 'num',
          canSelect: true,
          show: true
        }
      ],
      showLabelList: []
    };
  },
  computed: {
    totalData () {
      let totalObj = {
        'id': '合计',
        num: (() => {
          let num = 0;
          this.tableData.map((item, index) => {
            num += item.num;
          });
          return num;
        })()
      };
      let allObj = {
        'id': '总计',
        num: (() => {
          let num = 0;
          this.commiList.map((item) => {
            num += item.num;
          });
          return num;
        })()
      };
      return this.tableData.concat(totalObj, allObj);
    }
  },
  created: function () {
    for (let i = 0; i < 5; i++) {
      this.commiList.map((item) => {
        this.tableData.push(item);
      });
    }
  },
  methods: {
    filterTable () {}
  }
};
</script>

<style lang="less" scoped>
  .commi-manage {
    .region-main{
    }
  }
</style>
