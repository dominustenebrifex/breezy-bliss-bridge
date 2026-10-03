import { Music2, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

const heartMarks = ["♡", "♥", "✦", "♡", "·", "♥", "✧", "♡", "♥", "♡", "✦", "♡"];

export function SiteAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryStart = () => {
      if (typeof audio.play !== "function") return;
      void audio.play().catch(() => {
        // Browsers can block sound until the first user gesture.
      });
    };

    tryStart();
    document.addEventListener("pointerdown", tryStart, { once: true, passive: true });
    document.addEventListener("keydown", tryStart, { once: true });

    return () => {
      document.removeEventListener("pointerdown", tryStart);
      document.removeEventListener("keydown", tryStart);
    };
  }, []);

  return (
    <audio
      ref={audioRef}
      className="site-audio"
      src="/music/until-i-found-you.mp3"
      autoPlay
      loop
      preload="auto"
      aria-label="Until I Found You"
    />
  );
}

export function HeartField({
  dense = false,
  className = "",
}: {
  dense?: boolean;
  className?: string;
}) {
  const marks = dense ? heartMarks : heartMarks.slice(0, 7);

  return (
    <div className={`heart-field ${dense ? "is-dense" : ""} ${className}`} aria-hidden="true">
      {marks.map((mark, index) => (
        <span key={`${mark}-${index}`} style={{ "--heart-index": index } as CSSProperties}>
          {mark}
        </span>
      ))}
    </div>
  );
}

export function HeartBurst() {
  return (
    <div className="heart-burst" aria-hidden="true">
      {heartMarks.slice(0, 8).map((heart, index) => (
        <span key={`${heart}-${index}`} style={{ "--burst-index": index } as CSSProperties}>
          {heart}
        </span>
      ))}
    </div>
  );
}

export function Envelope({ open = false }: { open?: boolean }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const style = { "--envelope-x": `${tilt.x}deg`, "--envelope-y": `${tilt.y}deg` } as CSSProperties;

  return (
    <div
      className={`envelope ${open ? "is-open" : ""}`}
      aria-label={open ? "An open love letter" : "A closed love letter"}
      role="img"
      style={style}
      onPointerMove={(event) => {
        if (event.pointerType === "touch" || open) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        setTilt({
          x: ((event.clientY - bounds.top) / bounds.height - 0.5) * -4,
          y: ((event.clientX - bounds.left) / bounds.width - 0.5) * 5,
        });
      }}
      onPointerLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <div className="envelope-shadow" />
      <div className="envelope-back" />
      <div className="envelope-letter">
        <span>for you</span>
        <b>♡</b>
      </div>
      <div className="envelope-flap" />
      <div className="envelope-front" />
      <div className="envelope-seal">♡</div>
    </div>
  );
}

const noMessages = [
  "Excuse me? 😭",
  "That was the wrong button.",
  "Nice try, Yashvi.",
  "You're reading it anyway.",
  "You're reading it anyway.",
  "You're reading it anyway.",
  "You're reading it anyway.",
];

const noPositions = [
  [30, -8],
  [-35, 13],
  [42, 17],
  [-46, -4],
  [24, 25],
  [-24, 20],
  [36, -14],
] as const;

export function QuestionButtons({ onYes }: { onYes: () => void }) {
  const [clicks, setClicks] = useState(0);
  const position = clicks === 0 ? [0, 0] : (noPositions[clicks - 1] ?? noPositions[6]);
  const scale = Math.max(0.4, 1 - clicks * 0.085);

  return (
    <div className="question-actions">
      <p className="tease-message" aria-live="polite">
        {clicks ? noMessages[clicks - 1] : "Choose wisely, bachcha…"}
      </p>
      <div className="button-playground">
        <button className="yes-button" onClick={onYes}>
          YES <span aria-hidden="true">♡</span>
        </button>
        <button
          className="no-button"
          onClick={() => setClicks((value) => Math.min(value + 1, 7))}
          style={{
            transform: `translate(${position[0]}px, ${position[1]}px) rotate(${clicks * 1.1}deg) scale(${scale})`,
          }}
          aria-label={clicks === 7 ? "No, tiny but still clickable" : "No"}
        >
          NO
        </button>
      </div>
    </div>
  );
}

export function MusicControl() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    setIsUnlocked(window.sessionStorage.getItem("love-letter-unlocked") === "true");
  }, []);

  useEffect(() => {
    if (!isUnlocked) return;
    const audio = document.querySelector<HTMLAudioElement>(".site-audio");
    if (!audio) return;
    const syncState = () => setIsPlaying(!audio.paused);
    const handleError = () => setIsAvailable(false);
    syncState();
    audio.addEventListener("play", syncState);
    audio.addEventListener("pause", syncState);
    audio.addEventListener("error", handleError);
    return () => {
      audio.removeEventListener("play", syncState);
      audio.removeEventListener("pause", syncState);
      audio.removeEventListener("error", handleError);
    };
  }, [isUnlocked]);

  if (!isUnlocked) return null;

  const toggleMusic = async () => {
    const audio = document.querySelector<HTMLAudioElement>(".site-audio");
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsAvailable(false);
      }
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  return (
    <>
      <button
        className={`music-control ${isPlaying ? "is-playing" : ""}`}
        disabled={!isAvailable}
        onClick={() => void toggleMusic()}
        aria-pressed={isPlaying}
        title={
          isAvailable
            ? isPlaying
              ? "Pause Until I Found You"
              : "Play Until I Found You"
            : "Music unavailable"
        }
      >
        {isAvailable ? (
          isPlaying ? (
            <Pause size={15} aria-hidden="true" />
          ) : (
            <Play size={15} aria-hidden="true" />
          )
        ) : (
          <Music2 size={15} aria-hidden="true" />
        )}
        <span>{isAvailable ? (isPlaying ? "pause song" : "play song") : "music unavailable"}</span>
      </button>
    </>
  );
}

export function Reveal({
  children,
  emphasis = false,
  className = "",
}: {
  children: ReactNode;
  emphasis?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "is-visible" : ""} ${emphasis ? "emphasis" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

export function LetterDivider({ className = "" }: { className?: string }) {
  return (
    <Reveal className={`letter-divider ${className}`}>
      <span />♡<span />
    </Reveal>
  );
}

export function LetterEndingCue({ onReach }: { onReach: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || triggered.current) return;
        if (window.sessionStorage.getItem("letter-ending-seen") === "true") return;
        triggered.current = true;
        window.sessionStorage.setItem("letter-ending-seen", "true");
        onReach();
        observer.disconnect();
      },
      { threshold: 0.7 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [onReach]);

  return (
    <div ref={ref} className="letter-ending-cue" aria-hidden="true">
      <span />
      <i>♡</i>
      <span />
    </div>
  );
}
