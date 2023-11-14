// 导入基础依赖库包
import React, { useState, useRef, useEffect, useMemo } from 'react';
// 导入全局字体设置
import '../../common/global/fonts.css';
// 导入架构型功能样式
import './Architect.css';
// 导入响应式尺寸样式
import './Responsive.css';
// 导入自定义后的第三方UI组件库
import {ResponsiveSearchIcon, ResponsiveIconButton} from "./MaterialUI";

const Home = () => {
    const leftMenuItems = useMemo(
        () => ['首页', '编程', '论坛', '阅读', '影视', '经济', '赵云', '关羽', '马超', '张鹏', '中心', '消息', '关注', '历史', '创作', '语言'],
        []
    );
    const rightMenuItems = ['中心', '消息', '关注', '历史', '创作', '语言'];

    const headerLeftDivRef = useRef(null);
    const headerSearchRef = useRef(null);

    const [visibleItems, setVisibleItems] = useState([]);
    const [hiddenItems, setHiddenItems] = useState([]);

    useEffect(() => {
        let times = 1;

        const initializeMenuItems = () => {
            setVisibleItems(leftMenuItems);
            setHiddenItems([]);
            console.log('Initialized data', hiddenItems, visibleItems);
        };

        const updateMenuItems = () => {
            const leftDivRect = headerLeftDivRef.current.getBoundingClientRect();
            const searchRect = headerSearchRef.current.getBoundingClientRect();
            const leftDivRight = leftDivRect.right + 60;
            const searchLeft = searchRect.left;

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
            initializeMenuItems();
            updateMenuItems();
        };

        window.addEventListener('resize', resizeToMenuItems);

        return () => {
            window.removeEventListener('resize', resizeToMenuItems);
        };
    }, [leftMenuItems, hiddenItems, visibleItems]);

    return (
        <div className="header">
            <div className="header-left-div" ref={headerLeftDivRef}>
                {visibleItems.map((item, index) => (
                    <span key={index} className="header-left-menu">
                        {item}
                    </span>
                ))}

                {hiddenItems.length > 0 && (
                    <span className="header-left-menu">
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
                    <span key={index} className="header-right-menu">{item}</span>
                ))}
            </div>
        </div>
    );
};

export default Home;
