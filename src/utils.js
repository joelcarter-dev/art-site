// Shared helpers

// lodash-style kebabCase: "Pen & Ink" -> "pen-ink", "NZ Landscape" -> "nz-landscape"
export function kebabCase(str) {
  return String(str)
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}
