import React, { useContext, useRef, useState } from 'react';
import classes from '../calendar.module.scss'
import * as constants from '../../../constants/constants'
import CalendarCell from './CalendarCell';
import { CalenDarContext } from '../../../context/calendarContext';
import getYearInDecades from '../utils/getYearInDecades';

export default function CalendarYearView(props) {
  const {
    setCalendarType,
    selectedYear,
    setSelectedYear
  } = useContext(CalenDarContext)

  // get render years
  const decades = getYearInDecades(props.showYear)

  // keep year value until user select other year
  const yearRef = useRef(selectedYear)

  return (
    <div className={classes.gridColumn4}>
      {decades.data.map(year => (
        <CalendarCell
          isActive={year.year === yearRef.current}
          onClick={() => {
            setSelectedYear(year.year)
            setCalendarType(constants.calendarType.MONTH)
          }}
          disabled={!year.active}
          calendarType={props.calendarType}
          key={year.year}
          value={year.year} />
      ))}
    </div>
  )
}