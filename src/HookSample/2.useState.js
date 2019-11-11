import React, { useState, useEffect, useReducer, useMemo, useCallback, useRef, useContext } from 'react';
import './index.less'
/**
 * 1.引入 React 中的 useState Hook。它让我们在函数组件中存储内部 state。
 * 2. 通过调用 useState Hook 声明了一个新的 state 变量。它返回一对值给到我们命名的变量上。
 *    我们把变量命名为 count，因为它存储的是点击次数。我们通过传 0 作为 useState 唯一的参数来将其初始化为 0。
 *    第二个返回的值本身就是一个函数。它让我们可以更新 count 的值，所以我们叫它 setCount。
 * 3. 当用户点击按钮后，我们传递一个新的值给 setCount。React 会重新渲染组件上，并把最新的 count 传给它。
 */
// useState是一个钩子，他可以为函数式组件增加一些状态，并且提供改变这些状态的函数，同时它接收一个参数，这个参数作为状态的默认值。
/**
 * 问题：
 * 1. useState没有传入任何环境相关的参数，它如何知道要返回的是count，并且是当前组件的count
 *   首先useState确实不知道它要返回的是count，其实它并不需要知道，它只需要返回一个变量就行了，是我们自己命名为count，我们甚至可以命名为abc。。。
 * 
 * 2. useState如何知道要返回的是当前组件的count，而不是其他组件的count
 *   因为javascript是单线程的，在useState被调用之时，它只可能在唯一一个组件（上下文)中
 * 
 * 3. 如果一个组件有多个state，那么useState如何知道哪一次调用返回哪一个state呢？
 *   按照第一次运行的次序顺序执行的
 */
let id = 0;

export default (props) => {
    // 计算逻辑在app每次渲染都会执行，浪费资源，可以写在useState里面的回调函数中,延迟初始化
    // const defaultCount = props.defaultCount || 0;
    // const [count, setCount] = useState(() => {
    //     console.log('---initial count---')
    //     return props.defaultCount || 0;
    // }); // 数组解构 创建了count和setCount两个变量
    const [count, setCount] = useState(0);
    const [name, setName] = useState('Lily');

    id+=1;

    // useState是按照第一次运行的顺序来返回特定的state的，务必要保证state的顺序，否则就会导致混乱
    /* let name, setCount;
    let count, setName;

    id+=1; // 计算app渲染次数

    if (id & 1) {
        [count, setCount] = useState(0);
        [name, setName] = useState('Lily');
    } else {
        [name, setName] = useState('Lily');
        [count, setCount] = useState(0);
    } */


    /**
     * 以下点击按钮会报错：
     * 1. react严格要求useStaet按照稳定的顺序和数量被调用
     * 2. useState必须在组件顶层调用，不能在条件语句和循环块中
     * 3. 可以安装eslint-plugin-react-hooks来规范
     */
    // if (id > 1) {
    //     useState('2019');
    // }
    return (
        <div>
            <p>
                点击了{count}次, name: ({name})
            </p>

            <button className="button" onClick={() => setCount(count + 1)}>点我点我</button>
        </div>
    )
}