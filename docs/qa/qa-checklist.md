# QA Checklist — Festive Occasions

## Responsive (`docs/qa/responsive-qa.md`)

Test widths: 375, 390, 414, 768, 1024, 1280, 1440, 1920.
Check: no horizontal overflow, no broken layouts, intentionally designed mobile compositions.

## Animation QA

- initial load / slow scroll / fast scroll / reverse scroll / resize / refresh / route change / back / forward
- mobile + reduced motion
- Look for: flicker, jumping, clipping, broken pinning, duplicate triggers, layout shift, horizontal overflow

## SEO QA (per page)

- [ ] 200 status
- [ ] indexable
- [ ] canonical
- [ ] title
- [ ] description
- [ ] H1
- [ ] H2
- [ ] content (unique, people-first)
- [ ] internal links
- [ ] images + alt
- [ ] OG metadata
- [ ] schema (accurate only)

## Performance QA

- Lighthouse: Performance, Accessibility, Best Practices, SEO
- Check: LCP, CLS, INP, FCP, image size, font loading, JS bundle, third-party scripts

## Browser QA

Chrome, Edge, Safari (if available), mobile browser.

## Final visual QA

Ask: "Agar main 200k pay kar raha hota, kya mujhe ye premium lagti?"
Check hero (WOW), typography (luxury), gallery (professional), animation (smooth),
services (clear), CTA (obvious), mobile (premium), footer (complete).

If any section feels like a template → redesign it.