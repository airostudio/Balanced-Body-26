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
      window.scrollTo(0, 0);
    } else {
      // Quiz completed, navigate to subscription page
      navigate('/subscription');
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      window.scrollTo(0, 0);
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
        return currentAnswer && typeof currentAnswer === 'object';
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
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentQuestion]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            {currentQuestionIndex > 0 && currentQuestion.type !== 'info' && (
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            <div className="flex-1" />
            <div className="text-sm text-gray-500 font-medium">
              {currentQuestionIndex + 1}/{totalQuestions}
            </div>
          </div>
          <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {currentQuestion.question}
            </h1>
            {currentQuestion.description && (
              <p className="text-gray-600 mb-6">{currentQuestion.description}</p>
            )}

            <div className="mt-6">
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
          <button
            onClick={handleNext}
            disabled={!isAnswerValid()}
            className={`w-full mt-8 py-4 rounded-xl font-semibold text-lg transition-all ${
              isAnswerValid()
                ? 'bg-primary-500 hover:bg-primary-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {currentQuestionIndex === totalQuestions - 1 ? 'See My Plan' : 'Continue'}
            <svg
              className="inline-block ml-2 w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};
