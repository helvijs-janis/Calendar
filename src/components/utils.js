import { format, add } from 'date-fns'

let buildings
try {
  buildings = JSON.parse(localStorage.getItem('buildings')) ?? []
} catch {
  buildings = []
}

export const formatDate = (info) => {
  const dateHelper = add(info.date, {
    hours: 1,
    minutes: 30,
  })

  const endTime = format(dateHelper, 'H:mm')
  const startTime = format(info.date, 'cccc, MMMM do H:mm - ')
  const result = startTime + endTime

  return result
}

export const formatToDbDateString = (info) => {
  const result = format(info.date, "yyyy-MM-dd'T'HH:mm'+02:00'")
  return result
}

export const formatDateAddingHourAndHalf = (info) => {
  const dateHelper = add(info.date, {
    hours: 1,
    minutes: 30,
  })
  const result = format(dateHelper, "yyyy-MM-dd'T'HH:mm'+02:00'")
  return result
}

export const formatRoomInfo = (info) => {
  const room = info.resource.title
  const id = info.resource.extendedProps.buildingId
  const building = buildings[id].title
  const result = `${room} - ${building}`

  return result
}
