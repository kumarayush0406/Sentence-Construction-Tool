import { useQuiz } from "../context/QuizContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavbarMain from "../components/Navbar/NavbarMain";
import React from "react";

const Home = () => {
  const navigate = useNavigate();
  const { fetchQuestions, isLoading, resetQuiz } = useQuiz();

  useEffect(() => {
    resetQuiz();
  }, []);

  const startQuiz = async () => {
    try {
      await fetchQuestions();
      navigate("/quiz");
    } catch (error) {}
  };

  return (
    <>
      <NavbarMain />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center ">
        <div className="bg-white px-2.5 rounded-lg shadow-lg  w-full max-w-xl">
          <div className="flex justify-center">
            <img src="./icons/Icons.png" alt="icon" />
          </div>
          <h1 className="text-4xl leading-12 font-semibold text-center mb-3.5">
            Sentence Construction
          </h1>
          <p className="text-grey-500 mb-10 text-xl leading-7 font-normal">
            Select the missing words in the correct order
          </p>
          <div className="flex justify-between mb-8 sm:flex-wrap">
            <div>
              <h2>Time Per Question</h2>
              <p className="text-grey-500">30 sec</p>
            </div>
            <div>
              <h2>Total Questions</h2>
              <p className="text-grey-500">10</p>
            </div>
            <div>
              <h2>Coins</h2>
              <div className="flex items-center justify-around">
                <img src="./icons/Ellipse 15.png" alt="icon" />

                <p className="text-grey-500">0</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4 w-72 m-auto">
            <button className="w-36 h-10 py-6 px-6 rounded-lg flex justify-center items-center text-blue-600 border border-blue-600 font-semibold">
              Back
            </button>
            <button
              onClick={startQuiz}
              disabled={isLoading}
              className={`w-36 h-10 py-6 px-6 rounded-lg flex justify-center items-center  text-white font-semibold transition-colors ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {isLoading ? "Loading Questions..." : "Start"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
