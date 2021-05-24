/* eslint-disable eqeqeq */
/* eslint-disable arrow-body-style */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import axios from 'axios';
import useFetch from '../services/useFetch';

const ReservationContext = React.createContext(null);

const getReservations = async (key) => {
  const selectedDate = key.queryKey[1].start;
  const result = axios.get(`http://localhost:3000/reservations?start=${selectedDate}`).then((res) => res.data);
  return result;
};

const getFaculties = async () => {
  const result = axios.get('http://localhost:3000/faculties}').then((res) => res.data);
  return result;
};

export function ReservationsProvider(props) {
  const { data: faculties } = useFetch(
    'faculties',
  );

  useEffect(() => localStorage.setItem('faculties', JSON.stringify(faculties)), [faculties]);

  const [selectedDate, setSelectedDate] = useState('2021-02-02T08:30:00');
  const reservationsQuery = useQuery(['reservations', { start: selectedDate }], getReservations);
  const facultiesQuery = useQuery('faculties', getFaculties);

  const [initialReservations, setInitialReservations] = useState([]);
  const [initialFaculties, setInitialFaculties] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState();

  useEffect(() => {
    if (reservationsQuery.data) {
      setInitialReservations(reservationsQuery.data);
    }
  }, [reservationsQuery]);

  useEffect(() => {
    if (facultiesQuery.data) {
      setInitialFaculties(facultiesQuery.data);
    }
  }, [facultiesQuery]);

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
    initialFaculties,
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

ReservationsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
