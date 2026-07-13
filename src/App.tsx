import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultDashboard from './components/ResultDashboard';
import { calculateResult, Personality } from './data/quizData';

type ScreenState = 'home' | 'quiz' | 'result';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('home');
  const [answers, setAnswers] = useState<('A' | 'B' | 'C' | 'D')[]>([]);
  const [result, setResult] = useState<ReturnType<typeof calculateResult> | null>(null);

  const handleStartQuiz = () => {
    setAnswers([]);
    setResult(null);
    setScreen('quiz');
  };

  const handleFinishQuiz = (finalAnswers: ('A' | 'B' | 'C' | 'D')[]) => {
    setAnswers(finalAnswers);
    const computed = calculateResult(finalAnswers);
    setResult(computed);
    setScreen('result');
  };

  const handleGoHome = () => {
    setScreen('home');
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-cosmic-bg text-gray-100 select-none">
      {screen === 'home' && (
        <StartScreen onStart={handleStartQuiz} />
      )}

      {screen === 'quiz' && (
        <QuizScreen 
          onFinish={handleFinishQuiz} 
          onBackToHome={handleGoHome} 
        />
      )}

      {screen === 'result' && result && (
        <ResultDashboard
          personality={result.personality}
          compositeScore={result.compositeScore}
          userScores={result.userScores}
          userTags={result.userTags}
          triggerTagCorrection={result.triggerTagCorrection}
          topCandidates={result.topCandidates}
          onRestart={handleStartQuiz}
          onGoHome={handleGoHome}
        />
      )}
    </div>
  );
}

