import React, { useState } from 'react';
import { ArrowLeft, Cpu, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';
import { QUESTIONS, Question } from '../data/quizData';
import { motion, AnimatePresence } from 'motion/react';

interface QuizScreenProps {
  onFinish: (answers: ('A' | 'B' | 'C' | 'D')[]) => void;
  onBackToHome: () => void;
}

export default function QuizScreen({ onFinish, onBackToHome }: QuizScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<('A' | 'B' | 'C' | 'D')[]>([]);

  const currentQuestion: Question = QUESTIONS[currentIndex];
  const progressPercent = ((currentIndex + 1) / QUESTIONS.length) * 100;

  const handleSelectOption = (optionKey: 'A' | 'B' | 'C' | 'D') => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = optionKey;
    setAnswers(updatedAnswers);

    // Auto-advance with a slight delay for better UX
    setTimeout(() => {
      if (currentIndex < QUESTIONS.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        onFinish(updatedAnswers);
      }
    }, 280);
  };

  const handleGoBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      onBackToHome();
    }
  };

  const currentSelection = answers[currentIndex];

  return (
    <div className="w-full min-h-screen bg-cosmic-bg text-gray-100 flex flex-col justify-between p-4 md:p-6 relative overflow-hidden crt-scanlines">
      {/* Decorative Top Ambient glow */}
      <div className="absolute top-0 inset-x-0 h-40 bg-[radial-gradient(ellipse_at_top,rgba(67,218,226,0.1),transparent_60%)] pointer-events-none" />

      {/* Top Header Log Bar */}
      <div className="w-full flex items-center justify-between border-b border-gray-800 pb-3 z-10" id="quiz-header">
        <button
          onClick={handleGoBack}
          className="flex items-center gap-1.5 text-xs font-mono text-neon-cyan hover:text-warning-yellow cursor-pointer select-none transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>[ 返回 ]</span>
        </button>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-neon-cyan animate-pulse" />
          <span className="font-mono text-[11px] text-neon-cyan tracking-wider">
            系统异常 // 解码中
          </span>
        </div>
      </div>

      {/* Central Progress Line */}
      <div className="w-full max-w-lg mx-auto mt-4 z-10">
        <div className="w-full h-1 bg-purple-950/40 relative">
          <div 
            className="h-full bg-gradient-to-r from-neon-cyan to-neon-purple transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
          {/* Progress Flickering Cursor block */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-2 h-3 bg-neon-cyan animate-pulse"
            style={{ left: `calc(${progressPercent}% - 4px)` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 font-mono text-[10px] text-gray-500">
          <span>进度: {currentIndex + 1} / {QUESTIONS.length}</span>
          <span>扫描进度: {Math.round(progressPercent)}%</span>
        </div>
      </div>

      {/* Primary Question + Answers Container */}
      <div className="flex-1 max-w-lg w-full mx-auto flex flex-col justify-center my-6 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Anomaly Badge */}
            <div className="flex">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-950/40 border border-neon-purple/40 text-neon-purple font-mono text-[10px] uppercase font-bold tracking-widest clip-angular-badge">
                <Cpu className="w-3.5 h-3.5 text-neon-purple animate-pulse" />
                异常中断 // 异常_{String(currentIndex + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Question Card */}
            <div className="glass-container border border-purple-500/10 p-5 md:p-6 relative">
              <h2 className="text-lg md:text-xl font-bold leading-snug font-sans text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-100 to-neon-cyan drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                {String(currentIndex + 1).padStart(2, '0')}. {currentQuestion.title}
              </h2>
            </div>

            {/* 4 Choices */}
            <div className="space-y-3.5 pt-2">
              {(['A', 'B', 'C', 'D'] as const).map((key) => {
                const opt = currentQuestion.options[key];
                const isSelected = currentSelection === key;

                return (
                  <motion.button
                    key={key}
                    onClick={() => handleSelectOption(key)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`w-full text-left p-4 cursor-pointer select-none border flex items-start gap-4 transition-all duration-150 relative ${
                      isSelected
                        ? 'bg-neon-purple/10 border-neon-cyan shadow-[0_0_12px_rgba(67,218,226,0.15)] text-white'
                        : 'bg-glass-bg border-purple-950/50 text-gray-300 hover:border-neon-purple/50 hover:bg-glass-bg'
                    }`}
                    style={{ borderRadius: '0px' }} // HARD EDGES ONLY!
                  >
                    {/* Glowing Accent Side-Ribbon */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-cyan" />
                    )}

                    {/* Option Label Letter */}
                    <span className={`w-7 h-7 flex-shrink-0 flex items-center justify-center font-mono text-xs font-bold border transition-colors ${
                      isSelected
                        ? 'border-neon-cyan bg-neon-cyan text-black'
                        : 'border-purple-950 text-neon-cyan bg-purple-950/25'
                    }`}>
                      {key}
                    </span>

                    {/* Option Text */}
                    <span className="font-sans text-sm font-medium leading-relaxed pt-0.5 select-none">
                      {opt.text}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Technical Status Footers */}
      <div className="w-full max-w-lg mx-auto z-10 border-t border-gray-800/60 pt-4 flex flex-col gap-3">

        {/* Warning Toast Panel */}
        <div className="glass-container border border-red-950/30 bg-red-950/10 p-3 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-warning-yellow flex-shrink-0 animate-bounce" />
          <p className="font-mono text-[10px] text-gray-400 select-none leading-normal">
            <span className="text-warning-yellow font-bold">警告：</span>
            别试图对物理引擎撒谎，你的质检通知书已被锁定_
          </p>
        </div>
      </div>

      {/* Copyright Footer */}
      <div className="w-full max-w-lg mx-auto z-10 text-center mt-2">
        <p className="font-mono text-[9px] text-gray-600 leading-relaxed">
          本测试为原创作品，已申请数字版权保护。<br/>
          未经授权不得复制、转售或用于商业用途。侵权必究。<br/>
          *本测试为趣味娱乐测试，内容纯属虚构，仅供娱乐。
        </p>
      </div>
    </div>
  );
}
