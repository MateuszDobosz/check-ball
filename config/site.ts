export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "check ball",
  description: "Zapiszmy się na granie!",
  navItems: [
    {
      label: "Dodaj grę",
      href: "/add-game",
    },
    {
      label: "Historia gier",
      href: "/game-history",
    },
  ],
  navMenuItems: [
    {
      label: "Dodaj grę",
      href: "/add-game",
    },
    {
      label: "Historia gier",
      href: "/game-history",
    },
  ],
};
