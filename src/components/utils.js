import { format, add } from 'date-fns';

let buildings;
try {
  buildings = JSON.parse(localStorage.getItem('buildings')) ?? [];
} catch {
  buildings = [];
}

export function formatDate(info) {
  const dateHelper = add(info.date, {
    hours: 1,
    minutes: 30,
  });

  const endTime = format(dateHelper, 'H:mm');
  const startTime = format(info.date, 'cccc, MMMM do H:mm - ');
  const result = startTime + endTime;

  return result;
}

export function formatToDbDateString(info) {
  const result = format(info.date, "yyyy-MM-dd'T'HH:mm");
  return result;
}

export function formatDateAddingHourAndHalf(info) {
  const dateHelper = add(info.date, {
    hours: 1,
    minutes: 30,
  });
  const result = format(dateHelper, "yyyy-MM-dd'T'HH:mm");
  return result;
}

export function formatRoomInfo(info) {
  const room = info.resource.title;
  const id = info.resource.extendedProps.buildingId;
  const building = buildings[id].title;
  const result = `${room} - ${building}`;

  return result;
}
