import Mock from 'mockjs'
import loginAPI from './login'
import personAPI from './person'
import dictAPI from './dict'
import lifeStyleAPI from './lifeStyle'
import dailyMonitorAPI from './dailyMonitor'
import suggestAPI from './suggest'
// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/home\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/home\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/home\/getUserByToken\.*/, 'get', loginAPI.getUserInfo)

// 个人数据相关
Mock.mock(/\/person\/list/, 'get', personAPI.getList)
Mock.mock(/\/person\/detail/, 'get', personAPI.getPerson)
Mock.mock(/\/person\/create/, 'post', personAPI.createPerson)
Mock.mock(/\/person\/update/, 'post', personAPI.updatePerson)

// 数据字典
Mock.mock(/\/dict\/map/, 'get', dictAPI.getMap)

// 生活方式
Mock.mock(/\/lifeStyle\/getPersonSport/, 'get', lifeStyleAPI.getSport)
Mock.mock(/\/lifeStyle\/savePersonSport/, 'post', lifeStyleAPI.saveSport)
Mock.mock(/\/lifeStyle\/getPersonEatHabit/, 'get', lifeStyleAPI.getEatHabit)
Mock.mock(/\/lifeStyle\/savePersonEatHabit/, 'post', lifeStyleAPI.saveEatHabit)
Mock.mock(/\/lifeStyle\/getPersonSmokeDrink/, 'get', lifeStyleAPI.getSmokeDrink)
Mock.mock(/\/lifeStyle\/savePersonSmokeDrink/, 'post', lifeStyleAPI.saveSmokeDrink)
Mock.mock(/HealthHistory/, 'get', lifeStyleAPI.getHealthHistory)
Mock.mock(/HealthHistory/, 'post', lifeStyleAPI.saveHealthHistory)

// 健康测量
Mock.mock(/\/DailyMonitor\/GetBloodPressureRecord/, 'get', dailyMonitorAPI.getBloodPressureRecord)
Mock.mock(/\/DailyMonitor\/SaveBloodPressure/, 'post', dailyMonitorAPI.saveBloodPressure)
Mock.mock(/\/DailyMonitor\/GetBloodSugarRecord/, 'get', dailyMonitorAPI.getBloodSugarRecord)
Mock.mock(/\/DailyMonitor\/SaveBloodSugar/, 'post', dailyMonitorAPI.saveBloodSugar)
Mock.mock(/\/DailyMonitor\/GetHeartRateRecord/, 'get', dailyMonitorAPI.getHeartRateRecord)
Mock.mock(/\/DailyMonitor\/SaveHeartRate/, 'post', dailyMonitorAPI.saveHeartRate)
Mock.mock(/\/DailyMonitor\/GetStepReocrd/, 'get', dailyMonitorAPI.getStepReocrd)
Mock.mock(/\/DailyMonitor\/SaveStepRecord/, 'post', dailyMonitorAPI.saveStepRecord)
Mock.mock(/\/DailyMonitor\/GetBloodOxygenRecord/, 'get', dailyMonitorAPI.getBloodOxygenRecord)
Mock.mock(/\/DailyMonitor\/SaveBloodOxygenRecord/, 'post', dailyMonitorAPI.saveBloodOxygenRecord)
Mock.mock(/\/DailyMonitor\/GetVitalCapacityRecord/, 'get', dailyMonitorAPI.getVitalCapacityRecord)
Mock.mock(/\/DailyMonitor\/SaveVitalCapacityRecord/, 'post', dailyMonitorAPI.saveVitalCapacityRecord)
Mock.mock(/\/DailyMonitor\/GetBloodPressureReport/, 'get', dailyMonitorAPI.getBloodPressureReport)
Mock.mock(/\/DailyMonitor\/GetBloodSugarReport/, 'get', dailyMonitorAPI.getBloodSugarReport)
// 生命周期建议信息
Mock.mock(/\/Suggest/, 'get', suggestAPI.getSuggest)
export default Mock
