import { createFileRoute } from "@tanstack/react-router";
import { AmbientDecor } from "../components/romantic";

export const Route = createFileRoute("/ending")({
  head: () => ({ meta: [
    { title: "Always yours ♡" },
    { name: "description", content: "One last little message for Yashvi." },
    { property: "og:title", content: "Always yours ♡" },
    { property: "og:description", content: "One last little message for Yashvi." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
  ] }),
  component: EndingPage,
});

function EndingPage() {
  return <main className="ending-page">
    <AmbientDecor dense />
    <div className="ending-message">
      <span className="ending-heart" aria-hidden="true">♡</span>
      <p className="eyebrow">always, always</p>
      <h1>I love you, Yashvi. ♡</h1>
      <h2>Now go away. 😭</h2>
      <div className="ending-notes"><p>That's all for now. ♡</p><p>See you soon, bachcha.</p></div>
      <strong>There will be more soon. ♡</strong>
    </div>
  </main>;
}
