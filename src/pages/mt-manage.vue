<template>
  <div class="mt-manage">
    <article class="region">
      <header>
        用户管理
      </header>
      <div class="region-main">
        <el-form class="filter-input" :model="mtManageForm" label-width="100px">
          <el-form-item label="MT账号">
            <el-input v-model="mtManageForm.account" placeholder="请输入MT账号"></el-input>
          </el-form-item>
          <el-form-item label="所属用户">
            <el-select v-model="mtManageForm.superior" placeholder="请输入所属用户名称">
              <el-option  v-for="item in getSuperiorList(tableData, 'superior')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="query-btn">
          <el-button type="info" @click="filterTable">查询</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="account" label="MT账号"></el-table-column>
          <el-table-column prop="superior" label="所属用户"></el-table-column>
          <el-table-column prop="leverage"  label="杠杆"></el-table-column>
          <el-table-column prop="balance" label="余额"></el-table-column>
          <el-table-column prop="requestTime" label="申请时间"></el-table-column>
          <el-table-column label="账号状态">
            <template scope="scope">
              <el-switch v-model="scope.row.accountStatus" on-text="" off-text="" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="tradeStatus" label="交易状态">
            <template scope="scope">
              <el-switch v-model="scope.row.tradeStatus" on-text="" off-text="" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="mentionStatus" label="出金状态">
            <template scope="scope">
              <el-switch v-model="scope.row.mentionStatus" on-text="" off-text="" disabled></el-switch>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="nowPage"
          :page-sizes="[10, 15, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableData.length">
        </el-pagination>
      </div>
    </article>
  </div>
</template>

<script>
import mtManageData from '@mixins/mt-manage-data-mixin';
export default {
  name: 'MtManage',
  components: {
  },
  mixins: [
    mtManageData
  ],
  data () {
    return {
      mtManageForm: {
        account: '',
        superior: ''
      },
      tableData: [],
      nowPage: 1
    };
  },
  computed: {
  },
  created: function () {
    for (let i = 0; i < 5; i++) {
      this.mtList.map((item) => {
        this.tableData.push(item);
      });
    }
  },
  methods: {
    filterTable () {},
    handleSizeChange (val) {
      console.log(val);
    },
    handleCurrentChange (val) {
      console.log(val);
    }
  }
};
</script>

<style lang="less" scoped>
  .mt-manage {
  }
</style>
