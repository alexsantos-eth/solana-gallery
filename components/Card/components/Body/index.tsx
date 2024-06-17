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
        "w-full [transform-style:preserve-3d] border-1 border-default rounded-xl p-5 [&>*]:[transform-style:preserve-3d] bg-background",
        className,
      )}
      style={{ backgroundColor: "hsl(var(--nextui-default-100))" }}
    >
      {children}
    </div>
  );
};

export default CardBody;
