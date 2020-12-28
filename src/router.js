import Vue from "vue";
import Router from "vue-router";
import Info from "@/views/Info";
import Auction from "@/views/Auction";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "info",
      component: Info
    },
    {
      path: "/auction/:idAuction",
      name: "auction",
      component: Auction,
      props: true
    },
    { path: "*", redirect: "/" }
  ]
});
