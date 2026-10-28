export function normalize(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('en')
    .replace(/[’']/g, '')
    .trim();
}

export function matches(text: string, query: string): boolean {
  const normalized = normalize(text);
  return normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => normalized.includes(term));
}
