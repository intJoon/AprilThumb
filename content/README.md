# AprilThumb content

This tree contains study and coursework prompts intended for copy-and-paste use in ChatGPT and Gemini. The current product scope is **24 tracks × 6 locales × 6 prompt roles**.

## Quick start

1. Select a language and discipline at `https://aprilthumb.vercel.app`.
2. Copy one prompt that matches the task.
3. Paste it as the first message in a new ChatGPT or Gemini conversation.
4. Send the assignment, draft, or question.

Keep different roles in separate conversations. For example, do not mix academic assessment with study-companion support.

## ChatGPT

- Paste the full prompt as the first message of each new chat.
- For frequently used prompts, place the prompt in Custom GPT instructions.

## Gemini

- Copy the full prompt into Gem instructions.
- Alternatively, paste it at the start of a conversation and ask Gemini to follow it.

## Prompt roles

| Role | Purpose |
|---|---|
| `academic-review` | Review coursework against a rubric before submission |
| `source-check` | Check whether references and URLs support the stated claims |
| `concise-mode` | Compress verbose answers without dropping technical content |
| `writing-review` | Identify gaps in a draft's reasoning and evidence |
| `presentation` | Plan presentation structure and readability |
| `study-companion` | Support study planning and concept understanding |

## Safety

- AI does not replace medical diagnosis or treatment. Seek professional or emergency help for urgent health or self-harm risks.
- Source checking is a keyword- and abstract-level heuristic. Verify important figures and clinical claims against the original source.
- Academic review can suggest iterative revisions for up to 10 rounds and must report uncertainty honestly.

## Generation rules

- `content/manifest.json` defines tracks, locales, and prompt roles.
- `content/i18n/` contains UI strings.
- `content/tracks/{track}/{locale}/guide.md` and `prompts/*.md` are generated.
- Do not edit generated files directly. Change the sources and generators under `scripts/lib/`, then run `npm run build`.
