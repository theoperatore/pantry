import Image from 'next/image';
import { FoodIcon } from './FoodIcon';
import img from './icons8-asparagus-100.png';

export function FoodIconAsparagus() {
  return (
    <FoodIcon>
      <Image src={img} alt="" width={48} height={48} priority />
    </FoodIcon>
  );
}
