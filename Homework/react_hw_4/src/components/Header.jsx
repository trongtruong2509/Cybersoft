import React from "react";

const Header = () => {
    return (
        <div>
            <h2>Fill The Required Details Below And Select Your Seats</h2>

            <div className="flex gap-3 justify-between">
                <div class="mb-3">
                    <label
                        for="userName"
                        class="form-label inline-block mb-2 text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        placeholder="Please fill your name"
                        class="
                            form-control
                            block
                            w-full
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="userName"
                    />
                </div>
                <div class="mb-3">
                    <label
                        for="seatNumber"
                        class="form-label inline-block mb-2 text-gray-700"
                    >
                        Seat Number
                    </label>
                    <input
                        type="number"
                        class="
                            form-control
                            block
                            w-20
                            px-3
                            py-1.5
                            text-base
                            font-normal
                            text-gray-700
                            bg-white bg-clip-padding
                            border border-solid border-gray-300
                            rounded
                            transition
                            ease-in-out
                            m-0
                            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        id="seatNumber"
                        value={10}
                        placeholder="Number input"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
