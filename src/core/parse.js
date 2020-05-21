export function parse(value = '') {
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1)) || value;
    } catch (e) {
      return value;
    }
  }

  return value;
}
