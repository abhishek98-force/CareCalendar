import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { Appointment } from '../store/types.ts';
import { formatDate } from 'date-fns';

import { format, parseISO } from 'date-fns';

export default function UpcomingAppointments() {
  const appointmentData = useSelector((state: RootState) => state.appointments);
  const appointments: Appointment[] = appointmentData.appointments;
  const patientDataStore = useSelector((state: RootState) => state.patients);
  const patientData = patientDataStore.patients;
  const findPatientByMRN = (mrn: string) => {
    return patientData.find((patient) => patient.mrn === mrn);
  };

  const groupAppointmentsByDate = (appointments: Appointment[]) => {
    return appointments.reduce(
      (grouped: { [key: string]: Appointment[] }, appointment) => {
        const { appointmentDate } = appointment;
        const formattedDate = format(parseISO(appointmentDate), 'dd-MM-yyyy');
        if (!grouped[formattedDate]) {
          grouped[formattedDate] = [];
        }
        grouped[formattedDate].push(appointment);
        return grouped;
      },
      {}
    );
  };

  const groupedAppointments = groupAppointmentsByDate(appointments);
  return (
    <div className="p-10">
      {groupedAppointments && Object.keys(groupedAppointments).length > 0 ? (
        <>
          <h1 className="text-blue-700 text-4xl font-bold mb-2">
            Upcoming Appointments
          </h1>
          {Object.entries(groupedAppointments).map(([date, appointments]) => (
            <div className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
              <time className="text-lg font-semibold text-gray-900 dark:text-white">
                {date}
              </time>
              <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                {appointments.map((appointment: Appointment) => {
                  const patient = findPatientByMRN(appointment.mrn);
                  if (patient)
                    return (
                      <li>
                        <a
                          href="#"
                          className="items-center block p-3 sm:flex hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <img
                            className="w-12 h-12 mb-3 me-3 rounded-full sm:mb-0"
                            src={patient.photo}
                            alt="Jese Leos image"
                          />
                          <div className="text-gray-600 dark:text-gray-400">
                            <div className="text-base font-normal">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {patient?.name}
                                {' | '}
                                {`Time Slot : ${appointment.appointmentTime} | Policy Name : ${patient.insurance.name} - ${patient.insurance.id}`}
                              </span>{' '}
                              {/* Rest of your JSX */}
                            </div>
                            {/* Rest of your JSX */}
                          </div>
                        </a>
                      </li>
                    );
                })}
              </ol>
            </div>
          ))}
        </>
      ) : (
        <h1 className="text-blue-700 text-4xl font-bold mb-2">
          You dont have any upcoming appointments
        </h1>
      )}
    </div>
  );
}
