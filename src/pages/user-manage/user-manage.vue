<template>
  <div class="user-manage">
    <article class="region">
      <header>
        用户管理
      </header>
      <div class="region-main">
        <el-form class="filter-input" :model="userManageForm" label-width="100px">
          <el-form-item label="账号/昵称">
            <el-input v-model="userManageForm.nickName" placeholder="请输入账号或者昵称"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="userManageForm.realName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="userManageForm.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model="userManageForm.cardId" placeholder="请输入证件号码"></el-input>
          </el-form-item>
          <el-form-item label="主MT账号">
            <el-input v-model="userManageForm.mtId" placeholder="请输入主MT账号"></el-input>
          </el-form-item>
          <el-form-item label="开户时间">
            <el-date-picker v-model="userManageForm.timeRange" type="datetimerange" placeholder="选择查询的时间范围"></el-date-picker>
          </el-form-item>
          <el-form-item label="所属代理">
            <el-select v-model="userManageForm.agent" placeholder="请选择所属代理">
              <el-option  v-for="item in getSuperiorList(tableData, 'superior')" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="userManageForm.aboutIndirect">包含间接交易商</el-checkbox>
          </el-form-item>
        </el-form>
        <div class="query-btn">
          <el-button type="info" @click="filterTable">查询</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="account" label="账号"></el-table-column>
          <el-table-column prop="nickName" label="昵称"></el-table-column>
          <el-table-column prop="superior" label="所属上级"></el-table-column>
          <el-table-column prop="openTime"  label="开户时间"></el-table-column>
          <el-table-column prop="realName" label="真实姓名"></el-table-column>
          <el-table-column prop="phone" label="联系方式"></el-table-column>
          <el-table-column label="MT账号数量">
            <template scope="scope">
              {{scope.row.mtList.length}}
            </template>
          </el-table-column>
          <el-table-column label="主MT账号">
            <template scope="scope">
              {{getMainMt(scope.row.mtList)}}
            </template>
          </el-table-column>
          <el-table-column label="账号状态">
            <template scope="scope">
              <el-switch v-model="scope.row.accountStatus" on-text="" off-text="" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="mentionStatus" label="出金状态">
            <template scope="scope">
              <el-switch v-model="scope.row.mentionStatus" on-text="" off-text="" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="tradeStatus" label="交易状态">
            <template scope="scope">
              <el-switch v-model="scope.row.tradeStatus" on-text="" off-text="" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="promotStatus" label="推广状态">
            <template scope="scope">
              <el-switch v-model="scope.row.promotStatus" on-text="" off-text="" disabled></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template scope="scope">
              <el-button @click="viewUserMes(scope.row)" type="text" size="small">查看</el-button>
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
import userManageData from './user-manage-data-mixin';
export default {
  name: 'UserManage',
  components: {
  },
  mixins: [
    userManageData
  ],
  data () {
    return {
      userManageForm: {
        nickName: '',
        realName: '',
        phone: '',
        cardId: '',
        mtId: '',
        timeRange: '',
        agent: '',
        aboutIndirect: false
      },
      tableData: [],
      nowPage: 1
    };
  },
  computed: {
  },
  created: function () {
    this.userList.forEach((item) => {
      item.bankList.forEach((userbank) => {
        this.CommonApi.bankList.map((bank) => {
          if (userbank.bankCode === bank.bankCode) {
            userbank.bankMes = bank;
          }
        });
      });
      return item;
    });
    for (let i = 0; i < 5; i++) {
      this.userList.map((item) => {
        this.tableData.push(item);
      });
    }
  },
  methods: {
    getMainMt (list) {
      return list.filter((item) => {
        if (item.type === 'main') {
          return item;
        }
      })[0].account;
    },
    filterTable () {},
    viewUserMes (mes) {
      this.$store.commit('UserManage/update_UserMes', mes);
      this.$router.push('user-information');
    },
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
  .user-manage {
  }
</style>
