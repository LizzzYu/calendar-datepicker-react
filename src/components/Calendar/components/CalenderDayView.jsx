import React, { useContext, useRef } from 'react';
import moment from 'moment';
import classes from '../calendar.module.scss';
import CalendarCell from './CalendarCell';
import { CalenDarContext } from '../../../context/calendarContext';

export default function CalendarDayView(props) {
  const weekDay = [
    'Su',
    'Mo',
    'Tu',
    'We',
    'Th',
    'Fr',
    'Sa'
  ]
  
  const {
    setSelectedDate,
    setIsCalendarOpen,
    selectedDate,
    selectedMonth,
    selectedYear
  } = useContext(CalenDarContext)

  // keep date value so it won't change when calendar content changed. So isActive date will keep the same with user selected until user select other date
  const dateRef = useRef(moment(new Date(`${selectedYear}-${selectedMonth + 1}-${selectedDate}`)).format('YYYY/MM/DD'))

  return(
    <>
      <div className={classes.weakDays}>
        {weekDay.map(week => (
          <p key={week}>{week}</p>
        ))}
      </div>
      <div className={classes.gridColumn7}>
        {props.renderItem.data.map(day => (
          <CalendarCell
            calendarType={props.calendarType}
            key={`${day.date}${day.active}`}
            value={day.date || day}
            disabled={!day.active}
            onClick={() => {
              if (day.active) {
                setSelectedDate(day.date)
                setIsCalendarOpen(false)
              }
            }}
            isActive={
              day.active &&
              moment(day.time).format('YYYY/MM/DD') === dateRef.current
            }
            isCurrent={
              day.active &&
              moment(day.time).format('YYYY/MM/DD') === moment(props.today).format('YYYY/MM/DD')} />
        ))}
      </div>
    </>
  )
}