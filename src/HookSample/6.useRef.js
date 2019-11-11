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

class Counter extends PureComponent {
    speak() {
        console.log(`now counter is: ${this.props.count}`)
    }
    render() {
        const { props } = this;
        return <h1 onClick={props.onClick}>点击counter组件，触发speak函数：{props.count}</h1>;
    }
}
export default (props) => {
    const [count, setCount] = useState(0);
    const [name, setName] = useState("Nate");
    const [clickCount, setClickCount] = useState(0);
    let it = useRef();
    // 1. 创建Ref
    const nameRef = useRef();
    const counterRef = useRef();

    const submitButton = () => {
        // 3. 访问ref
        setName(nameRef.current.value);
    };

    const double = useMemo(() => {
        return count * 2;
    }, [count === 3]);

    const handleClick = useCallback(() => {
        console.log('onClick');
        setClickCount((clickCount) => clickCount + 1);
        // 3. 访问ref
        counterRef.current.speak();
    }, [counterRef])

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

    // 2. 挂载ref
    return (
        <div>
            <p>{name}</p>
            <div className="name-ref">
                <input className="input" ref={nameRef} type="text" />
                <button className="button margin-left" type="button" onClick={submitButton}>
                    Submit
                </button>
            </div>

            <br/>
            <br/>

            <p>
                点击了{count}次, double: {double}<br />
            </p>
            <button className="button" onClick={() => setCount(count + 1)}>点我点我</button>
            <Counter ref={counterRef} count={double} onClick={handleClick} />
        </div>
    )
}