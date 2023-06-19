import { BrowserRouter as Router, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import io from "socket.io-client";
import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import StatusModal from "./components/StatusModal";
import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";
import { getNotifies } from "./redux/actions/notifyAction";

import AdminDashboard from "./pages/adminDashboard";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketClient from "./SocketClient";
import { Redirect, Switch } from "react-router-dom/cjs/react-router-dom.min";
import ForgetPassword from "./pages/forgetPassword";

function App() {
  const { auth, status, modal, userType: role } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        if (permission === "granted") {
        }
      });
    }
  }, []);

  return (
    <div className="app">
      <Router>
        <Alert />
        <Switch>
          {auth.token ? (
            role === "user" ? (
              <>
                {auth.token && <Header />}
                {status && <StatusModal />}
                {auth.token && <SocketClient />}
                <Route exact path="/" component={Home} />
                <PrivateRouter exact path="/:page" component={PageRender} />
                <PrivateRouter exact path="/:page/:id" component={PageRender} />
              </>
            ) : (
              <>
                <Route path="/*" component={AdminDashboard} />
              </>
            )
          ) : (
            <>
              <Route exact path="/" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/resetpassword" component={ForgetPassword} />
              <Redirect to="/" />
            </>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
