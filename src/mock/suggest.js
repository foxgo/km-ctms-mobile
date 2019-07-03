const suggest = {
  'HealthSuggestID': 80,
  'Age': 6,
  'Period': '婴儿期',
  'Sex': 1,
  'HealthProblem': '3713.3724.5003.253.5005.',
  'PhysicalExamination': '一般检查、内科、外科、眼科、耳鼻喉科、口腔科、血常规、尿常规、肝功、肾功、血脂、血糖、心电图检查、胸部正位片、肝胆脾胰双肾B超.',
  'LifeStyle': '注意饮食规律，避免养成不吃早餐等不良习惯.           避免过多摄入高糖、高脂、高盐食物，如烧烤、火锅等.     少喝饮料、多喝茶水:茶多酚有助于预防心脑血管疾病.  \n保持一定的体力活动，包括较大强度的有氧运动和肌肉锻炼，柔韧性练习应每周2次.\n学会释放压力:适量运动可释放内啡肽，缓解压力.',
  'Vaccine': '每年注射流感疫苗:预防流感.             破伤风白喉百日咳混合疫苗:预防破伤风、白喉、百日咳 （每10年一次）.                麻疹、腮腺炎和风疹的联合疫苗:预防麻疹、腮腺炎和风疹（无接种史及感染史者建议接种）.\n水痘疫苗:预防水痘（无接种史及感染史者建议接种）.                              男性人乳头瘤病毒疫苗:预防生殖器疣（无性生活史、接种史、感染史者建议接种）.',
  'CreatedBy': 1,
  'CreatedTime': '2017-12-01T09:57:21',
  'ModifiedBy': 37,
  'ModifiedTime': '2018-01-10T16:06:51',
  'IsDeleted': false,
  'HealthProblemItems': [
    {
      'BatDeseaseID': 3686,
      'Name': '肾结石',
      'HealthTypeCode': '253'
    },
    {
      'BatDeseaseID': null,
      'Name': '肥胖',
      'HealthTypeCode': '3713'
    },
    {
      'BatDeseaseID': 169,
      'Name': '高血压',
      'HealthTypeCode': '3724'
    },
    {
      'BatDeseaseID': 3731,
      'Name': '黑色素瘤',
      'HealthTypeCode': '5003'
    },
    {
      'BatDeseaseID': null,
      'Name': '睾丸癌',
      'HealthTypeCode': '5005'
    }
  ]
}
export default {
  getSuggest: () => {
    return suggest
  }
}
