// 1.引入 React 中的 useState Hook。它让我们在函数组件中存储内部 state。
import React, { useState, useEffect, useReducer, useMemo, useCallback, useRef, useContext } from 'react';
import Main from './main';
import './index.less'

export default class HookSample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
    render() {
        return (
            <div>
                点击了{this.state.count}次

                <p></p>
                <button className="button" onClick={() => this.setState({count: this.state.count + 1})}>点我点我</button>
            </div>
        )
    }
}


/**
 * 2. 我们通过调用 useState Hook 声明了一个新的 state 变量。它返回一对值给到我们命名的变量上。
 *    我们把变量命名为 count，因为它存储的是点击次数。我们通过传 0 作为 useState 唯一的参数来将其初始化为 0。
 *    第二个返回的值本身就是一个函数。它让我们可以更新 count 的值，所以我们叫它 setCount。
 */
// useState是一个钩子，他可以为函数式组件增加一些状态，并且提供改变这些状态的函数，同时它接收一个参数，这个参数作为状态的默认值。
// 3. 当用户点击按钮后，我们传递一个新的值给 setCount。React 会重新渲染 Example 组件，并把最新的 count 传给它。
/*export default () => {

    const [count, setCount] = useState(0); // 数组解构 创建了count和setCount两个变量

    return (
        <div>
            <p>
                点击了{count}次
            </p>

            <button onClick={() => setCount(count + 1)}>点我点我</button>
        </div>
    )
}*/

// 问题1： React 怎么知道 useState 对应的是哪个组件，因为我们并没有传递 this 给 React?

// 数据获取、订阅、或手动修改React DOM这些行为都可以成为副作用（side effect）。useEffect正是用来处理这些副作用的。
// 同时useEffect也是componentDidMount，componentDidUpdate, 和componentWillUnmount这几个生命周期的统一。
/*export default ({ name }) => {

  const [count, setCount] = useState(() => {
    return 0;
  });

  const fetchUser = async () => {
    const result = await fetch('./user.json').then(res => res.json());
    console.log('fetch user---->', result);

  }

  // 如果是空数组，则只会执行一次（初次render之后），相当于componentDidMount,
  // 什么也不传，那么useEffect相当于 componentDidMount 和 componentDidUpdate
  // 如果数组内存在值，那么useEffect会在改数组发生改变后执行。

  // 同时使用多个useEffect
  useEffect(() => {
    // 初始化，获取数据，仅执行一次
    document.title = `你点击了${ count }次`;

    // 手动清理effect
    return () => {
      // 做一些清理的工作 会在组件卸载的时候执行
    }
  }, [count])

  useEffect(() => {
    console.log('---->', count)
    fetchUser();
  }, [])


    return (
    <div>
      <p>test component 111</p>
      <p>{ count }</p>
      <button onClick={() => setCount(count+1)}>Add</button>
    </div>
  );
}*/

// 指定初始 state
// const initialState = {count: 0}; // 初始state
// 惰性初始化
// const init = (initialCount) => {count: initialCount};

/*const reducer = (state, action) => {
    // 变量action，根据action的描述去更新state
    switch(action.type){
        // 当type为reset时，重置state的值，让state等于初始state
        case 'reset':
            return initialCount;
            // return init(action.payload);
        // 当type为increment，让count + 1
        case 'increment':
            return {count : state.count + 1 };
        // 当type为decrement，让count - 1
        case 'decrement':
            return {count : state.count - 1 };
        // 当type不属于上面任何一个时候，不做任何更改，返回当前的state
        default:
            return state;
    }
}

export default () => {

    const [ state, dispatch ] = useReducer(reducer, initialState);

    console.log('-------------', state)

    return (
        <div>
            <p>当前count的值是：{ state.count }</p>
            <p><button onClick = {() => {dispatch({ type: 'reset'})}} >重置</button></p>
            {/!*<p><button onClick = {() => {dispatch({ type: 'reset', payload: initialCount})}} >重置</button></p>*!/}
            <p><button onClick = {() => {dispatch({ type: 'increment'})}} >加一</button></p>
            <p><button onClick = {() => {dispatch({ type: 'decrement'})}} >减一</button></p>
        </div>
    )
}*/


/**
 * context（上下文）是react提供的一个用于实现数据共享的API，它可以解决需要通过多层嵌套传递props的问题
 * 1. 通过React.createContext()创建context对象
 * 2. 使用Context.Provider包裹组件，给它的后代组件提供数据
 * 3. Context.Provider所有的后代组件，都可以通过Context.Consumer获取Context数据
 */
