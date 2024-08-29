import { PatientsState } from '../slices/patientsSlice';
import { useState } from 'react';
import AppointmentButton from './appointmentButton';
import { createAppointment } from '../slices/appointmentsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Appointment, PatientSearch } from '../store/types';

import DeleteAppointmentModal from './deleteAppointmentModal';
import { RootState } from '../store/store.ts';
import { isSameDay } from 'date-fns';
type PatientDropdownProps = {
  date: Date;
  patients: PatientsState;
  openModal: (ar0: boolean) => void;
};
export default function PatientDropdown({
  date,
  patients,
  openModal,
}: PatientDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<PatientSearch>({
    name: patients.patients[0].name,
    mrn: patients.patients[0].mrn,
  });
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const appointmentData = useSelector((state: RootState) => state.appointments);

  const appointmentsForCurrentDate = appointmentData.appointments.filter(
    (appointment: Appointment) => isSameDay(appointment.appointmentDate, date)
  );
  const [patientDetailPopup, setPatientDetailPopup] = useState<boolean>(false);
  console.log(patients.patients);
  console.log({ appointmsCurrentDay: appointmentsForCurrentDate });

  const dispatch = useDispatch();
  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleReservation(time: string) {
    console.log('insidie handle reservation');
    let x = appointmentsForCurrentDate.some((appointment: Appointment) => {
      console.log(appointment.appointmentTime);
      console.log(time);
      return appointment.appointmentTime.trim() === time;
    });
    console.log(x);
    return x;
  }

  const filteredPatients = patients.patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  function onPatientSelect(
    event: React.MouseEvent<HTMLButtonElement>,
    mrnData: string
  ) {
    setIsOpen(!isOpen);
    const patientName = event.currentTarget.textContent || '';
    setSelectedPatient({ name: patientName, mrn: mrnData });
  }

  function handleAppointment(
    event: React.MouseEvent<HTMLButtonElement>,
    time: string
  ) {
    if (handleReservation(time)) {
      const selectedAppointment = appointmentsForCurrentDate.filter(
        (appointment) => appointment.appointmentTime.trim() === time
      )[0];
      console.log('selected appointment', selectedAppointment);
      setSelectedAppointment(selectedAppointment);
      setPatientDetailPopup(true);
    } else {
      if (selectedPatient) {
        const appointment: Appointment = {
          mrn: selectedPatient.mrn,
          patientName: selectedPatient.name,
          doctorName: 'Sam',
          appointmentDate: date.toISOString(),
          appointmentTime: event.currentTarget.textContent || '',
        };
        dispatch(createAppointment(appointment));
        openModal(false);
      }
    }
  }

  return (
    <>
      <div className="flex justify-around items-center">
        <div>
          <button
            id="dropdownSearchButton"
            data-dropdown-toggle="dropdownSearch"
            data-dropdown-placement="bottom"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-2"
            type="button"
            onClick={toggleDropdown}
          >
            Dropdown search{' '}
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          <input
            type="text"
            className={`${
              !isOpen ? 'block' : 'hidden'
            } w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            placeholder="Search user"
            value={selectedPatient.name}
            onChange={handleSearch}
          />
          <div
            id="dropdownSearch"
            className={`z-10 ${
              isOpen ? 'block' : 'hidden'
            } bg-white rounded-lg shadow w-60 dark:bg-gray-700`}
          >
            <div className="p-3">
              <label htmlFor="input-group-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="input-group-search"
                  className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search user"
                  onChange={handleSearch}
                />
              </div>
            </div>
            <ul
              className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownSearchButton"
            >
              {patients.patients.map((patient, index) => (
                <li key={index}>
                  <div className="flex items-center ps-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <button
                      className="text-white py-2 px-3 w-full"
                      onClick={(event) => onPatientSelect(event, patient.mrn)}
                    >
                      {patient.name}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <AppointmentButton
            className={`${
              handleReservation('9 AM to 11 AM') ? 'bg-red-300' : 'bg-green-500'
            }`}
            onClick={(e) => handleAppointment(e, '9 AM to 11 AM')}
          >
            {' '}
            9 AM to 11 AM
          </AppointmentButton>

          <AppointmentButton
            className={`${
              handleReservation('12 PM to 2 PM') ? 'bg-red-300' : 'bg-green-500'
            }`}
            onClick={(e) => handleAppointment(e, '12 PM to 2 PM')}
          >
            {' '}
            12 PM to 2 PM
          </AppointmentButton>
          <AppointmentButton
            className={`${
              handleReservation('3 PM to 5 PM') ? 'bg-red-300' : 'bg-green-500'
            }`}
            onClick={(e) => handleAppointment(e, '3 PM to 5 PM')}
          >
            {' '}
            3 PM to 5 PM
          </AppointmentButton>
        </div>
      </div>
      {patientDetailPopup && (
        <DeleteAppointmentModal
          onClose={() => setPatientDetailPopup(!patientDetailPopup)}
          selectedAppointment={selectedAppointment}
        ></DeleteAppointmentModal>
      )}
    </>
  );
}
