interface CellProps extends React.PropsWithChildren {
  className?: string;
  onClick?: () => void;
}
export default function Cell({ className, onClick, children }: CellProps) {
  return (
    <div
      className={`h-12 flex justify-center text-center items-center border-b border-r ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
