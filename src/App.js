import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import ExerciseList from './components/ExerciseList.js';
import EditExercises from './components/EditExercises.js';
import CreateExercises from "./components/CreateExercises.js";
import CreateUsers from "./components/CreateUser.js";

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<ExerciseList />} />
          <Route path='/edit/:id' exact element={<EditExercises />} />
          <Route path='/create' exact element={<CreateExercises />} />
          <Route path='/user' exact element={<CreateUsers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
