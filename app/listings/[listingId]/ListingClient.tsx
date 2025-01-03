'use client';

import axios from 'axios';
import { Range } from 'react-date-range';
import { toast } from 'react-hot-toast';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { categories } from '@/app/components/navbar/Categories';
import { eachDayOfInterval, differenceInCalendarDays } from 'date-fns';



import { SafeReservation, SafeListing, SafeUser } from '@/app//types';
import Container from '@/app/components/Container';
import ListingHead from './ListingHead';
import ListingInfo from './ListingInfo';
import ListingReservation from './ListingReservation';

import useLoginModal from '@/app/hooks/useLoginModal';
import { useRouter } from 'next/navigation';



const initialDateRange = {
    startDate : new Date(), 
    endDate: new Date(), 
    key: 'selection'
};

interface ListingClientProps { 
    reservations?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
    listing, 
    reservations = [],
    currentUser
}) => {
    const loginModal = useLoginModal(); 
    const router = useRouter();

    const disabledDates = useMemo(() => {
        //iterate reservations and disabled picked dates
        let dates: Date[] = [];

        reservations.forEach((reservation) => {
            const range  = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });

            dates = [...dates, ...range];
            //iterate through reservations and create range of dates and pass through already existing dates
        }); 

        return dates;
    },[reservations]);

    const [isLoading, setIsLoading] = useState(false);
    const [totalPrice, setTotalPrice] = useState(listing.price);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);

    //function to create actual reservation
    const onCreateReservation = useCallback(() => {
        if (!currentUser){
            return loginModal.onOpen(); 
        }

        setIsLoading(true);

        axios.post('/api/reservations', {
            totalPrice, 
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            listingId: listing?.id
        })
        .then(() => {
            toast.success('Reservation created successfully');
            setDateRange(initialDateRange);
            // Redirect to /trips
            //temporary refresh 
            router.push('/trips'); 
        })
        .catch((error) => {
            toast.error('Failed to create reservation');
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, [
        totalPrice, 
        dateRange, 
        listing?.id, 
        router, 
        currentUser,
        loginModal
    ]);

    //create useEffect - change total price depending on how the user selects the date on the calendar
    useEffect(() => {
        if (dateRange.startDate && dateRange.endDate){
            const dayCount = differenceInCalendarDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && listing.price){
                setTotalPrice(dayCount * listing.price);
            } else { 
                setTotalPrice(listing.price);
            }
        }
    },[dateRange, listing.price]);



    const category  = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    },[listing.category]);

    return (
        <Container>
            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    <ListingHead
                        title={listing.title}
                        imageSrc={listing.imageSrc}
                        locationValue={listing.locationValue}
                        id={listing.id}
                        currentUser={currentUser}
                    />
                    <div className="
                        grid 
                        grid-cols-1
                        md:grid-cols-7
                        md:gap-10
                        mt-6
                    ">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue}
                        />
                        <div
                            className="
                                order-first
                                mb-10
                                md:order-last
                                md:col-span-3
                            "
                        >
                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalPrice}
                                onChangeDate={(value) => setDateRange(value)}
                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isLoading}
                                disabledDates={disabledDates}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default ListingClient;