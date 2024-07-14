'use client'; 
import Container from "../Container";

import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { FaSkiing } from "react-icons/fa";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { GiBoatFishing, 
    GiIsland, 
    GiWindmill, 
    GiCastle, 
    GiForestCamp, 
    GiCaveEntrance,
    GiCactus,
    GiBarn
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "./CategoryBox";
import { useSearchParams, usePathname } from "next/navigation";

//will export categories later
export const categories = [
    {
        label: 'Beach',
        icon: TbBeach, 
        description: 'This property is near a beach!'
    }, 
    {
        label: 'Windmills',
        icon: GiWindmill, 
        description: 'This property has windmills!'
    }, 
    {
        label: 'Modern',
        icon: MdOutlineVilla, 
        description: 'This property is modern!'
    },
    {
        label: 'Countryside',
        icon: TbMountain, 
        description: 'This property is in the countryside!'
    }, 
    {
        label: 'Pool',
        icon: TbPool, 
        description: 'This property has a pool!'
    }, 
    {
        label: 'Islands',
        icon: GiIsland, 
        description: 'This property is on an island!'
    }, 
    {
        label: 'Lake',
        icon: GiBoatFishing, 
        description: 'This property is close to a lake!'
    }, 
    {
        label: 'Skiing',
        icon: FaSkiing, 
        description: 'This property has skiing activities!'
    }, 
    {
        label: 'Castles',
        icon: GiCastle, 
        description: 'This property is in a caslte!'
    }, 
    {
        label: 'Camping',
        icon: GiForestCamp, 
        description: 'This property has camping activities!'
    }, 
    {
        label: 'Arcitic',
        icon: BsSnow, 
        description: 'This property has winter activities!'
    }, 
    {
        label: 'Cave',
        icon: GiCaveEntrance, 
        description: 'This property is in a cave!'
    }, 
    {
        label: 'Desert',
        icon: GiCactus, 
        description: 'This property is in a desert!'
    }, 
    {
        label: 'Barn',
        icon: GiBarn, 
        description: 'This property is in a barn!'
    }, 
    {
        label: 'Luxe',
        icon: IoDiamond, 
        description: 'This property is a luxury villa!'
    }, 


]

const Categories = () => {
const params = useSearchParams(); 
const category = params?.get('category');
const pathname = usePathname(); 

const isMainPage = pathname === '/';

if (!isMainPage) return null;

  return (
    <Container>
        <div
        className="
            pt-4
            flex
            flex-row
            items-center
            justify-between
            overflow-x-auto

        ">
            {categories.map((item) =>(
                <CategoryBox
                    key={item.label}
                    label={item.label}
                    selected={category === item.label}
                    icon={item.icon}
                />
            ))}
        </div>
    </Container>
  )
}

export default Categories; 