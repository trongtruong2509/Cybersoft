import logo from "./logo.svg";
import "./App.css";
import SeatLayout from "./components/SeatLayout";
import Header from "./components/Header";
import Info from "./components/Info";

function App() {
    return (
        <div className="flex flex-col justify-center items-center bg-slate-300 w-full h-screen">
            <header className="text-3xl">Movie Seat Selection</header>

            <div className="flex flex-col w-[700px] p-4 border border-solid boder-gray-900 justify-center items-center">
                <Info />
                {/* <Header /> */}
                <SeatLayout />
            </div>
        </div>
    );
}

export default App;
