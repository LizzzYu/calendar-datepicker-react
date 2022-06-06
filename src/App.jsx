import React from 'react';
import DatePicker from './components/DatePicker/DatePicker';
import CalendarProvider from './context/calendarProvider';
import './scss/main.scss'

function App() {
  return (
    <CalendarProvider>
      <DatePicker />
    </CalendarProvider>
  )
}

export default App;