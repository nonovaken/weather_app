import React, {Component} from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import CurrentlyWeather from './CurrentWeather'
import HourlySelector from './HourlySelector';
import DailySelector from './DailySelector';

class SelectorArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 0,

            // indeces for hourly selector
            moveActiveIndex: -1,
            hourlyActiveId: -1,

            // index for daily selector
            dailyActiveId: -1
        };
        this.handleIndexChange = this.handleIndexChange.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleHourlyMouseOver = this.handleHourlyMouseOver.bind(this);
        this.handleHourlyActive = this.handleHourlyActive.bind(this);
        this.handleDailyActive = this.handleDailyActive.bind(this);
    }

    handleChange(index) {
        this.setState({
            slideIndex: index,
            moveActiveIndex: -1,
            hourlyActiveId: -1,
            dailyActiveId: -1
        });
    };

    handleHourlyMouseOver(index) {
        this.setState({
           moveActiveIndex: index
        });
    }
    
    handleHourlyActive(index) {
        this.setState({
            hourlyActiveId: index
        })
    }
    
    handleDailyActive(index) {
        this.setState({
            dailyActiveId: index
        })
    }

    handleIndexChange(params) {
        const hourlyActiveId = params.hourlyActiveId || this.state.hourlyActiveId;
        const dailyActiveId = params.dailyActiveId || this.state.dailyActiveId;

        this.setState({
            hourlyActiveId: hourlyActiveId - 1,
            dailyActiveId: dailyActiveId - 1
        });
    }

    render() {
        const handlers = {
            handleSelectorChange: this.props.handleSelectorChange
        };

        const currentTime = new Date(this.props.data.currently.time * 1000);
        const currentHour = currentTime.getHours();

        return (
            <div id='selector-area'>
                <Tabs
                    id='tabs'
                    onChange={this.handleChange}
                    value={this.state.slideIndex}
                    style={{color: 'red'}}
                >
                    <Tab id='tab' label = "Hourly" value={0}/>
                    <Tab label = "Daily" value={1}/>
                </Tabs>
                <SwipeableViews
                    index = {this.state.slideIndex}
                    onChangeIndex = {this.handleChange}
                >
                    <div>
                        <HourlySelector
                            data = {this.props.data.hourly}
                            moveActiveIndex = {this.state.moveActiveIndex}
                            hourlyActiveId = {this.state.hourlyActiveId}
                            handleHourlyMouseOver = {this.handleHourlyMouseOver}
                            handleHourlyActive = {this.handleHourlyActive}
                            handleSelectorChange = {this.props.handleSelectorChange}
                            currentHour = {currentHour}
                        />
                    </div>
                    <div>
                        <DailySelector
                            data = {this.props.data.daily}
                            dailyActiveId = {this.state.dailyActiveId}
                            handleDailyActive = {this.handleDailyActive}
                            imgs = {this.props.imgs}
                            {...handlers}
                        />
                    </div>
                </SwipeableViews>
            </div>
        )
    };
}

export default SelectorArea;