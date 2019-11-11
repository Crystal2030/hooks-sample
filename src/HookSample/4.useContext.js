import React, { Component, useState, useEffect, useReducer, useMemo, useCallback, useRef, useContext, createContext } from 'react';
import './index.less'
/**
 * context（上下文）是react提供的一个用于实现数据共享的API，它可以解决需要通过多层嵌套传递props的问题
 * 1. 通过React.createContext()创建context对象
 * 2. 使用Context.Provider包裹组件，给它的后代组件提供数据
 * 3. Context.Provider所有的后代组件，都可以通过Context.Consumer获取Context数据
*/
const CountContext = createContext();
// 方法一 consumer 使用Context.Consumer获取共享的数据
class Foo extends Component {
    render () {
        return (
            <CountContext.consumer>
                {
                    count => <h1>{count}</h1>
                }
            </CountContext.consumer>
        )
    }
}
// 方法二 contextType
class Bar extends Component {
    static contextType = CountContext;
    render () {
        const count = this.context;
        return (
            <h1>{count}</h1>
        )
    }
}
// 方法三 useContext:useContext可以解决组件间的数据共享的问题; 传递给 useContext 的是 context 而不是 consumer
function Counter() {
    const count = useContext(CountContext);
    return (
        <h1>{count}</h1>
    )
}
export default (props) => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <p>
                点击了{count}次, <br />
            </p>
            <button className="button" onClick={() => setCount(count + 1)}>点我点我</button>
            <CountContext.Provider value={count}>
                <Foo/>
                <Bar/>
                <Counter/>
            </CountContext.Provider>
        </div>
    )
}