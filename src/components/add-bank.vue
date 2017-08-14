<template>
  <article class="popup add-bank" v-show="show">
    <div class="popup-main">
      <header>
        添加银行卡
        <i class="close" @click="close">×</i>
      </header>
      <div class="popup-content">
        <el-form ref="form" :model="form" label-width="100px">
          <el-form-item label="开户银行">
            <el-select v-model="form.bankMes" placeholder="请选择您的开户银行">
              <el-option  v-for="item in CommonApi.bankList" :key="item.bankCode" :label="item.bankTitle" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开户支行" class="bank-branch">
            <el-select v-model="form.province" placeholder="请选择省份" @change="initCity">
              <el-option  v-for="item in CommonApi.provinceList" :key="item.name" :label="item.name" :value="item"></el-option>
            </el-select>
            <el-select v-model="form.city" placeholder="请选择地市">
              <el-option  v-for="item in form.province.cityList" :key="item" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="form.branch" placeholder="请输入支行名称"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号">
            <el-input v-model="form.bankNumber" placeholder="请输入银行卡号"></el-input>
          </el-form-item>
          <el-form-item label="银行卡照片">
            <el-input v-model="form.imgData" placeholder="请输入照片数据"></el-input>
          </el-form-item>
          <el-form-item label="开户人姓名">
            <el-input v-model="form.name" placeholder="请输入开户人姓名"></el-input>
          </el-form-item>
          <el-form-item label="预留手机">
            <el-input v-model="form.phone" placeholder="请输入您在银行开户时预留的手机号码"></el-input>
          </el-form-item>
        </el-form>
        <button class="sure-btn hot-bg" @click="addBank">添加</button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'addBank',
  data () {
    return {
      form: {
        bankMes: this.CommonApi.bankList[0],
        province: this.CommonApi.provinceList[0],
        city: this.CommonApi.provinceList[0].cityList[0],
        branch: '',
        bankNumber: '',
        imgData: '',
        name: '',
        phone: ''
      }
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    bankList () {
      return this.$store.state.bankList;
    }
  },
  created: function () {
  },
  methods: {
    initCity (item) {
      this.form.city = item.cityList[0];
    },
    close () {
      this.$emit('update:show', false);
    },
    addBank () {
      if (this.form.branch === '') {
        this.$message({
          type: 'success',
          message: '内容不许为空!'
        });
      } else {
        this.$store.commit('addBankList', this.form);
        this.$message({
          type: 'success',
          message: '添加成功!'
        });
        this.close();
      }
    }
  }
};
</script>

<style lang="less" scoped>
  .add-bank{
    .bank-branch{
      text-align: left;
      .el-select{
        width: 46%;
      }
      .el-select:nth-of-type(2){
        margin-left: 6%;
      }
    }
    .sure-btn{
      font-size: 16px;
      color: #ffffff;
      width:190px;
      height:40px;
      border-radius: 4px;
    }
  }
</style>
