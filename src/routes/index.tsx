import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AmbientDecor, Envelope, QuestionButtons } from "../components/romantic";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "To My Bachcha ♡" },
    { name: "description", content: "A small, handmade love letter for Yashvi." },
    { property: "og:title", content: "To My Bachcha ♡" },
    { property: "og:description", content: "A small, handmade love letter for Yashvi." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [opening, setOpening] = useState(false);
  const sayYes = () => {
    if (opening) return;
    setOpening(true);
    window.setTimeout(() => void navigate({ to: "/letter" }), 1450);
  };
  return (
    <main className={`intro-page ${opening ? "is-leaving" : ""}`}>
      <AmbientDecor dense />
      <div className="intro-content">
        <p className="eyebrow">a very important note</p>
        <h1>To My Bachcha <span>♡</span></h1>
        <div className="envelope-stage"><Envelope open={opening} /></div>
        <h2>{opening ? "I knew you'd say yes ♡" : "Wanna see what your idiot wrote back? ♡"}</h2>
        {!opening && <QuestionButtons onYes={sayYes} />}
        {opening && <div className="yes-hearts" aria-hidden="true"><span>♡</span><span>♡</span><span>♡</span></div>}
      </div>
      <p className="tiny-signoff">sealed with far too many feelings</p>
    </main>
  );
}
