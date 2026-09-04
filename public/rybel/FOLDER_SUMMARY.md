# Ribaal Brand Assets

Project-local generated imagery for the Ribaal premium sherwani storefront. Record each final asset's generation prompt, dimensions, format, and inspection result here before it is consumed by application code.

## 2026-09-04 homepage runtime asset boundary

- The current Ribaal homepage asset set is exactly eight files: `brand-mark.svg`, `curtain-border-tile.svg`, `jaali-tile.svg`, `footer-arch-tile.svg`, `footer-border-tile.svg`, `hero-sherwani.png`, `craft-detail.png`, and `sherwani-collection-grid.png`.
- Combined asset size is 6,443,508 bytes (6.15 MiB): the three RGB PNGs contribute 6,440,212 bytes and the five SVGs contribute 3,296 bytes.
- `FOLDER_SUMMARY.md` is source documentation and may be omitted from a deployed/static export. No other file in this folder is safe to omit while preserving the homepage's current hero, story, collection, navigation, and footer treatments.

## 2026-09-04 code-native identity and repeat patterns

- `brand-mark.svg` is the original arched R monogram used by the sticky header.
- `curtain-border-tile.svg` supplies the seamless cream, oxblood, and antique-gold curtain bands.
- `jaali-tile.svg` supplies the low-contrast collection-field repeat.
- `footer-arch-tile.svg` and `footer-border-tile.svg` create the repeated top and bottom footer trims.
- All five are deterministic project-native SVGs with no external asset or attribution dependency.

## 2026-09-04 hero and craft-detail generation

- `hero-sherwani.png`: built-in image-generation output, 1672x941 RGB PNG, 1,657,179 bytes, SHA-256 `E5FDFD22FD7D1A78B577C0832634E98E2A5130A0955E861183343A873498FEDC`. Original-size visual inspection confirms exactly one adult Indian male, a detailed ivory/champagne sherwani, full figure on the right, and a clean deep-green/ink draped copy field across the left. No visible text, logo, watermark, duplicate subject, or malformed anatomy.
- `craft-detail.png`: built-in image-generation output, 1122x1402 RGB PNG, 2,703,045 bytes, SHA-256 `2ED3868900190FEB5230157F5687B55F8D0C91E00F75324335E84F13AD068569`. Original-size visual inspection confirms a convincing champagne textile macro, resolved zardozi/bead/thread detail, one natural hand, warm burgundy shadow, and no face, text, logo, watermark, or duplicate hand.
- Both files are original generated photographs. The supplied page mockup informed layout and mood only and was not used as an edit target. Application code was not changed.

### Exact hero prompt

```text
Use case: photorealistic-natural
Asset type: wide ecommerce landing-page hero photograph
Primary request: Create an original, premium fashion editorial photograph of exactly one adult Indian male model wearing an exquisite ivory-to-champagne hand-embroidered sherwani.
Scene/backdrop: Deep forest-green to near-black ink textile drapes, softly layered with realistic folds and quiet tonal depth; no furniture, props, architecture, or scenery.
Subject: One adult Indian man only, poised and self-assured, authentic natural skin texture, immaculate ivory/champagne sherwani with refined zardozi, thread, and subtle bead embroidery; elegant tailoring and culturally respectful styling.
Style/medium: Photorealistic high-luxury Indian menswear campaign photography, cinematic editorial realism, real fabric texture, restrained retouching, subtle film grain.
Composition/framing: Very wide 16:9 landscape web hero. Place the model entirely in the rightmost 35–40% of frame, three-quarter-to-nearly-full body visible from head to below the knees, with a clean silhouette. Preserve the left 55–60% as calm, dark draped negative space suitable for oversized headline copy. Eye-level camera with gentle depth separation; do not crop the head or garment.
Lighting/mood: Sculpted warm key light and soft rim light on the model, low-key dramatic background, regal and intimate rather than theatrical.
Color palette: Ivory, champagne gold, deep forest green, near-black ink, restrained warm skin tones.
Materials/textures: Clearly resolved hand embroidery, silk/brocade weave, fine metallic thread and bead details, realistic drape texture.
Constraints: Original generation; the supplied page sketch is only a layout and mood reference, not an edit target. Exactly one adult subject. No text, letters, brand marks, logos, watermarks, borders, UI, duplicated people, mannequins, extra hands, or floating accessories.
```

### Exact craft-detail prompt

