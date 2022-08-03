import React from "react";

const Seat = ({ onClick, booked, disable }) => {
    const classNames =
        "w-6 h-6 border border-solid border-amber-500 cursor-pointer hover:border-amber-600";
    const activate =
        "w-6 h-6 border border-solid border-amber-600 cursor-pointer hover:border-amber-600 bg-amber-600";
    const disableClass =
        "w-6 h-6 border border-solid border-gray-600 cursor-pointer bg-gray-600";

    return (
        <button
            onClick={onClick}
            className={disable ? disableClass : booked ? activate : classNames}
        >
            {/* {value} */}
        </button>
    );
};

export default Seat;
