// import logo from "./logo.svg";
import "./App.css";
import MainPage from "./components/MainPage";

function App() {
   return (
      <div className="App bg-[url('./assets/background.jpg')] bg-center bg-no-repeat bg-contain w-full h-screen flex flex-col justify-center items-center position-relative">
         <MainPage />
      </div>
   );
}

export default App;
