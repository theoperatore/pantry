import Image from 'next/image';
import { FoodIcon } from './FoodIcon';
import img from './icons8-bacon-100.png';

export function FoodIconBacon() {
  return (
    <FoodIcon>
      <Image src={img} alt="" width={48} height={48} priority />
    </FoodIcon>
  );
}
