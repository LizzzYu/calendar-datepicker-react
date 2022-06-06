import moment from 'moment';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { CalenDarContext } from '../../context/calendarContext';
import Calendar from '../Calendar/Calendar';
import calendarImg from '../../static/icons/calendar.png'
import classes from './datePicker.scss'


export default function DatePicker() {
  const {
    selectedDate,
    selectedMonth,
    selectedYear,
    setSelectedDate,
    setSelectedMonth,
    setSelectedYear,
    setIsCalendarOpen,
    isCalendarOpen
  } = useContext(CalenDarContext)

  const calendarRef = useRef(null)
  const inputRef = useRef(null)

  const currentSelectedDate = moment(new Date(`${selectedYear}/${selectedMonth + 1}/${selectedDate}`)).format('YYYY-MM-DD')

  const [date, onSelect] = useState(currentSelectedDate)

  const handleInputChange = e => {
    onSelect(e.target.value)
    const value = e.target.value
    const valueArr = value.split('-')
    if (valueArr[0].length === 4) {
      setSelectedYear(Number(valueArr[0]))
    }
    if (
      valueArr[1].length === 2
      && Number(valueArr[1]) <=12
      && Number(valueArr[1]) >= 1
      ) {
      setSelectedMonth(Number(valueArr[1] - 1))
    }
    if (valueArr[2].length === 2) {
      setSelectedDate(Number(valueArr[2]))
    }
  }

  const handleInputOnClick = e => {
    setIsCalendarOpen(!isCalendarOpen)
  }

  const handleInputOnBlur = e => {
    setIsCalendarOpen(false)
  }

  useEffect(() => {
    onSelect(currentSelectedDate)
  }, [selectedDate, selectedMonth, selectedYear])

  // use useRef to get the current element and add event listener to prevent default onBlur calendar close event
  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.addEventListener('mousedown', e => e.preventDefault())
    }
  })

  return (
    <>
      <div className={classes.wrapper}>
        <img className={classes.icon} src={calendarImg} />
        <input
          ref={inputRef}
          className={classes.inputField}
          onClick={handleInputOnClick}
          onBlur={handleInputOnBlur}
          onChange={handleInputChange}
          value={date} />
      </div>  
      {isCalendarOpen && 
        <Calendar
          date={date}
          onSelect={onSelect}
          ref={calendarRef} />
      }
    </>
  )
}