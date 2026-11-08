export const layers = ['Landscape', 'Canopy', 'Water', 'Elevation'] as const;
export type Layer = (typeof layers)[number];
export interface AtlasView {
  zoom: number;
  x: number;
  y: number;
}
export const initialView: AtlasView = { zoom: 1, x: 0, y: 0 };
export function constrainView(view: AtlasView): AtlasView {
  const zoom = Math.min(3, Math.max(1, view.zoom));
  return {
    zoom,
    x: Math.min(0, Math.max((1 - zoom) * 100, view.x)),
    y: Math.min(0, Math.max((1 - zoom) * 100, view.y)),
  };
}
export function zoomView(view: AtlasView, zoom: number): AtlasView {
  const next = Math.min(3, Math.max(1, zoom));
  const ratio = next / view.zoom;
  return constrainView({
    zoom: next,
    x: 50 - (50 - view.x) * ratio,
    y: 50 - (50 - view.y) * ratio,
  });
}
export const observations = [
  {
    id: 'ridge',
    name: 'The north ridge',
    kind: 'WOODLAND',
    x: 27,
    y: 62,
    area: '18.4',
    elevation: '420–610',
    color: '#91ac72',
    canopy: [71, 72, 74, 78, 82, 88, 90, 89, 83, 79, 74, 72],
    water: [48, 53, 62, 69, 65, 54, 42, 39, 45, 57, 64, 55],
    description:
      'A band of woodland connects the upper slopes. Seasonal canopy changes make this a useful place to compare the layers.',
    question: 'Where do you see a continuous tree line?',
  },
  {
    id: 'valley',
    name: 'Valley commons',
    kind: 'CULTIVATED LAND',
    x: 58,
    y: 79,
    area: '32.8',
    elevation: '180–280',
    color: '#d4ba73',
    canopy: [28, 29, 34, 42, 49, 54, 57, 54, 47, 38, 31, 29],
    water: [68, 72, 82, 88, 79, 65, 52, 49, 64, 81, 86, 74],
    description:
      'Fields, paths, and settlements share the valley floor. Follow the water corridor to see how the landscape fits together.',
    question: 'How might the stream connect the fields?',
  },
  {
    id: 'basin',
    name: 'The upper basin',
    kind: 'WATERSHED',
    x: 78,
    y: 57,
    area: '24.1',
    elevation: '560–840',
    color: '#8fb4bf',
    canopy: [46, 47, 49, 54, 62, 68, 71, 70, 63, 55, 49, 47],
    water: [52, 59, 75, 91, 88, 73, 58, 51, 64, 78, 81, 65],
    description:
      'The high ground gathers water before it reaches the cultivated valley. Compare spring and late summer in the sample record.',
    question: 'Which season would you choose for a field visit?',
  },
] as const;
export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export function isNotes(value: unknown): value is Record<string, string> {
  return (
    !!value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    Object.entries(value).every(
      ([key, note]) =>
        observations.some((o) => o.id === key) && typeof note === 'string' && note.length <= 600,
    )
  );
}
