import Image from 'next/image';
import { FoodIcon } from './FoodIcon';
import img from './icons8-nut-100.png';

export function FoodIconNut() {
  return (
    <FoodIcon>
      <Image src={img} alt="" width={48} height={48} />
    </FoodIcon>
  );
}
