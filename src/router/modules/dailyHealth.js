/**
 * Created by huangyh(黄永号) on 2019/07/03.
 */

import DailyHealth from "../../views/dailyHealth";

let meta = {
    requireAuth: false
};

let routers = [
    {
        path: "/dailyHealth",
        name: "dailyHealth",
        component: DailyHealth,
        meta
    }
];

export default routers;