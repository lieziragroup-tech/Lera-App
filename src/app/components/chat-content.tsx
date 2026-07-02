import React from "react";

export function ChatContent({ content }: { content: string }) {
  const paragraphs = content.split("\n");
  
  return (
    <div className="space-y-1">
      {paragraphs.map((p, i) => {
        if (!p.trim()) return <div key={i} className="h-2" />;
        
        const parts = p.split(/(\*\*.*?\*\*)/g);
        
        return (
          <p key={i}>
            {parts.map((part, j) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={j} className="font-semibold">{part.slice(2, -2)}</strong>;
              }
              return <React.Fragment key={j}>{part}</React.Fragment>;
            })}
          </p>
        );
      })}
    </div>
  );
}