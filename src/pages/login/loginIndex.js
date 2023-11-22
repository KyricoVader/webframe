import {Outlet} from "react-router";


const Login = () => {
    // 导航栏左侧内容项数组，以及对应的路由地址
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default Login;
