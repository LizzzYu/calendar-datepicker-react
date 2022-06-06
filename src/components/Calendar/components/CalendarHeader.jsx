import React from 'react';
import classes from './calendarHeader.module.scss'
import clsx from 'clsx'
import leftArrow from '../../../static/icons/angle-small-left.png'
import rightArrow from '../../../static/icons/angle-small-right.png'

export default function CalendarHeader(props) {
  return (
    <div className={classes.wrapper}>
      <button
        className={classes.button}
        onClick={props.onPrevClick}
        >
        <img src={leftArrow} />
      </button>      
      <button
        onClick={props.onMonthYearClick}
        className={clsx(
        classes.button, classes.centerButton
        )}>
          {props.currentMonthYear}
      </button>      
      <button
        className={classes.button}
        onClick={props.onNextClick}
        >
        <img src={rightArrow} />
      </button>
    </div>
  )
}