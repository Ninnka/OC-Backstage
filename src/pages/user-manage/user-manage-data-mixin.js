export default {
  data () {
    return {
      userList: [
        {
          account: 'JY00000001',
          nickName: '陈陈',
          realName: '陈晨',
          cardType: '',
          Documents: {
            type: '身份证',
            num: '123'
          },
          phone: '13388889999',
          email: '123424',
          mtList: [
            {
              number: '1',
              account: '1254543',
              leverage: '1:100',
              type: 'main',
              balance: 100
            },
            {
              number: '1',
              account: '123',
              leverage: '1:100',
              type: '',
              balance: 100
            },
            {
              number: '1',
              account: '123',
              leverage: '1:100',
              type: '',
              balance: 100
            }
          ],
          bankList: [
            {
              name: '张三',
              id: 1,
              card: '622568032300016316',
              bankCode: '0001'
            },
            {
              name: '李四',
              id: 2,
              card: '622568032300026316',
              bankCode: '0002'
            }
          ],
          accountStatus: true,
          mentionStatus: false,
          tradeStatus: false,
          promotStatus: true,
          superior: '11',
          openTime: '2017-01-01 10:00:00'
        },
        {
          account: 'JY00000002',
          nickName: '驱蚊器',
          realName: '陈2',
          Documents: {
            type: '身份证',
            num: '123'
          },
          phone: '133888899100',
          email: '123424',
          mtList: [
            {
              number: '1',
              account: '123',
              leverage: '1:100',
              type: '',
              balance: 100
            },
            {
              number: '1',
              account: '1535323',
              leverage: '1:100',
              type: 'main',
              balance: 100
            },
            {
              number: '1',
              account: '123',
              leverage: '1:100',
              type: '',
              balance: 100
            }
          ],
          bankList: [
            {
              name: '张三',
              id: 1,
              card: '622568032300016316',
              bankCode: '0001'
            },
            {
              name: '李四',
              id: 2,
              card: '622568032300026316',
              bankCode: '0002'
            }
          ],
          accountStatus: true,
          mentionStatus: false,
          tradeStatus: false,
          promotStatus: true,
          superior: '112',
          openTime: '2017-01-01 10:00:00'
        },
        {
          account: 'JY00000001',
          nickName: '通天塔',
          realName: '陈3',
          Documents: {
            type: '身份证',
            num: '123'
          },
          phone: '13388889999',
          email: '123424',
          mtList: [
            {
              number: '1',
              account: '123',
              leverage: '1:100',
              type: '',
              balance: 100
            },
            {
              number: '1',
              account: '123',
              leverage: '1:100',
              type: '',
              balance: 100
            },
            {
              number: '1',
              account: '121233',
              leverage: '1:100',
              type: 'main',
              balance: 100
            }
          ],
          bankList: [
            {
              name: '张三',
              id: 1,
              card: '622568032300016316',
              bankCode: '0001'
            },
            {
              name: '李四',
              id: 2,
              card: '622568032300026316',
              bankCode: '0002'
            }
          ],
          accountStatus: true,
          mentionStatus: false,
          tradeStatus: false,
          promotStatus: true,
          superior: '11',
          openTime: '2017-01-01 10:00:00'
        }
      ],
      userAuditList: [
        {
          account: 'JY00000001',
          nickName: '陈陈',
          realName: '陈晨',
          type: 0,
          phone: '122321321',
          Documents: {
            type: '身份证',
            num: '123'
          },
          banks: {
            type: '招商银行',
            num: '123456'
          },
          requestTime: '2017-01-01 10:00:00',
          invitingPeople: 'zhou',
          auditStatus: '待审',
          auditNum: 1,
          processTime: '2017-01-01 10:00:00'
        },
        {
          account: 'JY00000002',
          nickName: '陈陈',
          realName: '陈晨',
          type: 1,
          phone: '122321321',
          Documents: {
            type: '身份证',
            num: '123'
          },
          banks: {
            type: '招商银行',
            num: '123456'
          },
          requestTime: '2017-01-01 10:00:00',
          invitingPeople: 'zhou',
          auditStatus: '已通过',
          auditNum: 1,
          processTime: '2017-01-01 10:00:00'
        },
        {
          account: 'JY00000003',
          nickName: '陈陈',
          realName: '陈晨',
          type: 1,
          phone: '122321321',
          Documents: {
            type: '身份证',
            num: '123'
          },
          banks: {
            type: '招商银行',
            num: '123456'
          },
          requestTime: '2017-01-01 10:00:00',
          invitingPeople: 'zhou',
          auditStatus: '已驳回',
          auditNum: 1,
          processTime: '2017-01-01 10:00:00'
        },

        {
          account: 'JY00000003',
          nickName: '陈陈',
          realName: '陈晨',
          type: 1,
          phone: '122321321',
          Documents: {
            type: '身份证',
            num: '123'
          },
          banks: {
            type: '招商银行',
            num: '123456'
          },
          requestTime: '2017-01-01 10:00:00',
          invitingPeople: 'zhou',
          auditStatus: '待审',
          auditNum: 3,
          processTime: '2017-01-01 10:00:00'
        }
      ]
    };
  }
};
