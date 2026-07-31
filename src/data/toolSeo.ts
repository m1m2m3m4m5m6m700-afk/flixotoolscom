import { tools, type Tool } from "./tools";
import { categories, categoryById, type CategoryId } from "./categories";

export interface ToolFaqItem {
  question: string;
  answer: string;
}

export interface ToolSeoData {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  overview: string;
  features: string[];
  howToUse: string[];
  benefits: string[];
  faqs: ToolFaqItem[];
}

const toolSeoRegistry: Record<string, ToolSeoData> = {
  translator: {
    slug: "translator",
    title: "AI Translator — Instant Online Language Translation | Flixo",
    description:
      "Translate text seamlessly across 20+ languages with automatic detection, instant bi-directional swap, and txt download. Fast, free, and private.",
    keywords: [
      "ai translator",
      "free translation tool",
      "language translator",
      "auto detect language",
      "online text translation",
      "flixo translator",
    ],
    overview:
      "Flixo AI Translator provides instant, accurate translation for text, phrases, and long documents across over 20 languages. Powered by smart automatic language detection, it allows instant bi-directional language swapping, side-by-side editing, character counting, and one-click file downloads.",
    features: [
      "Smart Auto-Language Detection",
      "Supports 20+ Global Languages (English, Arabic, Spanish, French, German, Chinese, etc.)",
      "Bi-directional One-Click Language Swap",
      "Instant Copy to Clipboard & Download as .TXT",
      "Live Character & Word Count Counter",
      "100% Client-Side Privacy Protection",
    ],
    howToUse: [
      "Paste or type your text into the left input container.",
      "Select your target language or let Flixo auto-detect the source language.",
      "Click 'Translate' to generate instant translated output.",
      "Copy the translated text or download it directly as a text file.",
    ],
    benefits: [
      "No sign-up or registration needed",
      "Unlimited free daily text translations",
      "Privacy-focused text handling with no data retention",
      "Mobile-friendly responsive workspace",
    ],
    faqs: [
      {
        question: "Is Flixo AI Translator completely free to use?",
        answer:
          "Yes, Flixo AI Translator is 100% free with no registration, daily limits, or subscription required.",
      },
      {
        question: "Does the translator preserve my text privacy?",
        answer:
          "Absolutely. All processing occurs securely within your browser session and your text is never stored or used for training AI models.",
      },
      {
        question: "Can I download my translated text?",
        answer:
          "Yes, you can copy the output to your clipboard with one click or download it directly as a plain text (.txt) file.",
      },
      {
        question: "What languages are supported?",
        answer:
          "Flixo supports major world languages including English, Arabic, Spanish, French, German, Chinese, Japanese, Korean, Italian, Russian, Portuguese, Hindi, and more.",
      },
    ],
  },
  "image-enhancer": {
    slug: "image-enhancer",
    title: "AI Image Enhancer — Free Online Upscale, Restore & Sharpen Photos | Flixo",
    description:
      "Upscale images up to 8x resolution, restore old photos, sharpen blurry details, and fix facial lighting online. 100% free, private browser-based AI photo enhancer.",
    keywords: [
      "ai image enhancer",
      "upscale image 4x 8x",
      "photo restoration tool",
      "sharpen blurry photo",
      "face enhancement online",
      "image noise reduction",
      "free photo upscaler",
    ],
    overview:
      "Flixo AI Image Enhancer allows you to upscale image resolution up to 8x (800%), restore old or faded photographs, reduce noise, and sharpen out-of-focus details using client-side image processing algorithms. Compare results with an interactive before/after slider and export crisp PNG, JPG, or WEBP files instantly.",
    features: [
      "AI Super-Resolution Upscaling (2x, 4x, 8x multiplier)",
      "Unsharp Mask & Blur Reduction Engine",
      "Noise Reduction & Smoothing Controls",
      "Facial Detail & Contrast Restoration",
      "Old Photo Color & Tone Fix",
      "Interactive Before / After Split Slider Preview",
      "Clipboard Image Copy & PNG/JPG/WEBP Exports",
      "100% Client-Side Private Canvas Processing",
    ],
    howToUse: [
      "Upload or paste your image into the Flixo workspace.",
      "Select an AI enhancement preset or customize upscale factor (2x, 4x, 8x).",
      "Adjust sharpness, noise reduction, and color sliders as needed.",
      "Click 'Enhance Image' to run the super-resolution pipeline.",
      "Inspect the results with the split slider or zoom preview and download your enhanced image.",
    ],
    benefits: [
      "Increase low-resolution images for crisp high-res printing",
      "Breathe new life into vintage family photographs",
      "Zero server uploads — total privacy guaranteed",
      "Unlimited free enhancements with no watermarks",
    ],
    faqs: [
      {
        question: "How does the AI Image Enhancer upscale photos?",
        answer:
          "Flixo utilizes advanced client-side bi-cubic interpolation combined with unsharp mask convolution matrices and dynamic range optimization to increase resolution up to 8x while sharpening fine details.",
      },
      {
        question: "Can I restore blurry or noisy photos?",
        answer:
          "Yes! Toggle the Blur Reduction or Noise Reduction settings, or use the 'De-blur & Sharpen' preset to recover soft details and reduce digital noise.",
      },
      {
        question: "Are my private photos uploaded to a cloud server?",
        answer:
          "No, all processing is performed locally in your browser using HTML5 Canvas technology. Your files never leave your device.",
      },
      {
        question: "What output formats and zoom modes are supported?",
        answer:
          "You can export images in PNG, JPG, or WEBP formats. The preview tool includes a split before/after slider, side-by-side mode, 100%-200% zoom, and a fullscreen modal.",
      },
    ],
  },
  "background-remover": {
    slug: "background-remover",
    title: "Background Remover — Transparent PNG Cutouts | Flixo",
    description:
      "Remove image backgrounds instantly in your browser. Fine-tune color tolerance and edge softness to export high quality transparent PNGs. 100% free and private.",
    keywords: [
      "background remover",
      "transparent png generator",
      "remove bg online",
      "cutout image",
      "free background eraser",
      "image cutout tool",
    ],
    overview:
      "Flixo Background Remover automatically extracts subjects from photos and graphics, allowing you to generate transparent PNG images in seconds. Featuring real-time side-by-side comparison, configurable color tolerance, and edge feather controls, it works entirely inside your browser so your images stay 100% private.",
    features: [
      "Instant Automatic Background Removal",
      "Side-by-Side Before & After Visual Comparison",
      "Customizable Color Tolerance & Edge Feather Controls",
      "Drag & Drop File Upload Support",
      "High-Resolution Transparent PNG Export",
      "100% In-Browser Local Processing",
    ],
    howToUse: [
      "Drag and drop your image into the dropzone or click to browse files.",
      "Flixo automatically isolates the primary subject and strips the background.",
      "Use the sensitivity sliders to adjust color tolerance and edge softness if needed.",
      "Click 'Download PNG' to save your transparent cutout.",
    ],
    benefits: [
      "No server uploads — your images never leave your device",
      "Instant real-time preview without wait times",
      "Full export resolution matching your original input",
      "Completely free with no watermarks",
    ],
    faqs: [
      {
        question: "Are my images uploaded to external servers?",
        answer:
          "No. Flixo processes images entirely client-side using Canvas rendering APIs. Your files remain on your local device at all times.",
      },
      {
        question: "What image formats are supported?",
        answer: "Flixo supports JPG, PNG, and WebP image files.",
      },
      {
        question: "Does Flixo add watermarks to exported cutouts?",
        answer: "Never. All exported transparent PNGs are clean and free of watermarks.",
      },
      {
        question: "How can I improve the edge quality of complex subjects?",
        answer:
          "Use the 'Color Tolerance' slider to increase or decrease removal range, and adjust 'Edge Softness (Feather)' for smooth blending.",
      },
    ],
  },
  "image-compressor": {
    slug: "image-compressor",
    title: "Image Compressor — Shrink File Size Online | Flixo",
    description:
      "Compress JPG, PNG, and WebP images directly in your browser without quality loss. Reduce file size by up to 90% with live size comparison. Free and private.",
    keywords: [
      "image compressor",
      "shrink image size",
      "compress jpg",
      "compress png",
      "reduce image file size",
      "photo optimizer",
    ],
    overview:
      "Flixo Image Compressor reduces file sizes for JPEG, PNG, and WebP photos while maintaining crisp visual quality. Equipped with an interactive quality slider and format conversion options, you can shrink image file sizes by up to 90% for faster web loading and easier sharing.",
    features: [
      "Adjustable Compression Quality Slider (5% to 95%)",
      "Real-time Original vs. Compressed File Size Calculation",
      "Percentage Saved Ratio Indicator",
      "Format Conversion between JPEG, WebP, and PNG",
      "Drag & Drop Batch Upload Capability",
      "Zero Server Uploads — 100% Local Privacy",
    ],
    howToUse: [
      "Drop your image file into the compressor workspace.",
      "Adjust the compression quality slider to balance visual clarity and file size.",
      "Optionally change the target format (JPEG, WebP, or PNG).",
      "Click 'Download Compressed Image' to save your optimized file.",
    ],
    benefits: [
      "Significantly speeds up website load times",
      "Saves storage space and bandwidth",
      "Instant feedback with live byte size calculation",
      "No file size caps or daily conversion limits",
    ],
    faqs: [
      {
        question: "How much can I reduce my image size?",
        answer:
          "Depending on the original format and selected quality level, file size reductions between 40% and 90% are common.",
      },
      {
        question: "Can I convert format while compressing?",
        answer:
          "Yes! You can choose between JPEG, WebP, and PNG output formats during compression.",
      },
      {
        question: "Is there a limit on how many images I can compress?",
        answer: "No, Flixo Image Compressor is free with unlimited uses.",
      },
    ],
  },
  "qr-generator": {
    slug: "qr-generator",
    title: "QR Code Generator — Custom PNG & SVG Vector QR Codes | Flixo",
    description:
      "Generate custom QR codes for website URLs, Wi-Fi networks, text, email, and phone numbers. Download crisp PNG or vector SVG files instantly.",
    keywords: [
      "qr code generator",
      "free qr generator",
      "wifi qr code",
      "custom qr code",
      "vector svg qr code",
      "qr maker",
    ],
    overview:
      "Flixo QR Code Generator lets you create high-density QR codes for web links, Wi-Fi credentials, plain text messages, email drafts, and phone numbers. Customize foreground and background colors and export vector SVG or crisp PNG images ready for print and digital use.",
    features: [
      "Multiple Preset Modes: URL, Text, Wi-Fi, Email, Phone",
      "Instant Live QR Code Visual Preview",
      "Custom Foreground & Background Color Pickers",
      "High-Resolution PNG Download",
      "Infinitely Scalable Vector SVG Download",
      "One-Click Payload Copying",
    ],
    howToUse: [
      "Select your desired content mode (URL, Wi-Fi, Text, Email, or Phone).",
      "Enter your credentials or website URL into the provided fields.",
      "Customize colors if desired.",
      "Download your QR code in PNG or vector SVG format.",
    ],
    benefits: [
      "High-precision vector SVG export for professional printing",
      "Convenient Wi-Fi guest connection sharing",
      "No expiring links or redirected tracking URLs",
      "Free for commercial and personal projects",
    ],
    faqs: [
      {
        question: "Do Flixo QR codes ever expire?",
        answer:
          "No. Flixo encodes your data directly into the QR pattern itself. They never pass through redirect links and will work permanently.",
      },
      {
        question: "What formats can I download?",
        answer:
          "You can download your QR codes in raster PNG format or resolution-independent SVG vector format.",
      },
      {
        question: "How do I make a Wi-Fi QR code?",
        answer:
          "Select the Wi-Fi preset, enter your network name (SSID), password, and security type. Scanners can then join your network automatically!",
      },
    ],
  },
  "password-generator": {
    slug: "password-generator",
    title: "Password Generator — Secure Random Passwords & Strength Meter | Flixo",
    description:
      "Generate strong, custom cryptographic random passwords with live entropy strength calculation. 100% private in-browser generation.",
    keywords: [
      "password generator",
      "strong password generator",
      "random password",
      "password strength meter",
      "secure password tool",
      "password maker",
    ],
    overview:
      "Flixo Password Generator produces cryptographically strong, random passwords using standard Web Crypto APIs. Customize length from 6 to 64 characters, toggle character sets, exclude ambiguous characters, and monitor password entropy with an interactive security meter.",
    features: [
      "Cryptographically Secure Web Crypto Random Generation",
      "Adjustable Length from 6 to 64 Characters",
      "Toggle Uppercase, Lowercase, Numbers & Special Symbols",
      "Option to Exclude Ambiguous Characters (l, 1, I, O, 0)",
      "Interactive Security Strength Meter & Entropy Score",
      "One-Click Copy & Instant Regeneration",
    ],
    howToUse: [
      "Select your preferred password length using the slider.",
      "Toggle required character sets (numbers, symbols, uppercase, etc.).",
      "Review the real-time security strength indicator.",
      "Click 'Copy Password' to copy it to your clipboard.",
    ],
    benefits: [
      "Cryptographically secure randomness (crypto.getRandomValues)",
      "Protects your online accounts against brute-force attacks",
      "Zero network requests — generated entirely inside your browser",
      "Completely free with no logging",
    ],
    faqs: [
      {
        question: "Are generated passwords stored or sent over the internet?",
        answer:
          "Never. Passwords are generated strictly on your device using Web Crypto API. They are never sent to any server or logged.",
      },
      {
        question: "What makes a password strong?",
        answer:
          "A strong password combines long character length (16+ characters) with a mix of uppercase letters, lowercase letters, numbers, and symbols.",
      },
      {
        question: "What are ambiguous characters?",
        answer:
          "Ambiguous characters are letters and numbers that look visually similar (e.g. uppercase 'I', lowercase 'l', number '1', letter 'O', zero '0'). Excluding them makes passwords easier to read when manually typing.",
      },
    ],
  },
};

