import clsx from 'clsx';
import Title from "./Title";

export default function ControlsSection({ className, title, children, last }) {
  return (
    <>
      <div className={clsx("w-full", className)}>
        {title && <Title>{title}</Title>}
        <div className={clsx("flex flex-col md:flex-row gap-4 md:items-center w-full", title && "mt-4")}>
          {children}
        </div>
      </div>
      {!last && <div className="w-full border-t border-gray-400" />}
    </>
  )
}
