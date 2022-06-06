import React, { forwardRef, useContext, useEffect, useMemo, useState } from 'react';
import CalendarHeader from './components/CalendarHeader';
import classes from './calendar.module.scss';
import getDaysInMonth from './utils/getDaysInMonth';
import CalendarDayView from './components/CalenderDayView';
import CalendarMonthView from './components/CalendarMonthView';
import * as constants from '../../constants/constants'
import { CalenDarContext } from '../../context/calendarContext';
import CalendarYearView from './components/CalenderYearView';
import getYearInDecades from './utils/getYearInDecades';

const Calendar = forwardRef((props, ref) => {
  const date = new Date()

  const {
    calendarType,
    setCalendarType,
    selectedDate,
    selectedMonth,
    setSelectedMonth,
    selectedYear,
    setSelectedYear
  } = useContext(CalenDarContext)

  const renderItem = useMemo(() => getDaysInMonth(selectedMonth, selectedYear), [selectedDate, selectedMonth, selectedYear])

  const [showYear, setShowYear] = useState(selectedYear)
  const [calendarTitle, setCalendarTitle] = useState(`${renderItem.month} ${selectedYear}`)

  const onPrevClick = () => {
    if (calendarType === constants.calendarType.DAY) {
      if (selectedMonth === 0) {
        setSelectedMonth(11)
        setSelectedYear(selectedYear - 1)
      } else {
        setSelectedMonth(selectedMonth - 1)
      }
    }
    if (calendarType === constants.calendarType.MONTH) {
      if (selectedMonth === 0) {
        setSelectedMonth(11)
      } else {
        setSelectedMonth(selectedMonth - 1)
      }
    }
    if (calendarType === constants.calendarType.YEAR) {
      setShowYear(showYear - 10)
    }
  }

  const onNextClick = () => {
    if (calendarType === constants.calendarType.DAY) {
      if (selectedMonth === 11) {
        setSelectedMonth(0)
        setSelectedYear(selectedYear + 1)
      } else {
        setSelectedMonth(selectedMonth + 1)
      }
    }
    if (calendarType === constants.calendarType.MONTH) {
      if (selectedMonth === 11) {
        setSelectedMonth(0)
      } else {
        setSelectedMonth(selectedMonth + 1)
      }
    }
    if (calendarType === constants.calendarType.YEAR) {
      setShowYear(showYear + 10)
    }
  }

  // set calendar type
  const onMonthYearClick = () => {
    switch (calendarType) {
      case constants.calendarType.DAY:
        setCalendarType(constants.calendarType.MONTH)
        break;

      case constants.calendarType.MONTH:
        setCalendarType(constants.calendarType.YEAR)
        break;

      default:
        setCalendarType(constants.calendarType.DAY)
    }
  }

  // if calendar type/content changed, title should be changed
  useEffect(() => {
    switch (calendarType) {
      case constants.calendarType.DAY:
        setCalendarTitle(`${renderItem.month} ${selectedYear}`)
        break;

      case constants.calendarType.MONTH:
        setCalendarTitle(selectedYear)
        break;

      case constants.calendarType.YEAR:
        const getYear = getYearInDecades(showYear)
        setCalendarTitle(`${getYear.activeStartYear}~${getYear.activeEndYear}`)
        break;

      default:
        setCalendarTitle(`${renderItem.month} ${selectedYear}`)
    }
  }, [calendarType, showYear, renderItem.month, selectedYear])

  return (
    <div className={classes.wrapper} ref={ref}>
      <CalendarHeader
        onPrevClick={() => onPrevClick()}
        onNextClick={() => onNextClick()}
        onMonthYearClick={() => onMonthYearClick()}
        currentMonthYear={calendarTitle} />
      {
        calendarType === constants.calendarType.DAY &&
        <CalendarDayView
          today={date}
          calendarType={calendarType}
          currentDate={date}
          renderItem={renderItem} />
      }
      {
      calendarType === constants.calendarType.MONTH &&
        <CalendarMonthView
          calendarType={calendarType}
          currentMonth={renderItem.month}
          renderItem={renderItem} />
      }
      {
      calendarType === constants.calendarType.YEAR &&
        <CalendarYearView
          showYear={showYear}
          calendarType={calendarType}
          currentMonth={renderItem.month}
          renderItem={renderItem} />
      }
    </div>
  )
})

export default Calendar