export function getToolSeo(slug: string): ToolSeoData {
  if (toolSeoRegistry[slug]) {
    return toolSeoRegistry[slug];
  }

  // Fallback dynamic SEO for any tool slug
  const matchedTool = tools.find((t) => t.slug === slug || t.id === slug);
  const name =
    matchedTool?.name || slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  const category = matchedTool ? categoryById.get(matchedTool.categoryId) : undefined;
  const categoryName = category?.name || "Utility Tools";
  const desc = matchedTool?.description || `Fast, free, and private online ${name} tool on Flixo.`;

  return {
    slug,
    title: `${name} — Online ${categoryName} | Flixo`,
    description: `${desc} Use Flixo for fast, private, and secure browser-based tools with no sign-up.`,
    keywords: [
      name.toLowerCase(),
      `free ${name.toLowerCase()}`,
      `online ${name.toLowerCase()}`,
      "flixo tools",
      categoryName.toLowerCase(),
    ],
    overview: `The Flixo ${name} tool is designed to deliver fast, secure, and private performance right in your browser. With no account required, you can process your files and tasks with full peace of mind.`,
    features: [
      `Instant browser-based ${name}`,
      "Clean, responsive interface for mobile and desktop",
      "100% Client-side privacy and data protection",
      "Free to use with zero registration",
    ],
    howToUse: [
      `Open the ${name} tool workspace.`,
      "Enter your input data or upload your file.",
      "Configure your desired settings or preferences.",
      "Copy or download your processed results instantly.",
    ],
    benefits: [
      "Saves time without installing heavy software",
      "Private and safe with local browser execution",
      "Available anywhere on phone, tablet, or desktop",
    ],
    faqs: [
      {
        question: `Is Flixo ${name} free to use?`,
        answer: `Yes, Flixo ${name} is completely free with no registration or hidden fees.`,
      },
      {
        question: `Does Flixo store my data when using ${name}?`,
        answer:
          "No, all data processing occurs strictly in your browser. Your files and text are never uploaded or stored on our servers.",
      },
    ],
  };
}
