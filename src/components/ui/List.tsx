import ThemedImage from "./ThemedImage";

import { cn } from "../../utils/cn";

type ListProps = {
  items: readonly string[];
  inset?: boolean;
};

const List = ({ items, inset }: ListProps) => (
  <ul className={cn("flex flex-col gap-3 font-normal", inset && "pl-6")}>
    {items.map((item) => (
      <li key={item} className="flex items-start gap-3">
        <ThemedImage
          light="/images/wheel_light.svg"
          dark="/images/wheel_dark.svg"
          width={25}
          height={25}
          className="mb-0.5 w-5"
        />
        {item}
      </li>
    ))}
  </ul>
);

export default List;
