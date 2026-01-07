import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

const steps = [
  { number: 1, label: 'Trip Details' },
  { number: 2, label: 'Destinations' },
  { number: 3, label: 'Your Plan' }
];

const StepIndicator = ({ currentStep, totalSteps = 3 }: StepIndicatorProps) => {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="flex items-center justify-between">
        {steps.slice(0, totalSteps).map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  step.number < currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : step.number === currentStep 
                      ? 'bg-primary text-primary-foreground shadow-hover' 
                      : 'bg-secondary text-muted-foreground'
                }`}
              >
                {step.number < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.number
                )}
              </div>
              <span className={`mt-2 text-xs font-medium ${
                step.number <= currentStep ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {step.label}
              </span>
            </div>
            
            {index < totalSteps - 1 && (
              <div className="flex-1 mx-4">
                <div className={`h-1 rounded-full transition-all duration-500 ${
                  step.number < currentStep ? 'bg-primary' : 'bg-secondary'
                }`} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
