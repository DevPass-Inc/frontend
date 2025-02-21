import '../../../lib/stepper/css/styles.css';
import checkWhiteIcon from '/images/svg/icons/check_white.svg';

interface StepperProps {
  step: string[];
  currentStep: number;
  width: number;
}

function Stepper(props: StepperProps) {
  const { step, currentStep, width } = props;

  return (
    <div className='stepper-wrapper' style={{ width: `${width}px` }}>
      {step.map((item, idx) => (
        <div
          key={`stepper-item-${idx}`}
          className={`stepper-item ${idx < currentStep ? 'completed' : ''}`}
        >
          <div className='step-counter'>
            <img src={checkWhiteIcon} alt='check-white' className='w-3.5' />
          </div>
          <div className='step-name'>{item}</div>
        </div>
      ))}
    </div>
  );
}

export default Stepper;
