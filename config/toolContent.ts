export interface ToolContent {
  howItWorks: string[];
  useCases: { title: string; description: string }[];
}

export const toolContentMap: Record<string, ToolContent> = {
  cartoon: {
    howItWorks: [
      "Upload any photo — portrait, group shot, or scene — and our AI analyzes the key shapes, colors, and facial features.",
      "The model applies Japanese hand-drawn anime stylization: bold black outlines, flat coloring, and signature anime facial proportions inspired by titles like Demon Slayer and Your Name.",
      "Soft gradient shadows are added to give depth without breaking the flat anime aesthetic, and the background is reimagined with halftone textures and hand-drawn details.",
      "The result is a high-quality anime illustration that preserves your subject's identity while delivering an authentic cartoon feel.",
    ],
    useCases: [
      {
        title: "Custom Avatar & Profile Picture",
        description:
          "Turn your selfie into a unique anime avatar perfect for social media, Discord, or gaming profiles.",
      },
      {
        title: "Fan Art & Creative Projects",
        description:
          "Transform photos of friends, pets, or locations into anime-style artwork for gifts, posters, or digital content.",
      },
      {
        title: "Children's Illustrations",
        description:
          "Convert family photos into charming cartoon illustrations for personalized storybooks or birthday cards.",
      },
    ],
  },
  cyberpunk: {
    howItWorks: [
      "Upload a photo of a person, object, or cityscape. The AI extracts the core structure and subject from your image.",
      "Cyberpunk-specific elements are layered in: high-saturation neon lighting (pink, electric blue, fluorescent purple) against dark backgrounds, creating dramatic light-dark contrast.",
      "The scene is enhanced with rain-slicked streets, holographic advertisements, stacked buildings, and exposed metal pipes — hallmarks of the Blade Runner 2049 / Cyberpunk 2077 aesthetic.",
      "Character images receive cybernetic prosthetics and futuristic clothing details, while objects gain retro-tech textures like CRT screens and exposed circuitry.",
    ],
    useCases: [
      {
        title: "Social Media & Branding",
        description:
          "Create eye-catching cyberpunk profile pictures or banner art that stands out in any feed.",
      },
      {
        title: "Game & Sci-Fi Content",
        description:
          "Generate cyberpunk concept art, character designs, or world-building visuals for games, stories, or tabletop RPGs.",
      },
      {
        title: "Marketing & Event Promotion",
        description:
          "Give product photos or event posters a futuristic neon makeover for tech brands, gaming events, or music releases.",
      },
    ],
  },
  cg: {
    howItWorks: [
      "Your uploaded photo is analyzed for subject detail, lighting direction, and scene composition.",
      "The AI applies film-grade CG rendering standards: individual-strand hair detail, micro-surface textures, and rich scene depth comparable to Final Fantasy or Disney's Frozen.",
      "Cinematic lighting is reconstructed with key light, fill light, and rim light — producing strong contrast, metallic reflections, and glass highlights.",
      "A subtle film grain and color grade finish the image, giving it the narrative weight and visual polish of a professional game cutscene.",
    ],
    useCases: [
      {
        title: "Character Design & Game Art",
        description:
          "Elevate character concepts or reference photos into fully-rendered CG portraits suitable for game development or concept portfolios.",
      },
      {
        title: "High-Quality Digital Art",
        description:
          "Transform everyday photos into collectible digital artwork with cinematic quality for prints or NFT projects.",
      },
      {
        title: "Marketing & Promotional Visuals",
        description:
          "Create stunning CG-quality product visuals or brand imagery that demand attention.",
      },
    ],
  },
  pixel: {
    howItWorks: [
      "Upload any image and the AI simplifies its structure into clean pixel blocks, targeting an 8-bit or 16-bit retro resolution aesthetic.",
      "High-saturation retro color palettes (reds, blues, yellows) or low-saturation nostalgic tones are applied — with no gradient transitions, keeping the pixel-pure look.",
      "Subject outlines are simplified and details are reconstructed pixel-by-pixel, from character features to object textures.",
      "Pixel-style environmental elements — blocky clouds, tile-based plants, retro game UI motifs — are added to match the Stardew Valley / Terraria visual style.",
    ],
    useCases: [
      {
        title: "Game Development Assets",
        description:
          "Quickly generate pixel art sprites, avatars, or tilesets from real-world photo references for indie games.",
      },
      {
        title: "Retro Aesthetic Content",
        description:
          "Create nostalgic pixel art profile pictures, stickers, or social media graphics with an authentic 8-bit vibe.",
      },
      {
        title: "Personalized Merchandise",
        description:
          "Design pixel art versions of portraits or pets for custom merchandise like pins, patches, or posters.",
      },
    ],
  },
  "colored-pencil": {
    howItWorks: [
      "Your photo is processed to extract the subject's structure, edges, and tonal values, which form the basis for pencil stroke simulation.",
      "The AI draws natural, non-rigid colored pencil lines following the contours of the subject — hair strands, object edges, and fabric folds each get individually rendered strokes.",
      "Soft, low-saturation colors are layered to build light-dark transitions, mimicking the physical process of building up color on paper.",
      "The final image carries authentic paper-based texture and the warm, hand-crafted atmosphere of a real colored pencil artwork.",
    ],
    useCases: [
      {
        title: "Artistic Portraits & Gifts",
        description:
          "Create a heartfelt colored pencil portrait from a photo as a personalized gift for friends or family.",
      },
      {
        title: "Children's Book Illustrations",
        description:
          "Generate soft, hand-drawn illustrations for children's stories or educational content.",
      },
      {
        title: "Unique Social Media Art",
        description:
          "Stand out with a distinctive hand-drawn artistic style for profile pictures or creative posts.",
      },
    ],
  },
  "old-photo-retouching": {
    howItWorks: [
      "Upload a damaged, faded, or low-quality old photo — black-and-white or color — and the AI assesses the type and extent of degradation.",
      "Color photos have yellowing, fading, and color casts corrected while preserving natural skin tones. Black-and-white photos have contrast and tonal range restored.",
      "Scratches, creases, mold spots, and noise are removed digitally while the original paper or film texture is preserved for authenticity.",
      "Resolution is enhanced to 300dpi+ at the original aspect ratio, blurry areas are sharpened, and damaged or missing sections are reconstructed seamlessly.",
    ],
    useCases: [
      {
        title: "Family History Preservation",
        description:
          "Restore precious family photos from decades or even a century ago to preserve memories for future generations.",
      },
      {
        title: "Memorial & Tribute Projects",
        description:
          "Restore photos of loved ones for obituaries, memorial books, or tribute videos with dignity and clarity.",
      },
      {
        title: "Historical Archiving",
        description:
          "Digitally restore historical photographs for local history projects, museums, or genealogy research.",
      },
    ],
  },
  "1-inch": {
    howItWorks: [
      "Upload a front-facing portrait photo and the AI detects the face, evaluates alignment, and crops the image to official 1-inch ID photo standards.",
      "The background is replaced with a solid official blue (#0066CC) — free of noise, gradients, or shadows — with a clean boundary between the subject and background.",
      "The output is sized to 2.5cm × 3.5cm at ≥300dpi, ensuring the image is print-ready without blurriness or distortion.",
      "Face exposure is balanced to eliminate local overexposure or underexposure, and the final image is verified against official ID photo requirements for documents like passports, visas, and resumes.",
    ],
    useCases: [
      {
        title: "Visa & Passport Applications",
        description:
          "Generate a compliant 1-inch ID photo instantly for visa or passport applications without visiting a photo studio.",
      },
      {
        title: "Job Applications & Resumes",
        description:
          "Create a professional-looking ID photo for resumes and job application forms quickly and affordably.",
      },
      {
        title: "Student & Official IDs",
        description:
          "Produce official-standard ID photos for school enrollment, student cards, or government document submissions.",
      },
    ],
  },
  "miniature-figurine": {
    howItWorks: [
      "Upload any image — a character, portrait, or design — and the AI constructs a realistic desktop scene built around that subject.",
      "A computer monitor is rendered showing 3D modeling software with a digital model that matches the physical figurine, illustrating the design-to-production workflow.",
      "A highly detailed physical figurine is placed in front of the monitor on a clear acrylic base, with a product box or magazine featuring the same figurine alongside.",
      "The full scene — keyboard, mouse, wooden desk, soft natural light — is rendered in sharp focus to capture the collectible hobby aesthetic from digital concept to finished product.",
    ],
    useCases: [
      {
        title: "Collectible & Hobby Communities",
        description:
          "Create stunning showcase images of your favorite characters or original designs in a realistic figurine scene for sharing in hobby communities.",
      },
      {
        title: "Product Concept Visualization",
        description:
          "Visualize how a character or design would look as a physical collectible before committing to production.",
      },
      {
        title: "Creative Content & Social Media",
        description:
          "Generate unique, eye-catching miniature figurine scenes for social media, fan communities, or creative portfolios.",
      },
    ],
  },
};
