import Image from 'next/image';
import { FoodIcon } from './FoodIcon';
import img from './icons8-greenery-100.png';

export function FoodIconGreenery() {
  return (
    <FoodIcon>
      <Image src={img} alt="" width={48} height={48} />
    </FoodIcon>
  );
}
