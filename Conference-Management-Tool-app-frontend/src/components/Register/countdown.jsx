import React, { Component } from 'react'
// import DateCountdown from 'react-date-countdown-timer';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

import "./styles.css";



const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;
const stratTime = Date.now() / 1000; // use UNIX timestamp in seconds
const endTime = stratTime + 243248; // use UNIX timestamp in seconds

const remainingTime = endTime - stratTime;
const days = Math.ceil(remainingTime / daySeconds);
const daysDuration = days * daySeconds;



const timerProps = {
    isPlaying: true,
    size: 120,
    strokeWidth: 6
};

const renderTime = (dimension, time) => {
    return (
        <div className="time-wrapper">
            <div className="time">{time}</div>
            <div>{dimension}</div>
        </div>
    );
};

const getTimeSeconds = (time) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time) => (time / daySeconds) | 0;

export class countdown extends Component {


    render() {
        return (

            <div className="App">
                
                <CountdownCircleTimer
                    {...timerProps}
                    colors={[["#7E2E84"]]}
                    duration={daysDuration}
                    initialRemainingTime={remainingTime}
                >
                    {({ elapsedTime }) =>
                        renderTime("days", getTimeDays(daysDuration - elapsedTime))
                    }
                </CountdownCircleTimer>
                <CountdownCircleTimer
                    {...timerProps}
                    colors={[["#D14081"]]}
                    duration={daySeconds}
                    initialRemainingTime={remainingTime % daySeconds}
                    onComplete={(totalElapsedTime) => [
                        remainingTime - totalElapsedTime > hourSeconds
                    ]}
                >
                    {({ elapsedTime }) =>
                        renderTime("hours", getTimeHours(daySeconds - elapsedTime))
                    }
                </CountdownCircleTimer>
                <CountdownCircleTimer
                    {...timerProps}
                    colors={[["#EF798A"]]}
                    duration={hourSeconds}
                    initialRemainingTime={remainingTime % hourSeconds}
                    onComplete={(totalElapsedTime) => [
                        remainingTime - totalElapsedTime > minuteSeconds
                    ]}
                >
                    {({ elapsedTime }) =>
                        renderTime("minutes", getTimeMinutes(hourSeconds - elapsedTime))
                    }
                </CountdownCircleTimer>
                <CountdownCircleTimer
                    {...timerProps}
                    colors={[["#218380"]]}
                    duration={minuteSeconds}
                    initialRemainingTime={remainingTime % minuteSeconds}
                    onComplete={(totalElapsedTime) => [
                        remainingTime - totalElapsedTime > 0
                    ]}
                >
                    {({ elapsedTime }) =>
                        renderTime("seconds", getTimeSeconds(elapsedTime))
                    }
                </CountdownCircleTimer>
            </div>
        )
    }
}

export default countdown
// ...
