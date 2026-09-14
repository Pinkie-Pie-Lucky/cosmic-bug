import React, { useState } from 'react';
// import AuthScreen from './components/AuthScreen';
import StartScreen from './components/StartScreen';
import QuizScreen from './components/QuizScreen';
import ResultDashboard from './components/ResultDashboard';
import { calculateResult } from './data/quizData';

type ScreenState = 'home' | 'quiz' | 'result';

export default function App() {
  // 授权码入口暂时禁用：启动后直接进入主页。
  const [screen, setScreen] = useState<ScreenState>('home');
  const [answers, setAnswers] = useState<('A' | 'B' | 'C' | 'D')[]>([]);
  const [result, setResult] = useState<ReturnType<typeof calculateResult> | null>(null);

  // const handleAuthSuccess = () => setScreen('home');

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
    <div className="min-h-dvh bg-cosmic-bg text-gray-100 select-none">
      {/* 授权码校验暂时禁用。
      {screen === 'auth' && <AuthScreen onAuthSuccess={handleAuthSuccess} />}
      */}

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
