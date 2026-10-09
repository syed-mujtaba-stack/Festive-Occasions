import os

# Fix 1: Remove hero image from service-page.tsx
with open("E:\\festiveupdate\\components\\services\\service-page.tsx", "r") as f:
    content = f.read()

# Remove the FestiveImage line in the hero section
content = content.replace(
    '<FestiveImage image={page.heroImage} priority sizes="100vw" />',
    ''
)

# Remove the ogImage generation line  
content = content.replace(
    "const ogImage = `\${siteConfig.url}${images[page.heroImage].src}`;",
    "const ogImage = '';"
)

with open("E:\\festiveupdate\\components\\services\\service-page.tsx", "w") as f:
    f.write(content)
print("Fix 1 done: Removed hero image references from service-page.tsx")

# Fix 2: Remove heroImage from villa page data
with open("E:\\festiveupdate\\lib\\service-pages.ts", "r") as f:
    content = f.read()

# Remove heroImage from the villa page data
content = content.replace(
    '''    "christmas-villa-decoration-dubai": {
    slug: "christmas-villa-decoration-dubai",
    title: "Christmas Villa Decoration in Dubai",
    eyebrow: "The Full Residence",
    metaDescription:
      "Complete villa Christmas decoration in Dubai — entrance, living spaces, staircase, garden and outdoor lighting composed in one cohesive scheme.",
    heroImage: "svcVillaHero",''',
    '''    "christmas-villa-decoration-dubai": {
    slug: "christmas-villa-decoration-dubai",
    title: "Christmas Villa Decoration in Dubai",
    eyebrow: "The Full Residence",
    metaDescription:
      "Complete villa Christmas decoration in Dubai — entrance, living spaces, staircase, garden and outdoor lighting composed in one cohesive scheme."''')
                             
with open("E:\\festiveupdate\\lib\\service-pages.ts", "w") as f:
    f.write(content)
print("Fix 2 done: Removed heroImage from villa page data")

# Fix 3: Remove the image file  
image_path = "E:\\festiveupdate\\public\\images\\Christmas Villa Decoration in Dubai.jpg"
if os.path.exists(image_path):
    os.remove(image_path)
    print("Fix 3 done: Removed image file")
else:
    print("Image file not found, skipping")

print("All fixes applied!")