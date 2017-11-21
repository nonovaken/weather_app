import React, {Component} from 'react';
import DataArea from './DataArea';
import SelectorArea from './SelectorArea';
import {Card, CardHeader, CardText} from 'material-ui/Card'
import IconButton from 'material-ui/IconButton';

const imgs = {
    'clear-day': require('../weather-icon/clear-day.png'),
    'clear-night': require('../weather-icon/clear-night.png'),
    'fog': require('../weather-icon/fog.png'),
    'partly-cloudy-day': require('../weather-icon/partly-cloudy-day.png'),
    'partly-cloudy-night': require('../weather-icon/partly-cloudy-night.png'),
    'rain-night': require('../weather-icon/rain-night.png'),
    'sleet': require('../weather-icon/sleet.png'),
    'snow': require('../weather-icon/snow.png'),
    'wind': require('../weather-icon/wind.png')
};

const cardContainerStyle = {
    width: 620,
    display: 'inline-block',
};
const cardStyle = {
};
const cardHeaderStyle = {
    paddingTop: 0,
    paddingBottom: 0
};
const dataAreaStyle = {
};
const iconStyle = {
    color: '#00BCD4'
};
const buttonStyle = {
    bottom: 60
};
const cardTextStyle = {
    paddingTop: 0,
    paddingBottom: 5
};

const mainColor = 'black';
const subColor = '#9E9E9E';

class InstructCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };

        this.handleSelectorChange = this.handleSelectorChange.bind(this);
        this.handleExpandChange = this.handleExpandChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
    }

    handleSelectorChange(type, index) {
        let data = null;
        if(type === 'currently') {
            data = this.state.data[type];
        } else if(this.state.data.hasOwnProperty(type)){
            data = this.state.data[type].data[index];
        } else {
            console.error("Error: invalid selector type '" + type + "'");
            return;
        }

        this.setState({
            displayData: data,
            forecastType: type
        });
    }

    handleClick() {
        this.props.handleRemove(this.props.index);
    }

    handleExpandChange(expanded) {
        if(!expanded) {
            this.setState({
                displayData: this.props.data.currently
            })
        }
        this.props.handleCardSelect(this.props.index, expanded);
    };

    handleMouseOver() {
        this.props.handleMouseOver(this.props.index);
    }

    render() {
        /*
        Desplay remove button when mouse is over current card
         */

        console.log(this.props.mouseOver);
        let removeButton = null;
        if(this.props.mouseOver && !this.props.expanded) {
            removeButton = (
                <IconButton
                    iconClassName="material-icons"
                    iconStyle={iconStyle}
                    style={buttonStyle}
                    onClick={this.handleClick}
                    disableTouchRipple={true}
                >
                    cancel
                </IconButton>
            )
        }

        return (
            <div id='row-container' onMouseOver={this.handleMouseOver}>
                <div id='card-container' style={cardContainerStyle}>
                    <Card
                        expanded={this.props.expanded}
                        onExpandChange={this.handleExpandChange}
                        style={{cardStyle}}
                    >
                        <CardHeader
                            actAsExpander = {true}
                            style={cardHeaderStyle}
                        >
                            <WelcomeNote/>
                        </CardHeader>

                        <CardText id='card-text' style={cardTextStyle} expandable = {true}>
                            More instruction
                        </CardText>
                    </Card>
                </div>
                {removeButton}

            </div>
        )
    };
}

function Title(props) {
    const locationStyle = {
        fontSize: 27,
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 300,
        color: mainColor
    };
    const infoStyle = {
        fontSize: 16,
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 300,
        color: subColor,
        marginTop: 2
    };
    return (
        <div>
            <div style={locationStyle}>
                Welcome!
            </div>
            <div style={infoStyle}>Here is some instruction about how to use this web site</div>
        </div>
    );
}

function WelcomeNote(props) {
    const cardStyle = {
        // backgroundColor: '#00BCD4',
        paddingTop: 0,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10
    };
    const mainDataStyle = {
        display: 'inline-block',

        backgroundSize: 10000,
        width: 300
    };
    return (
        <div style={cardStyle}>
            <div>
                <Title/>
            </div>
            <div style={mainDataStyle}>
                Instruction
            </div>
        </div>
    )
}

export default InstructCard;