import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/signin'
    },
    {
      path: '/signup',
      name: 'signUp',
      component: (resolve) => {
        require(['@pages/sign-up'], resolve);
      }
    },
    {
      path: '/signin',
      name: 'signIn',
      component: (resolve) => {
        require(['@pages/sign-in'], resolve);
      }
    },
    {
      path: '/tab',
      name: 'Tab',
      component: (resolve) => {
        require(['@pages/Tab'], resolve);
      },
      children: [
        // 个人信息
        {
          path: 'personal-information',
          name: 'personal-information',
          component: (resolve) => {
            require(['@pages/personal-information'], resolve);
          }
        },
        // 用户管理
        {
          path: 'user-manage',
          name: 'user-manage',
          component: (resolve) => {
            require(['@pages/user-manage/user-manage'], resolve);
          }
        },
        {
          path: 'user-audit',
          name: 'user-audit',
          component: (resolve) => {
            require(['@pages/user-manage/user-audit'], resolve);
          }
        },
        // mt账号管理
        {
          path: 'mt-manage',
          name: 'mt-manage',
          component: (resolve) => {
            require(['@pages/mt-manage'], resolve);
          }
        },
        // 代理商管理
        {
          path: 'agent-manage',
          name: 'agent-manage',
          component: (resolve) => {
            require(['@pages/agent-manage/agent-manage'], resolve);
          }
        },
        {
          path: 'agent-audit',
          name: 'agent-audit',
          component: (resolve) => {
            require(['@pages/agent-manage/agent-audit'], resolve);
          }
        },
        // 交易管理
        {
          path: 'transaction-manage',
          name: 'transaction-manage',
          component: (resolve) => {
            require(['@pages/transaction-manage'], resolve);
          }
        },
        // 出入金管理
        {
          path: 'mention-start-audit',
          name: 'mention-start-audit',
          component: (resolve) => {
            require(['@pages/access-to-gold-manage/mention-start-audit'], resolve);
          }
        },
        {
          path: 'mention-end-audit',
          name: 'mention-end-audit',
          component: (resolve) => {
            require(['@pages/access-to-gold-manage/mention-end-audit'], resolve);
          }
        },
        {
          path: 'mention-record',
          name: 'mention-record',
          component: (resolve) => {
            require(['@pages/access-to-gold-manage/mention-record'], resolve);
          }
        },
        {
          path: 'recharge-record',
          name: 'recharge-record',
          component: (resolve) => {
            require(['@pages/access-to-gold-manage/recharge-record'], resolve);
          }
        },
        // 资金流水
        {
          path: 'capital-flow',
          name: 'capital-flow',
          component: (resolve) => {
            require(['@pages/capital-flow/capital-flow'], resolve);
          }
        },
        {
          path: 'mt-capital-flow',
          name: 'mt-capital-flow',
          component: (resolve) => {
            require(['@pages/capital-flow/mt-capital-flow'], resolve);
          }
        },
        // 报表
        {
          path: 'agent-report',
          name: 'agent-report',
          component: (resolve) => {
            require(['@pages/report/agent-report'], resolve);
          }
        },
        {
          path: 'dealer-report',
          name: 'dealer-report',
          component: (resolve) => {
            require(['@pages/report/dealer-report'], resolve);
          }
        },
        // 系统设置
        {
          path: 'system-set',
          name: 'system-set',
          component: (resolve) => {
            require(['@pages/system-set'], resolve);
          }
        },
        // 佣金管理
        {
          path: 'commi-manage',
          name: 'commi-manage',
          component: (resolve) => {
            require(['@pages/commi-manage'], resolve);
          }
        },
        // 红利管理
        {
          path: 'dividend-manage',
          name: 'dividend-manage',
          component: (resolve) => {
            require(['@pages/dividend-manage'], resolve);
          }
        },
        // 公共样式与组件展示页面
        {
          path: 'test',
          name: 'test',
          component: (resolve) => {
            require(['@pages/test'], resolve);
          }
        }
      ]
    }
  ]
});
