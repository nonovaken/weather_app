import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import Detail from './Detail';
import styles from '../styles/MainData.css';

function MainData(props) {

    const data = props.data;
    const tempMin = Math.round(data.temperatureMin || props.detail.temperatureMin) + '\xB0';
    const tempMax = Math.round(data.temperatureMax || props.detail.temperatureMax) + '\xB0';
    const temp = Math.round(data.temperature || data.temperatureMax) + '\xB0';

    return (
        <div id='main-data' style={styles.flexContainerStyle}>
            <div style={styles.imgContainerStyle}>
                <img alt='' style={styles.imgStyle} src={props.imgs[data.icon.toString()]}/>
            </div>
            <div style={styles.currentTempStyle}>
                {temp}
            </div>

            <div style={styles.rangeTempStyle}>
                <div style={styles.maxTempStyle}>
                        <span>
                            <FontIcon className="material-icons" style={styles.arrowStyle}>
                                arrow_drop_up
                            </FontIcon>
                        </span>
                    <span>
                            {tempMax}
                        </span>
                </div>
                <div>
                        <span>
                            <FontIcon className="material-icons" style={styles.arrowStyle}>
                                arrow_drop_down
                            </FontIcon>
                        </span>
                    <span>
                            {tempMin}
                        </span>
                </div>
            </div>
            <div style={styles.ditailStyle}>
                <Detail
                    data={data}
                    detail={props.detail}
                />
            </div>
        </div>
    )
}

export default MainData;