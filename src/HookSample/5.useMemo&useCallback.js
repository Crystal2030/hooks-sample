import React, { Component, useState, useEffect, useReducer, memo, useMemo, useCallback, useRef, useContext, createContext } from 'react';
import './index.less'
/**
 * memo优化函数组件的重渲染行为，针对的是一个组件的是否重复执行。
 * useMemo针对的是一段函数逻辑是否重复执行
 * 
 * useMemo是一个用于性能优化的API，它通过记忆值手段让你避免在每个渲染上执行高开销的计算，可减少渲染的耗时。
 * 尤其适用在需要复杂计算的场景，比如复杂的列表渲染，对象深拷贝等等。
 * useMemo的第二个参数：策略跟useEffect一致。不同点：useEffect执行的是副作用，所以是渲染之后运行；但是useMemo需要返回值，返回值可以直接参与渲染，所以是渲染期间完成
 * ① 不传：每次都运行, 一般不这么写
 * ② 空数组：运行一次
*/
const Counter = memo(function Counter(props) {
    console.log('Counter render');
    return (
        <h1 onClick={props.onClick}>{props.count}</h1>
    )
})
export default (props) => {
    const [count, setCount] = useState(0);
    const [clickCount, setClickCount] = useState(0);

    const double = useMemo(() => {
        return count * 2;
    }, [count === 3]);

    // const onClick = useMemo(() => {
    //     return () => {
    //         console.log('click');
    //     }
    // }, [])

    // useMemo(() => fn) === useCallback(fn);
    // useCallback解决的是传入子组件的函数参数过度变化导致子组件过渡渲染
    const onClick = useCallback(() => {
        console.log('click');
        setClickCount((clickCount) => clickCount + 1);
    }, [])

    return (
        <div>
            <p>
                点击了{count}次, double: {double}<br />
            </p>

            <button className="button" onClick={() => setCount(count + 1)}>点我点我</button>

            <Counter count={double} onClick={onClick} />
        </div>
    )
}