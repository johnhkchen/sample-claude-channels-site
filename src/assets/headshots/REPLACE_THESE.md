# Headshot Placeholders

Drop in cropped headshots to replace these placeholders. Astro resizes at build time (72px @2x).
Keep the filenames exactly as-is.

| File                    | Person             | Where to find                                              |
|-------------------------|--------------------|------------------------------------------------------------|
| andrej-karpathy.png     | Andrej Karpathy    | X/Twitter profile, YC bio                                  |
| anish-acharya.png       | Anish Acharya      | a16z team page, LinkedIn                                   |
| ethan-mollick.png       | Ethan Mollick      | Wharton faculty page, Substack                             |
| dario-amodei.png        | Dario Amodei       | Anthropic about page, press kit                            |
| daniela-amodei.png      | Daniela Amodei     | Anthropic about page, press kit                            |
| sam-altman.png          | Sam Altman          | OpenAI about page, blog                                    |
| lenny-rachitsky.png     | Lenny Rachitsky    | Substack profile, LinkedIn                                 |

## Requirements
- Format: PNG or JPG (update the import extension in `src/data/people.ts` if you use JPG)
- Crop: square, face-centered (you handle this)
- Min size: 200x200px (Astro will resize down to 72px @2x automatically)
