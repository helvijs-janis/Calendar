/* eslint-disable no-console */
export default function ReservationsReducer(reservations, action) {
  switch (action.type) {
    case 'filterByBuilding': {
      console.log(reservations);
      const { id } = action;
      const selectedReservations = reservations.filter((i) => i.resourceId === id);
      console.log(selectedReservations);
      return selectedReservations;
    }
    default:
      throw new Error(`Unhandled action ${action.type}`);
  }
}
