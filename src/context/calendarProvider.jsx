import React, { useState } from 'react';
import { CalenDarContext } from './calendarContext';
import * as constants from '../constants/constants'

const CalendarProvider = ({ children }) => {
  const date = new Date();

  const [selectedDate, setSelectedDate] = useState(date.getDate())
  const [selectedMonth, setSelectedMonth] = useState(date.getMonth())
  const [selectedYear, setSelectedYear] = useState(date.getFullYear())
  const [calendarType, setCalendarType] = useState(constants.calendarType.DAY)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const contextValue = {
    selectedDate,
    selectedMonth,
    selectedYear,
    calendarType,
    isCalendarOpen,
    setSelectedDate,
    setSelectedMonth,
    setSelectedYear,
    setCalendarType,
    setIsCalendarOpen
  };

  return (
    <CalenDarContext.Provider value={contextValue}>
      {children}
    </CalenDarContext.Provider>
  )
}

export default CalendarProvider
