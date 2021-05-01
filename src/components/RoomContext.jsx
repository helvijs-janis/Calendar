/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect, useContext } from 'react';
import useFetch from '../services/useFetch';

const RoomContext = React.createContext(null);

let initialRooms;
try {
  initialRooms = JSON.parse(localStorage.getItem('rooms')) ?? [];
} catch {
  initialRooms = [];
}

export function RoomsProvider(props) {
  const { data: rooms } = useFetch(
    'rooms',
  );

  const { data: buildings } = useFetch(
    'buildings',
  );

  useEffect(() => localStorage.setItem('rooms', JSON.stringify(rooms)), [rooms]);
  useEffect(() => localStorage.setItem('buildings', JSON.stringify(buildings)), [buildings]);

  const [filteredRooms, setFilteredRooms] = useState(initialRooms);

  const [selectedBuildingOptions, setSelectedBuildingOptions] = useState(4);
  const [selectedOccupancy, setSelectedOccupancy] = useState(50);
  const [hideRoomsWithoutLargeBlackboard, setHideRoomsWithoutLargeBlackboard] = useState(false);
  const [hideRoomsWithoutChalkBlackboard, setHideRoomsWithoutChalkBlackboard] = useState(false);
  const [hideRoomsWithoutComputers, setHideRoomsWithoutComputers] = useState(false);
  const [hideRoomsWithoutProjector, setHideRoomsWithoutProjector] = useState(false);

  const filterByBuilding = (array) => {
    if (selectedBuildingOptions === 4) {
      return array;
    }

    return array.filter((item) => item.buildingId === selectedBuildingOptions);
  };

  const filterByOccupancy = (array) => {
    return array.filter((item) => item.occupancy >= selectedOccupancy);
  };

  const filterByLargeBlackboard = (array) => {
    if (hideRoomsWithoutLargeBlackboard) {
      return array.filter((item) => item.inventory.includes('XL tafele'));
    }

    return array;
  };

  const filterByChalkBlackboard = (array) => {
    if (hideRoomsWithoutChalkBlackboard) {
      return array.filter((item) => item.inventory.includes('Krita tafele'));
    }

    return array;
  };

  const filterByComputers = (array) => {
    if (hideRoomsWithoutComputers) {
      return array.filter((item) => item.inventory.includes('Datori'));
    }

    return array;
  };

  const filterByProjector = (array) => {
    if (hideRoomsWithoutProjector) {
      return array.filter((item) => item.inventory.includes('Projektors'));
    }

    return array;
  };

  useEffect(() => {
    let result = initialRooms;
    result = filterByBuilding(result);
    result = filterByOccupancy(result);
    result = filterByLargeBlackboard(result);
    result = filterByChalkBlackboard(result);
    result = filterByComputers(result);
    result = filterByProjector(result);
    setFilteredRooms(result);
  }, [selectedBuildingOptions,
    selectedOccupancy,
    hideRoomsWithoutLargeBlackboard,
    hideRoomsWithoutChalkBlackboard,
    hideRoomsWithoutComputers,
    hideRoomsWithoutProjector]);

  const contextValue = {
    filteredRooms,
    setSelectedBuildingOptions,
    setSelectedOccupancy,
    setHideRoomsWithoutLargeBlackboard,
    setHideRoomsWithoutChalkBlackboard,
    setHideRoomsWithoutComputers,
    setHideRoomsWithoutProjector,
  };

  return (
    <RoomContext.Provider value={contextValue}>
      {props.children}
    </RoomContext.Provider>
  );
}

export function useFilterRooms() {
  const context = useContext(RoomContext);
  return context;
}
