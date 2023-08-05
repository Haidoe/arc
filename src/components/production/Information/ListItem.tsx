type ListItemProps = {
  title: string;
  children: string | null;
  isLast?: boolean;
  theme?: "primary" | null;
};

const ListItem = ({ title, children, theme, isLast }: ListItemProps) => {
  const borderColor =
    theme === "primary" ? "border-[#8585DB]" : "border-primary-base";

  return (
    <li
      className={`flex gap-4 py-[20px]  ${
        isLast ? "" : `${borderColor} border-b-[1.5px]`
      }`}
    >
      <div className="basis-[94px] font-bold">{title}</div>

      <p className="flex flex-1">{children ?? "-"}</p>
    </li>
  );
};

export default ListItem;
