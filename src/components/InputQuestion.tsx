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
      <div className="space-y-6">
        {/* Unit Toggle */}
        <div className="flex gap-3 p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => setUnit('ft')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold text-base transition-all ${
              unit === 'ft'
                ? 'bg-primary-500 text-white shadow-soft'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            ft, in
          </button>
          <button
            onClick={() => setUnit('cm')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold text-base transition-all ${
              unit === 'cm'
                ? 'bg-primary-500 text-white shadow-soft'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            cm
          </button>
        </div>

        {unit === 'ft' ? (
          <div>
            <label className="block">
              <span className="text-base font-semibold text-gray-800 mb-2 block">Height (ft, in)</span>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="number"
                    placeholder="5"
                    value={heightFt}
                    onChange={(e) => {
                      setHeightFt(e.target.value);
                      onValueChange({ ft: e.target.value, in: heightIn, unit: 'ft' });
                    }}
                    className="input-field pr-12 text-lg font-medium"
                    min="0"
                    max="8"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">ft</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="11"
                    value={heightIn}
                    onChange={(e) => {
                      setHeightIn(e.target.value);
                      onValueChange({ ft: heightFt, in: e.target.value, unit: 'ft' });
                    }}
                    className="input-field pr-12 text-lg font-medium"
                    min="0"
                    max="11"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">in</span>
                </div>
              </div>
            </label>
          </div>
        ) : (
          <label className="block">
            <span className="text-base font-semibold text-gray-800 mb-2 block">Height (cm)</span>
            <div className="relative">
              <input
                type="number"
                placeholder="180"
                onChange={(e) => onValueChange({ cm: e.target.value, unit: 'cm' })}
                className="input-field pr-14 text-lg font-medium"
                min="0"
                max="300"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">cm</span>
            </div>
          </label>
        )}

        <div className="bg-gradient-to-br from-accent-50 to-accent-100/50 rounded-2xl p-5 shadow-soft">
          <div className="flex items-start gap-3.5">
            <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <span className="text-2xl">👆</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-2 text-base">Calculating your body mass index</h4>
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                Your height helps us tailor movements that fit your body's structure and range.
              </p>
              <p className="text-sm font-semibold text-gray-900">
                Tai Chi adapts to you <span className="text-primary-600">— not the other way around.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (inputType === 'weight') {
    return (
      <div className="space-y-6">
        {/* Unit Toggle */}
        <div className="flex gap-3 p-1 bg-gray-100 rounded-xl">
          <button
            onClick={() => setUnit('lb')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold text-base transition-all ${
              unit === 'lb'
                ? 'bg-primary-500 text-white shadow-soft'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            lb
          </button>
          <button
            onClick={() => setUnit('kg')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold text-base transition-all ${
              unit === 'kg'
                ? 'bg-primary-500 text-white shadow-soft'
                : 'bg-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            kg
          </button>
        </div>

        <label className="block">
          <span className="text-base font-semibold text-gray-800 mb-2 block">
            Current Weight ({unit})
          </span>
          <div className="relative">
            <input
              type="number"
              placeholder={unit === 'kg' ? '120' : '265'}
              value={currentWeight}
              onChange={(e) => {
                setCurrentWeight(e.target.value);
                onValueChange({ current: e.target.value, target: targetWeight, unit });
              }}
              className="input-field text-lg font-medium pr-16"
              min="0"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">{unit}</span>
          </div>
        </label>

        <label className="block">
          <span className="text-base font-semibold text-gray-800 mb-2 block">
            Target Weight ({unit})
          </span>
          <div className="relative">
            <input
              type="number"
              placeholder={unit === 'kg' ? '95' : '210'}
              value={targetWeight}
              onChange={(e) => {
                setTargetWeight(e.target.value);
                onValueChange({ current: currentWeight, target: e.target.value, unit });
              }}
              className="input-field text-lg font-medium pr-16"
              min="0"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">{unit}</span>
          </div>
        </label>

        <div className="bg-gradient-to-br from-accent-50 to-accent-100/50 rounded-2xl p-5 shadow-soft">
          <div className="flex items-start gap-3.5">
            <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <span className="text-2xl">👆</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-2 text-base">Calculating your body mass index</h4>
              <p className="text-sm text-gray-700 leading-relaxed mb-2">
                We use your weight to adjust intensity and impact — not to push your limits.
              </p>
              <p className="text-sm font-semibold text-gray-900">
                Tai Chi works with your body <span className="text-primary-600">— gently and effectively.</span>
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
      placeholder={inputType === 'text' ? 'your@email.com' : '0'}
      value={value || ''}
      onChange={(e) => onValueChange(e.target.value)}
      className="input-field text-lg"
    />
  );
};
