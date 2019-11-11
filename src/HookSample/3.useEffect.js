import React, { Component, useState, useEffect, useReducer, useMemo, useCallback, useRef, useContext } from 'react';
import './index.less'
/**
 * 1. 绑定事件、网络请求、订阅、或手动修改React DOM这些行为都可以成为副作用（side effect）。useEffect正是用来处理这些副作用的。
 * 2. 同时useEffect也是componentDidMount，componentDidUpdate, 和componentWillUnmount这几个生命周期的统一。
 * 副作用时机：
 * ① Mount之后
 * ② Update之后
 * ③ Unmount之前
 * 
 * useEffect标准上在组件每次渲染之后调用，第二个参数
 * ① 空数组：如果是空数组，则只会执行一次（初次render之后），相当于componentDidMount,
 * ② 不传：什么也不传，那么useEffect相当于 componentDidMount 和 componentDidUpdate, 每次都会执行
 * ③ 值： 如果数组内存在值，那么useEffect会在改数组发生改变后执行。
 */

export default (props) => {
    const [count, setCount] = useState(0);
    const [size, setSize] = useState({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
    })

    const onResize = () => {
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        })
    }
    useEffect(() => {
        document.title = count;
        console.log('111', count);
    });
    useEffect(() => {
        window.addEventListener('resize', onResize, false);
        console.log('222', size.width);
        // 手动清理effect
        return () => {
            window.removeEventListener('resize', this.onResize, false);
        }
    }, [])
    return (
        <div>
            <p>
                点击了{count}次, <br />
                size: {size.width} x {size.height}
            </p>

            <button className="button" onClick={() => setCount(count + 1)}>点我点我</button>
        </div>
    )
}





// class 写法：

/* export default class ClassEffect extends Component {
    state = {
        count: 0,
        size: {
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
        }
    }

    onResize = () => {
        this.setState({
            size: {
                width: document.documentElement.clientWidth,
                height: document.documentElement.clientHeight,
            }
        })
    }

    componentDidMount() {
        document.title = this.state.count;
        window.addEventListener('resize', this.onResize, false);
    }

    componentDidUpdate() {
        document.title = this.state.count;
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.onResize, false);
    }

    render() {
        const { count, size } = this.state;

        return (
            <div>
                <p>
                    点击了{count}次, <br/>
                    size: {size.width} x {size.height}
                </p>
                <button className="button" onClick={() => setCount(count + 1)}>点我点我</button>
            </div>
        )
    }
} */