/**
 * Created by huangyh(黄永号) on 2019/08/10.
 */

import LifeCycle from "../../views/lifeCycle";
import DiseaseEncyclopedia from "../../views/diseaseEncyclopedia";
import CommonDisease from "../../views/commonDisease";
import CareForFamily from "../../views/careForFamily";

let meta = {
    //requireAuth: false
};

let routers = [
    {
        path: "/lifeCycle",
        name: "lifeCycle",
        component: LifeCycle,
        meta
    },
    {
        path: "/diseaseEncyclopedia",
        name: "diseaseEncyclopedia",
        component: DiseaseEncyclopedia,
        meta
    },
    {
        path: "/commonDisease",
        name: "commonDisease",
        component: CommonDisease,
        meta
    },
    {
        path: "/careForFamily",
        name: "careForFamily",
        component: CareForFamily,
        meta
    }
];

export default routers;