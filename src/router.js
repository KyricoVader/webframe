import React from 'react';
import { BrowserRouter, Routes ,Route } from 'react-router-dom';        //导入路由的库元素组件

// 导入项目中的页面文件以配置路由
import Header from "./components/header/headerIndex";
import Login from './pages/login/loginIndex';
import Test from "./pages/test/TestIndex"

// 配置路由
function RouterView() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header />}>
                    <Route path="/test" element={<Test />} />
                    <Route index element={<Test />} />
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}



export default RouterView;
