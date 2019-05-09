import React from 'react'
import ReactDOM from 'react-dom'

// mixin 中含有了你需要在任何应用中追踪鼠标位置的样板代码。
// 我们可以将样板代码放入到一个 mixin 中，这样其他组件就能共享这些代码
// 如果完全不同的组件有相似的功能，我们可以引入来实现代码复用，只有在使用createClass来创建React组件时才可以使用，因为在React组件的es6写法中它已经被废弃掉了。
const MouseMixin = {
    getInitialState() {
        return { x: 0, y: 0 }
    },

    handleMouseMove(event) {
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }
}

const App = React.createClass({
    // 使用 mixin！
    mixins: [ MouseMixin ],

    render() {
        const { x, y } = this.state

        return (
            <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
                <h1>The mouse position is ({x}, {y})</h1>
            </div>
        )
    }
})

ReactDOM.render(<App/>, document.getElementById('app'))
