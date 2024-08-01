import Image from 'next/image';
import { FoodIcon } from './FoodIcon';
import img from './icons8-cookie-100.png';

export function FoodIconCookie() {
  return (
    <FoodIcon>
      <Image src={img} alt="" width={48} height={48} priority />
    </FoodIcon>
  );
}
