import LocalMerchant from "@components/LocalMerchant";
import Home from "@components/LocalMerchant/Home";
import Xixi from "@components/LocalMerchant/Xixi";
import Haha from "@components/LocalMerchant/Haha";
import Cry from "@components/LocalMerchant/Cry";
import Sad from "@components/LocalMerchant/Sad";

export default {
  path: "localMerchant",
  component: LocalMerchant,
  indexRoute: {
    onEnter(ns, replace) {
      replace("/localMerchant/home");
    }
  },
  childRoutes: [
    {
      path: "home",
      component: Home
    },
    {
      path: "xixi",
      component: Xixi
    },
    {
      path: "haha",
      component: Haha
    },
    {
      path: "cry",
      component: Cry
    },
    {
      path: "sad",
      component: Sad
    }
  ]
};
