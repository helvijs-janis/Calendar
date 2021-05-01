import React from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimeline from '@fullcalendar/resource-timeline';
import { useFilterRooms } from './RoomContext';
import { useReservationContext } from './ReservationContext';

export default function Calendar() {
  const { filteredRooms } = useFilterRooms();
  const { filteredReservations } = useReservationContext();

  return (
    <div className="demo-app-main">
      <FullCalendar
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        initialView="resourceTimeline"
        plugins={[resourceTimeline]}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth',
        }}
        now="2021-02-02T08:30:00"
        weekends
        firstDay={1}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        resourceAreaColumns={[
          {
            field: 'title',
            headerContent: 'Title',
          },
          {
            field: 'occupancy',
            headerContent: 'Occupancy',
          },
        ]}
        resources={filteredRooms}
        events={filteredReservations}
        resourceAreaWidth="17%"
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
          hour12: false,
        }}
        navLinks
      />
    </div>
  );
}
