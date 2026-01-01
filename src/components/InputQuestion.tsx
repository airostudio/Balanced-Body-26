import React, { useState } from 'react';

interface InputQuestionProps {
  inputType: 'text' | 'number' | 'height' | 'weight';
  value?: string | number;
  onValueChange: (value: string | number | Record<string, any>) => void;
}

export const InputQuestion: React.FC<InputQuestionProps> = ({
  inputType,
  value,
  onValueChange,
}) => {
  const [unit, setUnit] = useState<'ft' | 'cm' | 'kg' | 'lb'>('ft');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [currentWeight, setCurrentWeight] = useState('');
  const [targetWeight, setTargetWeight] = useState('');

  if (inputType === 'height') {
    return (
      <div className="space-y-4">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setUnit('ft')}
            className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium ${
              unit === 'ft'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white text-gray-600'
            }`}
          >
            ft, in
          </button>
          <button
            onClick={() => setUnit('cm')}
            className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium ${
              unit === 'cm'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white text-gray-600'
            }`}
          >
            cm
          </button>
        </div>

        {unit === 'ft' ? (
          <div className="space-y-3">
            <label className="block">
              <span className="text-sm font-medium text-gray-700 mb-1 block">Height (ft, in)</span>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="5"
                  value={heightFt}
                  onChange={(e) => {
                    setHeightFt(e.target.value);
                    onValueChange({ ft: e.target.value, in: heightIn, unit: 'ft' });
                  }}
                  className="input-field flex-1"
                  min="0"
                  max="8"
                />
                <span className="flex items-center text-gray-500">ft</span>
                <input
                  type="number"
                  placeholder="11"
                  value={heightIn}
                  onChange={(e) => {
                    setHeightIn(e.target.value);
                    onValueChange({ ft: heightFt, in: e.target.value, unit: 'ft' });
                  }}
                  className="input-field flex-1"
                  min="0"
                  max="11"
                />
                <span className="flex items-center text-gray-500">in</span>
              </div>
            </label>
          </div>
        ) : (
          <label className="block">
            <span className="text-sm font-medium text-gray-700 mb-1 block">Height (cm)</span>
            <input
              type="number"
              placeholder="180"
              onChange={(e) => onValueChange({ cm: e.target.value, unit: 'cm' })}
              className="input-field"
              min="0"
              max="300"
            />
          </label>
        )}

        <div className="card mt-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">👆</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Calculating your body mass index</h4>
              <p className="text-sm text-gray-600">
                Your height helps us tailor movements that fit your body's structure and range.
              </p>
              <p className="text-sm font-medium text-gray-900 mt-2">
                Tai Chi adapts to you — not the other way around.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (inputType === 'weight') {
    return (
      <div className="space-y-4">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setUnit('lb')}
            className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium ${
              unit === 'lb'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white text-gray-600'
            }`}
          >
            lb
          </button>
          <button
            onClick={() => setUnit('kg')}
            className={`flex-1 py-2 px-4 rounded-lg border-2 font-medium ${
              unit === 'kg'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white text-gray-600'
            }`}
          >
            kg
          </button>
        </div>

        <label className="block">
          <span className="text-sm font-medium text-gray-700 mb-1 block">
            Current Weight ({unit})
          </span>
          <input
            type="number"
            placeholder={unit === 'kg' ? '120' : '265'}
            value={currentWeight}
            onChange={(e) => {
              setCurrentWeight(e.target.value);
              onValueChange({ current: e.target.value, target: targetWeight, unit });
            }}
            className="input-field"
            min="0"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-gray-700 mb-1 block">
            Target Weight ({unit})
          </span>
          <input
            type="number"
            placeholder={unit === 'kg' ? '95' : '210'}
            value={targetWeight}
            onChange={(e) => {
              setTargetWeight(e.target.value);
              onValueChange({ current: currentWeight, target: e.target.value, unit });
            }}
            className="input-field"
            min="0"
          />
        </label>

        <div className="card mt-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">👆</span>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Calculating your body mass index</h4>
              <p className="text-sm text-gray-600">
                We use your weight to adjust intensity and impact — not to push your limits.
              </p>
              <p className="text-sm font-medium text-gray-900 mt-2">
                Tai Chi works with your body — <span className="text-primary-600">gently and effectively.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default text or number input
  return (
    <input
      type={inputType === 'text' ? 'text' : 'number'}
      placeholder={inputType === 'text' ? 'Enter your answer' : '0'}
      value={value || ''}
      onChange={(e) => onValueChange(e.target.value)}
      className="input-field"
    />
  );
};
