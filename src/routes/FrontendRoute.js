import Home from "../frontend/pages/home/Home";
import Quotes from "../frontend/pages/quotes/Quotes";

const FrontendRoute = [
  // ------------ home ------------
  { path: "/home", component: Home },
  { path: "/", component: Home },

  { path: "/quotes", component: Quotes },
];

export default FrontendRoute;
