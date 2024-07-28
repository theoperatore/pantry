import Image from 'next/image';
import { FoodIcon } from './FoodIcon';
import img from './icons8-potato-100.png';

export function FoodIconPotato() {
  return (
    <FoodIcon>
      <Image src={img} alt="" width={48} height={48} />
    </FoodIcon>
  );
}
