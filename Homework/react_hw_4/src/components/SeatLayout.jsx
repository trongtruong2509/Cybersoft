import React from "react";
import Seat from "./Seat";
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../store/seatSlice";

const SeatLayout = () => {
    const seats = useSelector((state) => state.seats.value);
    console.log(seats);
    const dispatch = useDispatch();

    const handleSeatClick = (seatName) => {
        console.log(`Clicked seat ${seatName}`);

        if (seats.includes(seatName)) {
            dispatch(remove(seatName));
        } else {
            dispatch(add(seatName));
        }
    };

    const headerRows = [1, 2, 3, 4, 5, 6];
    const headerCols = [1, 2, 3, 4, 5];
    const firstBlock = [];
    const secondBlock = [];
    const thirdBlock = [];
    const fourthBlock = [];

    headerCols.forEach((col) => {
        headerRows.forEach((row) => {
            firstBlock.push(`${String.fromCharCode(col + 64)}${row}`);
            secondBlock.push(`${String.fromCharCode(col + 64)}${row + 6}`);
            thirdBlock.push(`${String.fromCharCode(col + 69)}${row}`);
            fourthBlock.push(`${String.fromCharCode(col + 69)}${row + 6}`);
        });
    });

    return (
        <div>
            <div className="grid grid-flow-row grid-cols-2 gap-8 p-3 m-3 relative">
                <div className="absolute top-[-4px] left-2">
                    {headerRows.map((row) => (
                        <p className="w-6 h-6 inline-block mx-1 text-center text-primary">
                            {row}
                        </p>
                    ))}
                </div>

                <div className="absolute top-[-4px] right-2">
                    {headerRows.map((row) => (
                        <p className="w-6 h-6 inline-block mx-1 text-center text-primary">
                            {row + 6}
                        </p>
                    ))}
                </div>

                <div className="absolute top-5 left-[-16px]">
                    {headerCols.map((row) => (
                        <p className="w-6 h-6 block my-2 flex items-center justify-center">
                            {String.fromCharCode(row + 64)}
                        </p>
                    ))}
                </div>

                <div className="absolute bottom-[4px] left-[-16px]">
                    {headerCols.map((row) => (
                        <p className="w-6 h-6 my-2 flex items-center justify-center">
                            {String.fromCharCode(row + 69)}
                        </p>
                    ))}
                </div>

                <div className="grid grid-flow-row grid-cols-6 gap-2 pt-4">
                    {firstBlock.map((seat) => (
                        <Seat
                            onClick={() => handleSeatClick(seat)}
                            booked={seats.includes(seat)}
                        />
                    ))}
                </div>

                <div className="grid grid-flow-row grid-cols-6 gap-2 pt-4">
                    {secondBlock.map((seat) => (
                        <Seat
                            onClick={() => handleSeatClick(seat)}
                            booked={seats.includes(seat)}
                        />
                    ))}
                </div>

                <div className=" grid grid-flow-row grid-cols-6 gap-2">
                    {thirdBlock.map((seat) => (
                        <Seat
                            onClick={() => handleSeatClick(seat)}
                            booked={seats.includes(seat)}
                        />
                    ))}
                </div>

                <div className=" grid grid-flow-row grid-cols-6 gap-2">
                    {fourthBlock.map((seat) => (
                        <Seat
                            onClick={() => handleSeatClick(seat)}
                            booked={seats.includes(seat)}
                        />
                    ))}
                </div>
            </div>

            <div className="w-full h-14 bg-amber-400 mt-12 flex justify-center items-center text-2xl text-white font-bold">
                SCREEN
            </div>
        </div>
    );
};

export default SeatLayout;
