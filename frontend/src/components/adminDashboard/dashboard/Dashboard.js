import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
    getTotalUsers,
    getTotalPosts,
    getTotalComments,
    getTotalLikes,
    getTotalActiveUsers,
    getTotalSpamPosts,
} from "../../../redux/actions/adminAction";

const Dashboard = () => {
    const { auth, admin, socket } = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTotalUsers(auth.token));
        dispatch(getTotalPosts(auth.token));
        dispatch(getTotalComments(auth.token));
        dispatch(getTotalLikes(auth.token));
        dispatch(getTotalSpamPosts(auth.token));
        dispatch(getTotalActiveUsers({ auth, socket }));
    }, [dispatch, auth.token, socket, auth]);
    return (
        <div>

            <div className="admin-panel-heading px-2 py-4">
                <h1>Hello {auth.user.username}</h1>
                <p>Welcome to your Admin Dashboard.</p>
            </div>

            <div className="row m-0 mt-3">
                <div className="col-md-6 col-lg-4 mb-3 p-2">
                    <div className="border p-3">
                        <i
                            className="fa fa-users fa-2x text-lightblue"
                            aria-hidden="true"
                        ></i>
                        <div className="card_inner_admin">
                            <p className="text-primary-p">Total Users</p>
                            <span className="font-bold text-title">{admin.total_users}</span>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4 mb-3 p-2">
                    <div className="border p-3">
                        <i className="fa fa-comments fa-2x text-red" aria-hidden="true"></i>
                        <div className="card_inner_admin">
                            <p className="text-primary-p">Total Comments</p>
                            <span className="font-bold text-title">
                                {admin.total_comments}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4 mb-3 p-2">
                    <div className="border p-3">
                        <i
                            className="fa fa-camera fa-2x text-yellow"
                            aria-hidden="true"
                        ></i>
                        <div className="card_inner_admin">
                            <p className="text-primary-p">Total Posts</p>
                            <span className="font-bold text-title">{admin.total_posts}</span>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4 mb-3 p-2">
                    <div className="border p-3">
                        <i className="fa fa-ban fa-2x text-red" aria-hidden="true"></i>
                        <div className="card_inner_admin">
                            <p className="text-primary-p">Reported Posts</p>
                            <span className="font-bold text-title">
                                {admin.total_spam_posts}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4 mb-3 p-2">
                    <div className="border p-3">
                        <i
                            className="fa fa-thumbs-up fa-2x text-green"
                            aria-hidden="true"
                        ></i>
                        <div className="card_inner_admin">
                            <p className="text-primary-p">Total Likes</p>
                            <span className="font-bold text-title">{admin.total_likes}</span>
                        </div>
                    </div>
                </div>

                <div className="col-md-6 col-lg-4 mb-3 p-2">
                    <div className="border p-3">
                        <i
                            className="fa fa-check-circle fa-2x  text-green"
                            aria-hidden="true"
                        ></i>
                        <div className="card_inner_admin">
                            <p className="text-primary-p">Total Active Users</p>
                            <span className="font-bold text-title">
                                {admin.total_active_users}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;








