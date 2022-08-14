import React from "react";

import { useSelector } from "react-redux";

const Summary = () => {
    const seats = useSelector((state) => state.seats.value);

    return (
        <div className="absolute w-80 h-auto min-h-96 drop-shadow-md top-0 -right-96">
            <h2 className="bg-primary rounded-md text-xl text-white text-center w-full py-3 capitalize">
                Booking Summary
            </h2>
            <div className="grid grid-cols-3 p-4 bg-white">
                <div>
                    <p className="ml-3 my-2 uppercase font-bold">Movie</p>
                    <p className="ml-3 my-2 uppercase font-bold">Theater</p>
                    <p className="ml-3 my-2 uppercase font-bold">Date</p>
                    <p className="ml-3 my-2 uppercase font-bold">Time</p>
                    <p className="ml-3 my-2 uppercase font-bold">Cinema</p>
                    <p className="ml-3 my-2 uppercase font-bold">Seat</p>
                </div>

                <div className="col-span-2">
                    <p className="my-2">Avengers: Kang Dynasty</p>
                    <p className="my-2">CGV Lanmark 81</p>
                    <p className="my-2">15 May 2025</p>
                    <p className="my-2">19:40</p>
                    <p className="my-2">IMAX</p>
                    <p className="my-2 font-bold">
                        {seats.length ? seats.join(",") : "Empty"}
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-2 bg-white rounded-b-md border-t-2 border-gray-700 p-4 border-dashed">
                <div>
                    <p className="mb-2">Total Seat(s): </p>
                    <p className="pt-1">Payment: </p>
                </div>

                <div className="">
                    <p className="mb-2 font-bold">{seats.length}</p>
                    <p className="font-bold text-xl text-red-700">
                        {(seats.length * 150000).toLocaleString("en-US")}{" "}
                        &#8363;
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Summary;
