/* eslint-disable func-style */
import axios from 'axios'
import { useQuery } from 'react-query' // QueryClient, useMutation, QueryCache

export const createReservation = async (data) => {
  const response = await fetch('https://tone.id.lv/api2/reservations/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error(response.json().message)
  }

  return response.json()
}

export const fetchReservations = () =>
  useQuery('reservations', async () =>
    axios
      .get('https://tone.id.lv/api2/reservations?start=2021-02-02T08:30:00')
      .then((res) => res.data),
  )

export function fetchBuildings() {
  return useQuery('buildings', async () =>
    axios.get('https://tone.id.lv/api2/buildings').then((res) => res.data),
  )
}

export function fetchPersons() {
  return useQuery('persons', async () =>
    axios.get('https://tone.id.lv/api2/persons').then((res) => res.data),
  )
}

export function fetchFaculties() {
  return useQuery('faculties', async () =>
    axios.get('https://tone.id.lv/api2/faculties').then((res) => res.data),
  )
}

export function useFaculties() {
  return useQuery('faculties', async () =>
    axios.get('https://tone.id.lv/api2/faculties').then((response) => {
      const option = { id: -1, fullname: 'Visas fakultātes' }
      response.data.unshift(option)
      return response.data
    }),
  )
}

export function fetchRooms() {
  return useQuery('rooms', async () =>
    axios.get('https://tone.id.lv/api2/rooms').then((res) => res.data),
  )
}
