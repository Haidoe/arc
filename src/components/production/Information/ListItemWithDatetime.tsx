import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(timezone);

type ListItemProps = {
  title: string;
  datetime: Date | null;
  theme?: "primary" | null;
  isLast?: boolean;
};

const ListItemWithDatetime = ({
  title,
  datetime,
  isLast,
  theme,
}: ListItemProps) => {
  const date = dayjs(datetime).tz("America/Vancouver").format("ll");
  const time = dayjs(datetime).tz("America/Vancouver").format("LT");

  const borderColor =
    theme === "primary" ? "border-b-[#8585DB]" : "border-b-primary-light";

  return (
    <li
      className={`flex gap-4 py-[20px] ${
        isLast ? "" : `border-b-[1.5px] ${borderColor}`
      }`}
    >
      <div className="basis-[94px] font-bold">{title}</div>

      <p className="flex flex-1 items-start gap-4 ">
        <span className={`rounded  p-[6px] `}>{date}</span>

        <span className={`rounded p-[6px] `}>{time}</span>
      </p>
    </li>
  );
};

export default ListItemWithDatetime;
