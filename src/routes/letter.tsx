import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useState, type ReactNode } from "react";
import {
  HeartField,
  LetterDivider,
  LetterEndingCue,
  MusicControl,
  Reveal,
} from "../components/romantic";

export const Route = createFileRoute("/letter")({
  head: () => ({
    meta: [
      { title: "A little letter back to you my darling ♡ 💌" },
      { name: "description", content: "A personal letter for Yashvi, from her idiot." },
      { property: "og:title", content: "A little letter back to you my darling ♡ 💌" },
      { property: "og:description", content: "A personal letter for Yashvi, from her idiot." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LetterPage,
});

const P = ({
  children,
  emphasis = false,
  className = "",
}: {
  children: ReactNode;
  emphasis?: boolean;
  className?: string;
}) => (
  <Reveal emphasis={emphasis} className={className}>
    <p>{children}</p>
  </Reveal>
);

function LetterPage() {
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);
  const beginEnding = useCallback(() => {
    setClosing(true);
    window.setTimeout(() => void navigate({ to: "/ending" }), 1750);
  }, [navigate]);

  return (
    <main className={`letter-page ${closing ? "is-closing" : ""}`}>
      <HeartField dense className="letter-hearts" />
      <MusicControl />
      <article className="letter-sheet">
        <header className="letter-header">
          <span className="letter-date">a reply, from my heart</span>
          <h1>A little letter back to you my darling ♡ 💌</h1>
          <div className="scribble">just for you</div>
        </header>
        <section className="letter-body">
          <Reveal className="salutation">
            <h2>Dear Yashvi,</h2>
          </Reveal>
          <P>Okayyy…...soo first of all,</P>
          <P emphasis className="moment moment-opening">
            <strong>
              what am I even supposed to say after reading all that im literallly cryying today i
              fall even more for you😭❤️&lt;3
            </strong>
          </P>
          <P>I genuinely didn't expect you to make something like this for me.</P>
          <P>And somehow you managed to make me smile(blush) like an idiot while reading it.</P>
          <P>I don't even know where to start…</P>
          <P>
            Maybe with <strong>us.</strong>
          </P>
          <P>Because yeah, we've had our fights.</P>
          <P>We've misunderstood each other.</P>
          <P>We've gotten emotional.</P>
          <P>We've said things we probably didn't mean.</P>
          <P>
            And honestly, sometimes things get so messy that I start wondering how two people can be
            this stupid and still love each other this much. 😭
          </P>
          <P>But somehow…</P>
          <P emphasis className="moment moment-still">
            <strong>it's still you.</strong>
          </P>
          <P>
            After every argument, every stupid little fight, every moment where things feel
            difficult, I still want to come back to you.
          </P>
          <P>And that probably says more than anything else ever could.</P>
          <P>You said that I stayed when things got hard.</P>
          <P>But baby…</P>
          <P emphasis className="moment moment-stayed">
            <strong>of course I stayed.</strong>
          </P>
          <P>Where else was I supposed to go?</P>
          <P>You aren't someone I only want when everything is easy.</P>
          <P>I want you on the difficult days too.</P>
          <P>When you're crying.</P>
          <P>When you're angry.</P>
          <P>When you're overthinking.</P>
          <P>When you're being annoying for absolutely no reason. 😂</P>
          <P>I want the whole you.</P>
          <P>Not just the happy version.</P>
          <P emphasis className="moment moment-you">
            <strong>You.</strong>
          </P>
          <P>And I'm really glad that after everything, we still have each other.</P>
          <LetterDivider />
          <P className="distance-start">
            And then you had to bring up the <strong>going abroad</strong> thing. 🥲
          </P>
          <P>I'm not gonna lie…</P>
          <P>That part scares me too n im still thinking about it.</P>
          <P>
            Because knowing that i'm going to be somewhere far away from you isn't exactly something
            my brain knows how to process.
          </P>
          <P>I'm going to miss your voice.</P>
          <P>Your random messages.</P>
          <P>Your stupid jokes.</P>
          <P>Your annoying teasing.</P>
          <P>Your presence.</P>
          <P>And probably most importantly…</P>
          <P emphasis className="moment moment-playful">
            <strong>your susu breaks just kidding imma miss you.</strong> 🥺❤️
          </P>
          <P>
            But even if there's distance between us, I don't want that to become an excuse for us to
            stop being <em>us</em>.
          </P>
          <P>We'll still talk.</P>
          <P>We'll still annoy each other.</P>
          <P>We'll still make stupid memories.</P>
          <P>We'll still have our little moments.</P>
          <P>And whenever i'm back…</P>
          <P>I'm collecting all the hugs and kisses you owe me.</P>
          <P emphasis className="moment moment-negotiations">
            <strong>No negotiations. 😭</strong>
          </P>
          <LetterDivider />
          <P>And YES.</P>
          <P emphasis className="moment moment-movie">
            <strong>OUR BIRTHDAY MOVIE DATE. 🎬❤️</strong>
          </P>
          <P>Avengers: Doomsday.</P>
          <P>Your's birthday.</P>
          <P>You.</P>
          <P>Me.</P>
          <P>Honestly…</P>
          <P>
            that's going to be one of those memories I'll probably remember for a really long time.
          </P>
          <P>And before you say anything—</P>
          <P emphasis>
            <strong>yes, I know you love my laptop more ahhhhhhhhhhhhhhh.</strong> 😭💻
          </P>
          <P>But don't worry.</P>
          <P>I'm dont hate it .</P>
          <P>…</P>
          <P>Okay maybe a little.</P>
          <P>That laptop gets to loved more by you than I do. 😭</P>
          <P>But remember:</P>
          <P emphasis className="moment moment-laptop">
            <strong>you may like my laptop,</strong>
          </P>
          <P emphasis className="moment moment-laptop">
            <strong>but I love you.</strong>
          </P>
          <P>So I think I win. 🤭❤️</P>
          <LetterDivider />
          <P>Thank you, Yashvi.</P>
          <P>For choosing me.</P>
          <P>For staying.</P>
          <P>For listening to me.</P>
          <P>For putting up with my nonsense.</P>
          <P>For all the random conversations that somehow turn into hours.</P>
          <P>For all the laughing.</P>
          <P>For all the teasing.</P>
          <P>For all the little moments that probably don't seem important at the time…</P>
          <P>but somehow become my favourite memories.</P>
          <P>And thank you for making this little letter for me.</P>
          <P>I don't think you realise how much that means to me.</P>
          <P>Because it's not just a website.</P>
          <P>
            It's something you made <strong>for me.</strong>
          </P>
          <P>And I'm going to keep that close to my heart.</P>
          <LetterDivider />
          <P>I don't know what our future is going to look like.</P>
          <P>I don't know where we'll be next year.</P>
          <P>I don't know how many things will change.</P>
          <P>But I know one thing.</P>
          <P emphasis className="moment moment-future">
            <strong>I want to find out with you.</strong>
          </P>
          <P>I want more birthdays.</P>
          <P>More movie dates.</P>
          <P>More late-night conversations.</P>
          <P>More random moments.</P>
          <P>More stupid jokes.</P>
          <P>More arguments that we'll eventually laugh about.</P>
          <P>More hugs.</P>
          <P>More kisses.</P>
          <P>More memories.</P>
          <P emphasis className="moment moment-more">
            More <strong>us.</strong>
          </P>
          <P>Because if there's one thing I don't want to lose…</P>
          <P>it's this.</P>
          <P emphasis className="moment moment-its-you">
            <strong>It's you. ❤️</strong>
          </P>
          <P>So yeah…</P>
          <P>This is my cheesy little way of saying:</P>
          <P emphasis className="moment moment-love">
            <strong>I love you, Yashvi.</strong>
          </P>
          <P>More than I probably know how to put into words.</P>
          <P>And if you ever forget how much you mean to me…</P>
          <P>I'll remind you.</P>
          <P>Again.</P>
          <P>And again.</P>
          <P>And again.</P>
          <P>Until you're tired of hearing it. 🥺❤️</P>
          <P>So…</P>
          <P emphasis className="moment moment-come-here">
            <strong>come here, bachcha.</strong>
          </P>
          <P>You said I might be missing your kisses…</P>
          <P>You were right. 😭💌</P>
          <P emphasis>
            <strong>I'm definitely missing them.</strong>
          </P>
          <P>And you're absolutely making up for all of them when I see you.</P>
          <LetterDivider />
          <Reveal className="signoff">
            <h3>Always yours,</h3>
            <p>
              <strong>your idiot ♡</strong>
            </p>
          </Reveal>
          <Reveal className="postscript">
            <p>
              <em>P.S. — My laptop is still my biggest rival. 💻😭</em>
            </p>
            <p>
              <em>P.P.S. — I love you more than I love making fun of you.</em>
            </p>
            <p>
              <em>P.P.P.S. — Okay fine… maybe not more than that. 🤭❤️</em>
            </p>
          </Reveal>
          <LetterDivider />
          <LetterEndingCue onReach={beginEnding} />
        </section>
      </article>
    </main>
  );
}
