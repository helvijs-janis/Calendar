/* eslint-disable no-console */
export default function RoomsReducer(rooms, action) {
  switch (action.type) {
    case 'filterByBuilding': {
      console.log(rooms);
      const { id } = action;
      const selectedRooms = rooms.filter((i) => i.buildingId === id);
      console.log(selectedRooms);
      return selectedRooms;
    }
    default:
      throw new Error(`Unhandled action ${action.type}`);
  }
}
