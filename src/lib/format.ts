export function formatSizeUnit(bytes: number) {
  const KILO = 1000;
  const MEGA = KILO * 1000;
  const GIGA = MEGA * 1000;
  const TERA = GIGA * 1000;

  if (bytes > TERA) {
    return Math.trunc(bytes / GIGA) + "tb";
  }

  if (bytes > GIGA) {
    return (bytes / GIGA).toFixed(2) + "gb";
  }

  if (bytes > MEGA) {
    return Math.trunc(bytes / MEGA) + "mb";
  }

  if (bytes > KILO) {
    return (bytes / KILO).toFixed(2) + "kb";
  }

  return Math.trunc(bytes) + "b";
}

export function getDisplayPath(path: string | null) {
  if (path === null) return null;

  return path.length > 30
    ? `...${path.substring(path.length - 10, path.length)}`
    : path;
}
