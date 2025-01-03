import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";

import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";

import ListingClient from "./ListingClient";
import getReservations from "@/app/actions/getReservations";

interface IParams{
    listingId?: string; 
}


//why are we not using next/navigation -> this is a server component; accesses by server params
const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser(); 

  if (!listing){
    <ClientOnly>
      <EmptyState/>
    </ClientOnly>
  }
  return (
      <ClientOnly>
          {listing && (
            <ListingClient
              listing={listing}
              reservations={reservations}
              currentUser={currentUser}
            />
          )}
      </ClientOnly>
    );
}

export default ListingPage;