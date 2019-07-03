
const bloodPressureRecord = {
  'SystolicList': [181, 181, 181, 181, 181, 123, 123, 89.9, 95, 139, 140, 140, 140, 140, 150, 150, 150, 140, 150],
  'DiastolicList': [100, 100, 100, 100, 100, 100, 100, 100, 100, 98, 98, 60, 65, 59, 59, 59, 45, 45, 45, 59, 30],
  'CheckTimeList': ['2016-08-08T12:11:18', '2016-08-08T12:11:19', '2016-08-08T12:11:19', '2016-08-08T12:11:19',
    '2016-08-08T12:11:20', '2016-08-08T12:11:20', '2016-08-08T12:11:20', '2016-08-08T12:11:21', '2016-08-08T12:11:21', '2016-08-08T12:11:21',
    '2016-08-08T12:11:22', '2016-08-08T12:11:23', '2016-08-08T12:11:24', '2016-08-08T12:11:25'
  ],
  'Systolic': 150,
  'Diastolic': 30,
  'Pulse': 0,
  'LastTestTime': '2018-11-20T14:00:56',
  'Result': '轻度',
  'Imei': null,
  'PersonID': 0,
  'WeekTestCount': 0,
  'ExceptionCount': 0,
  'NormalCount': 0,
  'ExamTime': null
}
const bloodSugarRecord = {
  'SugarList': [
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    33,
    7,
    8.8,
    6.6,
    3.1,
    3.1
  ],
  'CheckTimeList': [
    '2016-08-08T12:11:14',
    '2016-08-08T12:11:15',
    '2016-08-08T12:11:15',
    '2016-08-08T12:11:15',
    '2016-08-08T12:11:16',
    '2016-08-08T12:11:16',
    '2016-08-08T12:11:16',
    '2016-08-08T12:11:17',
    '2016-08-08T12:11:18',
    '2016-08-08T12:11:19',
    '2016-08-08T12:11:19',
    '2016-08-08T12:11:19',
    '2016-08-08T12:11:20',
    '2016-08-08T12:11:20',
    '2016-08-08T12:11:20',
    '2016-08-08T12:11:21',
    '2016-08-08T12:11:21',
    '2016-08-08T12:11:21',
    '2016-08-08T12:11:22',
    '2016-08-08T12:11:23',
    '2016-08-08T12:11:24',
    '2016-08-08T12:11:25',
    '2016-08-08T12:11:25',
    '2016-08-08T12:11:25',
    '2016-08-08T12:11:26',
    '2018-11-12T15:55:29',
    '2018-11-12T16:07:09',
    '2018-11-12T16:26:49',
    '2018-11-19T18:01:33',
    '2018-11-20T09:17:28'
  ],
  'SugarTypeList': [
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '随机血糖',
    '空腹血糖',
    '随机血糖',
    '早餐后血糖',
    '早餐后血糖'
  ],
  'Sugar': 3.1,
  'LastTestTime': '2018-11-20T09:17:28',
  'Result': '偏低',
  'Imei': null,
  'ExamTime': null,
  'WeekTestCount': 0,
  'ExceptionCount': 0,
  'NormalCount': 0,
  'PersonID': 0,
  'SugarType': '早餐后血糖'
}
const heartRateRecord = {
  'rateList': [70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 70, 68, 85, 68, 64, 64, 64, 64, 64, 64, 64, 88, 88],
  'CheckTimeList': ['2016-08-08T12:11:17', '2016-08-08T12:11:17', '2016-08-08T12:11:17', '2016-08-08T12:11:17', '2016-08-08T12:11:17', '2016-08-08T12:11:17', '2016-08-08T12:11:17', '2016-08-08T12:11:17', '2016-08-08T12:11:17', '2016-08-08T12:11:17',
    '2016-08-08T12:11:17', '2016-08-08T12:11:17', '2016-08-08T12:11:17', '2016-08-08T12:11:17', '2018-11-12T16:26:49', '2018-11-12T16:26:49'],
  'Rate': 88,
  'LastTestTime': '2018-11-20T10:56:43',
  'Result': '正常',
  'Imei': null,
  'ExamTime': null,
  'WeekTestCount': 0,
  'ExceptionCount': 0,
  'NormalCount': 0,
  'PersonID': 0
}
const stepReocrd = {
  'StepsList': [25, 20, 30],
  'StepsTimeList': ['2018-11-17', '2018-11-19', '2018-11-20'],
  'Step': 30,
  'StepTime': '2018-11-20T00:00:00',
  'Imei': null,
  'Result': '差',
  'WeekTestCount': 0,
  'ExceptionCount': 0,
  'NormalCount': 0,
  'PersonID': 0
}

