/**
 * react hook sample1
 */
import React, {PureComponent} from 'react';
import HookSample from './HookSample';
// import './lib/swiper.css';
// import './index.css';

export default class App extends PureComponent {
    render() {
        return (
            <div class="wrapper">
                <header class="header">我是头部</header>
                <section class="content">
                    <HookSample/>
                </section>
                <footer class="footer">我是底部</footer>
                <div class="first-page">

                </div>
            </div>
        );
    }
}

/**
 * react hook sample2
 */
/*import React, {PureComponent} from 'react';
import CardClass from './HookSample2/CardClass';
import CardHook from './HookSample2/CardHook';

export default class App extends PureComponent {
    render() {
        return (
            <CardHook />
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("wrap"));*/


/**
 * render props使用
 */
/*import React, {PureComponent} from 'react';
import { Mouse} from './3RenderProps';

export default class App extends PureComponent {
    render () {
        return (
            <div style={{width: '100%'}}>
                <Mouse render={({ x, y }) => (
                    // render prop 给了我们所需要的 state 来渲染我们想要的
                    <h1>The mouse position is ({x}, {y})</h1>
                )}/>
            </div>
        )
    }
}
ReactDOM.render(<App/>, document.getElementById("wrap"));*/


/**
 * HOC
 */
/*
import React, {PureComponent} from 'react';
import { withMouse} from './2HOC';

class App extends PureComponent {
    render () {
        // 现在，我们得到了一个鼠标位置的 prop，而不再需要维护自己的 state
        const { x, y } = this.props.mouse;
        console.log('**********', this.props);
        return (
            <div style={{ height: '100%' }}>
                <h1>The mouse position is ({x}, {y})</h1>
            </div>
        )
    }
}

// 主需要用 withMouse 包裹组件，它就能获得 mouse prop
const AppWithMouse = withMouse(App)

ReactDOM.render(<AppWithMouse/>, document.getElementById("wrap"));
*/
