import React, { useState, useEffect, useRef } from 'react';
import { Terminal, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface StartScreenProps {
  onStart: () => void;
}

const MATRIX_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`!あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんアイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';

function randomMatrixChar(): string {
  return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
}

export default function StartScreen({ onStart }: StartScreenProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [matrixColumns, setMatrixColumns] = useState<string[][]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleStart = () => {
    setIsTransitioning(true);
  };

  useEffect(() => {
    if (!isTransitioning) return;

    const cols = 40;
    const rows = 30;
    const initial: string[][] = [];
    for (let c = 0; c < cols; c++) {
      const col: string[] = [];
      for (let r = 0; r < rows; r++) {
        col.push(randomMatrixChar());
      }
      initial.push(col);
    }
    setMatrixColumns(initial);

    timerRef.current = setInterval(() => {
      setMatrixColumns(prev => {
        const next = prev.map(col => [...col]);
        const updateCount = Math.floor(cols * 0.4);
        for (let i = 0; i < updateCount; i++) {
          const c = Math.floor(Math.random() * cols);
          const r = Math.floor(Math.random() * rows);
          next[c][r] = randomMatrixChar();
        }
        return next;
      });
    }, 60);

    const timeout = setTimeout(() => {
      if (timerRef.current) clearInterval(timerRef.current);
      onStart();
    }, 2000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      clearTimeout(timeout);
    };
  }, [isTransitioning, onStart]);

  return (
    <div className="w-full min-h-screen flex flex-col justify-between p-6 md:p-10 bg-cosmic-bg relative overflow-hidden crt-scanlines">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(176,38,255,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(67,218,226,0.08),transparent_70%)] pointer-events-none" />
      
      <div className="w-full flex items-center justify-between border-b border-purple-900/40 pb-4 z-10" id="top-nav-bar">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-neon-cyan animate-pulse" />
          <span className="font-mono text-xs text-neon-cyan tracking-wider uppercase">
            SYSTEM_STATUS: ANOMALY_DETECTED
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-ping" />
          <span className="font-mono text-[10px] text-outline text-gray-400">CORE_SYNC_OK</span>
        </div>
      </div>

      {/* Main Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center my-8 max-w-lg mx-auto z-10">
        
        {/* Warning Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 px-3 py-1.5 bg-red-950/40 border border-red-500/40 text-red-400 font-mono text-[11px] mb-8 clip-angular-badge tracking-tight uppercase"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-red-500 animate-bounce" />
          <span>SYSTEM WARNING / 宇宙底层质检弹窗</span>
        </motion.div>

        {/* Glitch Subtitle */}
        <span className="font-mono text-xs text-red-400 mb-2 font-semibold bg-red-950/25 px-2 py-0.5 border-l-2 border-red-500">
          [状态码: 403 - 检测到未定义非标实体]
        </span>

        {/* Big Glitch Title */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-10 leading-tight"
        >
          <span className="block text-xl md:text-2xl text-neon-cyan mb-2 font-semibold">
            草台班子大质检：
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple glitch-shadow-cyan-purple font-black animate-glitch-shake">
            你这行乱码究竟卡出了
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-white to-warning-yellow glitch-shadow-yellow-purple font-black mt-2 animate-glitch-shake">
            什么系统异常？
          </span>
        </motion.h1>

        {/* Glassmorphic Document File Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full glass-container border border-purple-500/20 p-6 md:p-8 relative"
        >
          {/* Terminal Controls bar (Red, Yellow, Green Dots) */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="absolute top-4 right-4 font-mono text-[10px] text-gray-500 uppercase tracking-widest">
            FILE_ID: DATA_PATH // 08-ANOMALY
          </div>

          <div className="mt-6 space-y-4 text-left font-sans text-sm leading-relaxed text-gray-300">
            <p className="font-mono text-neon-cyan font-bold mb-2">
              亲爱的代码乱码：
            </p>
            <p className="indent-6">
              根据<span className="text-neon-purple font-semibold font-mono">《全宇宙草台维稳法案》</span>，本系统刚刚在底层数据库进行了一次大面积的粗口质检。结果显示，你这家伙在常规居民区里运行得极为可疑——
            </p>
            <p className="indent-6">
              你既没有安分守己地当一颗螺丝钉，也没有彻底把系统卡死，而是像一行来路不明的乱码，在这个千疮百孔的草台宇宙里到处乱窜。
            </p>
            <p className="indent-6">
              由于你脚下的物理常数已经严重超载，质检雷达决定对你执行 <span className="text-warning-yellow font-bold underline decoration-wavy">12 道极限情景数据扫描</span>。
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer / Trigger Action Button */}
      <div className="w-full max-w-sm mx-auto z-10 flex flex-col items-center gap-4 mt-6">
        <motion.button
          onClick={handleStart}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 px-6 bg-neon-cyan text-black font-mono font-bold tracking-wider text-sm md:text-base border border-neon-cyan cursor-pointer glow-cyan-btn select-none text-center active:bg-warning-yellow"
          id="btn-start-scanning"
        >
          [ 接受草台大质检，开始注入乱码 ]
        </motion.button>
        <span className="font-mono text-[10px] text-gray-500 tracking-wider">
          COSMIC_OS CORE V2.1 // DECODE_LIMIT: TRUE
        </span>
      </div>

      {/* Matrix Rain Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 bg-black overflow-hidden">
          <div 
            className="absolute inset-0 flex"
            style={{ fontFamily: '"Space Mono", monospace', fontSize: '14px', lineHeight: '1.2' }}
          >
            {matrixColumns.map((col, ci) => (
              <div key={ci} className="flex flex-col whitespace-pre" style={{ width: `${100 / matrixColumns.length}%` }}>
                {col.map((char, ri) => (
                  <span
                    key={ri}
                    className={Math.random() > 0.5 ? 'text-green-500' : 'text-red-500'}
                    style={{ 
                      opacity: Math.random() * 0.6 + 0.4,
                      textShadow: Math.random() > 0.7 
                        ? `0 0 8px ${Math.random() > 0.5 ? '#22c55e' : '#ef4444'}` 
                        : 'none'
                    }}
                  >
                    {char}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Copyright Footer */}
      <div className="w-full max-w-lg mx-auto z-10 text-center mt-6">
        <p className="font-mono text-[9px] text-gray-600 leading-relaxed">
          本测试为原创作品，已申请数字版权保护。<br/>
          未经授权不得复制、转售或用于商业用途。侵权必究。<br/>
          *本测试为趣味娱乐测试，内容纯属虚构，仅供娱乐。
        </p>
      </div>
    </div>
  );
}
