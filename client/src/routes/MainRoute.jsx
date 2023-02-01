import { Routes, Route } from "react-router-dom";
import Login from "../pages/login"
import Profile from "../pages/profile"
import Home from "../pages/home"


const MainRoute = () => {
  return (
    <div className="routes">

      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/" element={<Home/>}/>

      </Routes>


    </div>
  );
};

export default MainRoute;
{/* <Routes>
    <Route
        element={<LoggedInRoutes/>}
      
    >
        <Route path="/profile" element={<Profile/>}  />
        <Route path="/profile/:username" element={<Profile/>}  />
        <Route path="/friends" element={<Friends/>}  />
        <Route path="/friends/:type" element={<Friends/>}  />
        <Route path="/" element={<Home/>} />
        <Route path="/activate/:token" element={<Activate />}  />
        
    </Route>

    <Route
        element={<NotLoggedInRoutes/>}
      
    >

    </Route>
</Routes>
 */}
