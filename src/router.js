import React from 'react';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';        //导入路由的库元素组件

// 导入项目中的页面文件以配置路由
import Home from "./components/home/homeIndex";
import Login from './pages/login/loginIndex';
import Test from "./pages/test/TestIndex"

// 配置路由
function RouterView() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Test />} />
            </Routes>
        </BrowserRouter>
    );
}


export default RouterView;
