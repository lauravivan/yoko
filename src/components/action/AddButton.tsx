import AddIcon from '@/components/display/icons/Add';

interface AddButton extends React.HTMLAttributes<HTMLButtonElement> {}

const AddButton = (props: AddButton) => {
  return (
    <button className="c-add-card" {...props}>
      <AddIcon />
    </button>
  );
};

export default AddButton;
