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
    <article class="region has-total">
      <!--有合计的时候加has-total类名-->
      <header>
        顶部表单列表样式以及具有合计与总计样式以及分页组件
      </header>
      <div class="region-main">
        <el-form class="filter-input" :model="userAuditForm" label-width="100px">
          <el-form-item label="账号/昵称">
            <el-input v-model="userAuditForm.nickName" placeholder="请输入账号或者昵称"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名">
            <el-input v-model="userAuditForm.realName" placeholder="请输入真实姓名"></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="userAuditForm.phone" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item label="证件号码">
            <el-input v-model="userAuditForm.cardId" placeholder="请输入证件号码"></el-input>
          </el-form-item>
          <el-form-item label="邀请人">
            <el-input v-model="userAuditForm.invitingPeople" placeholder="请输入邀请人姓名"></el-input>
          </el-form-item>
          <el-form-item label="开户时间">
            <el-date-picker v-model="userAuditForm.timeRange" type="datetimerange" placeholder="请选择时间范围"></el-date-picker>
          </el-form-item>
        </el-form>
        <div class="query-btn">
          <el-button type="info" @click="filterTable">查询</el-button>
        </div>
        <el-table
          :data="totalData"
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
          <el-table-column
            prop="num"
            label="数值">
          </el-table-column>
        </el-table>
      </div>
      <!--分页组件：-->
      <!--sourceData是源数组-->
      <!--displayData是要显示的当页数组-->
      <paging :sourceData="testList" :displayData.sync="tableData"></paging>
    </article>

    <!--信息页面单行公共样式-->
    <article class="region">
      <header>信息页面单行公共样式</header>
      <div class="region-main">
        <ul class="user-list">
          <li class="align-top">
            <div class="user-label">我的头像：</div>
            <div class="user-mes">
              <div class="user-img">
                <img src="../assets/img/user.jpg" alt="" />
              </div>
            </div>
          </li>
          <li>
            <div class="user-label">交易账号：</div>
            <div class="user-mes">852456</div>
          </li>
          <li>
            <div class="user-label">昵称：</div>
            <div class="user-mes">陈晨</div>
          </li>
        </ul>
      </div>
    </article>

    <!--信息页面多行公共样式-->
    <article class="region">
      <header>信息页面多行公共样式</header>
      <div class="region-main">
        <ul class="user-list user-list-two">
          <li>
            <div class="user-label">余额：</div>
            <div class="user-mes">$999999</div>
          </li>
          <li>
            <div class="user-label">保证金：</div>
            <div class="user-mes">$999999</div>
          </li>
          <li>
            <div class="user-label">已结佣金：</div>
            <div class="user-mes">$999999</div>
          </li>
          <li>
            <div class="user-label">未结佣金：</div>
            <div class="user-mes">$999999</div>
          </li>
        </ul>
      </div>
    </article>

    <button class="cold-bg" @click="showDelMt = true">弹出框组件以及验证码组件</button>
    <!--弹出框API：-->
    <!--show：控制此弹出框的显示-->
    <!--needCancel表示是否需要取消按钮，默认为false-->
    <!--title为标题-->
    <!--confirmText表示确认按钮内文字，默认为确认-->
    <!--cancelText表示取消按钮内文字，默认为取消-->
    <!--cancelEvent表示取消按钮事件，当取消按钮文字为默认时事件默认为关闭当前弹窗-->
    <!--confirmEvent表示确认按钮事件-->
    <popup :show.sync="showDelMt" :needCancel=true :title="'弹出框'" :confirmText="'通过'" :cancelText="'驳回'" v-on:confirmEvent="test" v-on:cancelEvent="test">
      <template slot="content" >
        <!--弹出框内容自己定义-->
        <p class="del-text">
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
            <!--验证码组件-->
            <!--api说明：-->
            <!--parentVerify：父组件验证码定义变量-->
            <!--parentPhone：父组件号码定义变量-->
            <!--needPhone：是否需要输入手机号码，默认为false-->
            <verify :parentVerify.sync="testForm.verify" :parentPhone.sync="testForm.phone" :needPhone="true"></verify>
          </el-form>
        </p>
      </template>
    </popup>

    <article class="region">
      <header>修改信息组件</header>
      <div class="region-main">
        <ul class="user-list">
          <li>
            <!--邀请信息组件-->
            <modify-input :label="'修改信息组件'" :value="testValue" :doneEvent="modify"></modify-input>
          </li>
        </ul>
      </div>
    </article>

    <!--邀请信息组件-->
    <invited :title="'邀请信息组件'" :invitationCode="'888'" :invitationUrl="'http://www.baidu.com'"></invited>

    <!--上传图片组件-->
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
import paging from '@comps/paging.vue';
import invited from '@comps/invited.vue';
import modifyInput from '@comps/modify-input';
import verify from '@comps/verify.vue';
import popup from '@comps/popup.vue';
import uploadImage from '@comps/upload-image';
export default {
  name: 'test',
  components: {
    paging,
    verify,
    popup,
    uploadImage,
    invited,
    'modify-input': modifyInput
  },
  data () {
    return {
      show: false,
      showAddBank: false,
      showModifyMt: false,
      showDelMt: false,
      testValue: '123',
      testForm: {
        verify: '',
        phone: '',
        name: '',
        region: '上海'
      },
      userAuditForm: {
        nickName: '',
        realName: '',
        phone: '',
        cardId: '',
        invitingPeople: '',
        timeRange: '',
        auditStatus: ''
      },
      testList: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄',
        num: 1
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄',
        num: 2
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        num: 4
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄',
        num: 3
      }],
      tableData: [],
      // 用于存储上传照片组件中的图片
      fileList: []
    };
  },
  computed: {
    totalData () {
      let totalObj = {
        'date': '合计',
        num: (() => {
          let num = 0;
          this.tableData.map((item, index) => {
            num += item.num;
          });
          return num;
        })()
      };
      let allObj = {
        'date': '总计',
        num: (() => {
          let num = 0;
          this.testList.map((item) => {
            num += item.num;
          });
          return num;
        })()
      };
      return this.tableData.concat(totalObj, allObj);
    }
  },
  created: function () {
    for (let i = 0; i < 3; i++) {
      this.testList.map((item) => {
        this.testList.push(item);
      });
    }
    this.tableData = this.testList;
  },
  mounted () {
  },
  methods: {
    modify () {},
    filterTable () {},
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
    .region{
      margin-bottom: 20px;
    }
    .test-main{
      width: 100%;
      margin-bottom: 20px;
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
