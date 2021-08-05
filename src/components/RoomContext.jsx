/* eslint-disable func-style */
import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-query'
import axios from 'axios'
import useFetch from '../services/useFetch.js'
import { useReservationContext } from './ReservationContext'

const RoomContext = React.createContext(null)

const getRooms = async () => {
  const result = axios
    .get('https://tone.id.lv/api2/rooms')
    .then((res) => res.data)
  return result
}

export function RoomsProvider({ children }) {
  const roomsQuery = useQuery('rooms', getRooms)

  const [initialRooms, setInitialRooms] = useState([])

  useEffect(() => {
    if (roomsQuery.data) {
      setInitialRooms(roomsQuery.data)
    }
  }, [roomsQuery])

  const { data: buildings } = useFetch('buildings')

  useEffect(
    () => localStorage.setItem('buildings', JSON.stringify(buildings)),
    [buildings],
  )

  const { initialReservations } = useReservationContext()
  const [filteredRooms, setFilteredRooms] = useState([])

  const [selectedBuildingOptions, setSelectedBuildingOptions] = useState(4)
  const [hideUnavailableRooms, setHideUnavailableRooms] = useState(false)
  const [selectedOccupancy, setSelectedOccupancy] = useState(50)

  const [
    hideRoomsWithoutChalkBlackboard,
    setHideRoomsWithoutChalkBlackboard,
  ] = useState(false)
  const [hideRoomsWithoutTV, setHideRoomsWithoutTV] = useState(false)
  const [hideRoomsWithoutProjector, setHideRoomsWithoutProjector] = useState(
    false,
  )
  const [hideRoomsWithoutAudio, setHideRoomsWithoutAudio] = useState(false)
  const [
    hideRoomsWithoutLargeBlackboard,
    setHideRoomsWithoutLargeBlackboard,
  ] = useState(false)
  const [hideRoomsWithoutPrinter, setHideRoomsWithoutPrinter] = useState(false)

  const filterByBuilding = (array) => {
    if (selectedBuildingOptions === 4) {
      return array
    }

    return array.filter((item) => item.buildingId === selectedBuildingOptions)
  }

  const filterByAvailability = (array, reservations) => {
    if (hideUnavailableRooms) {
      const start1 = '2021-02-02T06:30:00Z'
      const end1 = '2021-02-02T08:30:00Z'
      const roomIds = []
      reservations.forEach((element) => {
        if (element.start <= end1 && element.end >= start1) {
          roomIds.push(element.resourceId)
        }
      })
      return array.filter((room) => roomIds.indexOf(room.id) === -1)
    }

    return array
  }

  const filterByOccupancy = (array) => {
    if (Number.isNaN(selectedOccupancy)) {
      return array
    }
    return array.filter((item) => item.occupancy >= selectedOccupancy)
  }

  const filterByChalkBlackboard = (array) => {
    if (hideRoomsWithoutChalkBlackboard) {
      return array.filter((item) => item.inventory.includes('Krīta tāfele'))
    }

    return array
  }

  const filterByTV = (array) => {
    if (hideRoomsWithoutTV) {
      return array.filter((item) => item.inventory.includes('Televizors'))
    }

    return array
  }

  const filterByAudio = (array) => {
    if (hideRoomsWithoutAudio) {
      return array.filter((item) => item.inventory.includes('Audio aprīkojums'))
    }

    return array
  }

  const filterByProjector = (array) => {
    if (hideRoomsWithoutProjector) {
      return array.filter((item) => item.inventory.includes('Projektors'))
    }

    return array
  }

  const filterByLargeBlackboard = (array) => {
    if (hideRoomsWithoutLargeBlackboard) {
      return array.filter((item) => item.inventory.includes('XL Tāfele'))
    }

    return array
  }

  const filterByPrinter = (array) => {
    if (hideRoomsWithoutPrinter) {
      return array.filter((item) => item.inventory.includes('3D Printeris'))
    }

    return array
  }

  useEffect(() => {
    let result = initialRooms
    const test = initialReservations
    result = filterByBuilding(result)
    result = filterByAvailability(result, test)
    result = filterByOccupancy(result)
    result = filterByChalkBlackboard(result)
    result = filterByTV(result)
    result = filterByAudio(result)
    result = filterByProjector(result)
    result = filterByLargeBlackboard(result)
    result = filterByPrinter(result)
    setFilteredRooms(result)
  }, [
    selectedBuildingOptions,
    initialReservations,
    initialRooms,
    hideUnavailableRooms,
    selectedOccupancy,
    hideRoomsWithoutChalkBlackboard,
    hideRoomsWithoutTV,
    hideRoomsWithoutAudio,
    hideRoomsWithoutProjector,
    hideRoomsWithoutLargeBlackboard,
    hideRoomsWithoutPrinter,
  ])

  const contextValue = {
    filteredRooms,
    setSelectedBuildingOptions,
    setHideUnavailableRooms,
    setSelectedOccupancy,
    setHideRoomsWithoutLargeBlackboard,
    setHideRoomsWithoutChalkBlackboard,
    setHideRoomsWithoutProjector,
    setHideRoomsWithoutTV,
    setHideRoomsWithoutAudio,
    setHideRoomsWithoutPrinter,
  }

  return (
    <RoomContext.Provider value={contextValue}>{children}</RoomContext.Provider>
  )
}

export function useRoomsContext() {
  const context = useContext(RoomContext)
  if (!context) {
    throw new Error('useRoomsContext must be used within a ReservationProvider')
  }
  return context
}

RoomsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
