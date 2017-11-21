import React, {Component} from 'react';
import Paper from 'material-ui/Paper';

const selectorStyle = {
    marginTop: 20
};
const paperStyle = {
    display: 'inline-block',
    margin: 6,
    cursor: 'pointer'
};
const cardStyle = {
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 8,
    paddingBottom: 8
};
const imgStyle = {
    marginTop: 13,
    margin: 'auto',
    display: 'block',
    width: 48,
    height: 48,
};
const dayTextStyle = {
    fontFamily: 'Roboto, sans-serif',
    fontWeight: 300,
    textAlign: 'center',
    fontSize: 16,
    color: '#BDBDBD'

};
const tempTextStyle = {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center'
};
const lowTempTextStyle = {
    color: '#BDBDBD'
};
const preciptStyle = {
    marginTop: 6,
    paddingLeft: 11,
    color: '#BDBDBD'
};
const iconStyle = {
    width: 10,
    height: 10,
    marginRight: 5
};

const dayMap = ['Sun', 'Mon', 'Tus', 'Wed', 'Thu', 'Fri', 'Sat'];
const precipIcon = require('../Asset/detail-icons/precip.png');

class DailySelector extends Component{
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        const id = event.currentTarget.id;

        this.props.handleSelectorChange('daily', event.currentTarget.id);
        this.props.handleDailyActive(id);
    }



    genButton() {
        let buttonList = [];
        const imgs = this.props.imgs;
        this.props.data.data.some((dailyData, index) => {
            const time = new Date(dailyData.time * 1000);
            const precipt = Math.round(dailyData.precipIntensity * 100) + '%';

            buttonList.push(
                <Paper
                    id={index}
                    key={index}
                    style={paperStyle}
                    onClick={this.handleClick}
                    zDepth={index === +this.props.dailyActiveId ? 1 : 2}
                >
                    <div style={cardStyle}>
                        <div style={dayTextStyle}>
                            {dayMap[time.getDay()]}
                        </div>
                        <div>
                            <img alt='' style={imgStyle} src={imgs[dailyData.icon.toString()]}/>
                        </div>
                        <div style={tempTextStyle}>
                            <Temp
                                tempHigh={dailyData.temperatureHigh}
                                tempLow={dailyData.temperatureLow}
                            />
                        </div>
                        {/*<div id='preciptArea' style={preciptStyle}>*/}
                            {/*<span>*/}
                                {/*<img alt='' style={iconStyle} src={precipIcon}/>*/}
                            {/*</span>*/}
                            {/*<span>*/}
                                {/*{precipt}*/}
                            {/*</span>*/}
                        {/*</div>*/}
                    </div>
                </Paper>
            );
            return index === 10;
        });

        return buttonList;
    }

    render() {
        return (
            <div style={selectorStyle}>
                {this.genButton()}
            </div>
        );
    };
}

function Temp(props) {
    return (
        <div>
            <span>{Math.round(props.tempHigh) + '\xB0'}</span> <span style={lowTempTextStyle}>{Math.round(props.tempLow) + '\xB0'}</span>
        </div>
    )
}

export default DailySelector;
