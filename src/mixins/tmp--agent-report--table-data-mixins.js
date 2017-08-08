export default {
  data () {
    return {
      agentReportTableColsName: [
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
      agentReportTableColsStatus: {
        code: {
          show: true,
          label: '编号'
        },
        account: {
          show: true,
          label: '账号'
        },
        nickName: {
          show: true,
          label: '昵称'
        },
        agentName: {
          show: true,
          label: '名称'
        },
        superior: {
          show: true,
          label: '所属上级'
        },
        commissionTotal: {
          show: true,
          label: '总返佣'
        },
        profitFrequency: {
          show: true,
          label: '红利盈利次数'
        },
        profitTotal: {
          show: true,
          label: '红利盈利总额'
        },
        lossFrequency: {
          show: true,
          label: '红利亏损次数'
        },
        lossTotal: {
          show: true,
          label: '红利亏损总额'
        },
        epicycle: {
          show: true,
          label: '红利总盈亏'
        },
        profitRate: {
          show: true,
          label: '盈利率'
        },
        shiftInFrequency: {
          show: true,
          label: '入金次数'
        },
        shiftInTotal: {
          show: true,
          label: '入金总额'
        },
        shiftInCharge: {
          show: true,
          label: '入金手续费'
        },
        rollOutFrequency: {
          show: true,
          label: '出金次数'
        },
        rollOutTotal: {
          show: true,
          label: '出金总额'
        },
        rollOutCharge: {
          show: true,
          label: '出金手续费'
        }
      },
      agentReportTableData: [
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: 'aboqwi',
          commissionTotal: '99,999.00',
          profitFrequency: '106',
          profitTotal: '99,999.00',
          lossFrequency: '85',
          lossTotal: '99,999.00',
          epicycle: '99,999.00',
          profitRate: '23%',
          shiftInFrequency: '42',
          shiftInTotal: '99,999.00',
          shiftInCharge: '99,999.00',
          rollOutFrequency: '7',
          rollOutTotal: '99,999.00',
          rollOutCharge: '99,999.00'
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: 'aboqwi',
          commissionTotal: '99,999.00',
          profitFrequency: '106',
          profitTotal: '99,999.00',
          lossFrequency: '85',
          lossTotal: '99,999.00',
          epicycle: '99,999.00',
          profitRate: '23%',
          shiftInFrequency: '42',
          shiftInTotal: '99,999.00',
          shiftInCharge: '99,999.00',
          rollOutFrequency: '7',
          rollOutTotal: '99,999.00',
          rollOutCharge: '99,999.00'
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: 'aboqwi',
          commissionTotal: '99,999.00',
          profitFrequency: '106',
          profitTotal: '99,999.00',
          lossFrequency: '85',
          lossTotal: '99,999.00',
          epicycle: '99,999.00',
          profitRate: '23%',
          shiftInFrequency: '42',
          shiftInTotal: '99,999.00',
          shiftInCharge: '99,999.00',
          rollOutFrequency: '7',
          rollOutTotal: '99,999.00',
          rollOutCharge: '99,999.00'
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: 'aboqwi',
          commissionTotal: '99,999.00',
          profitFrequency: '106',
          profitTotal: '99,999.00',
          lossFrequency: '85',
          lossTotal: '99,999.00',
          epicycle: '99,999.00',
          profitRate: '23%',
          shiftInFrequency: '42',
          shiftInTotal: '99,999.00',
          shiftInCharge: '99,999.00',
          rollOutFrequency: '7',
          rollOutTotal: '99,999.00',
          rollOutCharge: '99,999.00'
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: 'aboqwi',
          commissionTotal: '99,999.00',
          profitFrequency: '106',
          profitTotal: '99,999.00',
          lossFrequency: '85',
          lossTotal: '99,999.00',
          epicycle: '99,999.00',
          profitRate: '23%',
          shiftInFrequency: '42',
          shiftInTotal: '99,999.00',
          shiftInCharge: '99,999.00',
          rollOutFrequency: '7',
          rollOutTotal: '99,999.00',
          rollOutCharge: '99,999.00'
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: 'aboqwi',
          commissionTotal: '99,999.00',
          profitFrequency: '106',
          profitTotal: '99,999.00',
          lossFrequency: '85',
          lossTotal: '99,999.00',
          epicycle: '99,999.00',
          profitRate: '23%',
          shiftInFrequency: '42',
          shiftInTotal: '99,999.00',
          shiftInCharge: '99,999.00',
          rollOutFrequency: '7',
          rollOutTotal: '99,999.00',
          rollOutCharge: '99,999.00'
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: 'aboqwi',
          commissionTotal: '99,999.00',
          profitFrequency: '106',
          profitTotal: '99,999.00',
          lossFrequency: '85',
          lossTotal: '99,999.00',
          epicycle: '99,999.00',
          profitRate: '23%',
          shiftInFrequency: '42',
          shiftInTotal: '99,999.00',
          shiftInCharge: '99,999.00',
          rollOutFrequency: '7',
          rollOutTotal: '99,999.00',
          rollOutCharge: '99,999.00'
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: 'aboqwi',
          commissionTotal: '99,999.00',
          profitFrequency: '106',
          profitTotal: '99,999.00',
          lossFrequency: '85',
          lossTotal: '99,999.00',
          epicycle: '99,999.00',
          profitRate: '23%',
          shiftInFrequency: '42',
          shiftInTotal: '99,999.00',
          shiftInCharge: '99,999.00',
          rollOutFrequency: '7',
          rollOutTotal: '99,999.00',
          rollOutCharge: '99,999.00'
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: 'aboqwi',
          commissionTotal: '99,999.00',
          profitFrequency: '106',
          profitTotal: '99,999.00',
          lossFrequency: '85',
          lossTotal: '99,999.00',
          epicycle: '99,999.00',
          profitRate: '23%',
          shiftInFrequency: '42',
          shiftInTotal: '99,999.00',
          shiftInCharge: '99,999.00',
          rollOutFrequency: '7',
          rollOutTotal: '99,999.00',
          rollOutCharge: '99,999.00'
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: 'aboqwi',
          commissionTotal: '99,999.00',
          profitFrequency: '106',
          profitTotal: '99,999.00',
          lossFrequency: '85',
          lossTotal: '99,999.00',
          epicycle: '99,999.00',
          profitRate: '23%',
          shiftInFrequency: '42',
          shiftInTotal: '99,999.00',
          shiftInCharge: '99,999.00',
          rollOutFrequency: '7',
          rollOutTotal: '99,999.00',
          rollOutCharge: '99,999.00'
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: 'aboqwi',
          commissionTotal: '99,999.00',
          profitFrequency: '106',
          profitTotal: '99,999.00',
          lossFrequency: '85',
          lossTotal: '99,999.00',
          epicycle: '99,999.00',
          profitRate: '23%',
          shiftInFrequency: '42',
          shiftInTotal: '99,999.00',
          shiftInCharge: '99,999.00',
          rollOutFrequency: '7',
          rollOutTotal: '99,999.00',
          rollOutCharge: '99,999.00'
        },
        {
          code: 'JY00000001',
          account: '852456',
          nickName: '陈陈',
          agentName: '华尔街营业部',
          superior: 'aboqwi',
          commissionTotal: '99,999.00',
          profitFrequency: '106',
          profitTotal: '99,999.00',
          lossFrequency: '85',
          lossTotal: '99,999.00',
          epicycle: '99,999.00',
          profitRate: '23%',
          shiftInFrequency: '42',
          shiftInTotal: '99,999.00',
          shiftInCharge: '99,999.00',
          rollOutFrequency: '7',
          rollOutTotal: '99,999.00',
          rollOutCharge: '99,999.00'
        }
      ]
    };
  }
};
