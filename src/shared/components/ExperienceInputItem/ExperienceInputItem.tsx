interface ExperienceInputItemProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  isDate?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function ExperienceInputItem(props: ExperienceInputItemProps) {
  const { label, name, value, placeholder, onChange } = props;

  return (
    <div className='flex w-full flex-col gap-1.25'>
      <span className='text-sm leading-4 font-medium'>{label}</span>
      <div
        className='flex h-10 w-full rounded-[5px]'
        style={{ border: '1px solid #898989B2' }}
      >
        <input
          type='text'
          placeholder={placeholder}
          className='text-main h-full w-full bg-transparent px-3 text-sm outline-none'
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default ExperienceInputItem;
