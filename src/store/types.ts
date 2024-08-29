export type Appointment = {
  mrn: string;
  patientName: string;
  doctorName: string;
  appointmentDate: string;
  appointmentTime: string;
};

export interface DeletePayload {
  appointmentDate: string | null;
  appointmentTime: string | null;
}

export interface PatientSearch {
  name: string;
  mrn: string;
}
