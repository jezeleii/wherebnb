'use client'; 

import { IconType } from 'react-icons';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import qs from "query-string"; 

interface CategoryBoxProps{
    icon: IconType;
    label: string; 
    selected?: boolean; 
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon, 
    label, 
    selected
}) => {
    const router = useRouter(); 
    const params = useSearchParams(); 

    const handleClick =  useCallback(() => {
        //define an empty query 
        let currentQuery = {}; 


        //look through the current params, parse as an object not string 
        if (params){
            currentQuery = qs.parse(params.toString()); 
        }

        //update the query with the category
        const updatedQuery: any = {
            ...currentQuery, 
            category: label 
        }

        //check if category is selected , remove if selected to deselect
        if (params?.get('category') === label){
            delete updatedQuery.category; 
        }   

        //stringify the updated query and push to the router
        const url = qs.stringifyUrl({
            url: '/', 
            query: updatedQuery
        }, {skipNull: true}); 

        router.push(url);
    }, [label, params, router])
  return (
    <div
        onClick={handleClick}
        className= {`
            flex
            flex-col
            items-center
            gap-2
            p-3
            border-b-2
            hover:text-neutral-800
            transition
            cursor-pointer
            ${selected ? 'border-b-neutral-800' : 'border-transparent'}
            ${selected ? 'text-neutral-800' : 'text-neutral-500'}
        `}
    >   
        <Icon size={26}/>
        <div className="font-medium text-sm">
            {label}
        </div>
    </div>
  )
}

export default CategoryBox