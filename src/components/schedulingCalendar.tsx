import { useState, useEffect } from 'react';
import Calendar from './calendar.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setPatients } from '../slices/patientsSlice.ts';

export default function SchedulingCalendar() {
  
  const dispatch = useDispatch();
  useEffect(() => {
    fetch('/patients.json')
      .then((response) => response.json())
      .then((data) => {
        dispatch(setPatients(data));
      })
      .catch((error) => console.error('Error loading patient data:', error));
  }, []);
  const [date, setDate] = useState(new Date());
  const navigate = useNavigate();
  function handleNavigationToAppointments() {
    navigate('/upcoming-appointments');
  }
  return (
    <div className="mt-32 flex flex-col items-center gap-8">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white rounded py-2 px-6"
        onClick={() => setDate(new Date())}
      >
        Reset
      </button>

      <Calendar date={date} setDate={setDate} />

      <button
        className="bg-red-500 hover:bg-red-700 text-white rounded py-2 px-6"
        onClick={() => handleNavigationToAppointments()}
      >
        view upcoming appointments
      </button>
    </div>
  );
}
