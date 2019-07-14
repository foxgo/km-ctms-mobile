/**
 * Created by huangyh(黄永号) on 2019/07/03.
 */

let BASE_API = process.env.BASE_API;
let BASE_API_APP = process.env.BASE_API_APP;

let apiType = {
    "0": {
        key: "baseApi",
        api: BASE_API,
        text: "baseApi"
    },
    "1": {
        key: "appApi",
        api: BASE_API_APP, //"http://test-app.kmhealth360.com"
        text: "health"
    }
};

export default apiType;
