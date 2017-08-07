<template>
  <div class="transaction-manage">
    <!--transaction-manage-->
    <article class="region">
      <header>交易管理</header>
      <div class="region-main">
        <form>
          <ul>
            <li>
              <label class="">账号/昵称</label>
              <input type="text" name="id">
              <label>交易订单号</label>
              <input type="text" name="id">
              <label>MT账号</label>
              <input type="text" name="id">
            </li>
            <li>
              <label>交易类型</label>
              <select>
                <option value=""></option>
              </select>
              <label>交易种类</label>
              <select>
                <option value=""></option>
              </select>
              <label>订单类型</label>
              <select>
                <option value=""></option>
              </select>
            </li>
            <li>
              <label>开仓时间</label>
              <input type="text">
              <label>平仓时间</label>
              <input type="text">
            </li>
          </ul>
        </form>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'TransactionManage',
  components: {
  },
  data () {
    return {
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
  .transaction-manage {
    padding: 20px;
    .region-main{
      width: 100;
      form{
        label{
          color:#fff;
        }
      }
    }
  }
</style>
