/* eslint-disable */
// import axios from 'axios';
// import {useQuery, useQueryClient} from 'react-query'
// import React, { useState, useContext } from 'react'

// const CalendarDataContext = React.createContext(null);

// const baseUrl = process.env.REACT_APP_API_BASE_URL;

// export function CalendarDataProvider (props) {
//   return (
//     <CalendarDataContext.Provider value={contextValue}>
//       {props.children}
//     </CalendarDataContext.Provider>
//   );
// }

// export function useCalendarData() {
//     const context = useContext(CalendarDataContext);
//     return context;
// }

// const getMovies = async(key) => {
//     console.log(key)
//     const genreId = key.queryKey[1].genre
//     const actorsIds = key.queryKey[2].actors.map(id => `actors.id=${id}`)
//     console.log(actorsIds)

//     const actorsQueryString = actorsIds.join('&')
//     console.log(actorsQueryString)

//     if(genreId && actorsQueryString) {
//         const res = await fetch(`${API_URL}/movies?genre.id=${genreId}&${actorsQueryString}`)
//         return res.json()
//     }

//     if(genreId) {
//         const res = await fetch(`${API_URL}/movies?genre.id=${genreId}`)
//         return res.json()
//     }

//     if(actorsQueryString) {
//         const res = await fetch(`${API_URL}/movies?${actorsQueryString}`)
//         return res.json()
//     }

//     const res = await fetch(`${API_URL}/movies`)
//     return res.json()
// }

// const FilterMovies = ({ rooms, reservations, buildings }) => {
//     const queryClient = useQueryClient()
//     const [genreId, setGenreId] = useState(null)
//     const [actorsIds, setActors] = useState([])
//     const {data, status} = useQuery(['movies', {genre: genreId}, {actors: actorsIds}], getMovies, {initialData: movies})

// }

// export async function getServerSideProps() {
//     const baseUrl = process.env.REACT_APP_API_BASE_URL;

//     const roomsData = await axios.get(`${baseUrl}/rooms`).then((res) => res.data);

//     const reservationsData = await axios.get(`${baseUrl}/reservations`).then((res) => res.data);

//     const buildingsData = await axios.get(`${baseUrl}/buildings`).then((res) => res.data);

//     return {
//         props: {
//             rooms: roomsData,
//             reservations: reservationsData,
//             buildings: buildingsData
//         },
//     }
// }
