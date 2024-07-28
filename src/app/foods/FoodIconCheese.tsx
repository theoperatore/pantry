import Image from 'next/image';
import { FoodIcon } from './FoodIcon';
import img from './icons8-cheese-100.png';

export function FoodIconCheese() {
  return (
    <FoodIcon>
      <Image src={img} alt="" width={48} height={48} />
    </FoodIcon>
  );
}
