import React, {Component} from 'react';
import {BarChart, XAxis, Bar, Cell} from 'recharts';

const mainColor = 'black';
const subColor = '#9E9E9E';

class HourlyChart extends Component{
    constructor(props) {
        super(props);

        this.data = this.genDataArray();
        this.handleClick = this.handleClick.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    genDataArray() {
        let dataArr = [];
        let count = 0;
        for(let hourData of this.props.data.data) {
            if(count === 24) {
                break;
            }
            let hour = '';
            if(count % 3 === 1) {
                const futureHour = this.props.currentHour + count;
                hour = futureHour % 12 + ' ' + (futureHour % 24 > 12 ? 'PM' : 'AM');
            }
            dataArr.push({hour: count++, temp: hourData.temperature});
            // dataArr.push({hour: hour, temp: hourData.temperature});
        }
        return dataArr;
    }

    handleClick(event) {
        this.props.handleSelectorChange('hourly', event.activeLabel);
        this.props.handleHourlyActive(event.activeLabel);
    }

    handleMouseMove(event) {
        if(event) {
            const index = event.activeLabel;
            if(!this.props.moveActiveIndex || index !== this.props.moveActiveIndex) {
                this.props.handleHourlyMouseOver(index);
            }
        }
    }

    handleMouseOut() {
        this.props.handleHourlyMouseOver(-1);
    }

    setColor(hourIndex) {
        switch (hourIndex) {
            // bar selected
            case this.props.hourlyActiveId:
                return '#00BCD4';
            // mouse is on the bar
            case this.props.moveActiveIndex:
                return '#4DD0E1';
            default:
                return '#80DEEA';
        }
    }

    render(){
        const customTick = (props) => {
            const { payload, x, y, index } = props;
            const hour = this.data[index];

            return (
                <text x={x} y={y}>
                    {hour}
                </text>
            );
        };

        return (
            <div>
                <BarChart width={580} height={150} data={this.data}
                          onClick={this.handleClick}
                          onMouseMove={this.handleMouseMove}
                          onMouseOut={this.handleMouseOut}
                >
                    <XAxis
                        dataKey="hour"
                        interval={0}
                        tickCount={8}
                        axisLine={false}
                        tickLine={false}
                        tick={<CustomTick data={this.data} currentHour={this.props.currentHour}/>}
                    />
                    <Bar dataKey="temp" fill="#8884d8">
                        {
                            this.data.map((entry, index) => (
                                <Cell cursor="pointer" fill={this.setColor(entry.hour)} key={index}/>
                            ))
                        }
                    </Bar>
                </BarChart>
            </div>
        )
    };
}

function CustomTick(props) {
    const textStyle = {
        fontSize: 12,
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 300,
    };
    const {x, y, index} = props;
    let hour = '';
    if(index % 3 === 0) {
        const futureHour = props.data[index].hour + props.currentHour;
        // 12 -> 0 pm, 24 -> 0 am
        hour = (futureHour % 12 === 0 ? 12 : futureHour % 12)  + ' ' + (futureHour % 24 >= 12 ? 'PM' : 'AM');
    }

    return (
        <text x={x - 14} y={y + 10} style={textStyle}>
            {hour}
        </text>

    )
}

export default HourlyChart;