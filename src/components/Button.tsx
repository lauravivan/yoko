interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | React.ReactNode;
  onClick?: () => void;
  variant?: 'blue' | 'default';
}

const Button = ({ children, variant = 'blue', onClick }: ButtonProps) => {
  return (
    <button className={`button btn-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
