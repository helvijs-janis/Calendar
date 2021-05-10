import axios from 'axios';
import { useQuery, queryCache } from 'react-query';

export function fetchReservations() {
  return useQuery('reservations', async () => axios
    .get('http://localhost:3000/reservations?start=2021-02-02T08:30:00')
    .then((res) => res.data));
}

export function fetchBuildings() {
  return useQuery('buildings', async () => axios
    .get('http://localhost:3000/buildings')
    .then((res) => res.data));
}

export function fetchFaculties() {
  return useQuery('faculties', async () => axios
    .get('http://localhost:3000/faculties')
    .then((res) => res.data));
}

export function fetchRooms() {
  return useQuery('rooms', async () => axios
    .get('http://localhost:3000/rooms')
    .then((res) => res.data));
}

export function filterRoomsByBuilding(buildingId) {
  return useQuery('rooms', async () => {
    const response = await axios.get(`http://localhost:3000/rooms/${buildingId}`);
    const results = response.data;
    return results;
  }, {
    initialData: () => queryCache.getQueryData('rooms'),
  });
}
