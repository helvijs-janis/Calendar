/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect, useContext } from 'react';
import useFetch from '../services/useFetch';

const RoomContext = React.createContext(null);

let initialReservations;
try {
  initialReservations = JSON.parse(localStorage.getItem('reservations')) ?? [];
} catch {
  initialReservations = [];
}

let initialRooms;
try {
  initialRooms = JSON.parse(localStorage.getItem('rooms')) ?? [];
} catch {
  initialRooms = [];
}

let initialBuildings;
try {
  initialBuildings = JSON.parse(localStorage.getItem('buildings')) ?? [];
} catch {
  initialBuildings = [];
}

export function RoomProvider(props) {
  const { data: rooms } = useFetch(
    'rooms',
  );

  const { data: reservations } = useFetch(
    'reservations',
  );

  const { data: buildings } = useFetch(
    'buildings',
  );

  useEffect(() => localStorage.setItem('rooms', JSON.stringify(rooms)), [rooms]);
  useEffect(() => localStorage.setItem('reservations', JSON.stringify(reservations)), [reservations]);
  useEffect(() => localStorage.setItem('buildings', JSON.stringify(buildings)), [buildings]);

  const [filteredRooms, setFilteredRooms] = useState(initialRooms);
  const [filteredReservations, setFilteredReservations] = useState(initialReservations);

  const [selectedBuildingOptions, setSelectedBuildingOptions] = useState([0, 1, 2, 3]);
  const [selectedOccupancy, setSelectedOccupancy] = useState(50);

  const filterByBuilding = (array) => {
    return array.filter((item) => selectedBuildingOptions.includes(item.buildingId));
  };

  const filterByOccupancy = (array) => {
    return array.filter((item) => item.occupancy >= selectedOccupancy);
  };

  useEffect(() => {
    let result = initialRooms;
    result = filterByBuilding(result);
    result = filterByOccupancy(result);
    setFilteredRooms(result);
  }, [selectedBuildingOptions, selectedOccupancy]);

  const contextValue = {
    filteredRooms,
    filteredReservations,
    setSelectedBuildingOptions,
    setSelectedOccupancy,
  };

  return (
    <RoomContext.Provider value={contextValue}>
      {props.children}
    </RoomContext.Provider>
  );
}

export function useFilterRooms() {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useFilterRooms must be used within a RoomProvider');
  }
  return context;
}
