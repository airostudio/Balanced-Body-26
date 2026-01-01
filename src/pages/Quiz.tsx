import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { quizQuestions } from '../data/quizQuestions';
import { ProgressBar } from '../components/ProgressBar';
import { SingleChoiceQuestion } from '../components/SingleChoiceQuestion';
import { MultiChoiceQuestion } from '../components/MultiChoiceQuestion';
import { InputQuestion } from '../components/InputQuestion';
import { InfoScreen } from '../components/InfoScreen';

export const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const {
    currentQuestionIndex,
    quizAnswers,
    setCurrentQuestionIndex,
    setQuizAnswer,
  } = useStore();

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  const currentAnswer = quizAnswers[currentQuestion.id];

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Quiz completed, navigate to subscription page
      navigate('/subscription');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAnswer = (answer: string | number | string[] | Record<string, any>) => {
    // Convert Record to string if needed (for height/weight inputs)
    const processedAnswer = typeof answer === 'object' && !Array.isArray(answer)
      ? JSON.stringify(answer)
      : answer;
    setQuizAnswer(currentQuestion.id, processedAnswer as string | number | string[]);
  };

  const isAnswerValid = () => {
    if (currentQuestion.type === 'info') return true;
    if (currentQuestion.type === 'multi-choice') {
      return Array.isArray(currentAnswer) && currentAnswer.length > 0;
    }
    if (currentQuestion.type === 'input') {
      if (currentQuestion.inputType === 'height' || currentQuestion.inputType === 'weight') {
        return currentAnswer && typeof currentAnswer === 'string';
      }
      return currentAnswer !== undefined && currentAnswer !== '';
    }
    return currentAnswer !== undefined;
  };

  useEffect(() => {
    // Auto-advance for info screens after a short delay
    if (currentQuestion.type === 'info') {
      const timer = setTimeout(() => {
        handleNext();
      }, 4000); // Increased to 4 seconds for better readability
      return () => clearTimeout(timer);
    }
  }, [currentQuestion]);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fafaf9' }}>
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-5 py-5">
          <div className="flex items-center justify-between mb-4">
            {currentQuestionIndex > 0 && currentQuestion.type !== 'info' ? (
              <button
                onClick={handleBack}
                className="p-2.5 hover:bg-gray-100 rounded-xl transition-all active:scale-95"
                aria-label="Go back"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            ) : (
              <div className="w-11" /> /* Spacer */
            )}
            <div className="text-base text-gray-600 font-semibold tracking-wide">
              {currentQuestionIndex + 1}/{totalQuestions}
            </div>
          </div>
          <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-2xl mx-auto px-5 py-8 pb-24">
        {currentQuestion.type === 'info' && currentQuestion.infoContent ? (
          <InfoScreen
            title={currentQuestion.infoContent.title}
            body={currentQuestion.infoContent.body}
            bullets={currentQuestion.infoContent.bullets}
            stats={currentQuestion.infoContent.stats}
            image={currentQuestion.infoContent.image}
          />
        ) : (
          <>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight">
              {currentQuestion.question}
            </h1>
            {currentQuestion.description && (
              <p className="text-gray-600 text-base mb-8 leading-relaxed">
                {currentQuestion.description}
              </p>
            )}

            <div className="mt-8">
              {currentQuestion.type === 'single-choice' && currentQuestion.options && (
                <SingleChoiceQuestion
                  options={currentQuestion.options}
                  selectedValue={currentAnswer as string | number}
                  onSelect={handleAnswer}
                />
              )}

              {currentQuestion.type === 'multi-choice' && currentQuestion.options && (
                <MultiChoiceQuestion
                  options={currentQuestion.options}
                  selectedValues={currentAnswer as string[]}
                  onSelect={handleAnswer}
                />
              )}

              {currentQuestion.type === 'input' && currentQuestion.inputType && (
                <InputQuestion
                  inputType={currentQuestion.inputType}
                  value={currentAnswer as string | number}
                  onValueChange={handleAnswer}
                />
              )}
            </div>
          </>
        )}

        {/* Next Button */}
        {currentQuestion.type !== 'info' && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-5 shadow-2xl md:relative md:shadow-none md:border-0 md:bg-transparent md:p-0 md:mt-10">
            <div className="max-w-2xl mx-auto">
              <button
                onClick={handleNext}
                disabled={!isAnswerValid()}
                className={`btn-primary w-full text-lg font-bold py-4 flex items-center justify-center gap-2 ${
                  !isAnswerValid() ? 'opacity-40 cursor-not-allowed' : ''
                }`}
              >
                {currentQuestionIndex === totalQuestions - 1 ? 'See My Plan' : 'Got it'}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
