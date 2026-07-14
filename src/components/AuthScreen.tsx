import React, { useState } from 'react';
import { Terminal, ShieldAlert, Key, AlertTriangle } from 'lucide-react';
import CryptoJS from 'crypto-js';
import { ENCRYPTED_TOKENS } from '../data/encryptedQuizData';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [inputCode, setInputCode] = useState('');
  const [error, setError] = useState('');
  const [isChecking, setIsChecking] = useState(false);

  const handleVerify = () => {
    if (!inputCode.trim()) {
      setError('请输入授权码');
      return;
    }

    setIsChecking(true);
    setError('');

    setTimeout(() => {
      try {
        const code = inputCode.trim();
        let verified = false;

        for (const encrypted of Object.values(ENCRYPTED_TOKENS)) {
          try {
            const bytes = CryptoJS.AES.decrypt(encrypted, code);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            if (decrypted.length > 0 && decrypted.includes('quiz_start')) {
              verified = true;
              break;
            }
          } catch {
            continue;
          }
        }

        if (verified) {
          localStorage.setItem('has_access_auth', CryptoJS.MD5(code).toString());
          onAuthSuccess();
        } else {
          setError('授权码未通过物理引擎核验，请重新输入');
        }
      } catch {
        setError('授权码未通过物理引擎核验，请重新输入');
      }
      setIsChecking(false);
    }, 300);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleVerify();
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between p-6 md:p-10 bg-cosmic-bg relative overflow-hidden crt-scanlines">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(176,38,255,0.12),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(67,218,226,0.08),transparent_70%)] pointer-events-none" />

      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between border-b border-purple-900/40 pb-4 z-10">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-neon-cyan animate-pulse" />
          <span className="font-mono text-xs text-neon-cyan tracking-wider">
            系统已锁定 // 需要授权
          </span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="font-mono text-[10px] text-red-400">访问受限</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto z-10 w-full">
        
        {/* Warning Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-red-950/40 border border-red-500/40 text-red-400 font-mono text-[11px] mb-6 clip-angular-badge tracking-tight uppercase">
          <ShieldAlert className="w-3.5 h-3.5 text-red-500 animate-bounce" />
          <span>RESTRICTED AREA / 受限访问</span>
        </div>

        {/* Title */}
        <h1 className="text-center text-2xl md:text-3xl font-extrabold tracking-tight mb-4">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple font-black">
            宇宙草台班子大质检
          </span>
        </h1>
        <p className="font-mono text-xs text-gray-500 mb-10 text-center uppercase tracking-wider">
          COSMIC QUALITY INSPECTION SYSTEM
        </p>

        {/* Auth Card */}
        <div className="w-full glass-container border border-purple-500/20 p-6 md:p-8 space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-3">
            <Key className="w-4 h-4 text-warning-yellow" />
            <span className="font-mono text-xs text-warning-yellow uppercase tracking-widest">
              授权码验证
            </span>
          </div>

          {/* Input */}
          <div className="space-y-2">
            <label className="font-mono text-[10px] text-gray-500 uppercase tracking-wider block">
              请输入授权码以解锁质检系统
            </label>
            <input
              type="text"
              value={inputCode}
              onChange={e => { setInputCode(e.target.value); setError(''); }}
              onKeyDown={handleKeyDown}
              placeholder="输入授权码..."
              disabled={isChecking}
              className="w-full bg-gray-950/80 border border-gray-700 text-gray-200 font-mono text-sm px-4 py-3 placeholder-gray-600 focus:outline-none focus:border-neon-cyan disabled:opacity-50"
              style={{ borderRadius: '0px' }}
              autoFocus
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 bg-red-950/20 border border-red-500/30 p-3">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span className="font-mono text-[10px] text-red-400">{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleVerify}
            disabled={isChecking}
            className="w-full py-3.5 bg-neon-cyan text-black font-mono font-bold tracking-wider text-sm border border-neon-cyan cursor-pointer hover:bg-warning-yellow disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ borderRadius: '0px' }}
          >
            {isChecking ? '[ 核验中... ]' : '[ 确认授权，启动质检系统 ]'}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full max-w-md mx-auto z-10 text-center mt-6">
        <p className="font-mono text-[9px] text-gray-600 leading-relaxed">
          本测试为原创作品，已申请数字版权保护。<br/>
          未经授权不得复制、转售或用于商业用途。侵权必究。<br/>
          *本测试为趣味娱乐测试，内容纯属虚构，仅供娱乐。
        </p>
      </div>
    </div>
  );
}
