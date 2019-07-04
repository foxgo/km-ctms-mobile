/**
 * Created by huangyh(黄永号) on 2019/07/03.
 */

import DiseaseDistribution from "../../views/diseaseDistribution";

let meta = {
    requireAuth: false
};

let routers = [
    {
        path: "/diseaseDistribution",
        name: "diseaseDistribution",
        component: DiseaseDistribution,
        meta
    }
];

export default routers;