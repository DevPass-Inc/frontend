interface ResumeExperiencePreviewItemProps {
  index: number;
  selectedExp: number | null;
  handleSelectExp: (index: number) => void;
}

function ResumeExperiencePreviewItem(props: ResumeExperiencePreviewItemProps) {
  const { index, selectedExp, handleSelectExp } = props;

  return (
    <button
      type='button'
      className={`${selectedExp === index ? 'border-[#0043CE] bg-[#EEF6FF]' : 'border-[#DFDFDF] bg-white'} flex h-23 w-full cursor-pointer items-center justify-between rounded-[10px] border-2 border-solid px-7.5 transition-all duration-200`}
      onClick={() => handleSelectExp(index)}
    >
      {/* 경험 제목 / 설명 */}
      <div className='flex flex-col items-start gap-1.5'>
        <h3 className='text-xl leading-[24.2px] font-semibold text-[#4C4C4C]'>
          경험 1
        </h3>
        <p className='leading-[19.36px] font-medium text-[#4C4C4C]'>
          경험 설명
        </p>
      </div>

      {/* 선택 되었는지 박스 */}
      <div
        className={`${selectedExp === index ? 'border-main-blue bg-main-blue' : 'border-[#D1D5DA] bg-transparent'} h-6 w-6 rounded-full border-2 border-solid transition-all duration-200`}
      ></div>
    </button>
  );
}

export default ResumeExperiencePreviewItem;
