<template>
  <div class="transaction-manage">
    <!--transaction-manage-->
    <article class="region">
      <header>交易管理</header>
      <div class="region-main">
        <div class="form-content">
          <ul class="form-list">
            <li>
              <label class="form-name">账号/昵称</label>
              <input class="form-mes" type="text" name="id">
            </li>
            <li>
              <label class="form-name">交易类型</label>
              <select class="">
                <option value="">11111</option>
              </select>
            </li>
            <li>
              <label class="form-name">开仓时间</label>
              <input type="text">
            </li>
          </ul>
          <ul class="form-list">
            <li>
              <label class="form-name">交易订单号</label>
              <input type="text" name="id">
            </li>
            <li>
              <label class="form-name">交易种类</label>
              <select>
                <option value="">11111</option>
              </select>
            </li>
            <li>
              <label class="form-name">平仓时间</label>
              <input type="text">
            </li>
          </ul>
          <ul class="form-list">
            <li>
              <label class="form-name">MT账号</label>
              <input type="text" name="id">
            </li>
            <li>
              <label class="form-name">订单类型</label>
              <select>
                <option value="">11111</option>
              </select>
            </li>
          </ul>
        </div>
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
      .form-content{
        display: flex;
        .form-list{
          flex: 0 0 33.3333%;
          .form-name{
            width: 100px;
            font-size:14px;
            color:#fff;
          }
        }
      }
    }
  }
</style>
