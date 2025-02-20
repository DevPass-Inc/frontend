interface ExperienceCurrentTabProps {
  currentTab: 'project' | 'stack' | 'intern';
  handleTabClick: (tab: 'project' | 'stack' | 'intern') => void;
}

const TAB = ['프로젝트', '기술 스택', '인턴십'];

function ExperienceCurrentTab(props: ExperienceCurrentTabProps) {
  const { currentTab, handleTabClick } = props;

  return (
    <div className='absolute top-0 left-0 flex h-8 -translate-x-[2px] -translate-y-[33px] gap-0.25'>
      {TAB.map((tab, idx) => (
        <button
          key={`${tab}-${idx}`}
          type='button'
          className={`${currentTab === (idx === 0 ? 'project' : idx === 1 ? 'stack' : 'intern') ? 'bg-white' : 'bg-[#F5F5F5] hover:brightness-95'} flex h-full w-50 cursor-pointer items-center justify-center rounded-t-[5px] border-[0.5px] border-solid border-[#89898940] transition-all duration-200`}
          style={{ boxShadow: '0px 0px 10px 0px #0000001A' }}
          onClick={() =>
            handleTabClick(
              idx === 0 ? 'project' : idx === 1 ? 'stack' : 'intern'
            )
          }
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default ExperienceCurrentTab;
