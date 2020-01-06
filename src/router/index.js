import Vue from "vue";
import Router from "vue-router";
import Signin from "@/components/Signin";
import Signup from "@/components/Signup";
import Create from "@/components/Articles/Create";
import Articles from "@/components/Articles/Articles";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Signin",
      component: Signin
    },
    {
      path: "/Register",
      name: "Signup",
      component: Signup
    },
    {
      path: "/article/new",
      name: "Create",
      component: Create
    },
    {
      path: "/articles",
      name: "Articles",
      ccomponent: Articles
    }
  ]
});
