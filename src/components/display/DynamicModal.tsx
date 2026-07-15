interface DynamicModalProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

const DynamicModal = ({ children }: DynamicModalProps) => {
  return <div className="c-dynamic-modal">{children}</div>;
};

export default DynamicModal;
