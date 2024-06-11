"use client";
import { cn } from "@/utils/cn";

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}
const CardBody: React.FC<CardBodyProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default CardBody;
