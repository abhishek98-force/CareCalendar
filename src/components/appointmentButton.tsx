interface AppointmentButtonProps extends React.PropsWithChildren {
  className?: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function AppointmentButton({
  className,
  onClick,
  children,
}: AppointmentButtonProps) {
  return (
    <button className={`${className} rounded py-2 px-3`} onClick={onClick}>
      {children}
    </button>
  );
}
