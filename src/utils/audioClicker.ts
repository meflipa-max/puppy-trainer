/**
 * Web Audio API synthesizer for an authentic dog training clicker.
 * Simulates the dual-tone click-clack of a classic metal tongue clicker.
 */

class ClickerAudio {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public playClick(): void {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;

      // 1. Initial Press Down Click (Higher frequency snap)
      this.createSnap(now, 2600, 0.015, 0.4);

      // 2. Release Clack (Slightly lower frequency tone, ~40ms later)
      this.createSnap(now + 0.045, 1950, 0.02, 0.3);

      // Haptic feedback if supported on mobile
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try {
          navigator.vibrate([18, 25, 20]);
        } catch {
          // Ignore vibration permission errors
        }
      }
    } catch (e) {
      console.warn('Audio clicker error:', e);
    }
  }

  private createSnap(time: number, freq: number, duration: number, gainVal: number) {
    if (!this.ctx) return;

    // Filtered noise impulse + tuned oscillator for metallic resonance
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, time + duration);

    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + duration);
  }
}

export const clickerAudio = new ClickerAudio();
