interface DynamicModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

const DynamicModal = ({ children, className }: DynamicModalProps) => {
  return <div className={`c-dynamic-modal ${className}`}>{children}</div>;
};

export default DynamicModal;
