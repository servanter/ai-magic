export interface ImageConfig {
  href: string;
  name: string;
  type: number;
}

export const imageConfigs: ImageConfig[] = [
  { href: "/demo1.png", name: "卡通", type: 1 },
  { href: "/demo2.png", name: "魔幻", type: 2 },
  { href: "/demo3.png", name: "像素", type: 3 },
];