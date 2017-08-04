<template>
  <div class="test">
    <button class="cold-bg">冷色渐变</button>
    <button class="hot-bg">热色渐变</button>
    <div class="is-flex test-main">
      <article class="region">
      <header>
        模块一
      </header>
      <div class="region-main">

      </div>
      </article>
      <article class="region">
      <header>
        模块二
      </header>
      <div class="region-main">

      </div>
      </article>
    </div>
    <button class="cold-bg" @click="contralPopup">弹出框样式以及表单样式</button>
    <div class="popup" v-show="show">
      <article class="popup-main">
        <header>
          表单全部采用element表单，样式已写好
          <i class="close" @click="contralPopup">×</i>
        </header>
        <div class="popup-content">
          <el-form ref="form" :model="testForm" label-width="100px">
            <el-form-item label="活动名称">
              <el-input v-model="testForm.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select v-model="testForm.region" placeholder="请选择活动区域">
                <el-option label="上海" value="上海"></el-option>
                <el-option label="北京" value="北京"></el-option>
              </el-select>
            </el-form-item>
            <verify :parentVerify.sync="testForm.verify" :parentPhone.sync="testForm.phone" :needPhone="true"></verify>
          </el-form>
          <button class="sure-btn">确认按钮</button>
        </div>
      </article>
    </div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <button class="cold-bg" @click="showDelMt = true">禁用mt账号</button>
    <popup :show.sync="showDelMt" :needCancel=true :title="'禁用MT账号'" v-on:confirmEvent="test">
      <p name="content" class="del-text">
        您正在申请禁用MT账号：54321，禁用后，该账号的所有持仓单将会被自动平仓，同时，您将无法再使用该MT账号进行任何交易以及出入金操作，是否继续？
      </p>
    </popup>
    <div class="demo__use-upload-image">
      <upload-image cusClass="use-upload-image__cus-class" @fileLoaded="fileLoaded">
        <template slot="upload-image__slot">
          <!-- 这里需要什么样式或html元素自己填写 -->
          <div class="use-upload-image__btn">上传图片</div>
        </template>
      </upload-image>
    </div>
  </div>
</template>

<script>
import verify from '@comps/verify.vue';
import popup from '@comps/popup.vue';
import uploadImage from '@comps/upload-image';
export default {
  name: 'test',
  components: {
    verify,
    popup,
    uploadImage
  },
  data () {
    return {
      show: false,
      showAddBank: false,
      showModifyMt: false,
      showDelMt: false,
      testForm: {
        verify: '',
        phone: '',
        name: '',
        region: '上海'
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      // 用于存储上传照片组件中的图片
      fileList: []
    };
  },
  computed: {
  },
  created: function () {
  },
  methods: {
    contralPopup () {
      if (this.show) {
        this.show = false;
      } else {
        this.show = true;
      }
    },
    test () {
      this.$message({
        type: 'success',
        message: '禁用成功!'
      });
    },
    // 用于监听事件图片组件的事件
    fileLoaded (param) {
      for (let i = 0; i < this.fileList.length; i++) {
        if (this.fileList[i].symbolId === param.symbolId) {
          this.fileList[i] = param;
          return;
        }
      }
      this.fileList.push(param);
    }
  }
};
</script>

<style lang="less" scoped>
  .test{
    .test-main{
      width: 100%;
      .region{
        flex: 1;
        margin:0 10px;
      }
    }
    button{
      width: 100px;
      height: 40px;
    }
  }
.demo__use-upload-image {
  margin-top: 20px;
  border: 1px solid #ffffff;
  .use-upload-image__btn {
    text-align: center;
    line-height: 200px;
    width: 300px;
    height: 200px;
    background: linear-gradient(-90deg, #00e2b8 0%, #009acd 100%) !important;
    color: #ffffff;
  }
}
.use-upload-image__cus-class {
  display: inline-block;
  width: auto;
  height: auto;
}
</style>
