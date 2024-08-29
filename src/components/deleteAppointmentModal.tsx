import deleteAppointmentModal from './deleteAppointmentModal';
import { Appointment } from '../store/types';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
import { useDispatch } from 'react-redux';
import { deleteAppointment } from '../slices/appointmentsSlice.ts';
type deleteAppointmentModalType = {
  onClose: (arg0: boolean) => void;
  selectedAppointment: Appointment | null;
};

export default function DeleteAppointmentModal({
  onClose,
  selectedAppointment,
}: deleteAppointmentModalType) {
  if (!selectedAppointment) return;
  const dispatch = useDispatch();
  const patients = useSelector((state: RootState) => state.patients);
  console.log('patients, delete', patients.patients);
  console.log('selectedAppointment', selectedAppointment?.mrn);
  const selectedPatient = patients.patients.filter((patient) => {
    if (selectedAppointment) {
      console.log(patient.mrn);
      console.log(selectedAppointment.mrn);
      return patient.mrn === selectedAppointment.mrn;
    }
  })[0];
  console.log({ selectedPatient: selectedPatient });
  return (
    <div
      id="popup-modal"
      tabIndex={-2}
      className="fixed overflow-y-auto overflow-x-hidden flex top-0 right-0 left-0 z-57 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
    >
      <div className=" p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow ">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="popup-modal"
            onClick={() => onClose(false)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="flex flex-col items-center pb-10 p-2">
            <img
              className="w-24 h-24 mb-3 rounded-full shadow-lg"
              src={selectedPatient.photo}
              alt={selectedPatient.name}
            />
            <h5 className="mb-1 text-xl font-medium text-gray-900">
              {selectedPatient.name}
            </h5>
            <div className="grid grid-cols-2 gap-1">
              <div>{`mrn : ${selectedPatient.mrn}`}</div>
              <div>{`DOB : ${selectedPatient.DOB}`}</div>
              <div>{`Insurance : ${selectedPatient.insurance.name}`}</div>
              <button
                className="bg-red-500 rounded py-2 px-3 text-white"
                onClick={() => {
                  onClose(false);
                  dispatch(
                    deleteAppointment({
                      appointmentDate: selectedAppointment?.appointmentDate,
                      appointmentTime: selectedAppointment?.appointmentTime,
                    })
                  );
                }}
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
