import { CSSProperties } from 'react';
import Image from 'next/image';
import { FoodIcon } from './FoodIcon';
import img from './icons8-tree-planting-100.png';

type Props = {
  size: keyof typeof dimensions;
  style?: CSSProperties;
};

const dimensions = {
  xs: 12,
  sm: 24,
  md: 48,
  lg: 64,
  xl: 72,
} as const;

export function FoodIconFreshness(props: Props) {
  const size = dimensions[props.size];

  return (
    <FoodIcon style={props.style}>
      <Image src={img} alt="" width={size} height={size} />
    </FoodIcon>
  );
}
