import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Appointment, DeletePayload } from '../store/types.ts';
import { isEqual } from 'date-fns';
interface AppointmentState {
  appointments: Appointment[];
}

const initialState: AppointmentState = {
  appointments: [],
};

const appointmentsSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    createAppointment: (
      state: AppointmentState,
      action: PayloadAction<Appointment>
    ) => {
      state.appointments.push(action.payload);
    },
    deleteAppointment: (
      state: AppointmentState,
      action: PayloadAction<DeletePayload>
    ) => {
      state.appointments = state.appointments.filter(
        (appointment) =>
          !(
            appointment.appointmentDate === action.payload.appointmentDate &&
            appointment.appointmentTime === action.payload.appointmentTime
          )
      );
    },
  },
});

export const { createAppointment, deleteAppointment } =
  appointmentsSlice.actions;
export default appointmentsSlice.reducer;
