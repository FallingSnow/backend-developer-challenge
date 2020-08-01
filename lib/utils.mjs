export function traverse(o, func, path = []) {
  for (const [k, v] of Object.entries(o)) {
    func(k, v, path);
    if (v !== null && typeof(v) === "object") {
      traverse(v, func, path.concat(v.path || k));
    }
  }
}

export function normalizeRelativeUrl(url) {
  if (!url.startsWith('/')) {
    url = '/' + url;
  }
  return url;
}
