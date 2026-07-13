import React, { useState } from 'react';
import AuthScreen from './components/AuthScreen';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultDashboard from './components/ResultDashboard';
import { calculateResult } from './data/quizData';

type ScreenState = 'auth' | 'home' | 'quiz' | 'result';

export default function App() {
  const [isAuthorized, setIsAuthorized] = useState(() => {
    // TODO: 测试阶段暂时注释，上线前恢复
    // return !!localStorage.getItem('has_access_auth');
    return false;
  });
  const [screen, setScreen] = useState<ScreenState>('auth');
  const [answers, setAnswers] = useState<('A' | 'B' | 'C' | 'D')[]>([]);
  const [result, setResult] = useState<ReturnType<typeof calculateResult> | null>(null);

  const handleAuthSuccess = () => {
    setIsAuthorized(true);
    setScreen('home');
  };

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
      {screen === 'auth' && (
        <AuthScreen onAuthSuccess={handleAuthSuccess} />
      )}

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
