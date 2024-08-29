import { Appointment, DeletePayload } from './types';

import { configureStore } from '@reduxjs/toolkit';
import patientsReducer from '../slices/patientsSlice';
import appointmentsSlice from '../slices/appointmentsSlice';

export const store = configureStore({
  reducer: {
    patients: patientsReducer,
    // Add other slices here as needed
    appointments: appointmentsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
