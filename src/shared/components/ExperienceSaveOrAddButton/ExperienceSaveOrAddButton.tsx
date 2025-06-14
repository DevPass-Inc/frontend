import saveIcon from '/images/svg/icons/save.svg';

interface ExperienceSaveOrAddButtonProps {
  title: string;
  onClick: () => void;
}

function ExperienceSaveOrAddButton(props: ExperienceSaveOrAddButtonProps) {
  const { title, onClick } = props;

  return (
    <button
      type='button'
      className='bg-main-blue flex h-10 cursor-pointer items-center justify-center gap-2 rounded px-4 transition-all duration-200 ease-in-out hover:brightness-90 active:scale-[0.97]'
      onClick={onClick}
    >
      <img
        src={saveIcon}
        alt='save icon'
        className='w-6.5 transition-transform duration-200 ease-in-out group-hover:scale-110'
      />
      <span className='font-medium text-white'>{title}</span>
    </button>
  );
}

export default ExperienceSaveOrAddButton;
