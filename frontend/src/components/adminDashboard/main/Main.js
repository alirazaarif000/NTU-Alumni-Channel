import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";

import Dashboard from "../dashboard/Dashboard";
import RegisterAdmin from "../addNewAdmin/RegisterAdmin";
import NotFound from "../../NotFound";
import AdminProfile from "../adminProfile/AdminProfile";
import Spam from "../spamManagement/Spam";
import UsersManagement from "../usersManagement/UsersManagement";
import JobsManagement from "../jobsManagement/JobsManagement";

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
            <Route path="/teachers" render={(props) => <UsersManagement {...props} ROLE="teacher" />} />
            <Route path="/alumnis" render={(props) => <UsersManagement {...props} ROLE="alumni" />} />
            <Route path="/students" render={(props) => <UsersManagement {...props} ROLE="student" />} />
            <Route path="/admins" render={(props) => <UsersManagement {...props} ROLE="admin" />}  />
            <Route path="/jobs" component={JobsManagement} />
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
