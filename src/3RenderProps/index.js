import React from 'react';

export class Mouse extends React.Component {


    state = { x: 0, y: 0 }

    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        })
    }
    // 注意：callback 属性也可以叫个别的名字，不一定就是 render。只不过这个模式叫做 render prop。
    render() {
        return (
            <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
                {this.props.render(this.state)}
            </div>
        )
    }
}
