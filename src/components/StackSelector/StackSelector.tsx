import { useEffect, useRef, useState } from 'react';
import { Stack } from '../../types/dev-experience.types';

interface StackSelectorProps {
  stackOptions: Stack[];
  selectedStackIds: number[];
  onChange: (ids: number[]) => void;
}

function StackSelector(props: StackSelectorProps) {
  const { stackOptions, selectedStackIds, onChange } = props;

  const [inputValue, setInputValue] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 입력값으로 필터링
  const filtered = stackOptions.filter(
    (option) =>
      option.name.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedStackIds.includes(option.id)
  );

  // 바깥 클릭시 드롭다운 닫기
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    console.log('selectedStackIds', selectedStackIds);
  }, [selectedStackIds]);

  return (
    <div
      ref={ref}
      className={`relative flex w-full items-center justify-between ${selectedStackIds.length > 0 ? 'px-2' : ''}`}
    >
      {/* 선택된 기술 스택(태그 형태) */}
      <div className='flex flex-wrap gap-2'>
        {selectedStackIds.map((id) => {
          const stack = stackOptions.find((s) => s.id === id);
          if (!stack) return null;
          return (
            <div
              key={id}
              className='flex h-6 items-center gap-1 rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700'
            >
              {stack.name}
              <button
                type='button'
                className='ml-1 text-blue-500 hover:text-blue-900'
                onClick={() =>
                  onChange(selectedStackIds.filter((sid) => sid !== id))
                }
                aria-label={`${stack.name} 제거`}
              >
                ×
              </button>
            </div>
          );
        })}
      </div>

      {/* 인풋 + 드롭다운 */}
      <input
        type='text'
        placeholder={`${selectedStackIds.length > 0 ? '추가' : '기술 스택을 검색/선택하세요.'}`}
        className={`cursor-pointer px-3 py-2 text-sm outline-none ${selectedStackIds.length > 0 ? 'h-6 w-20 border border-gray-600 text-center' : 'h-full w-full'}`}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setDropdownOpen(true);
        }}
        onFocus={() => setDropdownOpen(true)}
      />

      {dropdownOpen && filtered.length > 0 && (
        <ul className='absolute top-10 left-0 z-10 mt-1 max-h-40 w-full overflow-y-auto rounded border bg-white p-2 shadow-lg'>
          {filtered.map((option) => (
            <li
              key={option.id}
              className='cursor-pointer px-3 py-1 text-sm hover:bg-blue-50'
              onClick={() => {
                onChange([...selectedStackIds, option.id]);
                setInputValue('');
                setDropdownOpen(false);
              }}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default StackSelector;
