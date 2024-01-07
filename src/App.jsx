import Forms from "./components/Forms";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateNewForm from "./components/CreateNewForm";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Forms />} />
          <Route path="/create-new-form" element={<CreateNewForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
