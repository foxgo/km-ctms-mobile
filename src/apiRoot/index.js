/**
 * Created by huangyh(黄永号) on 2019/07/03.
 */

let BASE_API = process.env.BASE_API;

let apiType = {
    "0": {
        key: "baseApi",
        api: BASE_API,
        text: "baseApi"
    },
    "1": {
        key: "dev",
        api: "http://test-app.kmhealth360.com",
        text: "health"
    }
};

export default apiType;
