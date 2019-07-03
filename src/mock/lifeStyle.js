const sport = {
  'LifeStyleID': 51,
  'IsExercise': '1', // 您的工作性质是? 1:轻体力劳动者;2:中等体力劳动者;3:重体力劳动者
  'WeeklyExercise': '2', // 您每周锻炼
  'ExerciseMinutes': '3', // 平均每次锻炼
  'ExerciseState': '2', // 您锻炼的自我感觉是?1:自我感觉轻松;2:自我感觉稍累;3:	自我感觉较累
  'ExerciseMode': 6, // 您经常进行的3种运动项目是? 5:羽毛球;6:跑步;7:游泳;21:乒乓球;22:骑自行车
  'ExerciseMode2': 6, // 您经常进行的3种运动项目是? 5:羽毛球;6:跑步;7:游泳;21:乒乓球;22:骑自行车
  'ExerciseMode3': 7, // 您经常进行的3种运动项目是? 5:羽毛球;6:跑步;7:游泳;21:乒乓球;22:骑自行车
  'ExerciseOtherMode': '222' // 请输入其他运动项目，用逗号隔开
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
  getSport: () => {
    return sport
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
