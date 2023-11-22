// 导入基础依赖库包
import React, { useState, useRef, useLayoutEffect, useMemo } from 'react';
// 导入全局字体设置
import '../../common/global/fonts.css';
// 导入架构型功能样式
import './Architect.css';
// 导入响应式尺寸样式
import './Responsive.css';
// 导入自定义后的第三方UI组件库
import { ResponsiveSearchIcon, ResponsiveIconButton } from "./MaterialUI";
import { Link, Outlet } from "react-router-dom";

const Header = () => {
    // 导航栏左侧内容项数组，以及对应的路由地址
    const leftMenuItems = useMemo(
        () => [
            {name: '情', link: '/123456789'},
            {name: '不知', link: '/index'},
            {name: '所起', link: '/index'},
            {name: '一往而深', link: '/index'},
            {name: '生者', link: '/index'},
            {name: '可以', link: '/index'},
            {name: '死', link: '/index'},
            {name: '死', link: '/index'},
            {name: '可以', link: '/index'},
            {name: '生', link: '/index'},
            {name: '欢乐', link: '/index'},
            {name: '聚', link: '/index'},
            {name: '离别', link: '/index'},
            {name: '苦', link: '/index'},
            {name: '谁知前途', link: '/index'},
            {name: '是否陌路', link: '/index'},
        ],
        []
    );
    // 导航栏右侧内容项数组，以及对应的路由地址
    const rightMenuItems = [
        {name: '中心', link: '/index'},
        {name: '消息', link: '/index'},
        {name: '关注', link: '/index'},
        {name: '历史', link: '/index'},
        {name: '创作', link: '/index'},
    ];


// 创建一个引用（ref）用于存储对headerLeftDiv、headerSearch元素的引用
    const headerLeftDivRef = useRef(null);
    const headerSearchRef = useRef(null);

// 使用状态钩子，定义导航栏左侧可见项和隐藏项的状态和设置函数
    const [visibleItems, setVisibleItems] = useState([]);
    const [hiddenItems, setHiddenItems] = useState([]);

    // 根据页面大小自动计算并显示导航栏左侧菜单项
    useLayoutEffect(() => {
        // 函数中需要用到的循环次数的参数，一次循环剪切一个数组项，times表示当前页面需要循环的次数
        let times = 1;

        // 初始化导航栏数组，做最初的渲染
        const initializeMenuItems = async () => {
            // 可见项和隐藏项数组元素初始化
            await setVisibleItems(leftMenuItems);
            await setHiddenItems([]);

            // 每次缩放页面需要需要重新定义这个循环次数相关变量
            times = 1;
        };

        // 根据当前页面大小，计算并将导航栏数组切片
        const updateMenuItems = () => {
            // 获取headerLeftDivRef这个div元素的相关信息，主要是其区域最右侧的位置信息
            const leftDivRect = headerLeftDivRef.current.getBoundingClientRect();
            const leftDivRight = leftDivRect.right + 60;

            // 获取headerSearchRef这个div元素的相关信息，主要是其区域最左侧的位置信息
            const searchRect = headerSearchRef.current.getBoundingClientRect();
            const searchLeft = searchRect.left;

            // 如果headerLeftDivRef右侧超过了headerSearchRef左侧，意味着左侧导航栏覆盖住了搜索框，需要将导航栏左侧菜单切片
            if (leftDivRight >= searchLeft) {
                // 切片出可视化的部分
                setVisibleItems(prevVisibleItems => prevVisibleItems.slice(0, -1));
                // 切片出隐藏的部分
                setHiddenItems(prevHiddenItems => [ leftMenuItems.slice(-times)[0], ...prevHiddenItems ]);
                // 循环次数+1
                times++;

                // 一次切片一个数组项，递归调用以便切片下一次，直到headerLeftDivRef不与headerSearchRef重叠
                requestAnimationFrame(updateMenuItems);
            }
        };

        // 封装初始化和更新数组方法
        const resizeToMenuItems = () => {
            initializeMenuItems().then(() => updateMenuItems());
        };

        // 在组件渲染的时候调用一次方法
        resizeToMenuItems();

        // 当窗口发生大小变化时调用方法
        window.addEventListener('resize', resizeToMenuItems);

        return () => {
            window.removeEventListener('resize', resizeToMenuItems);
        };
    }, [ leftMenuItems ]);

    // 菜单导航栏“更多”下拉菜单
    const MoreMenu = () => {
        return (
            <div className="more-menu-div">
                {/*映射隐藏项数组元素，以index为关键参数序号，逐条渲染*/}
                {hiddenItems.map((item, index) => (
                    <Link to={item.link} key={index}>
                        <div>
                            <span className="more-menu-span">
                                {item.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        );
    };

    // 使用状态钩子，定义导航栏更多可见项的状态和设置函数
    const [isMoreMenuVisible, setMoreMenuVisible] = useState(false);
    const handleMouseEnter = () => {
        setMoreMenuVisible(true);
    };
    const handleMouseLeave = () => {
        setMoreMenuVisible(false);
    }

    return (
        <div>
            <div className="header">

                {/*左侧导航菜单项*/}
                <div className="header-left-div" ref={headerLeftDivRef}>
                    {visibleItems.map((item, index) => (
                        <Link to={item.link} key={index}>
                            <span className="header-left-menu">
                                {item.name}
                            </span>
                        </Link>
                    ))}

                    {/*左侧导航栏隐藏项*/}
                    {hiddenItems.length > 0 && (
                        <div onMouseEnter={handleMouseEnter}  onMouseLeave={handleMouseLeave}>
                            <Link>
                                <span className="header-left-more">
                                    更多
                                </span>
                            </Link>
                            {isMoreMenuVisible && <MoreMenu />}
                        </div>
                    )}
                </div>

                {/*搜索部分*/}
                <div className="header-search" ref={headerSearchRef}>
                    <input className="header-search-input" placeholder="搜索中..." />
                    <ResponsiveIconButton>
                        <ResponsiveSearchIcon />
                    </ResponsiveIconButton>
                </div>

                {/*右侧导航菜单项*/}
                <div className="header-right-div">
                    {rightMenuItems.map((item, index) => (
                        <Link to={item.link} key={index}>
                            <span  className="header-right-menu">
                                {item.name}
                            </span>
                        </Link>
                    ))}

                    <Link>
                        <span className="header-right-language">
                            语言
                        </span>
                    </Link>
                </div>

            </div>

            {/*路由子组件入口*/}
            <Outlet />
        </div>

    );
};

export default Header;