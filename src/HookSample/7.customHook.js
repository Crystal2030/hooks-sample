import React, { Component, PureComponent, useState, useEffect, useReducer, memo, useMemo, useCallback, useRef, useContext, createContext } from 'react';
import './index.less'
/**
 * useRef 可以用来生成对 DOM 对象的引用 返回一个可变的ref对象， 其.current属性被初始化为传递的参数（initialValue）
 * 使用场景：
 * 1. 获取子组件或者DOM节点的句柄
 * 2. 渲染周期之间共享数据的存储
 * 
 * 注意：函数组件不能被ref获取，因为类组件才可以实例化
 * 
 * 问题： 在副作用里面，如何判定一个与元素或者组件在本次渲染和上次渲染之间有过重新渲染？
*/

function useCounter(count) {
    const size = useSize();
    return <h1>counter组件：{count} <br/> 屏幕：{size.width} x {size.height}</h1>;
}

function useCount(defaultCount) {
    const [count, setCount] = useState(defaultCount);
    // 1. 创建Ref
    let it = useRef();
    /**
     * 需要访问上一次渲染时候的数据，同步到ref中就能下次获取到
     */
    useEffect(() => {
        it.current = setInterval(() => {
            setCount(count => count + 1);
        }, 1000)
    }, []);

    useEffect(() => {
        if (count >= 10) {
            clearInterval(it.current);
        }
    }, []);

    return [count, setCount];
}

function useSize() {
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    });

    const onResize = useCallback(() => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })
    });

    useEffect(() => {
        window.addEventListener('resize', onResize, false);
        // 手动清理effect
        return () => {
            window.removeEventListener('resize', onResize, false);
        }
    }, [])

    return size;
}


export default (props) => {
    const [count, setCount] = useCount(0);
    const Counter = useCounter(count);
    const size = useSize();

    // 2. 挂载ref
    return (
        <div>
            <p>
                点击了{count}次 <br />
                屏幕：{size.width} x {size.height}
            </p>
            <button className="button" onClick={() => setCount(count + 1)}>点我点我</button>
            {Counter}
        </div>
    )
}