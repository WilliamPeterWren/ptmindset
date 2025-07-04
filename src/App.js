import { Routes, Route } from "react-router-dom";

import Index from "./frontend/pages/Index";
import FrontendRoute from "./routes/FrontendRoute";
function App() {
  return (
    <div className="bg-customHeavyDark text-white">
      <div className="flex items-center justify-center">
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
