import * as THREE from "three";

/**
 * R3F v9 still does `new THREE.Clock()` when creating the canvas store.
 * Three.js r183+ deprecates Clock in favor of Timer. Clock is still exported
 * in r185 (getter-only on the ESM namespace), so we must not overwrite it.
 *
 * If Clock is missing, we install a Timer-backed compat implementation.
 * Import this file before `@react-three/fiber`.
 */

type ClockLike = {
  autoStart: boolean;
  startTime: number;
  oldTime: number;
  elapsedTime: number;
  running: boolean;
  start(): void;
  stop(): void;
  getElapsedTime(): number;
  getDelta(): number;
};

type TimerLike = {
  connect(doc: Document): void;
  disconnect(): void;
  dispose(): void;
  reset(): TimerLike;
  update(timestamp?: number): TimerLike;
  getDelta(): number;
  getElapsed(): number;
};

class ClockCompat implements ClockLike {
  autoStart: boolean;
  startTime = 0;
  oldTime = 0;
  elapsedTime = 0;
  running = false;
  private timer: TimerLike | null = null;

  constructor(autoStart = true) {
    this.autoStart = autoStart;
    const TimerCtor = (THREE as unknown as { Timer?: new () => TimerLike }).Timer;
    if (typeof TimerCtor === "function") {
      this.timer = new TimerCtor();
      if (typeof document !== "undefined") {
        this.timer.connect(document);
      }
    }
    if (autoStart) this.start();
  }

  start() {
    if (this.timer) {
      this.timer.reset();
      this.timer.update();
      this.startTime = performance.now();
      this.oldTime = this.startTime;
      this.elapsedTime = this.timer.getElapsed();
    } else {
      this.startTime = performance.now();
      this.oldTime = this.startTime;
      this.elapsedTime = 0;
    }
    this.running = true;
  }

  stop() {
    this.getElapsedTime();
    this.running = false;
    this.autoStart = false;
  }

  getElapsedTime() {
    this.getDelta();
    return this.elapsedTime;
  }

  getDelta() {
    if (this.autoStart && !this.running) {
      this.start();
      return 0;
    }
    if (!this.running) return 0;

    if (this.timer) {
      this.timer.update();
      const delta = this.timer.getDelta();
      this.oldTime = performance.now();
      this.elapsedTime = this.timer.getElapsed();
      return delta;
    }

    const now = performance.now();
    const diff = (now - this.oldTime) / 1000;
    this.oldTime = now;
    this.elapsedTime += diff;
    return diff;
  }
}

const threeNs = THREE as unknown as {
  Clock?: new (autoStart?: boolean) => ClockLike;
  setConsoleFunction?: (fn: (type: string, message: unknown, ...params: unknown[]) => void) => void;
};

try {
  if (typeof threeNs.Clock !== "function") {
    threeNs.Clock = ClockCompat;
  }
} catch {
  // ESM namespace exports are getter-only; native Clock is still available on r185.
}

if (typeof threeNs.setConsoleFunction === "function") {
  threeNs.setConsoleFunction((type, message, ...params) => {
    if (type === "warn" && String(message).includes("Clock: This module has been deprecated")) {
      return;
    }
    const fn = type === "error" ? console.error : type === "warn" ? console.warn : console.log;
    fn(message, ...params);
  });
}

export {};
