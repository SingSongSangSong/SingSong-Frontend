const randomColor = [
  '#F7F4C1',
  '#F2D7B4',
  '#D5EDB5',
  '#C5E7F2',
  '#E6E3A6',
  '#EDD9A3',
  '#C8E8A1',
  '#B3DDEE',
  '#F9F7D8',
  '#F3E0C9',
] as const;

const designatedColor = {
  KEEP_FILLED: '#FFD700',
  KEEP_EMPTY: '#D3D3D3',
  GREEN: '#1DB954',
  DARK_GRAY: '#B3B3B3',
} as const;

export {randomColor, designatedColor};
