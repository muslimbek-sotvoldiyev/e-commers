import type React from "react";

export const Timeline = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative border-l border-gray-200 pl-8 ml-4">
      {children}
    </div>
  );
};

export const TimelineItem = ({
  year,
  title,
  description,
}: {
  year: string;
  title: string;
  description: string;
}) => {
  return (
    <div className="mb-8 relative">
      <div className="absolute -left-12 mt-1.5 w-6 h-6 bg-primary rounded-full border-4 border-white"></div>
      <time className="mb-1 text-sm font-normal leading-none text-gray-400">
        {year}
      </time>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mb-4 text-base font-normal text-gray-500">{description}</p>
    </div>
  );
};
