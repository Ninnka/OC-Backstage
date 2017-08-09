export default {
  data () {
    return {
      allTotalObj: {},
      recordTabelCurrentPage: 1,
      pageSizes: [5, 10, 20],
      pageSize: 5
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
    menuClickCommand (command) {
      if (command === 'ensure') {
        this.$refs.tableColMenu.hide();
      }
      if (command === 'reset') {
        for (let col of Object.values(this.tableColsStatus)) {
          col.show = true;
        }
        this.$nextTick(() => {
          this.$refs.tableColMenu.hide();
        });
      }
    }
  },
  computed: {
    paginationItemTotal () {
      return this.tableData.length;
    },
    compuTableColsName () {
      return this.tableColsName.filter((element) => {
        return this.tableColsStatus[element].show;
      });
    }
  }
};
