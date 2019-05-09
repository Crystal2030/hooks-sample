import React, {Fragment} from 'react';
import {
    useChangeDocumentTitle,
    useWindowSize,
    usePerspective,
    useCoordinate,
} from "./hooks";
import data from '../data';
import './card.css';

export default () => {
    let { type, title, list, tips } = data;
    const [windowWidth] = useWindowSize();
    const styles = usePerspective(10);
    const [positionX, positionY] = useCoordinate().position;
    useChangeDocumentTitle(type + ': ' + title);

    return (
        <Fragment>
            <div className="cards" style={styles.frame}>
                <h1>{title}</h1>
                {list.map(item => {
                    return <CardItem key={item.name} data={item} styles={styles}/>
                })}
            </div>
            <span className="notice">
				{tips}: {windowWidth}
                &nbsp;x: {positionX}
                &nbsp;y: {positionY}
			</span>
        </Fragment>
    )
}

const CardItem = ({data, styles}) => {
    let { name, image, imageStyle, background } = data;
    return (
        <div className="card">
            <div
                style={{
                    ...styles.background,
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat'
                }}
                className="card__bg"
            />
            <img
                className="card__img"
                style={{...imageStyle, ...styles.image}}
                src={image}
                alt={name}
                title={name}
            />
            <div className="card__text">
                <p className="card__title">{name}</p>
            </div>
        </div>
    )
}
