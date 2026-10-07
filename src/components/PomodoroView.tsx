import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  Volume2,
  VolumeX,
  Sparkles,
  CheckCircle2,
  Headphones,
  Sliders,
  Flame,
  Award
} from 'lucide-react';
import { soundManager } from '../utils/audio';

interface PomodoroViewProps {
  onCompleteSession: (minutes: number) => void;
}

type PomodoroMode = 'work' | 'shortBreak' | 'longBreak';

export const PomodoroView: React.FC<PomodoroViewProps> = ({ onCompleteSession }) => {
  const [mode, setMode] = useState<PomodoroMode>('work');
  const [workMinutes, setWorkMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);

  const [timeLeft, setTimeLeft] = useState(workMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [cyclesCompleted, setCyclesCompleted] = useState(0);

  // Ambient sound selector: 'none' | 'whitenoise' | 'rain' | 'binaural'
  const [ambientSound, setAmbientSound] = useState<'none' | 'whitenoise' | 'rain' | 'binaural'>('none');
  const [ambientVolume, setAmbientVolume] = useState(0.25);
  const [soundAlerts, setSoundAlerts] = useState(true);

  // Subject label for current focus
  const [currentTopic, setCurrentTopic] = useState('Estrutura de Dados & Algoritmos');

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const getTotalTimeForMode = (m: PomodoroMode) => {
    if (m === 'work') return workMinutes * 60;
    if (m === 'shortBreak') return shortBreakMinutes * 60;
    return longBreakMinutes * 60;
  };

  // Switch mode
  const handleSwitchMode = (newMode: PomodoroMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(getTotalTimeForMode(newMode));
  };

  // Start / Pause
  const toggleTimer = () => {
    setIsRunning(!isRunning);
    if (!isRunning && ambientSound !== 'none') {
      soundManager.startAmbient(ambientSound, ambientVolume);
    } else if (isRunning) {
      soundManager.stopAmbient();
    }
  };

  // Reset
  const resetTimer = () => {
    setIsRunning(false);
    soundManager.stopAmbient();
    setTimeLeft(getTotalTimeForMode(mode));
  };

  // Skip cycle
  const skipCycle = () => {
    setIsRunning(false);
    soundManager.stopAmbient();
    if (mode === 'work') {
      const nextCycles = cyclesCompleted + 1;
      setCyclesCompleted(nextCycles);
      onCompleteSession(workMinutes);
      if (nextCycles % 4 === 0) {
        handleSwitchMode('longBreak');
      } else {
        handleSwitchMode('shortBreak');
      }
    } else {
      handleSwitchMode('work');
    }
  };

  // Timer Tick Effect
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsRunning(false);
            soundManager.stopAmbient();

            if (soundAlerts) {
              soundManager.playTimerBell();
            }

            if (mode === 'work') {
              const nextCycles = cyclesCompleted + 1;
              setCyclesCompleted(nextCycles);
              onCompleteSession(workMinutes);
              if (nextCycles % 4 === 0) {
                setMode('longBreak');
                return longBreakMinutes * 60;
              } else {
                setMode('shortBreak');
                return shortBreakMinutes * 60;
              }
            } else {
              setMode('work');
              return workMinutes * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, mode, workMinutes, shortBreakMinutes, longBreakMinutes, cyclesCompleted, soundAlerts]);

  // Ambient sound handler
  const handleAmbientChange = (type: 'none' | 'whitenoise' | 'rain' | 'binaural') => {
    setAmbientSound(type);
    if (type === 'none' || !isRunning) {
      soundManager.stopAmbient();
    } else {
      soundManager.startAmbient(type, ambientVolume);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const totalCurrentSeconds = getTotalTimeForMode(mode);
  const progressPercent = ((totalCurrentSeconds - timeLeft) / totalCurrentSeconds) * 100;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12 sm:space-y-16 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200 dark:border-cyan-800 text-cyan-800 dark:text-cyan-300">
          <Clock className="w-3.5 h-3.5" />
          <span>Foco & Produtividade Contínua</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Cronômetro Pomodoro
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
          Mantenha a mente afiada alternando blocos de foco intenso com pausas regenerativas.
        </p>
      </div>

      {/* Main Timer Display Box */}
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-6 sm:p-10 shadow-lg text-center space-y-8 relative overflow-hidden">
        {/* Mode Selector Tabs */}
        <div className="inline-flex rounded-xl p-1 bg-zinc-100 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
          <button
            id="pomodoro-mode-work-btn"
            type="button"
            onClick={() => handleSwitchMode('work')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              mode === 'work'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Foco ({workMinutes}m)
          </button>
          <button
            id="pomodoro-mode-short-btn"
            type="button"
            onClick={() => handleSwitchMode('shortBreak')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              mode === 'shortBreak'
                ? 'bg-cyan-600 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Pausa Curta ({shortBreakMinutes}m)
          </button>
          <button
            id="pomodoro-mode-long-btn"
            type="button"
            onClick={() => handleSwitchMode('longBreak')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              mode === 'longBreak'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Pausa Longa ({longBreakMinutes}m)
          </button>
        </div>

        {/* Circular Countdown Progress */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            {/* Background track circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className="stroke-zinc-100 dark:stroke-zinc-800 fill-none"
              strokeWidth="5"
            />
            {/* Animated progress circle */}
            <circle
              cx="50"
              cy="50"
              r="44"
              className={`fill-none transition-all duration-1000 ${
                mode === 'work'
                  ? 'stroke-emerald-500'
                  : mode === 'shortBreak'
                  ? 'stroke-cyan-500'
                  : 'stroke-indigo-500'
              }`}
              strokeWidth="5"
              strokeDasharray="276.46"
              strokeDashoffset={276.46 - (276.46 * progressPercent) / 100}
              strokeLinecap="round"
            />
          </svg>

          {/* Time Center text */}
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-4xl sm:text-5xl font-mono font-extrabold tracking-tight text-zinc-900 dark:text-white">
              {formattedTime}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mt-1">
              {mode === 'work' ? 'Sessão de Foco' : 'Momento de Descanso'}
            </span>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
              Ciclo {cyclesCompleted + 1} de 4
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            id="pomodoro-reset-btn"
            type="button"
            onClick={resetTimer}
            className="p-3.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 transition-colors"
            title="Reiniciar tempo"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            id="pomodoro-toggle-btn"
            type="button"
            onClick={toggleTimer}
            className={`px-8 py-3.5 rounded-2xl text-white font-bold text-base shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-500/20'
                : mode === 'work'
                ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/25'
                : 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-500/25'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-5 h-5 fill-current" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 fill-current" />
                <span>{progressPercent > 0 ? 'Continuar' : 'Iniciar Foco'}</span>
              </>
            )}
          </button>

          <button
            id="pomodoro-skip-btn"
            type="button"
            onClick={skipCycle}
            className="p-3.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 transition-colors"
            title="Pular ciclo"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Current Topic Input */}
        <div className="max-w-md mx-auto pt-2">
          <label className="block text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1">
            Matéria em estudo nesta sessão:
          </label>
          <input
            id="pomodoro-subject-input"
            type="text"
            value={currentTopic}
            onChange={(e) => setCurrentTopic(e.target.value)}
            className="w-full px-3 py-1.5 text-xs text-center rounded-lg border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-white"
            placeholder="Ex: Lógica de Programação, Estrutura de Dados..."
          />
        </div>
      </div>

      {/* Focus Audio & Preset Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ambient Synthesizer Box */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Headphones className="w-4 h-4 text-cyan-500" />
              <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                Frequências & Sons de Concentração
              </h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">Web Audio Sintetizado</span>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Sons gerados internamente sem internet para bloquear ruídos externos e aumentar a retenção.
          </p>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'none', label: 'Sem Som' },
              { id: 'whitenoise', label: 'Ruído Branco' },
              { id: 'rain', label: 'Chuva Suave' },
              { id: 'binaural', label: 'Onda 40Hz Gamma' },
            ].map((snd) => (
              <button
                key={snd.id}
                type="button"
                onClick={() => handleAmbientChange(snd.id as any)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-all text-left ${
                  ambientSound === snd.id
                    ? 'bg-cyan-50 dark:bg-cyan-950/60 border-cyan-500 text-cyan-700 dark:text-cyan-300 ring-2 ring-cyan-500/20'
                    : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
                }`}
              >
                {snd.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-400">
            <span>Sino de Conclusão:</span>
            <button
              type="button"
              onClick={() => setSoundAlerts(!soundAlerts)}
              className={`px-2.5 py-1 rounded text-xs font-semibold ${
                soundAlerts
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
              }`}
            >
              {soundAlerts ? 'Ativado (Digital Bell)' : 'Mudo'}
            </button>
          </div>
        </div>

        {/* Custom Durations Presets */}
        <div className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-500" />
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              Ajuste de Duração das Sessões
            </h3>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                <span>Tempo de Foco</span>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">
                  {workMinutes} min
                </span>
              </div>
              <div className="flex gap-2">
                {[15, 25, 45, 50].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => {
                      setWorkMinutes(mins);
                      if (mode === 'work') setTimeLeft(mins * 60);
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold border ${
                      workMinutes === mins
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1">
                <span>Pausa Curta</span>
                <span className="font-mono font-bold text-zinc-900 dark:text-white">
                  {shortBreakMinutes} min
                </span>
              </div>
              <div className="flex gap-2">
                {[3, 5, 10].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => {
                      setShortBreakMinutes(mins);
                      if (mode === 'shortBreak') setTimeLeft(mins * 60);
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-semibold border ${
                      shortBreakMinutes === mins
                        ? 'bg-cyan-600 text-white border-cyan-600'
                        : 'bg-zinc-50 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
