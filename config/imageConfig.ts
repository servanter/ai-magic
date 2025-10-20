export interface ImageConfig {
  href: string;
  name: string;
  type: number;
  prompt: string;
  description: string;
  new_image: string;
  old_image: string;
  link: string;
}

export const imageConfigs: ImageConfig[] = [
  {
    href: "/demo1.jpeg",
    name: "Cartoon",
    link: "cartoon",
    type: 1,
    prompt: `Based on the core subject (character/scene/object) of the user-uploaded image, generate a Japanese hand-drawn anime-style image. Key requirements: 
1. Clear black outlines with thickness adjusting to structural layers; 
2. Flat coloring as the main tone, plus soft gradient shadows locally (no realistic light transitions); 
3. For characters: 2D anime facial features (large eyes, simplified nose, plump lips) and fluffy hairstyles; 
4. Backgrounds can include anime elements (halftone texture, hand-drawn details, simplified layers); overall style aligns with Demon Slayer or Your Name, and keeps the original subject’s shape and core elements.`,
    description: 'Provide a function for generating Japanese hand-drawn anime-style images, which precisely controls outline thickness, flat coloring and character details, fully retains the original subject\'s shape and core identification features, and meets the need for efficient and professional anime-style transformation.',
    new_image: "/cases/1_new.jpeg",
    old_image: "/cases/1_old.jpeg"
  },
  {
    href: "/demo2.jpeg",
    name: "Cyberpunk",
    link: "cyberpunk",
    type: 2,
    prompt: `Based on the core subject (character/scene/object) of the user-uploaded image, generate a cyberpunk-style image. Key requirements: 
1. Use high-saturation neon (pink, electric blue, fluorescent purple) with dark black/gray bases for sharp light-dark contrast, plus neon glows and light pollution; 
2. Add cyberpunk elements: rainy wet streets, holographic ads, stacked shabby buildings, tangled metal pipes; 
3. For characters: cybernetic prosthetics, futuristic clothing (glowing patterns, leather/metal). For objects: retro-tech textures (e.g., CRT screens, exposed circuits); 
4. Style matches Blade Runner 2049/Cyberpunk 2077—retain the original subject’s core shape/function, infuse cyberpunk’s "high-tech + dilapidation" essence.`,
    description: 'Provide a function for generating cyberpunk-style images, which precisely controls neon lighting, futuristic elements, and retains the original subject\'s core shape and function.',
    new_image: "/cases/2_new.jpeg",
    old_image: "/cases/2_old.jpeg"
  },
  {
    href: "/demo3.jpeg",
    name: "CG",
    link: "cg",
    type: 3,
    prompt: `Based on the core subject (character/scene/object) of the user-uploaded image, generate a film-grade game CG-style image. Key requirements: 
1. Detail precision meets industry CG standards (e.g., character hair rendered at individual strand level, micro-textures on objects, rich scene depth); 
2. Film-level lighting (key light + fill light + rim light, strong light-dark contrast, highlights with metal/glass reflections); 
3. High-saturation colors + film grading (slight film grain allowed, no flat coloring); 
4. Overall style matches Final Fantasy game CG or Disney’s Frozen, combining 3D dimensionality and film narrative feel; keep the original subject’s movements, atmosphere, and functions intact.`,
    description: 'Provide a function for generating film-grade game CG-style images, which precisely controls detail precision, lighting, and retains the original subject\'s movements and atmosphere.',
    new_image: "/cases/3_new.jpeg",
    old_image: "/cases/3_old.jpeg"
  },
  {
    href: "/demo4.jpeg",
    name: "Pixel",
    link: "pixel",
    type: 4,
    prompt: 'Based on the core subject (character/scene/object) of the user-uploaded image, generate a pixel-style image. Key requirements: ① Compose the image with clear pixel blocks, resolution matching retro pixel aesthetics (e.g., 8-bit/16-bit), retaining pixel granularity; ② Use high-saturation retro colors (mainly red/blue/yellow) or low-saturation nostalgic colors, no gradient transitions; ③ Simplify the subject’s outline, present details with pixels (e.g., character features, object textures); ④ Add pixel-style elements (pixelated clouds, block plants, retro game UI), overall matching Stardew Valley/Terraria visuals, retaining the original subject’s core shape and function.',
    description: 'Provide pixel-style image generation function, compose with clear pixel blocks (matching 8/16-bit retro aesthetics), use retro colors without gradients, simplify subject outlines to show details via pixels, add pixel elements and retain the original subject\'s core shape and function.',
    new_image: "/cases/4_new.jpeg",
    old_image: "/cases/4_old.jpeg"
  },
  {
    href: "/demo5.jpeg",
    name: "Colored Pencil",
    link: "colored-pencil",
    type: 5,
    prompt: `Based on the core subject (character/scene/object) of the user-uploaded image, generate a colored pencil-style image. Key requirements: 
1. Highlight colored pencil stroke textures, natural lines (no stiffness), colors with slight stroke overlay; 
2. Use soft low-saturation colors, present light-dark transitions via color layering, no bright blocks; 
3. Outline subject details with fine colored pencil lines (e.g., character hair strands, object textures), light background blending; 
4. Overall matching hand-drawn colored pencil texture, similar to paper-based colored pencil works, retaining the original subject’s core shape and atmosphere.`,
    description: 'Provide a function for generating colored pencil-style images, which precisely controls stroke textures, color layering, and retains the original subject\'s core shape and atmosphere.',
    new_image: "/cases/5_new.jpeg",
    old_image: "/cases/5_old.jpeg"
  },
  {
    href: "/demo6.jpeg",
    name: "Old Photo Retouching",
    link: "old-photo-retouching",
    type: 6,
    prompt: `Professional old photo restoration for the provided image (B&W/color, add era if known), key requirements:
For color photos: Fix yellowing/fading/color cast per original tone, keep natural skin tones;
Remove scratches/creases/mold/noise, retain original paper/film texture;
Boost resolution to 300dpi+ at original aspect ratio, enhance sharpness of blurry areas, preserve layering;
Fill in damages/missing parts logically per scene, no visible seams;
Keep era features (e.g., B&W contrast, vintage vignetting) without losing historical texture.`,
    description: 'Provide professional old photo restoration, handling B&W/color photos. For color ones, fix yellowing/fading/cast by original tone & keep natural skin tone, remove scratches/molds/noise, boost resolution to 300dpi+ while preserving aspect ratio, fill missing parts seamlessly, and retain original texture & era features.',
    new_image: "/cases/6_new.jpeg",
    old_image: "/cases/6_old.jpeg"
  },
  {
    href: "/demo7.jpeg",
    name: "1-Inch",
    link: "1-inch",
    type: 7,
    prompt: `Based on the provided image, generate a 1-inch ID photo with a blue background that meets official ID photo standards, strictly complying with the following 4 requirements:
1. **Size Specifications**：Physical size of 2.5cm × 3.5cm, resolution ≥ 300dpi (to ensure high-definition printing without blurriness), accurate aspect ratio, no stretching/cropping distortion;
2. **Background Requirements**：Solid blue background (color reference #0066CC), no noise, gradients, shadows or textures, with clear boundaries between the background edge and the person’s outline;
3. **Portrait Shooting Standards**：The person is photographed front-facing, with the head accounting for 1/2 of the frame, looking straight at the camera with a natural expression (no exaggerated movements/expressions); formal clothing or light-colored tops are recommended (to avoid blending with the blue background);
4. **Image Quality Adaptation**：No noise or grain in the image, even exposure on the person’s face (no local overexposure/underexposure), no obstructions (e.g., hair covering eyes/eyebrows, accessories blocking the face), suitable for official scenarios such as ID cards, resumes, and visas.`,
    description: 'Provide a function for generating 1-inch ID photos with a blue background that meets official standards, strictly complying with size, background, portrait shooting, and image quality requirements.',
    new_image: "/cases/7_new.jpeg",
    old_image: "/cases/7_old.jpeg"
  },
  {
    href: "/demo8.jpeg",
    name: "Miniature Figurine",
    link: "miniature-figurine",
    type: 8,
    prompt: `Please generate a realistic scene based on the uploaded image: a computer monitor displays 3D modeling software (showing a digital model consistent with the physical figurine);
in front of the monitor, a highly detailed and lifelike physical figurine is placed on a clear acrylic base;
beside the figurine, there is a product box or magazine featuring the same figurine in colorful imagery;
the scene includes a keyboard, a mouse, and a wooden desk surface, lit by soft natural light, with all elements in sharp focus to highlight the workflow from digital design to the finished collectible.`,
    description: 'Provide a function for generating realistic scenes of miniature figurines, highlighting the workflow from digital design to the finished collectible.',
    new_image: "/cases/8_new.jpeg",
    old_image: "/cases/8_old.jpeg"
  },
];