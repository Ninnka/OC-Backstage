const CommonApi = {
  // 银行字典
  bankList: [
    {bankTitle: '中国银行', bankCode: '0001', 'icon': 'icon-zhongguoyinhang'},
    {bankTitle: '浦发银行', bankCode: '0002', 'icon': 'icon-pufayinhang'},
    {bankTitle: '中国民生银行', bankCode: '0003', 'icon': 'icon-minshengyinhang'},
    {bankTitle: '深圳发展银行', bankCode: '0004', 'icon': 'icon-shenzhenfazhanyinhang'},
    {bankTitle: '招商银行', bankCode: '0005', 'icon': 'icon-zhaoshangyinhang'},
    {bankTitle: '中国建设银行', bankCode: '0006', 'icon': 'icon-jiansheyinhang'},
    {bankTitle: '中国农业银行', bankCode: '0007', 'icon': 'icon-nongyeyinxing1'},
    {bankTitle: '中国邮政储蓄银行', bankCode: '0008', 'icon': 'icon-youzhengyinhang'},
    {bankTitle: '中国工商银行', bankCode: '0009', 'icon': 'icon-gongshangyinhang'},
    {bankTitle: '交通银行', bankCode: '0010', 'icon': 'icon-jiaotongyinhang'},
    {bankTitle: '华夏银行', bankCode: '0011', 'icon': 'icon-huaxiayinhang'},
    {bankTitle: '徽商银行', bankCode: '0012', 'icon': 'icon-huishangyinhang'},
    {bankTitle: '中国光大银行', bankCode: '0013', 'icon': 'icon-guangdayinhang'},
    {bankTitle: '中信银行', bankCode: '0014', 'icon': 'icon-zhongxinyinhang'},
    {bankTitle: '平安银行', bankCode: '0015', 'icon': 'icon-pinganyinhang'},
    {bankTitle: '宁波银行', bankCode: '1001', 'icon': 'icon-ningboyinhang'},
    {bankTitle: '南京银行', bankCode: '1002', 'icon': 'icon-nanjingyinhang'},
    {bankTitle: '杭州银行', bankCode: '1003', 'icon': 'icon-hangzhouyinhang'},
    {bankTitle: '北京银行', bankCode: '1004', 'icon': 'icon-beijingyinhang'},
    {bankTitle: '东亚银行', bankCode: '1005', 'icon': 'icon-dongyayinhang'},
    {bankTitle: '浙商银行', bankCode: '1006', 'icon': 'icon-zheshangyinhang'},
    {bankTitle: '上海银行', bankCode: '1007', 'icon': 'icon-shanghaiyinhang'},
    {bankTitle: '北京农村商业银行', bankCode: '2001', 'icon': 'icon-beijingnongshangyinhang'},
    {bankTitle: '上海农村商业银行', bankCode: '2002', 'icon': 'icon-shanghainongshangyinhang'},
    {bankTitle: '顺德农村信用合作社', bankCode: '2003', 'icon': 'icon-nongcunxinyonghezuoshe'},
    {bankTitle: '汉口银行', bankCode: '2004', 'icon': 'icon-hankouyinhang'},
    {bankTitle: '广州市商业银行', bankCode: '2005', 'icon': 'icon-guangzhoushishangyeyinhang'},
    {bankTitle: '广州市农村信用合作社', bankCode: '2006', 'icon': 'icon-nongcunxinyonghezuoshe'},
    {bankTitle: '珠海市农村信用合作社', bankCode: '2007', 'icon': 'icon-nongcunxinyonghezuoshe'},
    {bankTitle: '尧都信用合作联社', bankCode: '2008', 'icon': 'icon-nongcunxinyonghezuoshe'},
    {bankTitle: '晋城市商业银行', bankCode: '2009', 'icon': 'icon-jinchengyinhang'},
    {bankTitle: '温州市商业银行', bankCode: '2010', 'icon': 'icon-wenzhouyinhang'},
    {bankTitle: '兴业银行', bankCode: '2011', 'icon': 'icon-xingyeyinhang'},
    {bankTitle: '渤海银行', bankCode: '2012', 'icon': 'icon-bohaiyinhang'},
    {bankTitle: '广东发展银行', bankCode: '2013', 'icon': 'icon-guangfayinxing'},
    {bankTitle: '浙江泰隆商业银行', bankCode: '2014', 'icon': 'icon-zhejiangtailongshangyeyinhang'},
    {bankTitle: '银联电子商务', bankCode: '2015', 'icon': 'icon-yinlianzhifu'},
    {bankTitle: '上海浦东发展银行', bankCode: '2016', 'icon': 'icon-pufayinhang'},
    {bankTitle: '银联无卡支付', bankCode: '2017', 'icon': 'icon-yinlianzhifu'},
    {bankTitle: '银联其他银行', bankCode: '2018', 'icon': 'icon-yinlianzhifu'},
    {bankTitle: '中行-大额', bankCode: '2019', 'icon': 'icon-zhongguoyinhang'},
    {bankTitle: '天津银行', bankCode: '2020', 'icon': 'icon-tianjinyinhang'},
    {bankTitle: '浙江稠州商业银行', bankCode: '2021', 'icon': 'icon-chouzhoushangyeyinhang'},
    {bankTitle: '中国银联', bankCode: '2022', 'icon': 'icon-yinlianzhifu'},
    {bankTitle: '长沙银行', bankCode: '2023', 'icon': 'icon-changshayinhang'},
    {bankTitle: '浙江省农村信用社联合社', bankCode: '2024', 'icon': 'icon-nongcunxinyonghezuoshe'}
  ],
  // 省市字典
  provinceList: [
    {
      'name': '北京市', 'cityList': ['北京市']
    },
    {
      'name': '广东省',
      'cityList': ['东莞市', '广州市', '中山市', '深圳市', '惠州市', '江门市', '珠海市', '汕头市', '佛山市', '湛江市', '河源市', '肇庆市', '清远市', '潮州市', '韶关市', '揭阳市', '阳江市', '梅州市', '云浮市', '茂名市', '汕尾市']
    },
    {
      'name': '山东省',
      'cityList': ['济南市', '青岛市', '临沂市', '济宁市', '菏泽市', '烟台市', '淄博市', '泰安市', '潍坊市', '日照市', '威海市', '滨州市', '东营市', '聊城市', '德州市', '莱芜市', '枣庄市']
    },
    {
      'name': '江苏省',
      'cityList': [ '苏州市', '徐州市', '盐城市', '无锡市', '南京市', '南通市', '连云港市', '常州市', '镇江市', '扬州市', '淮安市', '泰州市', '宿迁市' ]
    },
    {
      'name': '河南省',
      'cityList': ['郑州市', '南阳市', '新乡市', '安阳市', '洛阳市', '信阳市', '平顶山市', '周口市', '商丘市', '开封市', '焦作市', '驻马店市', '濮阳市', '三门峡市', '漯河市', '许昌市', '鹤壁市', '济源市']
    },
    {
      'name': '上海市', 'cityList': ['上海市']
    },
    {
      'name': '河北省', 'cityList': ['石家庄市', '唐山市', '保定市', '邯郸市', '邢台市', '河北区', '沧州市', '秦皇岛市', '张家口市', '衡水市', '廊坊市', '承德市']
    },
    {
      'name': '浙江省', 'cityList': ['温州市', '宁波市', '杭州市', '台州市', '嘉兴市', '金华市', '湖州市', '绍兴市', '舟山市', '丽水市', '衢州市']
    },
    {
      'name': '香港特别行政区', 'cityList': ['香港特别行政区']
    },
    {
      'name': '陕西省', 'cityList': ['西安市', '咸阳市', '宝鸡市', '汉中市', '渭南市', '安康市', '榆林市', '商洛市', '延安市', '铜川市']
    },
    {
      'name': '湖南省',
      'cityList': ['长沙市', '邵阳市', '常德市', '衡阳市', '株洲市', '湘潭市', '永州市', '岳阳市', '怀化市', '郴州市', '娄底市', '益阳市', '张家界市', '湘西州']
    },
    {
      'name': '重庆市', 'cityList': ['重庆市']
    },
    {
      'name': '福建省', 'cityList': ['漳州市', '厦门市', '泉州市', '福州市', '莆田市', '宁德市', '三明市', '南平市', '龙岩市']
    },
    {
      'name': '天津市', 'cityList': ['天津市']
    },
    {
      'name': '云南省',
      'cityList': ['昆明市', '红河州', '大理州', '文山州', '德宏州', '曲靖市', '昭通市', '楚雄州', '保山市', '玉溪市', '丽江地区', '临沧地区', '思茅地区', '西双版纳州', '怒江州', '迪庆州']
    },
    {
      'name': '四川省',
      'cityList': ['成都市', '绵阳市', '广元市', '达州市', '南充市', '德阳市', '广安市', '阿坝州', '巴中市', '遂宁市', '内江市', '凉山州', '攀枝花市', '乐山市', '自贡市', '泸州市', '雅安市', '宜宾市', '资阳市', '眉山市', '甘孜州']
    },
    {
      'name': '广西省',
      'cityList': ['贵港市', '玉林市', '北海市', '南宁市', '柳州市', '桂林市', '梧州市', '钦州市', '来宾市', '河池市', '百色市', '贺州市', '崇左市', '防城港市']
    },
    {
      'name': '海南省',
      'cityList': ['三亚市', '海口市', '琼海市', '文昌市', '东方市', '昌江县', '陵水县', '乐东县', '保亭县', '五指山市', '澄迈县', '万宁市', '儋州市', '临高县', '白沙县', '定安县', '琼中县', '屯昌县']
    },
    {
      'name': '安徽省',
      'cityList': ['芜湖市', '合肥市', '六安市', '宿州市', '阜阳市', '安庆市', '马鞍山市', '蚌埠市', '淮北市', '淮南市', '宣城市', '黄山市', '铜陵市', '亳州市', '池州市', '巢湖市', '滁州市']
    },
    {
      'name': '江西省', 'cityList': ['南昌市', '赣州市', '上饶市', '吉安市', '九江市', '新余市', '抚州市', '宜春市', '景德镇市', '萍乡市', '鹰潭市']
    },
    {
      'name': '湖北省',
      'cityList': ['武汉市', '宜昌市', '襄樊市', '荆州市', '恩施州', '黄冈市', '孝感市', '十堰市', '咸宁市', '黄石市', '仙桃市', '天门市', '随州市', '荆门市', '潜江市', '鄂州市', '神农架林区']
    },
    {
      'name': '山西省', 'cityList': ['太原市', '大同市', '运城市', '长治市', '晋城市', '忻州市', '临汾市', '吕梁市', '晋中市', '阳泉市', '朔州市']
    },
    {
      'name': '辽宁省',
      'cityList': ['大连市', '沈阳市', '丹东市', '辽阳市', '葫芦岛市', '锦州市', '朝阳市', '营口市', '鞍山市', '抚顺市', '阜新市', '盘锦市', '本溪市', '铁岭市']
    },
    {
      'name': '台湾省', 'cityList': ['台北市', '高雄市', '台中市', '新竹市', '基隆市', '台南市', '嘉义市']
    },
    {
      'name': '黑龙江省',
      'cityList': ['齐齐哈尔市', '哈尔滨市', '大庆市', '佳木斯市', '双鸭山市', '牡丹江市', '鸡西市', '黑河市', '绥化市', '鹤岗市', '伊春市', '大兴安岭地区', '七台河市']
    },
    {
      'name': '内蒙古自治区',
      'cityList': ['赤峰市', '包头市', '通辽市', '呼和浩特市', '鄂尔多斯市', '乌海市', '呼伦贝尔市', '兴安盟', '巴彦淖尔盟', '乌兰察布盟', '锡林郭勒盟', '阿拉善盟']
    },
    {
      'name': '澳门特别行政区', 'cityList': ['澳门特别行政区']
    },
    {
      'name': '贵州省', 'cityList': ['贵阳市', '黔东南州', '黔南州', '遵义市', '黔西南州', '毕节地区', '铜仁地区', '安顺市', '六盘水市']
    },
    {
      'name': '甘肃省', 'cityList': ['兰州市', '天水市', '庆阳市', '武威市', '酒泉市', '张掖市']
    },
    {
      'name': '青海省', 'cityList': ['西宁市', '海西州', '海东地区', '海北州', '果洛州', '玉树州', '黄南藏族自治州']
    },
    {
      'name': '新疆维吾尔自治区',
      'cityList': ['乌鲁木齐市', '伊犁州', '昌吉州', '石河子市', '哈密地区', '阿克苏地区', '巴音郭楞州', '喀什地区', '塔城地区', '克拉玛依市', '和田地区', '阿勒泰州', '吐鲁番地区', '阿拉尔市', '博尔塔拉州', '五家渠市', '克孜勒苏州', '图木舒克市']
    },
    {
      'name': '西藏区', 'cityList': ['拉萨市', '山南地区', '林芝地区', '日喀则地区', '阿里地区', '昌都地区', '那曲地区']
    },
    {
      'name': '吉林省', 'cityList': ['吉林市', '长春市', '白山市', '延边州', '白城市', '松原市', '辽源市', '通化市', '四平市']
    },
    {
      'name': '宁夏回族自治区', 'cityList': ['银川市', '吴忠市', '中卫市', '石嘴山市', '固原市']
    }
  ]
};
export default CommonApi;
