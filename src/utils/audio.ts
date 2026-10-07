// Web Audio API Synthesizer for notifications and focus ambient noise

class SoundManager {
  private ctx: AudioContext | null = null;
  private ambientSource: AudioNode | null = null;
  private ambientGain: GainNode | null = null;
  private isAmbientPlaying = false;

  private initCtx() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a pleasant digital chime on Pomodoro completion
  playTimerBell() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15); // A5
      osc.frequency.exponentialRampToValueAtTime(1174.66, now + 0.35); // D6

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.35, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 1.2);

      // Second harmonic overtone
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1760, now + 0.05); // A6
      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.linearRampToValueAtTime(0.12, now + 0.1);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.9);

      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);

      osc2.start(now + 0.05);
      osc2.stop(now + 0.95);
    } catch (e) {
      console.warn("Audio playback failed:", e);
    }
  }

  // Start ambient focus noise (whitenoise, rain, binaural 40Hz focus)
  startAmbient(type: 'whitenoise' | 'rain' | 'binaural', volume = 0.2) {
    this.stopAmbient();
    try {
      this.initCtx();
      if (!this.ctx) return;

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(volume, this.ctx.currentTime);
      this.ambientGain.connect(this.ctx.destination);

      if (type === 'whitenoise' || type === 'rain') {
        const bufferSize = 2 * this.ctx.sampleRate;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          if (type === 'rain') {
            // Pink/Brownish noise for soft rain simulation
            lastOut = (lastOut + 0.02 * white) / 1.02;
            output[i] = lastOut * 3.5;
          } else {
            // Soft white noise
            output[i] = white * 0.15;
          }
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Filter to make sound organic
        const filter = this.ctx.createBiquadFilter();
        filter.type = type === 'rain' ? 'lowpass' : 'bandpass';
        filter.frequency.value = type === 'rain' ? 800 : 1200;

        whiteNoise.connect(filter);
        filter.connect(this.ambientGain);

        whiteNoise.start(0);
        this.ambientSource = whiteNoise;
      } else if (type === 'binaural') {
        // 40Hz Gamma Focus Frequency (180Hz base & 220Hz binaural blend)
        const osc = this.ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.value = 196.00; // G3 deep calming wave

        const lfo = this.ctx.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.value = 40; // 40Hz Gamma wave for deep cognitive concentration

        const lfoGain = this.ctx.createGain();
        lfoGain.gain.value = 0.05;

        lfo.connect(osc.frequency);
        osc.connect(this.ambientGain);

        osc.start(0);
        lfo.start(0);
        this.ambientSource = osc;
      }

      this.isAmbientPlaying = true;
    } catch (e) {
      console.warn("Ambient audio failed:", e);
    }
  }

  stopAmbient() {
    if (this.ambientSource) {
      try {
        (this.ambientSource as any).stop?.();
        this.ambientSource.disconnect();
      } catch (e) {
        // ignore
      }
      this.ambientSource = null;
    }
    if (this.ambientGain) {
      this.ambientGain.disconnect();
      this.ambientGain = null;
    }
    this.isAmbientPlaying = false;
  }

  getIsPlaying() {
    return this.isAmbientPlaying;
  }
}

export const soundManager = new SoundManager();
