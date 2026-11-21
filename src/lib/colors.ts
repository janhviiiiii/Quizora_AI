export const colors = {
  bg: "#0B0B0B",
  card: "#171717",
  surface: "#222222",
  border: "#292929",

  text: "#FFFFFF",
  muted: "#AAAAAA",

  primary: "#B69AFF",
  primarySoft: "#2A203B",

  button: "#E5E5E5",

  success: "#4ADE80",
  successBg: "#14291D",

  danger: "#F87171",
  dangerBg: "#321B1B",

  neutralBg: "#252525",
  dark: "#000000",
};

export function usePalette() {
  return colors;
}

export type Palette = typeof colors;
