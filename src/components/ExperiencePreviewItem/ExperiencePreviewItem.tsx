interface ExperiencePreviewItemProps {
  title: string;
  subtitle: string;
  onClick: () => void;
}

function ExperiencePreviewItem(props: ExperiencePreviewItemProps) {
  const { title, subtitle, onClick } = props;

  return (
    <div
      style={{ boxShadow: '0px 2px 8px 0px rgba(0, 0, 0, 0.15)' }}
      className='flex h-18 w-full cursor-pointer flex-col gap-1.25 rounded-[5px] bg-white px-5 py-3 text-[#1E1E1E] transition-all duration-200 hover:bg-gray-50'
      onClick={onClick}
    >
      <span className='text-xl leading-6 font-semibold'>{title}</span>
      <span className='text-base leading-[19px]'>{subtitle}</span>
    </div>
  );
}

export default ExperiencePreviewItem;
