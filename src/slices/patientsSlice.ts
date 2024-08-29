import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Patient {
  mrn: string;
  name: string;
  DOB: string;
  insurance: Insurance;
  photo: string;
}

interface Insurance {
  id: string;
  name: string;
  group: string;
}

export interface PatientsState {
  patients: Patient[];
}

const initialState: PatientsState = {
  patients: [],
};

const patientsSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    setPatients(state, action: PayloadAction<Patient[]>) {
      state.patients = action.payload;
    },
  },
});
export const { setPatients } = patientsSlice.actions;
export default patientsSlice.reducer;
