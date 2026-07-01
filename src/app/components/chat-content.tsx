import { Fragment } from "react";

/**
 * Renders a chat message's markdown-ish content (Terra's replies use
 * **bold**, bullet lines, and line breaks) as styled React nodes.
 *
 * This component is intentionally lightweight — no markdown parser
 * dependency — since Terra's fallback/AI responses only ever use a small,
 * predictable subset of formatting.
 */
export function ChatContent({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <>
      {lines.map((line, i) => {
        const trimmed = line.trim();
        const isBullet = trimmed.startsWith("• ") || trimmed.startsWith("- ") || /^\d+\.\s/.test(trimmed);

        return (
          <Fragment key={i}>
            {i > 0 && <br />}
            <span className={isBullet ? "block pl-1" : undefined}>{renderInline(line)}</span>
          </Fragment>
        );
      })}
    </>
  );
}

/** Renders **bold** segments within a single line of text. */
function renderInline(line: string) {
  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}