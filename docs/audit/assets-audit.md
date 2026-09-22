# Image Assets — Festive Occasions

## Status: Transitional imagery (Unsplash)

All site images are currently high-quality Christmas decoration photos
downloaded from **Unsplash** and verified against Unsplash's own alt metadata
before download. Unsplash's license permits free commercial use without
attribution.

> ⚠️ **These are placeholders, not the client's real work.**
> Swap with real client project photos before final launch. Filenames are
> already descriptive (e.g. a villa living shot → `villa-living-christmas.webp`).

## Where images live

- Manifest: `lib/images.ts` (single place to swap `src` per slot)
- Files: `public/images/christmas/*.jpg`

## Source record (for client transparency)

| File | Source (Unsplash photo) | Alt (verified) |
|---|---|---|
| outdoor-house-lights.jpg | photo-1788619371179-b3031f2cbe23 | Stone house with string lights in a garden at night |
| tree-green-large.jpg | photo-1543258103-a62bdc069871 | Green Christmas tree |
| tree-string-lights.jpg | photo-1514377006585-6e7975371bd6 | Christmas tree with string lights |
| tree-baubles-closeup.jpg | photo-1482517967863-00e15c9b44be | Close-up of baubles on a Christmas tree |
| tree-gold-baubles.jpg | photo-1608132055071-aea9bf8e121e | Gold baubles on a Christmas tree |
| tree-red-baubles.jpg | photo-1606916928892-3e15e20c5c0c | Green Christmas tree with red baubles |
| tree-with-baubles.jpg | photo-1544863308-ec385bbf5caa | Christmas tree with baubles |
| tree-many-ornaments.jpg | photo-1639686767840-1204e5c294b8 | Christmas tree with many ornaments |
| tree-silver-baubles.jpg | photo-1602521879046-b994fcd56190 | Silver baubles on a green Christmas tree |
| gold-baubles-set.jpg | photo-1542144145443-e64d1e186d4d | Gold Christmas baubles |
| golden-bauble-tree.jpg | photo-1766054093603-289593c48cdf | Golden bauble on a decorated Christmas tree |
| livingroom-fireplace.jpg | photo-1642335911245-238e13dcabf2 | Living room decorated for Christmas with a fireplace |
| livingroom-tree.jpg | photo-1640159750488-051fa6815bd4 | Living room with furniture and a Christmas tree |
| livingroom-candles.jpg | photo-1703163073537-3259fcffdc1e | Living room decorated for Christmas with candles |
| livingroom-cozy-tree.jpg | photo-1766422646106-ed7e4b288fd8 | Living room decorated for Christmas with a tree |
| office-lobby-tree.jpg | photo-1770360462071-6d62a9a6bc25 | Decorated Christmas tree in a modern lobby |
| table-setting-festive.jpg | photo-1764425505349-5a55345a660f | Christmas table setting with festive decorations and lights |
| ornaments-twinkling.jpg | photo-1763728566422-7611951eaccd | Festive Christmas ornaments with twinkling lights |
| string-lights-bokeh.jpg | photo-1544438369-a34666f8ff77 | String lights with bokeh light background |
| string-lights-shallow.jpg | photo-1496957677336-9936cf0132b4 | Close-up string lights |
| tree-string-lights-green.jpg | photo-1612979168796-bcae1575b8c5 | Green Christmas tree with string lights |

## Replacing with client photos

1. Client supplies real project photos (see `docs/client/client-data-required.md`).
2. Save to `public/images/` (e.g. `villa-entrance-christmas.webp`).
3. Update the matching entry in `lib/images.ts`.
4. Remove the Unsplash file from `public/images/christmas/` once swapped.

**Do not** publish the site with Unsplash imagery alone — the portfolio and
gallery must show the client's actual verified work.