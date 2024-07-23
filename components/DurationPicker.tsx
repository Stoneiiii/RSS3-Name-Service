import { Input, Typography } from "@ensdomains/thorin";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

// export const MyInput = styled.div`

// `

const DurationPicker = () => {
  const [days, setDays] = useState(365); // 初始值为1年（365天）
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const decrementDays = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDays((prevDays) => Math.max(prevDays - 365, 365)); // 确保天数不会低于1天
  };

  const incrementDays = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setDays((prevDays) => prevDays + 365);
  };

  const convertToYearsAndDays = (totalDays: number) => {
    const years = Math.floor(totalDays / 365);
    const daysAfterYears = totalDays % 365;
    const months = Math.floor(daysAfterYears / 31);
    const remainingDays = daysAfterYears % 31;
    let durationStr = "";
    if(years > 0) {
      durationStr = years + " year";
    }
    if(years > 1) {
      durationStr = durationStr + "s";
    }
    if(months > 0) {
      durationStr = durationStr + " " + months + " month";
    }
    if(months > 1) {
      durationStr = durationStr + "s";
    }
    if(remainingDays > 0) {
      durationStr = durationStr + " " + remainingDays + " day";
    }
    if(remainingDays > 1) {
      durationStr = durationStr + "s";
    }
    
    return { years, months, remainingDays , durationStr};
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    if (/^\d*$/.test(value) && inputRef.current) {
      inputRef.current.value = value;
    }
  };

  const { years, months, remainingDays, durationStr} = convertToYearsAndDays(days);

  const handleDivClick = () => {
    setIsEditing(true);
  };

  const handleInputBlur = () => {
    if (inputRef.current) {
      const inputYears = parseInt(inputRef.current.value, 10);
      if (!isNaN(inputYears) && inputYears > 0) {
        setDays(inputYears * 365);
      }
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div>
      <div className="flex items-center justify-between border my-2 rounded-full p-4 mx-auto">
        <button
          onClick={decrementDays}
          className={`${
            days === 365
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 cursor-pointer"
          } text-white text-5xl rounded-full px-6 pb-3 h-14 w-14 flex items-center justify-center focus:outline-none`}
          disabled={days === 365}
        >
          -
        </button>
        {isEditing ? (
          <input
            ref={inputRef}
            className="text-blue-500 text-4xl bg-transparent border-none outline-none rounded-full w-full text-center mx-6"
            defaultValue={years}
            onBlur={handleInputBlur}
            onInput={handleInputChange}
          />
        ) : (
          <div
            className="text-blue-500 text-4xl hover:bg-gray-100 p-2 rounded-full cursor-pointer w-full text-center mx-6"
            onClick={handleDivClick}
          >
            {durationStr}
          </div>
        )}
        <button
          onClick={incrementDays}
          className="bg-blue-500 text-white text-4xl rounded-full px-6 pb-2 h-14 w-14 flex items-center justify-center focus:outline-none cursor-pointer"
        >
          +
        </button>
        <div></div>
      </div>
      <Typography
        className="flex items-center justify-center"
        fontVariant="small"
        style={{
          fontSize: "18px",
          color: "gray"
        }}
      >
        {durationStr} registration.
      </Typography>
    </div>
  );
};

export default DurationPicker;
