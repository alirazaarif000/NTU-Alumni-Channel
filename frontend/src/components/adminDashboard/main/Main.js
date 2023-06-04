import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

import Dashboard from "../dashboard/Dashboard";
import AdminManagement from "../adminsManagement/AdminsManagement";
import RegisterAdmin from "../addNewAdmin/RegisterAdmin";
import NotFound from "../../NotFound";
import AdminProfile from "../adminProfile/AdminProfile";
import Spam from "../spamManagement/Spam";
import UserManagement from "../usersManagement/UsersManagement";

const Main = ({ showSidebar, setShowSidebar }) => {
  const { admin } = useSelector((state) => state);

  return (
    <>
      {admin &&
        <div className={`main ${showSidebar ? "activeSide" : ""}`}>
          <div
            className="menubutton text-black fw-bold fs-2 ms-3 mt-2 cursor-pointer"
          ><i class="fa fa-bars" aria-hidden="true" onClick={() => { setShowSidebar(true) }}></i>
          </div>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/users" component={UserManagement} />
            <Route path="/admins" component={AdminManagement} />
            <Route path="/adminregister" component={RegisterAdmin} />
            <Route path="/spams" component={Spam} />
            <Route path="/profile" component={AdminProfile} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>}
    </>
  );
};

export default Main;
