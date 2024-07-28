import { DefaultMantineColor, MantineColorsTuple } from '@mantine/core';

// color theme generated from:
// https://mycolor.space/?hex=%23845EC2&sub=1

// https://mantine.dev/colors-generator/?color=845ec2
export const brandColors: MantineColorsTuple = [
  '#f7eeff',
  '#e6dcf6',
  '#c8b7e6',
  '#a98fd6',
  '#8f6dc8',
  '#7f57c0',
  '#774dbc',
  '#653da7',
  '#5a3696',
  '#4d2d85',
];

// https://mantine.dev/colors-generator/?color=4b4453
export const darkColors: MantineColorsTuple = [
  '#f5f4f6',
  '#e6e6e6',
  '#cbc9cc',
  '#afacb2',
  '#97929c',
  '#88828f',
  '#817a89',
  '#6f6777',
  '#635c6b',
  '#564e5f',
];

// https://mantine.dev/colors-generator/?color=c34a36
export const dangerColors: MantineColorsTuple = [
  '#ffeeea',
  '#f9ddd8',
  '#eab9b0',
  '#dd9286',
  '#d27262',
  '#cc5e4b',
  '#ca523e',
  '#b34230',
  '#a03a2a',
  '#8d2f21',
];

// https://mantine.dev/colors-generator/?color=b0a8b9
export const neutralColors: MantineColorsTuple = [
  '#f8f2fe',
  '#e8e4ed',
  '#cdc8d4',
  '#b1a9ba',
  '#9a8fa4',
  '#8b7f97',
  '#837791',
  '#71657f',
  '#655973',
  '#584b66',
];

// https://mantine.dev/colors-generator/?color=ff8066
export const highlightColors: MantineColorsTuple = [
  '#ffebe6',
  '#ffd7ce',
  '#ffac9b',
  '#ff7f64',
  '#fe5937',
  '#fe4019',
  '#ff3309',
  '#e42500',
  '#cb1d00',
  '#b11100',
];

//https://mantine.dev/colors-generator/?color=00c9a7
export const greenColors: MantineColorsTuple = [
  '#e4fffd',
  '#d0fff7',
  '#a0feee',
  '#6efee5',
  '#4bfedd',
  '#3afed9',
  '#2dfed5',
  '#1ee2bd',
  '#00c9a7',
  '#00ae8f',
];

// https://mantine.dev/colors-generator/?color=1c819e
export const blueColors: MantineColorsTuple = [
  '#eef9fc',
  '#deeff4',
  '#b7dfeb',
  '#8dcee1',
  '#6dbfd9',
  '#5bb6d4',
  '#4fb2d3',
  '#409cbb',
  '#338ba7',
  '#1a7893',
];

export const freshnessColors: MantineColorsTuple = [
  '#008c82',
  '#008c82',
  '#008c82',
  '#008c82',
  '#008c82',
  '#008c82',
  '#008c82',
  '#008c82',
  '#008c82',
  '#008c82',
];

type ExtendedCustomColors =
  | 'brand'
  | 'danger'
  | 'neutral'
  | 'highlight'
  | 'freshness'
  | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}
