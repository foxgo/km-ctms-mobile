const obj = {
  'PersonID': 22040,
  'Name': '王大山',
  'PinYin': 'WDS',
  'Gender': '7',
  'Birthdate': '1983-12-05',
  'MarriageStatus': '7',
  'Height': null,
  'Weight': null,
  'IMEI': null,
  'PersonNo': '110101199007073770',
  'IsLH': false,
  'Address': {
    'PersonAreaID': 201,
    'PersonID': 22040,
    'ProvinceID': 110000000000,
    'CityID': 110100000000,
    'CountyID': 110101000000,
    'TownID': 110101001000,
    'DetailedAddress': '哈哈哈有意思',
    'CreatedBy': 22040,
    'CreatedTime': '2018-11-22T16:07:36',
    'ModifiedBy': 22040,
    'ModifiedTime': '2018-12-06T10:13:17',
    'IsDeleted': false
  },
  'Phone': '',
  'NickName': null,
  'IsDrugstore': false
}

export default {
  getPerson: (person) => {
    return obj
  },
  updatePerson: (data) => ({
    data: 'data'
  })
}
