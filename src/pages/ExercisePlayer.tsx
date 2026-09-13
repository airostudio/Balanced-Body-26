import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { allExercises } from '../data/exercises';

export const ExercisePlayer: React.FC = () => {
  const navigate = useNavigate();
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const { updateProgress, progress } = useStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCompletion, setShowCompletion] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Find the exercise
  const exercise = [
    ...allExercises.free,
    ...allExercises.beginner,
    ...allExercises.intermediate,
    ...allExercises.expert,
  ].find(ex => ex.id === exerciseId);

  useEffect(() => {
    if (!exercise) {
      navigate('/library');
    }
  }, [exercise, navigate]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      handleComplete();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  if (!exercise) {
    return null;
  }

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleComplete = () => {
    setShowCompletion(true);

    // Update progress
    const newProgress = {
      totalSessions: progress.totalSessions + 1,
      totalMinutes: progress.totalMinutes + exercise.duration,
      currentStreak: progress.currentStreak + 1,
    };
    updateProgress(newProgress);

    // Show completion for 3 seconds then navigate
    setTimeout(() => {
      navigate('/library');
    }, 3000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Video Player Area */}
      <div className="relative w-full h-screen max-h-[70vh] bg-black">
        {/* Video Element */}
        <video
          ref={videoRef}
          src={exercise.videoUrl}
          className="w-full h-full object-contain"
          playsInline
          onClick={togglePlay}
        >
          Your browser does not support the video tag.
        </video>

        {/* Play overlay when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-24 h-24 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl">
              <svg className="w-12 h-12 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>
        )}

        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-5 bg-gradient-to-b from-black/60 to-transparent z-10">
          <button
            onClick={() => navigate('/library')}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Bottom Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10">
          <div className="max-w-4xl mx-auto">
            {/* Progress bar */}
            <div
              className="w-full h-1.5 bg-white/20 rounded-full mb-4 overflow-hidden cursor-pointer"
              onClick={(e) => {
                const video = videoRef.current;
                if (!video) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                video.currentTime = pos * video.duration;
              }}
            >
              <div
                className="h-full bg-primary-500 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Play controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="p-3 bg-primary-500 rounded-full text-white hover:bg-primary-600 transition-all shadow-lg"
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                <div className="text-white">
                  <div className="text-sm font-medium">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </div>
                </div>
              </div>

              <button
                onClick={handleComplete}
                className="px-6 py-2.5 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold hover:bg-white/30 transition-all"
              >
                Mark Complete
              </button>
            </div>
          </div>
        </div>

        {/* Completion Overlay */}
        {showCompletion && (
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/95 to-primary-600/95 backdrop-blur-sm flex items-center justify-center z-20">
            <div className="text-center text-white animate-fade-in">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <svg className="w-12 h-12 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-3">Exercise Complete!</h2>
              <p className="text-xl text-white/90">Great work on completing this session</p>
              <div className="mt-6 flex items-center gap-8 justify-center text-white/90">
                <div>
                  <div className="text-3xl font-bold">{exercise.duration}</div>
                  <div className="text-sm">minutes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">+{Math.round(exercise.duration * 1.5)}</div>
                  <div className="text-sm">calories</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Exercise Details */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-5 py-8">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                exercise.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                exercise.difficulty === 'intermediate' ? 'bg-primary-100 text-primary-700' :
                'bg-purple-100 text-purple-700'
              }`}>
                {exercise.difficulty}
              </span>
              <span className="text-sm text-gray-500">{exercise.category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {exercise.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              {exercise.description}
            </p>
          </div>

          {/* Benefits */}
          {exercise.benefits && exercise.benefits.length > 0 && (
            <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-6 shadow-soft">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Benefits</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {exercise.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center mt-0.5">
                      <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-800 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
