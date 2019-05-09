/**
 * 1.引入 React 中的 useState Hook。它让我们在函数组件中存储内部 state。
 * 2. 我们通过调用 useState Hook 声明了一个新的 state 变量。它返回一对值给到我们命名的变量上。
 *    我们把变量命名为 count，因为它存储的是点击次数。我们通过传 0 作为 useState 唯一的参数来将其初始化为 0。
 *    第二个返回的值本身就是一个函数。它让我们可以更新 count 的值，所以我们叫它 setCount。
 * 3. 当用户点击按钮后，我们传递一个新的值给 setXX方法。React 会重新渲染 Example 组件，并把最新的 count 传给它。
 */
import React, { useState, useEffect, useReducer, useMemo, useCallback, useRef, useContext } from 'react';

export const useChangeDocumentTitle = title => {
    // 如果是空数组，则只会执行一次（初次render之后），相当于componentDidMount,
    // 什么也不传，那么useEffect相当于 componentDidMount 和 componentDidUpdate
    // 如果数组内存在值，那么useEffect会在改数组发生改变后执行。
    useEffect(() => {
        document.title = title
    }, [])
}

export const useWindowSize = () => {
    let [size, setSize] = useState([window.innerWidth, window.innerHeight]);
    useEffect(() => {
        window.addEventListener('resize', () => {
            setSize([window.innerWidth, window.innerHeight])
        }, [])
    })
    return size;
}

/**
 * 鼠标位置
 * @param defaultPosition
 */
export const useMousePosition = (defaultPosition = [0, 0]) => {
    const [position, setPosition] = useState(defaultPosition); // 数组解构 创建了position和setPosition两个变量

    useEffect(() => {
        let handleMouseMove = event => setPosition([event.clientX, event.clientY]);
        window.addEventListener('mousemove', handleMouseMove, false);
        // 手动清理effect
        return () => window.removeEventListener('mousemove', handleMouseMove, false)
    }, [])
    return position;
}

/**
 * 坐标位置
 */
export const useCoordinate = () => {
    let [width, height] = useWindowSize();
    let originX = width / 2;
    let originY = height / 2;
    let totalX = width / 2;
    let totalY = height / 2;

    let [mouseX, mouseY] = useMousePosition([originX, originY]);
    let positionX = mouseX - originX
    let positionY = mouseY - originY
    let scaleX = Math.min(positionX / totalX, 1)
    let scaleY = Math.min(positionY / totalY, 1)

    return {
        position: [positionX, positionY],
        total: [totalX, totalY],
        scale: [scaleX, scaleY],
    }
}

export const usePerspective = (range = 10) => {
    const [scaleX, scaleY] = useCoordinate().scale; // 数组解构 创建了position和setPosition两个变量
    let x = scaleX * range;
    let y = scaleY * range;
    return {
        frame: {
            transform: `rotateX(${y}deg) rotateY(${x}deg)`
        },
        image: {
            transform: `translateX(${-x * 1.5}px) translateY(${y * 1.5}px)`
        },
        background: {
            backgroundPosition: `${-x * 2.5}px ${y * 2.5}px`
        }
    };
}
