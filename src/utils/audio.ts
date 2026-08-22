// A gentle, nostalgic music-box acoustic synth using Web Audio API

class AmbientMelodyPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timer: number | null = null;
  private currentNoteIndex: number = 0;

  // Gentle, warm nostalgic pentatonic lullaby notes (Frequencies in Hz)
  private melodyNotes: { freq: number; duration: number; delay: number }[] = [
    { freq: 523.25, duration: 1.2, delay: 0 },    // C5
    { freq: 659.25, duration: 1.4, delay: 0.5 },  // E5
    { freq: 783.99, duration: 1.5, delay: 1.0 },  // G5
    { freq: 987.77, duration: 1.8, delay: 1.5 },  // B5
    { freq: 880.00, duration: 1.5, delay: 2.2 },  // A5
    { freq: 659.25, duration: 1.4, delay: 2.8 },  // E5
    { freq: 587.33, duration: 1.6, delay: 3.4 },  // D5
    { freq: 523.25, duration: 2.0, delay: 4.2 },  // C5
    // Warm chords
    { freq: 440.00, duration: 1.5, delay: 5.0 },  // A4
    { freq: 523.25, duration: 1.4, delay: 5.6 },  // C5
    { freq: 659.25, duration: 1.6, delay: 6.2 },  // E5
    { freq: 783.99, duration: 2.2, delay: 7.0 },  // G5
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private playTone(freq: number, duration: number) {
    if (!this.ctx || this.ctx.state !== 'running') return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Soft warm sine/triangle wave for music box / kalimba tone
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Low pass filter for soft dreaminess
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

      // Attack and exponential decay
      const now = this.ctx.currentTime;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration + 0.1);
    } catch {
      // Ignore audio interruptions
    }
  }

  public playConfettiChime() {
    this.initContext();
    if (!this.ctx) return;
    
    // Sparkly celebratory high chime
    const sparkleNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    sparkleNotes.forEach((freq, i) => {
      setTimeout(() => {
        this.playTone(freq, 0.8);
      }, i * 90);
    });
  }

  public playGolgappePop() {
    this.initContext();
    if (!this.ctx) return;
    
    // Fun light popping sound
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.12);
    
    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.16);
  }

  public toggle(): boolean {
    this.initContext();
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.initContext();
    this.isPlaying = true;
    this.currentNoteIndex = 0;
    this.scheduleNextLoop();
  }

  private scheduleNextLoop() {
    if (!this.isPlaying) return;

    // Play loop
    this.melodyNotes.forEach((note) => {
      setTimeout(() => {
        if (this.isPlaying) {
          this.playTone(note.freq, note.duration);
        }
      }, note.delay * 1000);
    });

    // Schedule repeat
    const totalLoopDuration = 8.5 * 1000;
    this.timer = window.setTimeout(() => {
      if (this.isPlaying) {
        this.scheduleNextLoop();
      }
    }, totalLoopDuration);
  }

  public stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const ambientMusic = new AmbientMelodyPlayer();
