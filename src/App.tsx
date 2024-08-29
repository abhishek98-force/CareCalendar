import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SchedulingCalendar from './components/schedulingCalendar';
import UpcomingAppointments from './components/upcomingAppointments';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SchedulingCalendar />} />
          <Route
            path="/upcoming-appointments"
            element={<UpcomingAppointments />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
