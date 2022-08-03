import React from "react";
import Seat from "./Seat";

const Info = () => {
    return (
        <div className="p-4 flex justify-start text-start">
            <Seat onClick={() => {}} booked={true} disable />
            <p className="ml-2 mr-5">Reserved</p>
            <Seat onClick={() => {}} booked={true} />
            <p className="ml-2 mr-5">Checked</p>
            <Seat onClick={() => {}} booked={false} />
            <p className="ml-2">Available</p>
        </div>
    );
};

export default Info;
