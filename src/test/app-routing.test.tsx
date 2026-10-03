import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { MusicControl, QuestionButtons } from "@/components/romantic";
import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches all three experiences instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    ["/", "/letter", "/ending"].forEach((path) => {
      const matches = router.matchRoutes(path);
      expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
    });
  });

  it("keeps the playful seven-state NO flow clickable", () => {
    render(<QuestionButtons onYes={() => {}} />);
    const noButton = screen.getByRole("button", { name: "No" });
    const messages = [
      "Excuse me? 😭",
      "That was the wrong button.",
      "Nice try, Yashvi.",
      "You're reading it anyway.",
      "You're reading it anyway.",
      "You're reading it anyway.",
      "You're reading it anyway.",
    ];

    messages.forEach((message) => {
      fireEvent.click(noButton);
      expect(screen.getByText(message)).toBeInTheDocument();
    });

    fireEvent.click(noButton);
    expect(screen.getByText("You're reading it anyway.")).toBeInTheDocument();
    expect(noButton).toHaveAccessibleName("No, tiny but still clickable");
  });

  it("keeps the YES action available", () => {
    let yesCount = 0;
    render(
      <QuestionButtons
        onYes={() => {
          yesCount += 1;
        }}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /yes/i }));

    expect(yesCount).toBe(1);
  });

  it("makes the local music control available only after YES", () => {
    window.sessionStorage.removeItem("love-letter-unlocked");
    const firstRender = render(<MusicControl />);
    expect(screen.queryByRole("button", { name: /play song/i })).not.toBeInTheDocument();

    firstRender.unmount();
    window.sessionStorage.setItem("love-letter-unlocked", "true");
    render(<MusicControl />);

    expect(screen.getByRole("button", { name: /play song/i })).toBeInTheDocument();
    expect(document.querySelector("audio")).toHaveAttribute("src", "/music/until-i-found-you.mp3");
  });
});
