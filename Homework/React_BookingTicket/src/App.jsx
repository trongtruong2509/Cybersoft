import "./App.css";
import SeatLayout from "./components/SeatLayout";
import Info from "./components/Info";
import Summary from "./components/Summary";

function App() {
    return (
        <div className="flex flex-col justify-center items-center bg-gray-300 bg-opacity-50 w-full h-screen">
            <header className="text-3xl pb-8 uppercase font-bold text-primary tracking-wide">
                Movie Seat Selection
            </header>

            <div className="flex flex-col w-[700px] rounded-md p-4 border bg-white border-solid justify-center items-center relative">
                <Info />
                <SeatLayout />
                <Summary />
            </div>
        </div>
    );
}

export default App;
