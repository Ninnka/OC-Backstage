export default {
  data () {
    return {
      tableColsName: [
        'code',
        'account',
        'nickName',
        'agentName',
        'superior',
        'commissionTotal',
        'profitFrequency',
        'profitTotal',
        'lossFrequency',
        'lossTotal',
        'epicycle',
        'profitRate',
        'shiftInFrequency',
        'shiftInTotal',
        'shiftInCharge',
        'rollOutFrequency',
        'rollOutTotal',
        'rollOutCharge'
      ],
      tableColsStatus: {
        code: {
          show: true,
          label: '编号'
        },
        account: {
          show: false,
          label: '账号'
        },
        nickName: {
          show: false,
          label: '昵称'
        },
        agentName: {
          show: false,
          label: '名称'
        },
        superior: {
          show: false,
          label: '所属上级'
        },
        commissionTotal: {
          show: false,
          label: '总返佣'
        },
        profitFrequency: {
          show: false,
          label: '红利盈利次数'
        },
        profitTotal: {
          show: false,
          label: '红利盈利总额'
        },
        lossFrequency: {
          show: false,
          label: '红利亏损次数'
        },
        lossTotal: {
          show: false,
          label: '红利亏损总额'
        },
        epicycle: {
          show: false,
          label: '红利总盈亏'
        },
        profitRate: {
          show: false,
          label: '盈利率'
        },
        shiftInFrequency: {
          show: false,
          label: '入金次数'
        },
        shiftInTotal: {
          show: false,
          label: '入金总额'
        },
        shiftInCharge: {
          show: false,
          label: '入金手续费'
        },
        rollOutFrequency: {
          show: false,
          label: '出金次数'
        },
        rollOutTotal: {
          show: false,
          label: '出金总额'
        },
        rollOutCharge: {
          show: false,
          label: '出金手续费'
        }
      },
      tableData: [
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈1',
          agentName: '华尔街营业部',
          superior: '上级1',
          commissionTotal: 99999,
          profitFrequency: 106,
          profitTotal: 99999,
          lossFrequency: 85,
          lossTotal: 99999,
          epicycle: 99999,
          profitRate: 0.23,
          shiftInFrequency: 42,
          shiftInTotal: 99999,
          shiftInCharge: 99999,
          rollOutFrequency: 7,
          rollOutTotal: 99999,
          rollOutCharge: 99999
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈2',
          agentName: '华尔街营业部',
          superior: '上级2',
          commissionTotal: 99999,
          profitFrequency: 106,
          profitTotal: 99999,
          lossFrequency: 85,
          lossTotal: 99999,
          epicycle: 99999,
          profitRate: 0.23,
          shiftInFrequency: 42,
          shiftInTotal: 99999,
          shiftInCharge: 99999,
          rollOutFrequency: 7,
          rollOutTotal: 99999,
          rollOutCharge: 99999
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈3',
          agentName: '华尔街营业部',
          superior: '上级3',
          commissionTotal: 99999,
          profitFrequency: 106,
          profitTotal: 99999,
          lossFrequency: 85,
          lossTotal: 99999,
          epicycle: 99999,
          profitRate: 0.23,
          shiftInFrequency: 42,
          shiftInTotal: 99999,
          shiftInCharge: 99999,
          rollOutFrequency: 7,
          rollOutTotal: 99999,
          rollOutCharge: 99999
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: '上级4',
          commissionTotal: 99999,
          profitFrequency: 106,
          profitTotal: 99999,
          lossFrequency: 85,
          lossTotal: 99999,
          epicycle: 99999,
          profitRate: 0.23,
          shiftInFrequency: 42,
          shiftInTotal: 99999,
          shiftInCharge: 99999,
          rollOutFrequency: 7,
          rollOutTotal: 99999,
          rollOutCharge: 99999
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: '上级5',
          commissionTotal: 99999,
          profitFrequency: 106,
          profitTotal: 99999,
          lossFrequency: 85,
          lossTotal: 99999,
          epicycle: 99999,
          profitRate: 0.23,
          shiftInFrequency: 42,
          shiftInTotal: 99999,
          shiftInCharge: 99999,
          rollOutFrequency: 7,
          rollOutTotal: 99999,
          rollOutCharge: 99999
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: '上级7',
          commissionTotal: 99999,
          profitFrequency: 106,
          profitTotal: 99999,
          lossFrequency: 85,
          lossTotal: 99999,
          epicycle: 99999,
          profitRate: 0.23,
          shiftInFrequency: 42,
          shiftInTotal: 99999,
          shiftInCharge: 99999,
          rollOutFrequency: 7,
          rollOutTotal: 99999,
          rollOutCharge: 99999
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: '上级',
          commissionTotal: 99999,
          profitFrequency: 106,
          profitTotal: 99999,
          lossFrequency: 85,
          lossTotal: 99999,
          epicycle: 99999,
          profitRate: 0.23,
          shiftInFrequency: 42,
          shiftInTotal: 99999,
          shiftInCharge: 99999,
          rollOutFrequency: 7,
          rollOutTotal: 99999,
          rollOutCharge: 99999
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: '上级',
          commissionTotal: 99999,
          profitFrequency: 106,
          profitTotal: 99999,
          lossFrequency: 85,
          lossTotal: 99999,
          epicycle: 99999,
          profitRate: 0.23,
          shiftInFrequency: 42,
          shiftInTotal: 99999,
          shiftInCharge: 99999,
          rollOutFrequency: 7,
          rollOutTotal: 99999,
          rollOutCharge: 99999
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: '上级',
          commissionTotal: 99999,
          profitFrequency: 106,
          profitTotal: 99999,
          lossFrequency: 85,
          lossTotal: 99999,
          epicycle: 99999,
          profitRate: 0.23,
          shiftInFrequency: 42,
          shiftInTotal: 99999,
          shiftInCharge: 99999,
          rollOutFrequency: 7,
          rollOutTotal: 99999,
          rollOutCharge: 99999
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: '上级',
          commissionTotal: 99999,
          profitFrequency: 106,
          profitTotal: 99999,
          lossFrequency: 85,
          lossTotal: 99999,
          epicycle: 99999,
          profitRate: 0.23,
          shiftInFrequency: 42,
          shiftInTotal: 99999,
          shiftInCharge: 99999,
          rollOutFrequency: 7,
          rollOutTotal: 99999,
          rollOutCharge: 99999
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: '上级',
          commissionTotal: 99999,
          profitFrequency: 106,
          profitTotal: 99999,
          lossFrequency: 85,
          lossTotal: 99999,
          epicycle: 99999,
          profitRate: 0.23,
          shiftInFrequency: 42,
          shiftInTotal: 99999,
          shiftInCharge: 99999,
          rollOutFrequency: 7,
          rollOutTotal: 99999,
          rollOutCharge: 99999
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: '上级',
          commissionTotal: 99999,
          profitFrequency: 106,
          profitTotal: 99999,
          lossFrequency: 85,
          lossTotal: 99999,
          epicycle: 99999,
          profitRate: 0.23,
          shiftInFrequency: 42,
          shiftInTotal: 99999,
          shiftInCharge: 99999,
          rollOutFrequency: 7,
          rollOutTotal: 99999,
          rollOutCharge: 99999
        }
      ]
    };
  }
};
