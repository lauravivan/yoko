import DefaultButton from '@/components/action/DefaultButton';

interface NotFoundProps {
  handleCreate: () => void;
  keyword: string;
}

const NotFound = ({ handleCreate, keyword }: NotFoundProps) => {
  return (
    <div className="c-not-found">
      <div>
        <p>
          It appears you haven't created any {keyword} yet. Click in{' '}
          <span className="c-not-found__highlight">'Create {keyword}'</span> to
          create.
        </p>
        <DefaultButton
          onClick={handleCreate}
        >{`Create ${keyword}`}</DefaultButton>
      </div>
    </div>
  );
};

export default NotFound;
