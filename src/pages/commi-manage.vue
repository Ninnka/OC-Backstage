<template>
  <div class="commi-manage">
    <!--commi-manage-->
    <article class="region">
      <header>佣金管理</header>
      <div class="region-main">
        <div class="form-content">
          <el-form>
            <el-form-item label="佣金单号">
              <el-input placeholder="请输入佣金单号"></el-input>
            </el-form-item>
            <el-form-item label="返佣关系">
              <el-select placeholder="直客/间客">
                <el-option></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="返佣代理商">
              <el-input placeholder="请输入代理商名称"></el-input>
            </el-form-item>
          </el-form>
          <el-form>
            <el-form-item label="交易订单号">
              <el-input placeholder="请输入交易订单号"></el-input>
            </el-form-item>
            <el-form-item label="返佣状态">
              <el-select placeholder="已入账/未结算/已结算">
                <el-option></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-checkbox>包含下级所有代理商</el-checkbox>
            </el-form-item>
          </el-form>
          <el-form>
            <el-form-item label="时间范围">
              <el-input placeholder="请选择需要查询的时间范围"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-button>查询</el-button>
          <el-select>
            <el-option>1111111</el-option>
          </el-select>
        </div>
        <el-table :data="commiList" stripe style="width: 100%">
          <el-table-column prop="id" label="编号"></el-table-column>
          <el-table-column prop="user" label="交易用户"></el-table-column>
          <el-table-column prop="mtAccount" label="MT账号"></el-table-column>
          <el-table-column prop="orderNumber" label="交易订单号"></el-table-column>
          <el-table-column prop="agents" label="收佣代理商"></el-table-column>
          <el-table-column prop="relation" label="返佣关系"></el-table-column>
          <el-table-column prop="details" label="返佣明细"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
        </el-table>
        <div class="table-sum">
          <div>
            <span>合计：</span>
            <span>交易商：5个</span>
            <span>交易：30比</span>
            <span>2</span>
            <span>直客：5，间客：6</span>
            <span>$99.999.00</span>
          </div>
          <div>

          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'CommiManage',
  components: {
  },
  data () {
    return {
      commiList: [
        {
          id: 123456,
          user: 'Jinx',
          mtAccount: '54321',
          orderNumber: 'JY00000001',
          agents: 'Banana',
          relation: '直客',
          details: '20% / $99.999.00',
          status: '未结算'
        },
        {
          id: 123123,
          user: 'Lux',
          mtAccount: '54321',
          orderNumber: 'JY00000001',
          agents: 'Banana',
          relation: '直客',
          details: '20% / $99.999.00',
          status: '未结算'
        }
      ]
    };
  },
  computed: {
  },
  created: function () {
  },
  methods: {
  }
};
</script>

<style lang="less" scoped>
  .commi-manage {
    .region-main{
      .form-content{

      }
    }
  }
</style>
