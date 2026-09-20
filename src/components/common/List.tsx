import React from "react";

type ListProps = {
  isDark?: boolean;
  list: string[];
  inset?: boolean;
};

const List: React.FC<ListProps> = ({ list, isDark, inset }) => {
  const wheel = isDark ? "/images/wheel_dark.svg" : "/images/wheel_light.svg";

  return (
    <ul className={`${inset ? "pl-6" : ""} font-normal flex flex-col gap-3`}>
      {list.map((item, index) => (
        <li key={`${item}-${index}`} className="flex gap-3 items-start">
          <img src={wheel} alt="" className="w-5 mb-0.5" />
          {item}
        </li>
      ))}
    </ul>
  );
};

export default List;
