// 导入基础依赖库包
import React, { useState, useRef, useLayoutEffect, useMemo, useEffect } from 'react';
// 导入全局字体设置
import '../../common/global/fonts.css';
// 导入架构型功能样式
import './Architect.css';
// 导入响应式尺寸样式
import './Responsive.css';
// 导入自定义后的第三方UI组件库
import {ResponsiveSearchIcon, ResponsiveIconButton } from "./MaterialUI";
import {Link} from "react-router-dom";

const Home = () => {
    const leftMenuItems = useMemo(
        () => [
            {name: '首页', link: '/home'},
            {name: '编程', link: '/index'},
            {name: '论坛', link: '/index'},
            {name: '阅读', link: '/index'},
            {name: '影视', link: '/index'},
            {name: '经济', link: '/index'},
            {name: '赵云', link: '/index'},
            {name: '关羽', link: '/index'},
            {name: '马超', link: '/index'},
            {name: '张鹏', link: '/index'},
            {name: '中心', link: '/index'},
            {name: '消息', link: '/index'},
            {name: '关注', link: '/index'},
            {name: '历史', link: '/index'},
            {name: '创作', link: '/index'},
            {name: '语言', link: '/index'},
        ],
        []
    );
    const rightMenuItems = [
        {name: '中心', link: '/index'},
        {name: '消息', link: '/index'},
        {name: '关注', link: '/index'},
        {name: '历史', link: '/index'},
        {name: '创作', link: '/index'},
    ];

    const headerLeftDivRef = useRef(null);
    const headerSearchRef = useRef(null);

    const [visibleItems, setVisibleItems] = useState([]);
    const [hiddenItems, setHiddenItems] = useState([]);

    useLayoutEffect(() => {
        let times = 1;

        const initializeMenuItems = async () => {
            await setVisibleItems(leftMenuItems);
            await setHiddenItems([]);
            console.log('Initialized data', leftMenuItems, hiddenItems, visibleItems);
        };

        const updateMenuItems = () => {
            const leftDivRect = headerLeftDivRef.current.getBoundingClientRect();
            const searchRect = headerSearchRef.current.getBoundingClientRect();
            const leftDivRight = leftDivRect.right + 60;
            const searchLeft = searchRect.left;
            console.log(leftDivRight, searchLeft)
            console.log('updated data', leftMenuItems, hiddenItems, visibleItems);

            if (leftDivRight >= searchLeft) {
                setVisibleItems(prevVisibleItems => prevVisibleItems.slice(0, -1));
                setHiddenItems(prevHiddenItems => [...prevHiddenItems, leftMenuItems.slice(-times)[0]]);
                times++;

                console.log('Updated data', leftDivRight - searchLeft, hiddenItems, visibleItems);
                console.log('====================');

                requestAnimationFrame(updateMenuItems);
            }
        };

        const resizeToMenuItems = () => {
            initializeMenuItems().then(r => updateMenuItems());
        };

        // Call the function once when the component mounts
        resizeToMenuItems();

        window.addEventListener('resize', resizeToMenuItems);

        return () => {
            window.removeEventListener('resize', resizeToMenuItems);
        };
    }, [ leftMenuItems ]);

    const MoreMenu = () => {
        return (
            <div className="more-menu">
                <div className="more-menu-column">
                    <span>天地玄黄</span>
                    <span>宇宙洪荒</span>
                </div>
                <div className="more-menu-column">
                    <span>日月星辰</span>
                    <span>难掩其光</span>
                </div>
            </div>
        );
    };
    const [isMoreMenuVisible, setMoreMenuVisible] = useState(false);

    useEffect(() => {
        const handleMouseEnter = () => {
            setMoreMenuVisible(true);
        };

        const handleMouseLeave = () => {
            setMoreMenuVisible(false);
        };

        const headerLeftDiv = headerLeftDivRef.current;
        headerLeftDiv.addEventListener('mouseenter', handleMouseEnter);
        headerLeftDiv.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            headerLeftDiv.removeEventListener('mouseenter', handleMouseEnter);
            headerLeftDiv.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    return (
        <div>
            <div className="header">
                <div className="header-left-div" ref={headerLeftDivRef}>
                    {visibleItems.map((item, index) => (
                        <Link to={item.link} key={index}>
                        <span className="header-left-menu">
                            {item.name}
                        </span>
                        </Link>
                    ))}

                    {hiddenItems.length > 0 && (
                        <span className="header-left-more">
                        更多
                    </span>
                    )}
                </div>
                <div className="header-search" ref={headerSearchRef}>
                    <input className="header-search-input" placeholder="搜索中..." />
                    <ResponsiveIconButton>
                        <ResponsiveSearchIcon />
                    </ResponsiveIconButton>
                </div>
                <div className="header-right-div">
                    {rightMenuItems.map((item, index) => (
                        <Link to={item.link} key={index}>
                        <span  className="header-right-menu">
                            {item.name}
                        </span>
                        </Link>
                    ))}
                    <span className="header-right-language">
                    语言
                </span>
                </div>
            </div>
            {isMoreMenuVisible && <MoreMenu />}
        </div>

    );
};

export default Home;
