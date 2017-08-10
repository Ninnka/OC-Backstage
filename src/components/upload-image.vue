<template>
  <div class="upload-image__wrap" :class="typeof cusClass === 'object' ? cusClass.join(' ') : cusClass">
    <div class="upload-image__slot--wrap">
      <slot name="upload-image__slot"></slot>
    </div>
    <div class="posi-abs upload-image__preview" v-if="showPreview">
       <canvas :id="randomID"></canvas>
    </div>
    <div class="posi-abs upload-image__input__wrap">
      <form enctype="multipart/form-data" method="post">
        <input type="file" name="uploadFiles" :multiple="isMultiple" :accept="getAccept" @change="inputChange($event)">
      </form>
    </div>
    <div class="posi-abs action--close" v-if="showClear" @click="clearFileList">
      <i class="el-icon-close"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showPreview: {
      default: true,
      type: Boolean
    },
    cusClass: {
      default: () => {
        return [];
      },
      type: [Array, String]
    },
    additionalAcceptType: {
      default: () => {
        return [];
      },
      type: Array
    },
    isMultiple: {
      default: false,
      type: Boolean
    },
    autoUpload: {
      default: false,
      type: Boolean
    },
    showClear: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      canvasDataReady: false,
      fileList: [],
      randomID: '',
      acceptImageArr: ['image/jpeg', 'image/jpg', 'image/png']
    };
  },
  methods: {
    getRandomId () {
      let res = ('c' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).match(/[a-zA-Z]\w{1,5}/);
      return res[0];
    },
    inputChange ($event) {
      this.fileList = $event.target.files || $event.dataTransfer.files;
      this.canvasDataReady = true;
      if (this.showPreview) {
        this.readFile();
      }
      if (this.autoUpload) {
        // TODO: 自动上传
      }
    },
    readFile () {
      let file = this.fileList[0];
      if (!file) {
        return false;
      } else if (!/image\/\w+/.test(file.type)) {
        this.$message({
          type: 'error',
          showClose: true,
          message: '请确保文件为图像类型',
          duration: 2000
        });
        return false;
      }
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        this.drawIntoCanvas(reader.result);
      };
    },
    drawIntoCanvas (imgData) {
      let cvs = document.querySelector('#' + this.randomID);
      let ctx = cvs.getContext('2d');
      let img = new Image();
      img.src = imgData;
      img.onload = () => {
        // NOTE: 绘制图片暂时是100%填充，如果有其他需求可以提issue
        ctx.clearRect(0, 0, cvs.width, cvs.height);
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, cvs.width, cvs.height);
        // NOTE: 获取canvas base64数据
        // strDataURI = cvs.toDataURL();
        this.emitImgAndCanvasLoaded();
      };
    },
    emitImgAndCanvasLoaded () {
      // 触发图片和canvas已经加载完成的事件，并将图片对象传到父组件中
      this.$emit('fileLoaded', {
        symbolId: this.randomID,
        data: this.fileList[0]
      });
    },
    clearFileList () {
      let cvs = document.querySelector('#' + this.randomID);
      let ctx = cvs.getContext('2d');
      ctx.clearRect(0, 0, cvs.width, cvs.height);
      this.fileList = [];
      this.$emit('clearFileList', {
        symbolId: this.randomID
      });
    }
  },
  computed: {
    getAccept () {
      return (this.acceptImageArr.concat(this.additionalAcceptType)).join(',');
    }
  },
  created () {
    // 给canvas设置一个随机id
    this.randomID = this.getRandomId();
  }
};
</script>

<style lang="less">
.posi-abs {
  position: absolute;
}

.upload-image__wrap {
  position: relative !important;
  > div {
    top: 0;
    left: 0;
  }
  > div:nth-child(2) {
    width: 100%;
    height: 100%;
    canvas {
      width: 100%;
      height: 100%;
      border-radius: 9px;
    }
  }
}

.upload-image__input__wrap {
  opacity: 0;
  width: 100%;
  height: 100%;
  form {
    width: 100%;
    height: 100%;
    input {
      height: 100%;
      width: 100%;
      opacity: 0;
      vertical-align: top;
      cursor: pointer;
    }
  }
}

.upload-image__slot--wrap {
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.action--close {
  top: 0px !important;
  right: 0px !important;
  left: initial !important;
  height: 24px !important;
  width: 24px !important;
  text-align: center;
  background: rgba(0, 0, 0, .4);
  color: #ffffff;
  font-size: 0;
  border-radius: 100%;
  cursor: pointer;
  > i {
    font-size: 13px;
    vertical-align: text-bottom;
  }
}
</style>
