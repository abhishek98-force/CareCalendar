export const ADD_APPOINTMENT = 'ADD_APPOINTMENT';
export const GET_APPOINTMENT = 'GET_APPOINTMENT';
export const DELETE_APPOINTMENT = 'DELETE_APPOINTMENT';

export type ActionTypes =
  | { type: typeof ADD_APPOINTMENT }
  | {
      type: typeof GET_APPOINTMENT;
      payload: {
        date: Date;
        time: string;
      };
    }
  | {
      type: typeof DELETE_APPOINTMENT;
      payload: {
        date: Date;
        time: string;
      };
    };

export const addAppointment = (): ActionTypes => ({ type: ADD_APPOINTMENT });
export const getAppointment = (date: Date, time: string): ActionTypes => ({
  type: GET_APPOINTMENT,
  payload: {
    date,
    time,
  },
});
export const deleteAppointment = (date: Date, time: string): ActionTypes => ({
  type: DELETE_APPOINTMENT,
  payload: {
    date,
    time,
  },
});
