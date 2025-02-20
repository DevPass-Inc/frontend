interface ExperienceInputItemProps {
  title: string;
}

function ExperienceInputItem(props: ExperienceInputItemProps) {
  const { title } = props;

  return (
    <div className='flex w-full flex-col gap-1.25'>
      <span className='text-sm leading-4 font-medium'>{title}</span>
      <div
        className='flex h-10 w-full rounded-[5px]'
        style={{ border: '1px solid #898989B2' }}
      >
        <input
          type='text'
          className='text-main h-full w-full bg-transparent px-3 text-sm outline-none'
        />
      </div>
    </div>
  );
}

export default ExperienceInputItem;
