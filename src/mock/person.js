const personInfo = {
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

const memberList = {
  ReturnData: [
    {
      PersonFamilyID: 0,
      PersonID: 18082,
      MemberID: 18082,
      AccountName: '17688715132',
      RelationCode: null,
      CreatedBy: 0,
      CreatedTime: '0001-01-01T00:00:00',
      ModifiedBy: 0,
      ModifiedTime: '0001-01-01T00:00:00',
      IsDeleted: false,
      Name: '二哥',
      Gender: '1',
      Age: 27,
      Phone: '17688715132',
      PersonNo: '42062419920501299X'
    },
    {
      PersonFamilyID: 2,
      PersonID: 18082,
      MemberID: 27481,
      AccountName: '17688715132',
      RelationCode: null,
      CreatedBy: 0,
      CreatedTime: '0001-01-01T00:00:00',
      ModifiedBy: 0,
      ModifiedTime: '0001-01-01T00:00:00',
      IsDeleted: false,
      Name: '儿歌',
      Gender: '1',
      Age: 35,
      Phone: '15827428871',
      PersonNo: '420624198406051317'
    },
    {
      PersonFamilyID: 7,
      PersonID: 18082,
      MemberID: 27487,
      AccountName: '17688715132',
      RelationCode: null,
      CreatedBy: 0,
      CreatedTime: '0001-01-01T00:00:00',
      ModifiedBy: 0,
      ModifiedTime: '0001-01-01T00:00:00',
      IsDeleted: false,
      Name: '刘大春',
      Gender: '1',
      Age: 27,
      Phone: '13123456789',
      PersonNo: ''
    },
    {
      PersonFamilyID: 10,
      PersonID: 18082,
      MemberID: 27490,
      AccountName: '17688715132',
      RelationCode: null,
      CreatedBy: 0,
      CreatedTime: '0001-01-01T00:00:00',
      ModifiedBy: 0,
      ModifiedTime: '0001-01-01T00:00:00',
      IsDeleted: false,
      Name: '六三',
      Gender: '2',
      Age: 17,
      Phone: '13971355496',
      PersonNo: ''
    },
    {
      PersonFamilyID: 11,
      PersonID: 18082,
      MemberID: 27491,
      AccountName: '17688715132',
      RelationCode: null,
      CreatedBy: 0,
      CreatedTime: '0001-01-01T00:00:00',
      ModifiedBy: 0,
      ModifiedTime: '0001-01-01T00:00:00',
      IsDeleted: false,
      Name: '李爽',
      Gender: '2',
      Age: 43,
      Phone: '13551397471',
      PersonNo: ''
    },
    {
      PersonFamilyID: 13,
      PersonID: 18082,
      MemberID: 27492,
      AccountName: '17688715132',
      RelationCode: null,
      CreatedBy: 0,
      CreatedTime: '0001-01-01T00:00:00',
      ModifiedBy: 0,
      ModifiedTime: '0001-01-01T00:00:00',
      IsDeleted: false,
      Name: '摸你',
      Gender: '2',
      Age: 26,
      Phone: '13667788991',
      PersonNo: '420602199301171546'
    },
    {
      PersonFamilyID: 18,
      PersonID: 18082,
      MemberID: 27483,
      AccountName: '17688715132',
      RelationCode: null,
      CreatedBy: 0,
      CreatedTime: '0001-01-01T00:00:00',
      ModifiedBy: 0,
      ModifiedTime: '0001-01-01T00:00:00',
      IsDeleted: false,
      Name: '欧阳',
      Gender: '2',
      Age: 31,
      Phone: '13971355471',
      PersonNo: '420624198809172949'
    },
    {
      PersonFamilyID: 46,
      PersonID: 18082,
      MemberID: 27538,
      AccountName: '17688715132',
      RelationCode: null,
      CreatedBy: 0,
      CreatedTime: '0001-01-01T00:00:00',
      ModifiedBy: 0,
      ModifiedTime: '0001-01-01T00:00:00',
      IsDeleted: false,
      Name: '莫斯科中',
      Gender: '0',
      Age: 47,
      Phone: '13973155473',
      PersonNo: ''
    },
    {
      PersonFamilyID: 49,
      PersonID: 18082,
      MemberID: 27586,
      AccountName: '17688715132',
      RelationCode: null,
      CreatedBy: 0,
      CreatedTime: '0001-01-01T00:00:00',
      ModifiedBy: 0,
      ModifiedTime: '0001-01-01T00:00:00',
      IsDeleted: false,
      Name: '刘欣',
      Gender: '1',
      Age: 31,
      Phone: '17798366219',
      PersonNo: ''
    }
  ],
  ReturnMessage: '',
  ReturnCode: 0,
  IsSuccess: true
}

const switchMemberInfo = {
  'ReturnData': {
    'Id': 27487,
    'AccountName': '17688715132',
    'OrgId': 32,
    'DoctorId': 85,
    'From': null,
    'Token': 'cdea40b5046a4335869970f18e848878'
  },
  'ReturnMessage': '切换成功',
  'ReturnCode': 0,
  'IsSuccess': true
}

export default {
  getPersonInfo: (person) => {
    return personInfo
  },
  updatePerson: (data) => ({
    data: 'data'
  }),
  getFamilyMemberList: () => {
    return memberList
  },
  getSwitchFamilyMember: (member) => {
    return switchMemberInfo
  }
}
