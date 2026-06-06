export type CreativeWorkItem = 
  | {
      id: number;
      type: "beforeafter";
      beforeImage: string;
      afterImage: string;
      title: string;
      category: string;
      year: string;
      description: string;
    }
  | {
      id: number;
      type: "poster";
      image: string;
      title: string;
      category: string;
      year: string;
      description: string;
    };

export const creativeWork: CreativeWorkItem[] = [
  {
    id: 1,
    type: "beforeafter",
    beforeImage: "linear-gradient(135deg, #1a1a1a, #3a3a3a)",
    afterImage: "linear-gradient(135deg, #1a0800, #FF4D00)",
    title: "Portrait Retouch",
    category: "Skin Retouching",
    year: "2024",
    description: "Portrait enhancement for client shoot"
  },
  {
    id: 2,
    type: "poster",
    image: "linear-gradient(135deg, #000a1a, #0044FF)",
    title: "Event Poster — Nightfall",
    category: "Event Design",
    year: "2024",
    description: "Promotional poster for a music event"
  },
  {
    id: 3,
    type: "beforeafter",
    beforeImage: "linear-gradient(135deg, #1a1a1a, #3a3a3a)",
    afterImage: "linear-gradient(135deg, #1a0800, #FF4D00)",
    title: "Cinematic Grade",
    category: "Color Grading",
    year: "2024",
    description: "Cinematic color grade for brand shoot"
  },
  {
    id: 4,
    type: "poster",
    image: "linear-gradient(135deg, #0a0012, #9B00FF)",
    title: "Brand Identity — Noir",
    category: "Brand Design",
    year: "2024",
    description: "Visual identity for a luxury brand"
  },
  {
    id: 5,
    type: "beforeafter",
    beforeImage: "linear-gradient(135deg, #1a1a1a, #3a3a3a)",
    afterImage: "linear-gradient(135deg, #1a0800, #FF4D00)",
    title: "Product Enhancement",
    category: "Product Editing",
    year: "2023",
    description: "Product photo cleanup for e-commerce"
  },
  {
    id: 6,
    type: "poster",
    image: "linear-gradient(135deg, #001a00, #00CC66)",
    title: "Social Campaign",
    category: "Social Media",
    year: "2024",
    description: "Product launch campaign creative"
  }
];
