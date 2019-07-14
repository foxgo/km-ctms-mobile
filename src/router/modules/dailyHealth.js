/**
 * Created by huangyh(黄永号) on 2019/07/03.
 */

import DailyHealth from "../../views/dailyHealth";
import HealthStatistics from "../../views/healthStatistics";
import DateChoose from "../../views/dateChoose";
import FoodInput from "../../views/foodInput";
import SleepInput from "../../views/sleepInput";
import FoodDetail from "../../views/foodDetail";
import DailyReport from "../../views/dailyReport";
import PatientInfo from "../../views/patientInfo";

let meta = {
    //requireAuth: false
};

let routers = [
    {
        path: "/dailyHealth",
        name: "dailyHealth",
        component: DailyHealth,
        meta
    },
    {
        path: "/healthStatistics",
        name: "healthStatistics",
        component: HealthStatistics,
        meta
    },
    {
        path: "/dateChoose",
        name: "dateChoose",
        component: DateChoose,
        meta
    },
    {
        path: "/foodInput",
        name: "foodInput",
        component: FoodInput,
        meta
    },
    {
        path: "/sleepInput",
        name: "sleepInput",
        component: SleepInput,
        meta
    },
    {
        path: "/foodDetail",
        name: "foodDetail",
        component: FoodDetail,
        meta
    },
    {
        path: "/dailyReport",
        name: "dailyReport",
        component: DailyReport,
        meta
    },
    {
        path: "/patientInfo",
        name: "patientInfo",
        component: PatientInfo,
        meta
    }
];

export default routers;