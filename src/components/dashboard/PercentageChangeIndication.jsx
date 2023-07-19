import React, { useEffect, useState } from "react";
import Image from "next/image";
import Arrow_increase from "~/assets/icons/Arrow_increase.svg";
import Arrow_decrease from "~/assets/icons/Arrow_decrease.svg";

const PercentageChangeIndication = ({ change }) => {
  const [displayChange, setDisplayChange] = useState(0);

  useEffect(() => {
    const incrementChange = setInterval(() => {
      setDisplayChange((prevChange) => {
        if (prevChange < change) {
          return prevChange + 1;
        } else {
          clearInterval(incrementChange);
          return change;
        }
      });
    }, 10);

    return () => clearInterval(incrementChange);
  }, [change]);

  const changeType = change > 0 ? "increase" : "decrease";

  return (
    <div
      className={`
      ${
        changeType === "increase"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }
      inline-flex items-baseline rounded-full px-2.5 py-0.5 text-xs
      `}
    >
      {changeType === "increase" ? (
        <Image
          src={Arrow_increase}
          alt="increase"
          className="-ml-1 mr-0.5 h-3 w-3 flex-shrink-0 self-center text-green-500 rotate-90 transform"
          aria-hidden="true"
        />
      ) : (
        <Image
          src={Arrow_decrease}
          alt="decrease"
          className="
            -ml-1 mr-0.5 h-3 w-3 flex-shrink-0 self-center text-red-500 rotate-[270deg] transform"
          aria-hidden="true"
        />
      )}

      <span className="sr-only">
        {" "}
        {changeType === "increase" ? "Increased" : "Decreased"} by{" "}
      </span>

      {Math.abs(displayChange) + "%"}
    </div>
  );
};

export default PercentageChangeIndication;