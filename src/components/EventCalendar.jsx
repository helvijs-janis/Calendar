/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import FullCalendar from '@fullcalendar/react';
import resourceTimeline from '@fullcalendar/resource-timeline';
import React from 'react';
import { useFilterRooms } from './RoomContext';

export default function Calendar(props) {
  const { filteredRooms } = useFilterRooms();

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
        now="2021-02-02"
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
        resourceAreaWidth="17%"
        events={props.reservations}
        slotLabelFormat={{
          hour: '2-digit',
          minute: '2-digit',
          meridiem: false,
          hour12: false,
        }}
        // filterResourcesWithEvents
        navLinks
      />
    </div>
  );
}