// 1.创建context
// const Context = React.createContext();
// 2. 使用Context.Provider包裹组件,把数据传递给业务组件
{/*<Context.Provider value = {store}>
    <MyComponent/>
</Context.Provider>*/}
// 3. 使用Context.Consumer获取共享的数据
// MyComponent组件
/*<Context.Consumer>
    {
        value => {
            // value 就是通过context共享的数据，这里是store
            // ...
        }
    }
</Context.Consumer>*/

// 传递给 useContext 的是 context 而不是 consumer
// useContext可以解决组件间的数据共享的问题，而useReducer则解决了复杂的状态管理的问题，因此把他们结合起来之后，我们就可以实现redux的功能，那也意味着我们可以不再依赖第三方状态管理器。
/*
const Context = React.createContext({loading: true, name: 'jack'});

export default (props) => {
    const ctx = useContext(Context);
    return (
        <div>
            组件一：{ctx.loading && "Loading..."}
            <Main Context={Context}/>
        </div>
    )
}
*/


// useMemo: ﻿性能优化的API，它通过记忆值手段让你避免在每个渲染上执行高开销的计算，可减少渲染的耗时。﻿尤其适用在需要复杂计算的场景，比如复杂的列表渲染，对象深拷贝等等。
/**
 * useMemo的第二个参数：策略跟useEffect一致。不同点：useEffect执行的是副作用，所以是渲染之后运行；但是useMemo需要返回值，返回值可以直接参与渲染，所以是渲染期间完成
 * ①不传：每次都运行
 * ②空数组：运行一次
 */
/*export default (props) => {
    const obj1 = {id: '12', name: 'jack'};
    const obj2 = {id: '14', name: 'ben', age: 23};
    const memoizedValue = useMemo(() => Object.assign(obj1, obj2), [obj1, obj2]);
    console.log(memoizedValue)

// 使用
    return (
        <div>{ memoizedValue.name }</div>
    )
}*/


// useCallback ﻿useMemo的返回值就是callback的返回值，而useCallbak的返回值则callback函数本身
// useMemo(() => fn)   ===  useCallback(fn);
/*
export default (props) => {
    const obj1 = {id: '12', name: 'jack'};
    const obj2 = {id: '14', name: 'ben', age: 23};
    // const memoizedFn = useCallback(() => Object.assign(obj1, obj2), [obj1, obj2]);
    const memoizedFn = useMemo(() => () => Object.assign(obj1, obj2), [obj1, obj2]);
    console.log(memoizedFn)

// 使用
    return (
        <div>{ memoizedFn().name }</div>
    )
}
*/


// ﻿useRef 可以用来生成对 DOM 对象的引用 返回一个可变的ref对象， 其.current属性被初始化为传递的参数（initialValue）
/*export default (props) => {
     // 1. 创建Ref
    let [name, setName] = useState("Nate");
    let nameRef = useRef();
    const submitButton = () => {
        // 3. 访问ref
        setName(nameRef.current.value);
    };

    useEffect(() => {
      console.log('11111111', nameRef.current.value)
    }, [name])

    // 2. 挂载ref
    return (
        <div>
            <p>{name}</p>
            <div>
                <input ref={nameRef} type="text" />
                <button type="button" onClick={submitButton}>
                    Submit
                </button>
            </div>
        </div>
    )
}*/

// useRef 返回的值传递给组件或者 DOM 的 ref 属性，就可以通过 ref.current 值访问组件或真实的 DOM 节点，从而可以对 DOM 进行一些操作，比如监听事件等等。

// 当然 useRef 远比你想象中的功能更加强大，useRef 的功能有点像类属性，或者说您想要在组件中记录一些值，并且这些值在稍后可以更改。

// 利用 useRef 就可以绕过 Capture Value 的特性。可以认为 ref 在所有 Render 过程中保持着唯一引用，因此所有对 ref 的赋值或取值，拿到的都只有一个最终状态，而不会在每个 Render 间存在隔离。


// 自定义hook
/* const useDocumentTitle = (title) => {
    useEffect(() => {
        document.title = title;
    }, [title])
};

export default (props) => {

    useDocumentTitle("我是标题");

    return (
        <div>
            自定义hook
        </div>
    )
} */


