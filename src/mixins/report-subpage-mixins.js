export default {
  data () {
    return {
      resData: [],
      tableLoading: false,
      allTotalObj: {},
      recordTabelCurrentPage: 1,
      pageSizes: [5, 10, 20],
      pageSize: 5,
      isFilter: false,
      tableColsNameControl: [],
      elementLoadingText: '加载数据中'
    };
  },
  methods: {
    checkVisibility (label) {
      return this.compuTableColsName.indexOf(label) !== -1;
    },
    tableRowClassName (row, index) {
      if (index % 2 === 1) {
        return 'even-row';
      }
      return 'odd-row';
    },
    recordTabelSizeChange (size) {
      this.pageSize = size;
    },
    recordTabelCurrentChange (currentPage) {
      this.recordTabelCurrentPage = currentPage;
    },
    getCodeClass (scope) {
      switch (scope.row.objSymbol) {
        case 'currentTotal':
          return 'hightlight-current-total';
        case 'allTotal':
          return 'hightlight-all-total';
        default:
          return '';
      }
    },
    getSuperiorClass (scope) {
      return scope.row.objSymbol !== 'currentTotal' && scope.row.objSymbol !== 'allTotal' ? 'hightlight-link' : '';
    },
    menuClickCommand (command) {
      switch (command) {
        case 'ensure_v1':
          this.tableColsNameControl = ['code'];
          for (let [index, col] of Object.entries(this.tableColsStatus)) {
            if (index !== 'code' && col.show === true) {
              this.tableColsNameControl.push(index);
            }
          }
          this.isFilter = true;
          this.$nextTick(() => {
            this.$refs.tableColMenu.hide();
          });
          break;
        case 'reset_v1':
          this.tableColsNameControl = [];
          this.isFilter = false;
          for (let [index, col] of Object.entries(this.tableColsStatus)) {
            if (index !== 'code') {
              col.show = false;
            }
          }
          this.$nextTick(() => {
            this.$refs.tableColMenu.hide();
          });
          break;
        case 'ensure_v2':
          this.$refs.tableColMenu.hide();
          break;
        case 'reset_v2':
          for (let [index, col] of Object.entries(this.tableColsStatus)) {
            col.show = true;
          }
          this.$nextTick(() => {
            this.$refs.tableColMenu.hide();
          });
          break;
        case 'clear':
          for (let [index, col] of Object.entries(this.tableColsStatus)) {
            if (index !== 'code') {
              col.show = false;
            }
          }
          this.$nextTick(() => {
            this.$refs.tableColMenu.hide();
          });
          break;
      }
      // if (command === 'ensure_v1') {
      //   this.isFilter = true;
      //   this.tableColsNameControl = ['code'];
      //   for (let [index, col] of Object.entries(this.tableColsStatus)) {
      //     if (index !== 'code' && col.show === true) {
      //       this.tableColsNameControl.push(index);
      //     }
      //   }
      //   this.$refs.tableColMenu.hide();
      // }
      // if (command === 'reset_v1') {
      //   this.tableColsNameControl = this.tableColsName.slice(0);
      //   this.isFilter = false;
      //   for (let [index, col] of Object.entries(this.tableColsStatus)) {
      //     if (index !== 'code') {
      //       col.show = false;
      //     }
      //   }
      //   this.$nextTick(() => {
      //     this.$refs.tableColMenu.hide();
      //   });
      // }
      // if (command === 'ensure_v2') {
      //   this.$refs.tableColMenu.hide();
      // }
      // if (command === 'reset_v2') {
      //   for (let [index, col] of Object.entries(this.tableColsStatus)) {
      //     col.show = true;
      //   }
      //   this.$nextTick(() => {
      //     this.$refs.tableColMenu.hide();
      //   });
      // }
    },
    getTableColsName () {
      if (this.isFilter) {
        return this.tableColsNameControl;
      } else {
        return this.tableColsName;
      }
    }
  },
  computed: {
    paginationItemTotal () {
      return this.tableData.length;
    },
    compuTableColsName () {
      let res = this.tableColsName.filter((element) => {
        return this.tableColsStatus[element].show;
      });
      return res;
    }
  },
  activated () {
    this.tableLoading = true;
    setTimeout(() => {
      this.tableLoading = false;
    }, 1500);
  }
};
