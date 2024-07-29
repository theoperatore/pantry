import Image from 'next/image';
import { FoodIcon } from './FoodIcon';
import img from './icons8-olive-oil-100.png';

export function FoodIconOliveOil() {
  return (
    <FoodIcon>
      <Image src={img} alt="" width={48} height={48} priority />
    </FoodIcon>
  );
}
