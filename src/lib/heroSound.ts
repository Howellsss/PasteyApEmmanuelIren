import { useSyncExternalStore } from 'react';

/**
 * Shared sound state for the home hero video, so the mute button can live in the nav bar.
 *
 * The video tries to start with sound. When the browser refuses (it only allows sound after the
 * visitor has pressed something on the site), `needsEntry` turns on and the home page shows its
 * welcome screen; pressing Enter, or any first tap, click or key press, restarts the video from the
 * top with sound. Scrolling away from the hero silences it; coming back restores it unless muted.
 */
type HeroSoundState = { available: boolean; muted: boolean; needsEntry: boolean };

let state: HeroSoundState = { available: false, muted: true, needsEntry: false };
let video: HTMLVideoElement | null = null;
let unlocked = false;
// True while the first play-with-sound attempt is still pending; nothing may mute the video meanwhile.
let attempting = false;
let needsEntry = false;
let userMuted = false;
let inView = true;
const listeners = new Set<() => void>();
const GESTURES = ['pointerdown', 'keydown', 'touchend'] as const;

function sync() {
  const next = { available: video !== null, muted: video ? video.muted : true, needsEntry };
  if (
    next.available !== state.available ||
    next.muted !== state.muted ||
    next.needsEntry !== state.needsEntry
  ) {
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

function removeGestureListeners() {
  GESTURES.forEach((type) => document.removeEventListener(type, onGesture, true));
}

function onGesture(event: Event) {
  // A press on the mute button itself is handled by toggleHeroSound.
  if ((event.target as Element | null)?.closest?.('[data-hero-sound-toggle]')) return;
  enterWithSound();
}

/** The visitor's first press: sound on, and the message starts again from the top so none of it is missed. */
export function enterWithSound() {
  removeGestureListeners();
  unlocked = true;
  userMuted = false;
  if (video && needsEntry) video.currentTime = 0;
  needsEntry = false;
  apply();
}

export function attachHeroVideo(element: HTMLVideoElement) {
  video = element;
  userMuted = false;
  inView = true;
  unlocked = false;
  needsEntry = false;
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
      // The browser refused sound: keep the picture moving silently behind the welcome screen.
      if (video !== element) return;
      attempting = false;
      needsEntry = true;
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
  needsEntry = false;
  sync();
}

export function setHeroInView(visible: boolean) {
  inView = visible;
  apply();
}

export function toggleHeroSound() {
  if (!video) return;
  if (video.muted) {
    enterWithSound();
  } else {
    userMuted = true;
    apply();
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useHeroSound() {
  return useSyncExternalStore(subscribe, () => state, () => state);
}
