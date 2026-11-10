import type { ReactNode } from "react";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

const PageHeader = ({ title, description, actions }: PageHeaderProps) => {
  <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold">{title}</h1>
      {description && (
        <p className="max-w-[70ch] font-light text-gray-light">{description}</p>
      )}
    </div>
    {actions && <div className="flex flex-wrap gap-3">{actions}</div>}
  </header>;
};

export default PageHeader;
