export default {
  data () {
    return {
      agentList: [
        {
          account: 'JY00000001',
          nickName: '陈陈',
          realName: '陈晨',
          type: '个人',
          balance: 1000,
          commissionDeploy: 0.2,
          dividendDeploy: 0.2,
          Documents: {
            type: '身份证',
            num: '123'
          },
          phone: '13388889999',
          email: '123424',
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
          mentionPermission: false,
          invitationAgent: false,
          promotStatus: true,
          superior: '11',
          openTime: '2017-01-01 10:00:00'
        },
        {
          account: 'JY00000002',
          nickName: '陈陈',
          realName: '陈晨',
          type: '公司',
          balance: 1000,
          commissionDeploy: 0.2,
          dividendDeploy: 0.2,
          Documents: {
            type: '身份证',
            num: '123'
          },
          phone: '13388889999',
          email: '123424',
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
          mentionPermission: false,
          invitationAgent: false,
          promotStatus: true,
          superior: '11',
          openTime: '2017-01-01 10:00:00'
        },
        {
          account: 'JY00000003',
          nickName: '陈陈',
          realName: '陈晨',
          type: '个人',
          balance: 1000,
          commissionDeploy: 0.2,
          dividendDeploy: 0.2,
          Documents: {
            type: '身份证',
            num: '123'
          },
          phone: '13388889999',
          email: '123424',
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
          mentionPermission: false,
          invitationAgent: false,
          promotStatus: true,
          superior: '11',
          openTime: '2017-01-01 10:00:00'
        }
      ],
      agentAuditList: [
        {
          account: 'JY00000001',
          nickName: '陈陈',
          realName: '陈晨',
          type: '个人',
          cardId: '19950812',
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
          account: 'JY00000001',
          nickName: '陈陈',
          realName: '陈晨',
          type: '公司',
          cardId: '19950812',
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
          account: 'JY00000001',
          nickName: '陈陈',
          realName: '陈晨',
          type: '个人',
          cardId: '19950812',
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
        }
      ]
    };
  }
};
