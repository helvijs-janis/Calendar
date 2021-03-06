import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import resourceTimeline from "@fullcalendar/resource-timeline";
import { format } from "date-fns";
import interactionPlugin from "@fullcalendar/interaction";
import { useRoomsContext } from "./RoomContext";
import { useReservationContext } from "./ReservationContext";
import { fetchFaculties } from "../queries/RoomQueries";

export default function Calendar({ setOpen, setDateInfo }) {
  const { filteredRooms } = useRoomsContext();
  const { filteredReservations, setSelectedDate } = useReservationContext();
  const faculties = fetchFaculties();
  const calendarRef = React.useRef();

  const history = useHistory();
  const navigateToList = useCallback(() => history.push("/list"), [history]);

  const handleDateClick = (info) => {
    setOpen(true);
    console.log("info :>> ", info);
    setDateInfo(info);
  };

  return faculties.isLoading ? (
    "Loading..."
  ) : (
    <div className="demo-app-main">
      <FullCalendar
        ref={calendarRef}
        schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
        initialView="resourceTimeline"
        plugins={[resourceTimeline, interactionPlugin]}
        height="auto"
        headerToolbar={{
          left: "previous,next",
          center: "title",
          right:
            "list,resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth",
        }}
        customButtons={{
          previous: {
            icon: "chevron-left",
            click() {
              const calendarApi = calendarRef.current.getApi();
              calendarApi.prev();
              const date = format(calendarApi.getDate(), "yyyy-MM-dd");
              setSelectedDate(date);
            },
          },
          next: {
            icon: "chevron-right",
            click() {
              const calendarApi = calendarRef.current.getApi();
              calendarApi.next();
              const date = format(calendarApi.getDate(), "yyyy-MM-dd");
              setSelectedDate(date);
            },
          },
          list: {
            text: "list",
            click() {
              navigateToList();
            },
          },
        }}
        now="2021-02-02T08:30:00"
        weekends
        firstDay={1}
        slotMinTime="08:00:00"
        slotMaxTime="22:00:00"
        resourceAreaColumns={[
          {
            field: "title",
            headerContent: "Telpa",
          },
          {
            field: "occupancy",
            headerContent: "Vietu skaits",
          },
        ]}
        resources={filteredRooms}
        events={filteredReservations}
        resourceAreaWidth="17%"
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          meridiem: false,
          hour12: false,
        }}
        dateClick={(info) => handleDateClick(info)}
        navLinks
        eventDidMount={(event) => {
          const { facultyId } = event.event._def.extendedProps;
          const faculty = faculties.data.find((e) => e.id === facultyId);
          if (faculty !== undefined) {
            event.el.style.backgroundColor = faculty.color;
          }
        }}
        nowIndicator
      />
    </div>
  );
}
