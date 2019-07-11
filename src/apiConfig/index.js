/**
 * Created by huangyh(黄永号) on 2019/07/03.
 */

import global from "./global";
import diseaseDistribution from "./diseaseDistribution";
import dailyHealth from "./dailyHealth";

//需要token请求的api
let api = {
    ...global,
    ...diseaseDistribution,
    ...dailyHealth
};

export default api;
