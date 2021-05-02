/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect, useContext } from 'react';
import useFetch from '../services/useFetch';

const ReservationContext = React.createContext(null);

let initialReservations;
try {
  initialReservations = JSON.parse(localStorage.getItem('reservations')) ?? [];
} catch {
  initialReservations = [];
}

export function ReservationsProvider(props) {
  const { data: reservations } = useFetch(
    'reservations',
  );

  const { data: faculties } = useFetch(
    'faculties',
  );

  useEffect(() => localStorage.setItem('reservations', JSON.stringify(reservations)), [reservations]);
  useEffect(() => localStorage.setItem('faculties', JSON.stringify(faculties)), [faculties]);

  const [filteredReservations, setFilteredReservations] = useState(initialReservations);

  const [selectedFaculty, setSelectedFaculty] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState('');

  const filterByFaculty = (array) => {
    if (selectedFaculty === 0) {
      return array;
    }

    return array.filter((item) => item.facultyId === selectedFaculty);
  };

  const filterBySubject = (array) => {
    return array.filter((item) => item.title.toLowerCase().includes(selectedSubject.toLowerCase()));
  };

  useEffect(() => {
    let result = initialReservations;
    result = filterByFaculty(result);
    result = filterBySubject(result);
    setFilteredReservations(result);
  }, [selectedFaculty, selectedSubject]);

  const contextValue = {
    filteredReservations,
    setSelectedFaculty,
    setSelectedSubject,
  };

  return (
    <ReservationContext.Provider value={contextValue}>
      {props.children}
    </ReservationContext.Provider>
  );
}

export function useReservationContext() {
  const context = useContext(ReservationContext);
  if (!context) {
    throw new Error('useReservationContext must be used within a ReservationProvider');
  }
  return context;
}
