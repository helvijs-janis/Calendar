import { format, add, parseISO } from "date-fns";

export const formatDate = (info) => {
  const dateHelper = add(info.date, {
    hours: 1,
    minutes: 30,
  });
  // console.log(`dateHelper`, dateHelper)

  const endTime = format(dateHelper, "H:mm");
  const startTime = format(info.date, "cccc, MMMM do H:mm - ");
  const result = startTime + endTime;

  return result;
};

export const formatToDbDateString = (info) => {
  const result = format(parseISO(info), "yyyy-MM-dd'T'HH:mm'+02:00'");
  return result;
};

export const formatDateAddingHourAndHalf = (info) => {
  const dateHelper = add(info.date, {
    hours: 1,
    minutes: 30,
  });
  const result = format(dateHelper, "yyyy-MM-dd'T'HH:mm'+02:00'");
  return result;
};

export const formatRoomInfo = (info, buildings) => {
  // console.log(`info`, info)
  const room = info.resource.title;
  const id = info.resource.extendedProps.buildingId;
  // console.log(`buildings`, buildings)
  const buildingTitle = buildings.find((item) => item.id === id).title;
  const result = `${room} - ${buildingTitle}`;

  return result;
};
