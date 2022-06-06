import * as constants from '../../../constants/constants'

const fullDaysCount = 42

const getPrevMonthDays = (count, endDate) => {
  let prevDays = []
  while (prevDays.length < count) {
    endDate -= 1
    prevDays.unshift(endDate)
  }

  const renderArr = prevDays.map(ele => {
    return {
      active: false,
      date: ele
    }
  })

  return renderArr
}

const getNextMonthDays = (count) => {
  let nextDays = []
  let startDay = 1
  while (nextDays.length < count) {
    nextDays.push(startDay)
    startDay += 1
  }

  const renderArr = nextDays.map(ele => {
    return {
      active: false,
      date: ele
    }
  })

  return renderArr
}

const getDaysInMonth = (month, year) => {
  let date = new Date(year, month, 1)

  // get days in previous month
  let preDate = new Date(year, month, 0)
  let days = []
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  const arr = days.map((ele) => {
    if (new Date() > ele) {
      return {
        active: true,
        day: new Date(ele).getDay(),
        date: new Date(ele).getDate(),
        time: new Date(ele)
      }
    }
    return {
      active: true,
      day: new Date(ele).getDay(),
      date: new Date(ele).getDate(),
      time: new Date(ele)
    }
  })
  
  // slice to keep space and count the left days in month
  const fillerArr = [0, 1, 2, 3, 4, 5, 6]
  const fillArr = [...fillerArr.slice(0, arr[0].time.getDay()), ...arr]

  // combine prev inactive days & active days & next inactive days
  const renderArr = [
    ...getPrevMonthDays(arr[0].time.getDay(), preDate.getDate()),
    ...arr,
    ...getNextMonthDays(fullDaysCount - fillArr.length)
  ]

  return { month: constants.monthNames[month], data: renderArr }
}

export default getDaysInMonth;
