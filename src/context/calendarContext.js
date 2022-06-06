import React, { createContext } from 'react';

export const CalenDarContext = createContext({
  selectedDate: '',
  selectedMonth: '',
  selectedYear: '',
  calendarType: '',
  isCalendarOpen: null,

  setSelectedDate: () => {},
  setSelectedMonth: () => {},
  setSelectedYear: () => {},
  setCalendarType: () => {},
  setIsCalendarOpen: () => {}
})