const bloodOxygenRecord = {
  'OxygenList': [94, 94,
    94,
    94,
    94,
    94,
    94,
    94,
    94,
    94,
    94,
    94,
    94,
    94,
    94,
    94,
    94,
    94,
    94,
    94,
    94,
    94,
    94,
    94,
    101,
    98,
    99,
    39,
    39,
    60
  ],
  'CheckTimeList': [
    '2016-08-08T12:11:15',
    '2016-08-08T12:11:15',
    '2016-08-08T12:11:15',
    '2016-08-08T12:11:16',
    '2016-08-08T12:11:16',
    '2016-08-08T12:11:16',
    '2016-08-08T12:11:17',
    '2016-08-08T12:11:18',
    '2016-08-08T12:11:19',
    '2016-08-08T12:11:19',
    '2016-08-08T12:11:19',
    '2016-08-08T12:11:20',
    '2016-08-08T12:11:20',
    '2016-08-08T12:11:20',
    '2016-08-08T12:11:21',
    '2016-08-08T12:11:21',
    '2016-08-08T12:11:21',
    '2016-08-08T12:11:22',
    '2016-08-08T12:11:23',
    '2016-08-08T12:11:24',
    '2016-08-08T12:11:25',
    '2016-08-08T12:11:25',
    '2016-08-08T12:11:25',
    '2016-08-08T12:11:26',
    '2018-11-12T15:55:29',
    '2018-11-12T16:07:09',
    '2018-11-12T16:26:49',
    '2018-11-20T10:42:31',
    '2018-11-20T10:56:43',
    '2018-11-20T16:32:00'
  ],
  'Oxygen': 60,
  'Result': '严重偏低',
  'LastTestTime': '2018-11-20T16:32:00',
  'ExamTime': null,
  'PersonID': 0
}
const vitalCapacityRecord = {
  'VitalCapacityList': [999, 5000],
  'CheckTimeList': ['2018-11-20T10:42:31', '2018-11-20T10:56:43'],
  'VitalCapacity': 5000,
  'Result': '呼吸功能正常',
  'LastTestTime': '2018-11-20T10:56:43',
  'ExamTime': null,
  'PersonID': 0
}
const bloodPressureReport = {
  'MaxSystolic': 150,
  'AverSystolic': 134,
  'MinSystolic': 90,
  'MaxDiastolic': 65,
  'AverDiastolic': 54,
  'MinDiastolic': 30,
  'Count': 11,
  'ResultPercentList': [
    {
      'TypeName': '正常',
      'Percentage': 18,
      'Count': 2
    },
    {
      'TypeName': '正常高值',
      'Percentage': 0,
      'Count': 0
    },
    {
      'TypeName': '轻度',
      'Percentage': 72,
      'Count': 8
    },
    {
      'TypeName': '中度',
      'Percentage': 0,
      'Count': 0
    },
    {
      'TypeName': '重度',
      'Percentage': 0,
      'Count': 0
    },
    {
      'TypeName': '偏低',
      'Percentage': 9,
      'Count': 1
    }
  ],
  'IndexDataList': [
    {
      'GroupTime': '2018-11-20T00:00:00',
      'DetailedRecords': [
        {
          'Time': '2018-11-20T14:00:56',
          'Systolic': 150,
          'Diastolic': 30,
          'HeartRate': 0,
          'Result': '轻度'
        },
        {
          'Time': '2018-11-20T12:37:09',
          'Systolic': 140,
          'Diastolic': 59,
          'HeartRate': 0,
          'Result': '轻度'
        },
        {
          'Time': '2018-11-20T10:56:43',
          'Systolic': 150,
          'Diastolic': 45,
          'HeartRate': 50,
          'Result': '轻度'
        },
        {
          'Time': '2018-11-20T10:42:31',
          'Systolic': 150,
          'Diastolic': 45,
          'HeartRate': 50,
          'Result': '轻度'
        },
        {
          'Time': '2018-11-20T09:17:28',
          'Systolic': 140,
          'Diastolic': 59,
          'HeartRate': 64,
          'Result': '轻度'
        }
      ]
    },
    {
      'GroupTime': '2018-11-19T00:00:00',
      'DetailedRecords': [
        {
          'Time': '2018-11-19T18:01:33',
          'Systolic': 140,
          'Diastolic': 59,
          'HeartRate': 64,
          'Result': '轻度'
        },
        {
          'Time': '2018-11-19T17:29:34',
          'Systolic': 140,
          'Diastolic': 59,
          'HeartRate': 64,
          'Result': '轻度'
        },
        {
          'Time': '2018-11-19T17:25:23',
          'Systolic': 140,
          'Diastolic': 59,
          'HeartRate': 64,
          'Result': '轻度'
        },
        {
          'Time': '2018-11-19T17:25:04',
          'Systolic': 139,
          'Diastolic': 59,
          'HeartRate': 64,
          'Result': '偏低'
        },
        {
          'Time': '2018-11-19T17:23:33',
          'Systolic': 95,
          'Diastolic': 65,
          'HeartRate': 64,
          'Result': '正常'
        },
        {
          'Time': '2018-11-19T16:13:48',
          'Systolic': 90,
          'Diastolic': 60,
          'HeartRate': 64,
          'Result': '正常'
        }
      ]
    }
  ]
}
const bloodSugarReport = {
  'AverBloodSugar': 20.4,
  'Saccharification': 14.5,
  'Count': 10,
  'MaxBloodSugar': 123,
  'MinBloodSugar': 3,
  'AverFasting': 67.5,
  'AverBeforeLunch': 46.7,
  'AverAfterLunch': 9.5,
  'AverAfterSleep': 5,
  'IndexDataList': [
    {
      'GroupTime': '2018-11-16T00:00:00',
      'DetailedRecords': [
        {
          'Time': '2018-11-16T18:46:00',
          'ItemType': '凌晨血糖',
          'RecordValue': 3,
          'ResultType': ''
        },
        {
          'Time': '2018-11-16T16:44:00',
          'ItemType': '早餐后血糖',
          'RecordValue': 9,
          'ResultType': '偏高'
        },
        {
          'Time': '2018-11-16T16:27:00',
          'ItemType': '空腹血糖',
          'RecordValue': 123,
          'ResultType': '偏高'
        },
        {
          'Time': '2018-11-16T16:24:00',
          'ItemType': '空腹血糖',
          'RecordValue': 12,
          'ResultType': '偏高'
        }
      ]
    },
    {
      'GroupTime': '2018-11-15T00:00:00',
      'DetailedRecords': [
        {
          'Time': '2018-11-15T16:46:00',
          'ItemType': '睡前血糖',
          'RecordValue': 5,
          'ResultType': '正常'
        },
        {
          'Time': '2018-11-15T16:46:00',
          'ItemType': '晚餐后血糖',
          'RecordValue': 8,
          'ResultType': '偏高'
        },
        {
          'Time': '2018-11-15T00:00:00',
          'ItemType': '午餐后血糖',
          'RecordValue': 13,
          'ResultType': '偏高'
        }
      ]
    },
    {
      'GroupTime': '2018-11-14T00:00:00',
      'DetailedRecords': [
        {
          'Time': '2018-11-14T16:45:00',
          'ItemType': '午餐后血糖',
          'RecordValue': 8,
          'ResultType': '偏高'
        },
        {
          'Time': '2018-11-14T16:44:00',
          'ItemType': '随机血糖',
          'RecordValue': 18,
          'ResultType': '偏高'
        }
      ]
    },
    {
      'GroupTime': '2018-11-12T00:00:00',
      'DetailedRecords': [
        {
          'Time': '2018-11-12T16:45:00',
          'ItemType': '午餐前血糖',
          'RecordValue': 5,
          'ResultType': '正常'
        }
      ]
    }
  ],
  'ResultPercentList': [
    {
      'TypeName': '正常',
      'Percentage': 20,
      'Count': 2
    },
    {
      'TypeName': '偏高',
      'Percentage': 70,
      'Count': 7
    },
    {
      'TypeName': '偏低',
      'Percentage': 0,
      'Count': 0
    }
  ]
}
export default {
  getBloodPressureRecord: () => {
    return bloodPressureRecord
  },
  saveBloodPressure: () => ({
    data: 'success'
  }),
  getBloodSugarRecord: () => {
    return bloodSugarRecord
  },
  saveBloodSugar: () => ({
    data: 'success'
  }),
  getHeartRateRecord: () => {
    return heartRateRecord
  },
  getStepReocrd: () => {
    return stepReocrd
  },
  getBloodOxygenRecord: () => {
    return bloodOxygenRecord
  },
  saveBloodOxygenRecord: () => ({
    data: 'success'
  }),
  saveHeartRate: () => ({
    data: 'success'
  }),
  getVitalCapacityRecord: () => {
    return vitalCapacityRecord
  },
  getBloodPressureReport: () => {
    return bloodPressureReport
  },
  getBloodSugarReport: () => {
    return bloodSugarReport
  },
  saveStepRecord: () => ({
    data: 'success'
  }),
  saveVitalCapacityRecord: () => ({
    data: 'success'
  })
}
