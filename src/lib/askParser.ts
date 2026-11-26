export interface AnswerBlock {
  num: number;
  heading: string;
  body: string;
}

/**
 * Splits a streamed portfolio RAG response into clean structured blocks.
 * Handles numbered sections (`1. Heading\nBody`), plain paragraphs, and
 * partially streamed chunks gracefully.
 */
export function parseAnswerBlocks(text: string): AnswerBlock[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  return trimmed
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk, idx) => {
      const lines = chunk
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean);

      if (lines.length === 1) {
        return {
          num: idx + 1,
          heading: '',
          body: lines[0].replace(/^\d+\.\s*/, '').trim(),
        };
      }

      const heading = lines[0]
        .replace(/^\d+\.\s*/, '')
        .replace(/^\*\*|\*\*$/g, '')
        .trim();
      const body = lines.slice(1).join(' ').trim();

      return {
        num: idx + 1,
        heading,
        body: body || heading,
      };
    });
}
