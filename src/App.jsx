import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QuizProvider } from "./context/QuizContext";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Feedback from "./components/Feedback";

function App() {
  return (
    <QuizProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Feedback />} />
        </Routes>
      </Router>
    </QuizProvider>
  );
}

export default App;
