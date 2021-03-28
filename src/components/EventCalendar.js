import FullCalendar from '@fullcalendar/react'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useState } from "react"
import CalendarSidebar from '../components/CalendarSidebar'

export default () => {
  const [rooms, setRooms] = useState(null);
  const [reservations, setReservations] = useState(null);
  const [isPending, setIsPending] = useState(true);

  useEffect(() => {
    fetch('https://tone.id.lv/api/rooms')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setRooms(data);
        setIsPending(false)
      })
      .catch(error => {
        console.log(error.message);
      })
  }, []);

  useEffect(() => {
    fetch('https://tone.id.lv/api/reservations')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setReservations(data);
        setIsPending(false)
      })
  }, []);

  return (
    <div className='demo-app-main'>
      <FullCalendar
        schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
        initialView='resourceTimeline'
        plugins={[resourceTimelinePlugin]}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
        }}
        now='2021-02-01'
        resourceAreaHeaderContent='Telpas'
        resourceAreaWidth='5%'
        weekends={true}
        firstDay={1}
        slotMinTime='08:00:00'
        slotMaxTime='22:00:00'
        resources={rooms}
        events={reservations}
        navLinks={true}
      />
    </div>
  )
}