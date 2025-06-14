import searchBlue from '/images/svg/search/search_blue.svg';

interface SearchBarProps {
  width: number;
  height: number;
  placeholder: string;
}

function SearchBar(props: SearchBarProps) {
  const { width, height, placeholder } = props;

  return (
    <div
      className='border-main-gray focus-within:border-main-blue flex items-center justify-between rounded-[15px] border border-solid bg-white pr-5 pl-6.25 transition-all duration-300'
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <input
        type='text'
        className='placeholder:text-main-placeholder text-main h-full w-100 font-medium outline-none'
        placeholder={placeholder}
      />
      <button className='h-5 w-5 cursor-pointer'>
        <img src={searchBlue} alt='Search' className='h-full w-full' />
      </button>
    </div>
  );
}

export default SearchBar;
