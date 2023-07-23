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

  const boxColor = (theme && "text-black") ?? "";
  const timeBoxClasses = (theme && "text-black") ?? "bg-opacity-20";
  const hasBoxShadow = (theme && "shadow-3xl") ?? "";
  const borderColor =
    theme === "primary" ? "border-b-arc" : "border-b-primary-light";

  return (
    <li
      className={`flex gap-4 py-[20px] ${
        isLast ? "" : `border-b-[1.5px] ${borderColor}`
      }`}
    >
      <div className="basis-[94px] font-bold">{title}</div>

      <p className="flex flex-1 items-start gap-4 lg:justify-center">
        <span
          className={`rounded bg-[#DADAF4] p-[6px] underline ${boxColor} ${hasBoxShadow}`}
        >
          {date}
        </span>

        <span
          className={`rounded bg-[#dadaf4]   p-[6px] underline ${timeBoxClasses} ${hasBoxShadow} shadow-2xl`}
        >
          {time}
        </span>
      </p>
    </li>
  );
};

export default ListItemWithDatetime;
