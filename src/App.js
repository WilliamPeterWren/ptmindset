import { Routes, Route } from "react-router-dom";

import Index from "./frontend/pages/Index";
import FrontendRoute from "./routes/FrontendRoute";
function App() {
  return (
    <div className="bg-customHeavyDark h-screen text-white">
      <div className="">
        <Routes>
          <Route path="/" element={<Index />}>
            {FrontendRoute.map((route, index) => {
              const Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path.replace(/^\//, "")}
                  element={<Page />}
                />
              );
            })}
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
