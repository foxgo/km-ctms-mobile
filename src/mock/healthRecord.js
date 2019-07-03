
const bloodPressureRecord = {
  "SystolicList": [
    181,
    181,
    181,
    181,
    181,
    181,
    181,
    181,
    181,
    181,
    181,
    181,
    181,
    181,
    181,
    181,
    181,
    123,
    123,
    89.9,
    95,
    139,
    140,
    140,
    140,
    140,
    150,
    150,
    140,
    150
  ],
  "DiastolicList": [
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    100,
    98,
    98,
    60,
    65,
    59,
    59,
    59,
    59,
    59,
    45,
    45,
    59,
    30
  ],
  "CheckTimeList": [
    "2016-08-08T12:11:18",
    "2016-08-08T12:11:19",
    "2016-08-08T12:11:19",
    "2016-08-08T12:11:19",
    "2016-08-08T12:11:20",
    "2016-08-08T12:11:20",
    "2016-08-08T12:11:20",
    "2016-08-08T12:11:21",
    "2016-08-08T12:11:21",
    "2016-08-08T12:11:21",
    "2016-08-08T12:11:22",
    "2016-08-08T12:11:23",
    "2016-08-08T12:11:24",
    "2016-08-08T12:11:25",
    "2016-08-08T12:11:25",
    "2016-08-08T12:11:25",
    "2016-08-08T12:11:26",
    "2018-11-12T16:07:09",
    "2018-11-12T16:26:49",
    "2018-11-19T16:13:48",
    "2018-11-19T17:23:33",
    "2018-11-19T17:25:04",
    "2018-11-19T17:25:23",
    "2018-11-19T17:29:34",
    "2018-11-19T18:01:33",
    "2018-11-20T09:17:28",
    "2018-11-20T10:42:31",
    "2018-11-20T10:56:43",
    "2018-11-20T12:37:09",
    "2018-11-20T14:00:56"
  ],
  "Systolic": 150,
  "Diastolic": 30,
  "Pulse": 0,
  "LastTestTime": "2018-11-20T14:00:56",
  "Result": "轻度",
  "Imei": null,
  "PersonID": 0,
  "WeekTestCount": 0,
  "ExceptionCount": 0,
  "NormalCount": 0,
  "ExamTime": null
}
const diet = {
  'LifeStyleID': 867, // 问卷Id
  'IsVegetables': '1', // 吃新鲜蔬菜
  'WeeklyVegetables': '1', // 您一周会有几天吃新鲜蔬菜？1:2天以下;4:3-5天;7:5天以上
  'DailyVegetables': '4', // 每天大概吃多少？1:>3碟;4:2-3碟;7:小于2碟
  'IsFruit': '1', // 吃新鲜水果
  'WeeklyFruit': '4', // 您一周会有几天吃新鲜水果？1:2天以下;4:3-5天;7:5天以上
  'DailyFruit': '3', // 每天大概吃多少新鲜水果？1:>2个;3:1-2个;5:小于1个
  'IsMeat': '1', // 吃禽/瘦肉
  'WeeklyMeat': '4', // 您一周会有几天吃禽/瘦肉? 1:2天以下;4:3-5天;7:5天以上
  'DailyMeat': '3', // 每天大概吃多少? 1:3/4碟;3:1/2-3/4碟;5:小于1/2碟
  'DailySalt': '2' // 每天食盐摄入量? 1:>1瓶盖;2:1/2-1瓶盖;3:小于1/2瓶盖
}

const smokeDrink = {
  'LifeStyleID': 51,
  'IsSmoking': '1', // 你吸烟吗? 1:吸烟;2:已戒烟;3:从不吸烟
  'StartSmokingAge': 22, // 您开始吸烟的年龄
  'QuitStartSmokingAge': null, // [已戒烟] 您开始吸烟的年龄
  'QuitEndSmokingAge': null, // [已戒烟] 戒烟时候的年龄
  'QuitSecondhandSmoke': null, // [已戒烟] 目前是否接触二手烟环境 1:是;0:否
  'SecondhandSmoke': null, // [从不吸烟]  目前是否接触二手烟环境 1:是;0:否
  'DailySmoking': 1, // 普通卷烟每日吸
  'TobaccoDailySmoking': 2, // 吸烟斗或旱烟每日
  'IsTobaccoSmoking': true, // 是否旱烟
  'IsOrdinarySmoking': true, // 是否普通卷烟
  'IsDrink': '1', // 您饮酒吗? 1:饮酒;2:已戒酒;3:从不饮酒
  'WeeklyDrink': '1', // 您平均每周喝几次酒? 1:1-2次;3:3-5次;6:>5次
  'RedWineDailyDrink': '2', // 红酒
  'SpiritDailyDrink': '2', // 白酒
  'YellowWineDailyDrink': '2', // 黄酒
  'BeerDailyDrink': '2', // 啤酒
  'OtherDrinkName': null // 其它
}

const healthHistory = {
  'BothDiabetes': 'false', // 是否父母都有糖尿病史 true：是，false 否
  'BothHypertensive': 'true', // 是否父母都有高血压史 true：是，false 否
  'FamilyHistoryRemark': '感冒', // 其它疾病
  'FHealthCategoryIDs': '[13676, 13398]', // 疾病Id 无的ID是0（家庭史）
  'PersonID': '102',
  'UserDeseaseRemark': '感冒', // 其它疾病
  'DHealthCategoryIDs': '[13676, 13398]' // 疾病Id 无的ID是0（疾病史）
}

export default {
  getBloodPressureRecord: () => {
    return bloodPressureRecord
  },
  saveSport: () => ({
    data: 'success'
  }),
  getEatHabit: () => {
    return diet
  },
  saveEatHabit: () => ({
    data: 'success'
  }),
  getHealthHistory: () => {
    return healthHistory
  },
  saveHealthHistory: () => ({
    data: 'success'
  }),
  getSmokeDrink: () => {
    return smokeDrink
  },
  saveSmokeDrink: () => ({
    data: 'success'
  })
}
