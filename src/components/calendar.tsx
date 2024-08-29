import Cell from './cell';
import BookAppointment from './bookAppointment';
import { useState } from 'react';
import { isSameDay } from 'date-fns';
import {
  startOfMonth,
  endOfMonth,
  differenceInDays,
  isToday,
  sub,
  add,
  format,
  isBefore,
  startOfDay,
} from 'date-fns';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store.ts';
type CalendarProps = {
  date?: Date;
  setDate: (date: Date) => void;
};

export default function Calendar({
  date = new Date(),
  setDate,
}: CalendarProps) {
  const [modal, setModal] = useState(false);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const startDate = startOfMonth(date);
  const endDate = endOfMonth(date);
  const dateDiff = differenceInDays(endDate, startDate) + 1;
  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDay();

  const prevMonth = () => setDate(sub(date, { months: 1 }));
  const nextMonth = () => setDate(add(date, { months: 1 }));

  const appointmentData = useSelector((state: RootState) => state.appointments);
  const appointments = appointmentData.appointments;

  function handleDateSelection(index: number) {
    const newDate = new Date(date);
    newDate.setDate(index);
    setModal(true);
    setDate(newDate);
  }

  return (
    <div className="w-[500px] border">
      <div className="grid grid-cols-7">
        <Cell className="col-span-2" onClick={() => prevMonth()}>
          {'<'}
        </Cell>
        <Cell className="col-span-3">{format(date, 'LLLL yyyy')}</Cell>
        <Cell className="col-span-2" onClick={() => nextMonth()}>
          {'>'}
        </Cell>
        {days.map((day) => {
          return <Cell key={day}>{day}</Cell>;
        })}
        {Array.from({ length: prefixDays }, (_, index) => index).map(
          (index) => (
            <Cell></Cell>
          )
        )}
        {Array.from({ length: dateDiff }, (_, index) => index + 1).map(
          (index) => {
            const currentDate = new Date(
              startDate.getFullYear(),
              startDate.getMonth(),
              index
            );
            const isDatePast = isBefore(currentDate, startOfDay(new Date()));
            const isCurrentDate = isToday(currentDate);
            const currentDayStyle = isCurrentDate ? 'bg-yellow-500' : '';
            const anyBookingToday = appointments.some((appointment) =>
              isSameDay(new Date(appointment.appointmentDate), currentDate)
            );
            const pastDayStyle = isDatePast
              ? 'bg-gray-600'
              : 'cursor-pointer hover:bg-gray-100';

            return (
              <Cell
                key={index}
                className={`${
                  anyBookingToday ? 'bg-blue-300' : ''
                } ${currentDayStyle} ${pastDayStyle}`}
                onClick={() => {
                  if (!isDatePast) {
                    handleDateSelection(index);
                  }
                }}
              >
                {index}
              </Cell>
            );
          }
        )}
        {Array.from({ length: suffixDays }, (_, index) => index).map(
          (index) => (
            <Cell></Cell>
          )
        )}
      </div>
      {modal && (
        <BookAppointment date={date} isModalOpen={modal} openModal={setModal} />
      )}
    </div>
  );
}
