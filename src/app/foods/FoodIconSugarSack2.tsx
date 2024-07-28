import Image from 'next/image';
import { FoodIcon } from './FoodIcon';
import img from './icons8-sugar-sack-100-2.png';

export function FoodIconSugarSack2() {
  return (
    <FoodIcon>
      <Image src={img} alt="" width={48} height={48} />
    </FoodIcon>
  );
}
