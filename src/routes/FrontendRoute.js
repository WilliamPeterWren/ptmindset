import Home from "../frontend/pages/home/Home";
import Quotes from "../frontend/pages/quotes/Quotes";
import Videos from "../frontend/pages/videos/Videos";

const FrontendRoute = [
  // ------------ home ------------
  { path: "/home", component: Home },
  { path: "/", component: Home },

  { path: "/videos", component: Videos },

  { path: "/quotes", component: Quotes },
];

export default FrontendRoute;
