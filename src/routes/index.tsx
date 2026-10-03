import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Envelope, HeartBurst, HeartField, QuestionButtons } from "../components/romantic";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "To My Bachcha ♡" },
      { name: "description", content: "A small, handmade love letter for Yashvi." },
      { property: "og:title", content: "To My Bachcha ♡" },
      { property: "og:description", content: "A small, handmade love letter for Yashvi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [opening, setOpening] = useState(false);
  const sayYes = () => {
    if (opening) return;
    window.sessionStorage.setItem("love-letter-unlocked", "true");
    window.sessionStorage.removeItem("letter-ending-seen");
    setOpening(true);
    window.setTimeout(() => void navigate({ to: "/letter" }), 1900);
  };
  return (
    <main className={`intro-page ${opening ? "is-leaving" : ""}`}>
      <HeartField dense />
      <div className="intro-content">
        <p className="eyebrow intro-kicker">a very important note</p>
        <h1>
          <span>To My</span> Bachcha <i>♡</i>
        </h1>
        <div className="envelope-stage">
          <Envelope open={opening} />
        </div>
        <h2>{opening ? "I knew you'd say yes ♡" : "Wanna see what your idiot wrote back? ♡"}</h2>
        {!opening && <QuestionButtons onYes={sayYes} />}
        {opening && <HeartBurst />}
      </div>
      <p className="tiny-signoff">sealed with far too many feelings</p>
    </main>
  );
}
