import clsx from 'clsx';

const Button = ({ children, onClick, className = "", ...props }) => {
  // Check if a background color is already specified in className
  const hasBgColor = className.match(/bg-\w+-\d+/);
  
  return (
    <button 
      onClick={onClick}
      className={clsx(
        "w-full md:w-auto px-4 py-2 text-sm font-medium text-white rounded transition-colors cursor-pointer",
        !hasBgColor && "bg-blue-600 hover:bg-blue-700",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
