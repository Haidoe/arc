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
  isLast?: boolean;
};

const ListItemWithDatetime = ({ title, datetime, isLast }: ListItemProps) => {
  const date = dayjs(datetime).tz("America/Vancouver").format("ll");
  const time = dayjs(datetime).tz("America/Vancouver").format("LT");

  return (
    <li
      className={`flex gap-4 py-[20px]  ${
        isLast ? "" : "border-b-[1.5px] border-primary-light"
      }`}
    >
      <div className="basis-[94px] font-bold">{title}</div>

      <p className="flex flex-1 items-start justify-center gap-4">
        <span className="rounded bg-[#DADAF4] p-[6px] underline">{date}</span>
        <span className="rounded bg-[#dadaf4]  bg-opacity-20 p-[6px] underline">
          {time}
        </span>
      </p>
    </li>
  );
};

export default ListItemWithDatetime;
