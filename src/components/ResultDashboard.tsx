import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  AlertOctagon, 
  Sparkles, 
  CornerDownRight, 
  RotateCcw, 
  Share2, 
  Home,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { Personality, DIMENSIONS_INFO, TAGS_INFO } from '../data/quizData';
import RadarChart from './RadarChart';

interface ResultDashboardProps {
  personality: Personality;
  compositeScore: number;
  userScores: { R: number; A: number; E: number; I: number; C: number; U: number };
  userTags: { EX: number; MO: number; OB: number; ST: number };
  triggerTagCorrection: boolean;
  topCandidates: Array<{ name: string; id: string; S_6D: number; S_Tag: number; composite: number }>;
  onRestart: () => void;
  onGoHome: () => void;
}

export default function ResultDashboard({
  personality,
  compositeScore,
  userScores,
  userTags,
  triggerTagCorrection,
  topCandidates,
  onRestart,
  onGoHome
}: ResultDashboardProps) {
  const [activeTab, setActiveTab] = useState<'anomaly' | 'vulnerability' | 'log'>('anomaly');
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);

  // Helper to retrieve ranges for standard dimensions
  const getDimensionRangeInfo = (key: 'R' | 'A' | 'E' | 'I' | 'C' | 'U', value: number) => {
    const info = DIMENSIONS_INFO[key];
    const range = info.ranges.find(r => value >= r.min && value <= r.max) || info.ranges[0];
    return {
      label: range.label,
      desc: range.desc
    };
  };

  // Helper to retrieve ranges for behavioral tags
  const getTagRangeInfo = (key: 'EX' | 'MO' | 'OB' | 'ST', value: number) => {
    const info = TAGS_INFO[key];
    const range = info.ranges.find(r => value >= r.min && value <= r.max) || info.ranges[0];
    return {
      label: range.label,
      desc: range.desc
    };
  };

  const handleCopyShareText = () => {
    const text = `🌌 我的宇宙异常质检报告已经解密出炉！\n👉 我被诊断为: [ ${personality.name} ] (${personality.systemClass})\nBUG核心底层协议: ${personality.coreProtocol}\n${personality.shareLine}\n\n快来测测你卡出了什么宇宙异常！`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-cosmic-bg text-gray-100 p-4 md:p-8 relative overflow-hidden crt-scanlines pb-24">
      {/* Immersive background glow elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(176,38,255,0.08),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(67,218,226,0.06),transparent_70%)] pointer-events-none" />

      {/* Top Bar Navigation */}
      <div className="max-w-xl mx-auto flex items-center justify-between border-b border-gray-800 pb-4 mb-6 z-10 relative">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-neon-purple" />
          <span className="font-mono text-[11px] text-neon-purple tracking-wider uppercase">
            COSMIC_OS // PROTOCOL_BYPASS
          </span>
        </div>
        <div className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">
          © 2024 COSMIC_OS // PROTOCOL_BYPASS
        </div>
      </div>

      <div className="max-w-xl mx-auto space-y-8 z-10 relative" id="result-scrollable-container">
        
        {/* TOP COMPONENT: Big Head Title Block */}
        <div className="text-center space-y-2 mt-4">
          <span className="inline-flex items-center gap-1 font-mono text-xs text-neon-cyan uppercase tracking-widest bg-cyan-950/20 px-3 py-1 border border-neon-cyan/20">
            <Sparkles className="w-3.5 h-3.5 text-neon-cyan animate-spin" style={{ animationDuration: '6s' }} />
            草台班子质检结果
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-white to-neon-cyan uppercase glitch-shadow-cyan-purple py-2">
            {personality.id}
          </h1>
          <p className="text-xl md:text-2xl font-black text-warning-yellow tracking-tight leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            {personality.name}
          </p>
        </div>

        {/* COMPONENT 1: Core Bottom Protocol Quote Card */}
        <div className="glass-container-glow-purple p-6 text-center relative clip-angular-sm">
          {/* Cyan Corner Accents */}
          <div className="absolute top-0 right-0 w-2 h-2 bg-neon-cyan" />
          <div className="absolute bottom-0 left-0 w-2 h-2 bg-neon-cyan" />
          
          <div className="font-mono text-[9px] text-neon-purple uppercase tracking-widest mb-1.5">
            ● BUG核心底层协议
          </div>
          <p className="text-base md:text-lg font-bold font-sans italic text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-cyan to-white select-none">
            {personality.coreProtocol}
          </p>
        </div>

        {/* COMPONENT 2: Cosmic Anomaly Archive Dossier Panel */}
        <div className="glass-container border border-gray-800/80 p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
            <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
            <h3 className="font-mono text-xs text-neon-cyan uppercase tracking-widest">
              📁 宇宙异常档案
            </h3>
          </div>

          {/* Dossier Grid Details */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className="space-y-1 p-2.5 bg-gray-950/30 border-l border-purple-500/30">
              <span className="text-gray-500 block">异常编号</span>
              <span className="text-gray-200 font-bold">{personality.anomalyNo}</span>
            </div>
            <div className="space-y-1 p-2.5 bg-gray-950/30 border-l border-cyan-500/30">
              <span className="text-gray-500 block">首次记录时间</span>
              <span className="text-gray-200 font-bold">{personality.firstRecord}</span>
            </div>
            <div className="space-y-1 p-2.5 bg-gray-950/30 border-l border-warning-yellow/30">
              <span className="text-gray-500 block">异常来源</span>
              <span className="text-gray-200 font-bold">{personality.anomalySource}</span>
            </div>
            <div className="space-y-1 p-2.5 bg-gray-950/30 border-l border-purple-500/30">
              <span className="text-gray-500 block">当前状态</span>
              <span className="text-neon-cyan font-bold animate-pulse">{personality.currentStatus}</span>
            </div>
          </div>

          {/* Behavior Pattern Detection Box */}
          <div className="bg-gray-950/50 p-4 border border-gray-800/80 text-xs text-gray-300 leading-relaxed font-sans space-y-1">
            <span className="font-mono text-neon-cyan block font-semibold uppercase text-[10px] tracking-wider mb-1">
              检测到异常行为模式:
            </span>
            <p className="font-mono text-[11px] text-gray-400">
              {personality.behaviorPattern}
            </p>
          </div>
        </div>

        {/* COMPONENT 3: Narrative Character Human Descriptives */}
        <div className="glass-container border border-purple-500/10 p-6 relative">
          <div className="absolute top-0 left-0 w-3 h-1.5 bg-neon-purple" />
          <h3 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">
            人格描述
          </h3>
          <div className="space-y-4 text-sm leading-relaxed text-gray-200">
            {personality.description.map((paragraph, idx) => (
              <p key={idx} className="border-l-2 border-neon-purple/40 pl-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* COMPONENT 4: Radar Graph (Custom Polygon) */}
        <div className="glass-container border border-gray-800/80 p-6 flex flex-col items-center justify-center space-y-4">
          <div className="w-full text-center border-b border-gray-800/60 pb-3">
            <h3 className="font-sans text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-white to-neon-purple uppercase tracking-widest">
              六维异常分析
            </h3>
            <p className="font-mono text-[10px] text-gray-500 mt-1 uppercase">
              Composite Integrity Radar
            </p>
          </div>
          
          <RadarChart scores={userScores} />
        </div>

        {/* COMPONENT 5: Dimension Scale Range Details (Progress Bars) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2">
            <h3 className="font-mono text-xs text-neon-cyan uppercase tracking-widest">
              自我稳定性 {(userScores.I).toFixed(0)}
            </h3>
            <span className="font-mono text-[10px] text-gray-500 uppercase">DIMENSION_METRICS</span>
          </div>

          <div className="space-y-3.5">
            {(Object.keys(DIMENSIONS_INFO) as Array<'R' | 'A' | 'E' | 'I' | 'C' | 'U'>).map((key) => {
              const info = DIMENSIONS_INFO[key];
              const score = userScores[key];
              const range = getDimensionRangeInfo(key, score);

              // Set color gradient depending on dimension key
              let barColor = 'from-neon-cyan to-neon-purple';
              if (key === 'R' || key === 'I') barColor = 'from-neon-cyan to-blue-500';
              if (key === 'C' || key === 'A') barColor = 'from-neon-purple to-warning-yellow';

              return (
                <div key={key} className="glass-container border border-gray-800/60 p-4 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-gray-200">{info.name}</span>
                    <span className="font-mono font-bold text-neon-cyan">{Math.round(score)} / 100</span>
                  </div>

                  {/* Progress Bar with Flickering Glitch Box at End */}
                  <div className="w-full h-2 bg-gray-950 rounded-full overflow-hidden relative">
                    <div 
                      className={`h-full bg-gradient-to-r ${barColor}`}
                      style={{ width: `${score}%` }}
                    />
                    {score > 10 && (
                      <div 
                        className="absolute top-0 bottom-0 w-1.5 bg-white animate-flicker"
                        style={{ left: `calc(${score}% - 4px)` }}
                      />
                    )}
                  </div>

                  {/* Dynamic Threshold Range Interpretation Text */}
                  <div className="space-y-1 pt-1 font-sans text-xs">
                    <span className="text-warning-yellow font-bold block text-[11px] tracking-wide">
                      {range.label}
                    </span>
                    <p className="text-gray-400 text-[11px] leading-relaxed">
                      {range.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COMPONENT 6: Behavior Tags Analysis Section */}
        <div className="glass-container border border-gray-800/80 p-5 space-y-4">
          <div className="border-b border-gray-800 pb-2">
            <h3 className="font-mono text-xs text-neon-cyan uppercase tracking-widest">
              行为模式标签
            </h3>
            <p className="font-mono text-[9px] text-gray-500 uppercase tracking-widest mt-0.5">
              Trait-Based Action Paradigm
            </p>
          </div>

          <div className="space-y-4">
            {(Object.keys(TAGS_INFO) as Array<'EX' | 'MO' | 'OB' | 'ST'>).map((key) => {
              const info = TAGS_INFO[key];
              const score = userTags[key];
              const range = getTagRangeInfo(key, score);

              return (
                <div key={key} className="space-y-1 text-xs">
                  <div className="flex justify-between items-center text-[11px] font-mono">
                    <span className="font-bold text-neon-cyan uppercase">{info.name}</span>
                    <span className="text-gray-400 font-bold">{score.toFixed(1)}%</span>
                  </div>
                  
                  {/* Miniature progress track */}
                  <div className="w-full h-1 bg-gray-950 relative">
                    <div 
                      className="h-full bg-neon-cyan"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  
                  <div className="pt-0.5 space-y-0.5 font-mono text-[10px] text-gray-500 leading-normal">
                    <span className="text-gray-300 block font-semibold">{range.label}</span>
                    <p className="leading-relaxed">{range.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* TABBED INTERACTIVE COMPONENT: Special Abilities vs Flaws */}
        <div className="space-y-3">
          <div className="flex bg-gray-950/60 p-1 border border-gray-800/60 font-mono text-xs">
            <button
              onClick={() => setActiveTab('anomaly')}
              className={`flex-1 py-2 text-center cursor-pointer select-none font-bold uppercase transition-colors ${
                activeTab === 'anomaly' 
                  ? 'bg-neon-purple text-white shadow-[0_0_8px_rgba(176,38,255,0.3)]' 
                  : 'text-gray-500 hover:text-gray-200'
              }`}
            >
              ⚡ 异常能力
            </button>
            <button
              onClick={() => setActiveTab('vulnerability')}
              className={`flex-1 py-2 text-center cursor-pointer select-none font-bold uppercase transition-colors ${
                activeTab === 'vulnerability' 
                  ? 'bg-red-950/60 border border-red-500/40 text-red-400 shadow-[0_0_8px_rgba(239,68,68,0.2)]' 
                  : 'text-gray-500 hover:text-gray-200'
              }`}
            >
              ⚠ 系统漏洞
            </button>
            <button
              onClick={() => setActiveTab('log')}
              className={`flex-1 py-2 text-center cursor-pointer select-none font-bold uppercase transition-colors ${
                activeTab === 'log' 
                  ? 'bg-neon-cyan text-black' 
                  : 'text-gray-500 hover:text-gray-200'
              }`}
            >
              🔧 质检演算日志
            </button>
          </div>

          <div className="glass-container border border-gray-800/60 p-5 min-h-[140px]">
            {activeTab === 'anomaly' && (
              <div className="space-y-3">
                {personality.abilities.map((ability, idx) => (
                  <div key={idx} className="flex gap-3 text-xs leading-relaxed font-sans text-gray-200 items-start">
                    <span className="font-mono text-neon-cyan font-bold bg-cyan-950/35 px-1.5 py-0.5 border border-neon-cyan/20">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <p className="pt-0.5 font-medium">{ability}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'vulnerability' && (
              <div className="space-y-3">
                {personality.vulnerabilities.map((vul, idx) => (
                  <div key={idx} className="flex gap-3 text-xs leading-relaxed font-sans text-red-300 items-start">
                    <span className="font-mono text-red-400 font-bold bg-red-950/30 px-1.5 py-0.5 border border-red-500/20">
                      !!
                    </span>
                    <p className="pt-0.5 font-medium">{vul}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'log' && (
              <div className="space-y-2.5 font-mono text-[10px] text-gray-400 leading-relaxed">
                <div className="flex items-center justify-between text-neon-cyan border-b border-gray-800 pb-1">
                  <span>METRIC_DIVERGENCE</span>
                  <span>TRIGGERED: {triggerTagCorrection ? 'YES_TAG_CORRECTION' : 'NO_NATIVE_DOMINANT'}</span>
                </div>
                <p>🚀 十维动态矩阵判定演算成功，匹配总分：<span className="text-warning-yellow font-bold">{compositeScore.toFixed(2)}%</span>_</p>
                <p className="text-gray-500">{"[ "}{triggerTagCorrection ? '由于前三名高烈度撞车，引入 12 道题勾选标签 U_Tag 辅助终极 PK 评定' : 'Top 1 人格在内核数据上存在压倒性绝对优势，熔断退出'}{" ]"}</p>
                
                <div className="space-y-1 mt-2 bg-gray-950/45 p-2 border border-gray-900">
                  <span className="text-gray-500 block mb-1 uppercase tracking-wider text-[9px]">前三名候选异常纠缠排行:</span>
                  {topCandidates.map((cand, idx) => (
                    <div key={idx} className="flex justify-between items-center text-[9px]">
                      <span className={idx === 0 ? 'text-neon-cyan font-bold' : 'text-gray-400'}>
                        {idx + 1}. [{cand.id}] {cand.name}
                      </span>
                      <span className="text-gray-500">
                        6D: {cand.S_6D.toFixed(1)} | Tag: {cand.S_Tag.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* COMPONENT 7: Universe Easter Egg Memo Post-it Panel */}
        <div className="glass-container border-2 border-dashed border-gray-800 p-5 text-xs text-gray-400 leading-normal relative">
          <span className="font-mono text-neon-cyan block font-semibold uppercase tracking-widest text-[10px] mb-2">
            ✉ 宇宙彩蛋
          </span>
          <p className="italic font-sans text-gray-300">
            “{personality.easterEgg}”
          </p>
          <div className="text-right font-mono text-[10px] text-gray-500 mt-2">— 宇宙管理员的备注</div>
        </div>

        {/* INTERACTIVE ACTIONS BOX: Actions Bar */}
        <div className="w-full flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-800/60 z-10 relative">
          <button
            onClick={onRestart}
            className="flex-1 py-3.5 bg-transparent border border-neon-purple hover:bg-neon-purple/10 text-neon-purple font-mono font-bold text-xs flex items-center justify-center gap-2 cursor-pointer select-none active:bg-neon-purple/20"
            style={{ borderRadius: '0px' }}
          >
            <RotateCcw className="w-4 h-4" />
            <span>[ REBOOT_TEST / 重新质检 ]</span>
          </button>

          <button
            onClick={() => setShowShareModal(true)}
            className="flex-1 py-3.5 bg-neon-cyan text-black font-mono font-bold text-xs flex items-center justify-center gap-2 cursor-pointer select-none active:bg-warning-yellow hover:bg-warning-yellow"
            style={{ borderRadius: '0px' }}
          >
            <Share2 className="w-4 h-4" />
            <span>[ SHARE_ANOMALY / 导出异常 ]</span>
          </button>

          <button
            onClick={onGoHome}
            className="py-3.5 px-4 bg-gray-900 border border-gray-800 text-gray-400 hover:text-white font-mono text-xs flex items-center justify-center gap-2 cursor-pointer select-none active:bg-gray-800"
            style={{ borderRadius: '0px' }}
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Share / Export Modal Overlay */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm glass-container border border-neon-purple/40 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-2">
              <span className="font-mono text-xs text-neon-purple uppercase font-bold">EXPORT_COSMIC_DUMP</span>
              <button 
                onClick={() => setShowShareModal(false)}
                className="font-mono text-xs text-gray-500 hover:text-red-400 cursor-pointer p-1"
              >
                [ CLOSE ]
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <p className="font-mono text-neon-cyan font-bold uppercase text-[10px]">👉 异常卡一句话描述：</p>
              <div className="bg-gray-950 p-4 border border-gray-800 rounded-none font-sans text-gray-300 leading-relaxed italic">
                {personality.shareLine}
              </div>
            </div>

            <div className="bg-gray-950/50 p-4 border border-gray-900 rounded-none text-[11px] font-mono text-gray-400 space-y-1">
              <span className="text-neon-purple font-semibold block text-[10px] mb-1">📋 导出的分享文案剪贴板：</span>
              <p>我是: [ {personality.name} ]</p>
              <p>BUG协议: {personality.coreProtocol}</p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleCopyShareText}
                className="flex-1 py-3 bg-neon-cyan text-black font-mono font-bold text-xs cursor-pointer text-center flex items-center justify-center gap-1.5"
                style={{ borderRadius: '0px' }}
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-black" />
                    <span>[ COPIED_SUCCESS ]</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-black" />
                    <span>[ COPY_CLIPBOARD ]</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fixed bottom navigation mini indicator bar representing screenshot 3's bottom footer tabs */}
      <div className="fixed bottom-0 inset-x-0 bg-cosmic-bg/95 border-t border-gray-800/80 p-2.5 z-40 flex justify-around items-center text-[10px] font-mono text-gray-500 backdrop-blur-md">
        <div className="flex flex-col items-center cursor-pointer text-neon-cyan">
          <Terminal className="w-4 h-4 mb-0.5 text-neon-cyan" />
          <span>DECODE</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer text-neon-purple font-bold">
          <Cpu className="w-4 h-4 mb-0.5 text-neon-purple animate-pulse" />
          <span>ANOMALY</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-gray-300">
          <AlertOctagon className="w-4 h-4 mb-0.5" />
          <span>VULNERABILITY</span>
        </div>
        <div className="flex flex-col items-center cursor-pointer text-gray-600 hover:text-gray-300">
          <HelpCircle className="w-4 h-4 mb-0.5" />
          <span>LOG</span>
        </div>
      </div>
    </div>
  );
}
