import { Link } from "@tanstack/react-router";
import { Music2 } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function AmbientDecor({ dense = false }: { dense?: boolean }) {
  const marks = dense ? ["♡", "✦", "♡", "·", "✧", "♡", "✦", "♡"] : ["♡", "✦", "♡", "✧", "♡"];
  return <div className="ambient" aria-hidden="true">{marks.map((mark, index) => <span key={index} style={{ "--i": index } as React.CSSProperties}>{mark}</span>)}</div>;
}

export function Envelope({ open = false }: { open?: boolean }) {
  return (
    <div className={`envelope ${open ? "is-open" : ""}`} aria-label={open ? "An open love letter" : "A closed love letter"} role="img">
      <div className="envelope-back" />
      <div className="envelope-letter"><span>for you</span><b>♡</b></div>
      <div className="envelope-flap" />
      <div className="envelope-front" />
      <div className="envelope-seal">♡</div>
    </div>
  );
}

const noMessages = ["Excuse me? 😭", "That was the wrong button.", "Nice try, Yashvi.", "You're reading it anyway.", "You're reading it anyway.", "You're reading it anyway.", "You're reading it anyway."];
const positions = [[0,0], [32,-8], [-38,12], [48,18], [-50,-4], [28,26], [-22,22], [42,-14]];

export function QuestionButtons({ onYes }: { onYes: () => void }) {
  const [count, setCount] = useState(0);
  const position = positions[count] ?? positions[positions.length - 1];
  const scale = Math.max(0.38, 1 - count * 0.09);
  return (
    <div className="question-actions">
      <p className="tease-message" aria-live="polite">{count ? noMessages[count - 1] : "Choose wisely, bachcha…"}</p>
      <div className="button-playground">
        <button className="yes-button" onClick={onYes}>YES ♡</button>
        <button
          className="no-button"
          onClick={() => setCount((value) => Math.min(value + 1, 7))}
          style={{ transform: `translate(${position[0]}px, ${position[1]}px) scale(${scale})` }}
          aria-label={count === 7 ? "No, tiny but still clickable" : "No"}
        >NO</button>
      </div>
    </div>
  );
}

export function MusicControl() {
  return <button className="music-control" disabled title="Music is unavailable until an audio file is added"><Music2 size={15} aria-hidden="true" /><span>music unavailable</span></button>;
}

export function Reveal({ children, emphasis = false, className = "" }: { children: ReactNode; emphasis?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShown(true); observer.disconnect(); }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${shown ? "is-visible" : ""} ${emphasis ? "emphasis" : ""} ${className}`}>{children}</div>;
}

export function LetterDivider() {
  return <Reveal className="letter-divider"><span />♡<span /></Reveal>;
}

export function EndingLink() {
  return <Reveal className="ending-link"><Link to="/ending">one last little thing <span>♡</span></Link></Reveal>;
}
