interface DefaultButtonProps {
  type?: 'error' | 'subtle' | 'default';
  children: string;
  onClick: () => void;
}

const DefaultButton = ({
  type = 'default',
  children,
  onClick,
}: DefaultButtonProps) => {
  return (
    <button
      className={`c-default-button c-default-button--${type}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default DefaultButton;
