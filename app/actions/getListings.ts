import { create } from 'zustand';
import prisma from "@/app/libs/prismadb";

export default async function getListings () { 
    try{
        // get all listings
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return listings; 
        //individual listing view was transformed to map (ISOString error)
        //however this step is ommitted for the build since error is not present
    } catch (error: any){
        throw new Error(error);
    }
}