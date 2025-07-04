import Home from "../frontend/pages/home/Home";
import Quotes from "../frontend/pages/quotes/Quotes";
import Mindset from "../frontend/pages/mindset/Mindset";
import Entertainment from "../frontend/pages/entertainment/Entertainment";
import Study from "../frontend/pages/study/Study";
import Podcast from "../frontend/pages/podcast/Podcast";
import Work from "../frontend/pages/work/Work";

const FrontendRoute = [
  // ------------ home ------------
  { path: "/home", component: Home },

  // ------------ pages ------------
  { path: "/", component: Quotes },
  { path: "/quotes", component: Quotes },
  { path: "/mindset", component: Mindset },
  { path: "/entertainment", component: Entertainment },
  { path: "/study", component: Study },
  { path: "/podcast", component: Podcast },
  { path: "/work", component: Work },
];

export default FrontendRoute;
