import { useSyncExternalStore } from 'react';

/**
 * Shared sound state for the home hero video, so the mute button can live in the nav bar.
 *
 * The video tries to start with sound. Browsers refuse that for most first visits, so when
 * they do it plays muted and the sound comes on with the visitor's first tap, click or key press.
 * Scrolling away from the hero silences it; coming back restores it unless the visitor muted it.
 */
type HeroSoundState = { available: boolean; muted: boolean };

let state: HeroSoundState = { available: false, muted: true };
let video: HTMLVideoElement | null = null;
let unlocked = false;
// True while the first play-with-sound attempt is still pending; nothing may mute the video meanwhile.
let attempting = false;
let userMuted = false;
let inView = true;
const listeners = new Set<() => void>();
const GESTURES = ['pointerdown', 'keydown', 'touchend'] as const;

function sync() {
  const next = { available: video !== null, muted: video ? video.muted : true };
  if (next.available !== state.available || next.muted !== state.muted) {
    state = next;
    listeners.forEach((listener) => listener());
  }
}

function apply() {
  if (!video || attempting) return sync();
  video.muted = userMuted || !inView || !unlocked;
  if (video.paused) void video.play().catch(() => {});
  sync();
}

function onGesture(event: Event) {
  // A press on the mute button itself is handled by toggleHeroSound.
  if ((event.target as Element | null)?.closest?.('[data-hero-sound-toggle]')) return;
  unlocked = true;
  removeGestureListeners();
  apply();
}

function removeGestureListeners() {
  GESTURES.forEach((type) => document.removeEventListener(type, onGesture, true));
}

export function attachHeroVideo(element: HTMLVideoElement) {
  video = element;
  userMuted = false;
  inView = true;
  unlocked = false;
  attempting = true;
  // First attempt: play with sound, exactly as a plain unmuted <video autoplay> would.
  element.muted = false;
  element
    .play()
    .then(() => {
      if (video !== element) return;
      attempting = false;
      unlocked = true;
      apply();
    })
    .catch(() => {
      // The browser refused sound: keep the picture moving silently and turn sound on at the first gesture.
      if (video !== element) return;
      attempting = false;
      element.muted = true;
      void element.play().catch(() => {});
      GESTURES.forEach((type) => document.addEventListener(type, onGesture, true));
      sync();
    });
  sync();
}

export function detachHeroVideo(element: HTMLVideoElement) {
  if (video !== element) return;
  removeGestureListeners();
  video = null;
  sync();
}

export function setHeroInView(visible: boolean) {
  inView = visible;
  apply();
}

export function toggleHeroSound() {
  if (!video) return;
  if (video.muted) {
    userMuted = false;
    unlocked = true;
    removeGestureListeners();
  } else {
    userMuted = true;
  }
  apply();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useHeroSound() {
  return useSyncExternalStore(subscribe, () => state, () => state);
}
