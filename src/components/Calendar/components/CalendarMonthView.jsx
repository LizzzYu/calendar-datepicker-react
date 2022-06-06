import React, { useContext } from 'react';
import classes from '../calendar.module.scss'
import * as constants from '../../../constants/constants'
import CalendarCell from './CalendarCell';
import { CalenDarContext } from '../../../context/calendarContext';

export default function CalendarMonthView(props) {
  const {
    selectedMonth,
    setCalendarType,
    setSelectedMonth
  } = useContext(CalenDarContext)

  return (
    <div className={classes.gridColumn4}>
      {constants.monthNames.map((month, index) => (
        <CalendarCell
          isActive={constants.monthNames[selectedMonth] === month}
          onClick={() => {
            setSelectedMonth(index)
            setCalendarType(constants.calendarType.DAY)
          }}
          calendarType={props.calendarType}
          key={month}
          value={month} />
      ))}
    </div>
  )
}