/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect, useContext } from 'react';
import { useQuery, QueryCache } from 'react-query';
import axios from 'axios';
import useFetch from '../services/useFetch';
import { fetchReservations } from '../queries/RoomQueries';

const ReservationContext = React.createContext(null);

const getReservations = async (key) => {
  const selectedDate = key.queryKey[1].start;
  const result = axios.get(`http://localhost:3000/reservations?start=${selectedDate}`).then((res) => res.data);
  return result;
};

export function ReservationsProvider(props) {
  const { data: faculties } = useFetch(
    'faculties',
  );

  useEffect(() => localStorage.setItem('faculties', JSON.stringify(faculties)), [faculties]);

  const [selectedDate, setSelectedDate] = useState('2021-02-02T08:30:00');

  const reservationsQuery = useQuery(['reservations', { start: selectedDate }], getReservations);
  const [initialReservations, setInitialReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState();

  useEffect(() => {
    if (reservationsQuery.data) {
      setInitialReservations(reservationsQuery.data);
    }
  }, [reservationsQuery]);

  const [selectedFaculty, setSelectedFaculty] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState('Visi');
  const [selectedSubject, setSelectedSubject] = useState('');

  const filterByFaculty = (array) => {
    if (selectedFaculty === 0) {
      return array;
    }

    return array.filter((item) => item.facultyId === selectedFaculty);
  };

  const filterByCourse = (array) => {
    if (selectedCourse === 'Visi') {
      return array;
    }

    return array.filter((item) => item.kurss == selectedCourse);
  };

  const filterBySubject = (array) => {
    return array.filter((item) => item.title.toLowerCase().includes(selectedSubject.toLowerCase()));
  };

  useEffect(() => {
    let result = initialReservations;
    result = filterByFaculty(result);
    result = filterByCourse(result);
    result = filterBySubject(result);
    setFilteredReservations(result);
  }, [initialReservations, selectedFaculty, selectedCourse, selectedSubject]);

  const contextValue = {
    filteredReservations,
    setSelectedFaculty,
    setSelectedCourse,
    setSelectedSubject,
    setSelectedDate,
    initialReservations,
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

export async function getServerSideProps() {
  const reservationsQuery = await useQuery('reservations', async () => axios
    .get('http://localhost:3000/reservations')
    .then((res) => res.data));

  const facultiesQuery = await useQuery('faculties', async () => axios
    .get('http://localhost:3000/faculties')
    .then((res) => res.data));

  const res = await fetch('http://localhost:3000/reservations');
  const moviesData = await res.json();

  const reservationsData = reservationsQuery.data;
  const facultiesData = facultiesQuery.data;

  return {
    props: {
      reservations: reservationsData,
      faculties: facultiesData,
      test: moviesData,
    },
  };
}
