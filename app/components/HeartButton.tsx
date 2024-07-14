'use client';

import { SafeUser } from '../types';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import useFavorite from "../hooks/useFavorite"; 

interface HeartButtonProps {
    listingId: string; 
    currentUser?: SafeUser | null; 
}

const HeartButton: React.FC<HeartButtonProps> = ({
    listingId, 
    currentUser
}) => {
    const { hasFavorited, toggleFavorite } = useFavorite({
        listingId, 
        currentUser
    });
    return (
        <div
            onClick={toggleFavorite}
            className="
                relative
                hover:opacity-80 
                transition
                cursor-pointer
            "
        >
            <AiOutlineHeart
                size={28}
                className="
                    fill-white
                    absolute
                    -top-[2px]
                    -right-[1px]
                "
            />
            <AiFillHeart
                size={25}
                className={
                    hasFavorited ? 'fill-white' : 'fill-white opacity-20'
                }
            />
        </div>
    )
}

export default HeartButton;