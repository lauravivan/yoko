import AddIcon from '@/components/display/icons/Add';

const AddButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button className="c-add-card" {...props}>
      <AddIcon />
    </button>
  );
};

export default AddButton;