```text
Use case: photorealistic-natural
Asset type: Our Story section macro editorial photograph
Primary request: Create an original macro fashion photograph celebrating meticulous artisan hand embroidery on a rich champagne-gold sherwani.
Scene/backdrop: The sherwani fabric fills the frame; background falls into a very dark, softly blurred burgundy-to-ink studio shadow with no identifiable room or props.
Subject: Extreme close detail of one natural adult artisan hand gently working or resting beside authentic zardozi embroidery, showing gold metallic thread, silk thread, seed beads, tiny sequins, and raised hand-stitched motifs on champagne fabric. The hand must be anatomically natural and secondary to the craftsmanship.
Style/medium: Photorealistic luxury editorial macro photography, museum-level textile detail, tactile and believable rather than glossy CGI.
Composition/framing: Portrait-oriented 4:5 crop suitable for a story section. One hand only, entering naturally near the lower-right or lower-center edge. The embroidered textile occupies most of the image, with a clear focal plane across the stitches and graceful falloff.
Lighting/mood: Warm, directional chiaroscuro light that catches metallic thread and bead facets; intimate, artisanal, regal, and quiet.
Color palette: Champagne gold, antique gold, warm ivory, restrained burgundy shadow, near-black.
Materials/textures: Individual thread fibers, minute stitch irregularity, bead and sequin reflections, silk/brocade grain, realistic skin pores and fine creases.
Constraints: Original generation; the supplied page sketch is only a layout and mood reference, not an edit target. Exactly one anatomically correct natural adult hand; no face, full person, tools, needles piercing skin, text, letters, labels, brand marks, logos, watermarks, borders, UI, extra fingers, duplicated hands, or floating jewellery.
```

## 2026-09-04 sherwani collection grid

- Final asset: `sherwani-collection-grid.png`.
- Generation: built-in image-generation workflow; the supplied hand-drawn page mockup was a mood and high-level layout reference only.
- File contract: 1254x1254 RGB PNG, 2,079,988 bytes, with exact 627x627 quadrants. SHA-256: `855DF8E34580377741D03904B27DBD9021890C47442A1033EF3A204C526B0005`.
- Quadrant map: top-left wine and antique gold; top-right midnight indigo and silver; bottom-left ivory and gold; bottom-right deep emerald and bronze.
- Visual inspection: PASS. The sheet has four distinct adult Indian male models at consistent catalog scale; each silhouette is fully visible head-to-toe and remains inside its own equal quadrant. Backgrounds remain oxblood, with no empty gutters, frames, text, logos or watermarks.

### Final prompt

```text
Use case: product-mockup
Asset type: square CSS sprite / editorial ecommerce collection contact sheet
Input images: Image 1 is mood and high-level layout reference only; do not copy its people, text, logos, brands, or exact garments.
Primary request: Create one perfectly aligned 2x2 contact sheet with four mathematically equal quadrants. Each quadrant contains a different adult Indian male fashion model wearing a distinct premium sherwani.
Scene/backdrop: one consistent seamless oxblood-red luxury studio backdrop and matching floor across all four quadrants, subtle tonal falloff only.
Subject assignments: top-left model wears wine velvet with intricate antique-gold hand embroidery; top-right model wears midnight-indigo with restrained silver embroidery; bottom-left model wears luminous ivory with refined gold embroidery; bottom-right model wears deep emerald with elegant bronze embroidery. Four clearly different adult Indian male faces and appearances.
Style/medium: catalog-grade photorealistic luxury Indian menswear photography; realistic skin, fabric weave, zardozi and hand-stitched texture; refined editorial polish without artificial plastic skin.
Composition/framing: exact invisible boundaries at 50% width and 50% height; four equal borderless panels; absolutely no gutters, panel gaps, dividers, frames, borders, or overlap between quadrants. One model centered precisely inside each quadrant, straight-on or very slight three-quarter catalog pose, consistent camera distance and equal visual scale. Every model shown completely head-to-toe including footwear, with generous clear margin above the head, below the feet, and on both sides. No body part, garment hem, stole, shadow, or accessory may cross a quadrant boundary. Keep each silhouette fully isolated within its own crop-safe quadrant.
Lighting/mood: consistent soft directional luxury-studio lighting, controlled highlights that reveal embroidery, restrained shadows, regal and premium.
Color palette: oxblood backdrop; wine and antique gold; midnight indigo and silver; ivory and gold; deep emerald and bronze. Preserve clear garment-to-background contrast in every quadrant.
Constraints: square output; exact equal 2x2 geometry suitable for CSS background-position cropping; four and only four models; all models adults; garments must be visibly different; full-length bodies entirely inside their assigned quadrants; no cropping; no props; no furniture; no scenery; no panel labels; no text; no letters; no numbers; no logos; no brand marks; no watermarks.
Avoid: seams, white lines, borders, gaps, collage paper edges, unequal panels, duplicated faces, duplicated garments, extra people, floating limbs, merged bodies, crossed boundaries, cropped heads, cropped feet, oversized models, busy accessories, bridal couples, runway audience, architecture, gradients that create visible panel divisions.
```
