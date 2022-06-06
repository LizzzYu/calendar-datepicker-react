const getYearInDecades = (year) => {
  let decades = []

  const startYear = Math.floor(year / 10) * 10 - 1
  const endYear = startYear + 11

  for (let year = startYear; year <= endYear; year++) {
    decades.push(year)
  }

  const renderArr = decades.map((year, index) => {
    if (index === 0 || index === 11) {
      return {
        active: false,
        year: year,
      }
    } else {
      return {
        active: true,
        year: year,
      }
    }
  })

  // return activeStartYear & activeEndYear for the use of calendar title
  return {
    activeStartYear: startYear + 1,
    activeEndYear: endYear - 1,
    data: renderArr
  };
}

export default getYearInDecades;
