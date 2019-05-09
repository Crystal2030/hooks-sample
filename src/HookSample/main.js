import React, { useContext } from 'react';

export default ({Context}) => {
    const ctx = useContext(Context);
    return (
        <div>
           组件二： {ctx.loading && ctx.name}
        </div>
    )
}
