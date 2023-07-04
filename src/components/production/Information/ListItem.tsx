type ListItemProps = {
  title: string;
  content: string | null;
  isLast?: boolean;
};

const ListItem = ({ title, content, isLast }: ListItemProps) => {
  return (
    <li
      className={`flex gap-4 py-[20px]  ${
        isLast ? "" : "border-b-[1.5px] border-primary-light"
      }`}
    >
      <div className="basis-[94px] font-bold">{title}</div>

      <p className="flex flex-1">{content ?? "-"}</p>
    </li>
  );
};

export default ListItem;
