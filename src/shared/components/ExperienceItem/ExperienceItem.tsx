interface ExperienceItemProps {
  title: string;
  desc: string;
  isSelected: boolean; // 선택 여부
  onClick: () => void; // 클릭 시 이벤트
}

function ExperienceItem(props: ExperienceItemProps) {
  const { title, desc, isSelected, onClick } = props;

  return (
    <button
      type='button'
      className={`${isSelected ? 'bg-main-blue text-white' : 'bg-white text-[#1E1E1E] hover:bg-gray-100'} flex h-18 w-full cursor-pointer flex-col items-start justify-center gap-1.25 rounded-[5px] px-5 transition-all duration-200`}
      style={{
        boxShadow: '0px 2px 8px 0px #00000026',
      }}
      onClick={onClick}
    >
      {/* 경험 제목 */}
      <h4 className='text-xl leading-[24.2px] font-semibold'>{title}</h4>

      {/* 경험 설명 */}
      <p className='leading-[19.36px] font-medium'>{desc}</p>
    </button>
  );
}

export default ExperienceItem;
