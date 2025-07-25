import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../lib/react-datepicker/css/styles.css';
import { ko } from 'date-fns/locale';
import { Stack } from '../../../types/dev-experience.types';
import StackSelector from '../../../components/StackSelector';

interface ExperienceInputItemProps {
  label: string;
  name: string;
  value: string;
  placeholder?: string;
  isDate?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onDateChange?: (date: Date | null) => void;
  isStack?: boolean;
  stackOptions?: Stack[];
  selectedStackIds?: number[];
  onStackChange?: (ids: number[]) => void;
}

function ExperienceInputItem(props: ExperienceInputItemProps) {
  const {
    label,
    name,
    value,
    placeholder,
    isStack,
    isDate,
    onChange,
    onDateChange,
    stackOptions,
    selectedStackIds,
    onStackChange,
  } = props;

  return (
    <div className='flex w-full flex-col gap-1.25'>
      <span className='text-sm leading-4 font-medium'>{label}</span>
      <div
        className={`flex ${name === 'content' ? 'h-28' : 'h-10'} rounded-[5px] transition-all duration-300 ease-in-out focus-within:ring-1 focus-within:ring-[#2563EB]`}
        style={{ border: '1px solid #898989B2' }}
      >
        {isDate ? (
          <DatePicker
            locale={ko}
            selected={value ? new Date(value) : null}
            onChange={(date) => {
              if (onDateChange) {
                onDateChange(date);
              }
            }}
            dateFormat={'yyyy-MM-dd'}
            placeholderText={placeholder}
            className='text-main h-full w-full cursor-pointer bg-transparent px-3 text-sm outline-none'
            isClearable
          />
        ) : isStack ? (
          <StackSelector
            stackOptions={stackOptions || []}
            selectedStackIds={selectedStackIds || []}
            onChange={onStackChange || (() => {})}
          />
        ) : name === 'content' ? (
          <textarea
            placeholder={placeholder}
            className='text-main h-full w-full resize-none bg-transparent px-3 py-2 text-sm outline-none'
            name={name}
            value={value}
            onChange={onChange}
          />
        ) : (
          <input
            type='text'
            placeholder={placeholder}
            className='text-main h-full w-full bg-transparent px-3 text-sm outline-none'
            name={name}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
}

export default ExperienceInputItem;
