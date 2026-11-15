export type GlitchIntensity = 'light' | 'medium' | 'heavy';

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AudioContextClass =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return null;

  if (!audioCtx) {
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    void audioCtx.resume();
  }
  return audioCtx;
}

export function playGlitchSFX(enabled: boolean, intensity: GlitchIntensity = 'medium'): void {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const bursts = intensity === 'heavy' ? 4 : intensity === 'medium' ? 3 : 2;
    const baseVolume = intensity === 'heavy' ? 0.1 : intensity === 'medium' ? 0.07 : 0.038;

    // 1. Stuttered Digital Square/Sawtooth Pitch Drops through Bandpass Filter
    for (let i = 0; i < bursts; i += 1) {
      const startOffset = i * (0.028 + Math.random() * 0.018);
      const duration = 0.025 + Math.random() * 0.03;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = Math.random() > 0.45 ? 'sawtooth' : 'square';
      const startFreq = 260 + Math.random() * 1450;
      const endFreq = Math.random() > 0.5 ? startFreq * 0.25 : startFreq * 2.1;

      osc.frequency.setValueAtTime(startFreq, now + startOffset);
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(45, endFreq),
        now + startOffset + duration
      );

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200 + Math.random() * 1800, now + startOffset);
      filter.Q.setValueAtTime(3.5, now + startOffset);

      gain.gain.setValueAtTime(baseVolume, now + startOffset);
      gain.gain.exponentialRampToValueAtTime(0.0008, now + startOffset + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + startOffset);
      osc.stop(now + startOffset + duration);
    }

    // 2. Quantized Sample-and-Hold Bit-Crushed Static Noise Pop
    const noiseDuration = intensity === 'heavy' ? 0.09 : 0.045;
    const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * noiseDuration));
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    let holdSample = 0;
    const step = Math.floor(4 + Math.random() * 8);
    for (let i = 0; i < bufferSize; i += 1) {
      if (i % step === 0) {
        holdSample = Math.random() * 2 - 1;
      }
      output[i] = holdSample;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(1800, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(baseVolume * 0.7, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0005, now + noiseDuration);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + noiseDuration);
  } catch {
    // Ignore audio context errors on restricted browsers
  }
}
