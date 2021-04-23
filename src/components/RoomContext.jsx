/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useReducer, useEffect, useContext } from 'react';
import RoomsReducer from './RoomsReducer';

const RoomContext = React.createContext(null);

let initialRooms;
try {
  initialRooms = JSON.parse(localStorage.getItem('rooms')) ?? [];
} catch {
  initialRooms = [];
}

export function RoomProvider(props) {
  const [filteredRooms, dispatch] = useReducer(RoomsReducer, initialRooms);
  useEffect(() => localStorage.setItem('rooms', JSON.stringify(initialRooms)), [initialRooms]);
  const contextValue = {
    filteredRooms,
    dispatch,
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
