'use client';

import { formatISO } from 'date-fns';
import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useMemo, useCallback } from "react";
import { Range } from "react-date-range";

import dynamic from "next/dynamic";
import Modal from "./Modal";
import useSearchModal from "../../hooks/useSearchModal";

import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import Heading from "../Heading";
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';

enum STEPS {
    LOCATION = 0, 
    DATE = 1, 
    INFO = 2
}

// Define Singapore as the default country value
const defaultCountry: CountrySelectValue = {
    flag: "🇸🇬",
    label: "Singapore",
    latlng: [1.3521, 103.8198],
    region: "Asia",
    value: "SG"
};

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();

    const [location, setLocation] = useState<CountrySelectValue>(defaultCountry);
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(), 
        endDate: new Date(), 
        key: 'selection'
    });

    const Map = useMemo(() => dynamic(() => import('../Map'), { ssr: false }), [location]);

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((value) => value + 1);
    }, []);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery, 
            location: location?.value,
            guestCount, 
            roomCount,
            bathroomCount
        }; 

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true });

        // Reset steps
        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    }, [
        step, 
        searchModal, 
        location, 
        router, 
        guestCount, 
        roomCount, 
        bathroomCount,
        dateRange, 
        onNext, 
        params
    ]);

    // Action label 
    const actionLabel = useMemo(() => {
        return step === STEPS.INFO ? 'Search' : 'Next';
    }, [step]);

    // Secondary action label 
    const secondaryActionLabel = useMemo(() => {
       return step === STEPS.LOCATION ? undefined : 'Back';
    }, [step]);

    // Body content 
    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="Where do you wanna go?"
                subtitle="Find the perfect location!"
            />
            <CountrySelect
                value={location}
                onChange={(value) => setLocation(value)}
            />
            <hr />
            <Map center={location?.latlng} />
        </div>
    );
    
    // Date component 
    if (step === STEPS.DATE) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="When do you plan to go?"
                    subtitle="Set your dates!"
                />
                <Calendar
                    value={dateRange}
                    onChange={(value) => setDateRange(value.selection)}
                />
            </div>
        );
    }

    // Info component 
    if (step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="More information"
                    subtitle="Find your perfect place!"
                />
                <Counter
                    title="Guests"
                    subtitle="How many guests are coming?"
                    value={guestCount}
                    onChange={(value) => setGuestCount(value)}
                />
                <Counter
                    title="Rooms"
                    subtitle="How many rooms do you need?"
                    value={roomCount}
                    onChange={(value) => setRoomCount(value)}
                />
                <Counter
                    title="Bathrooms"
                    subtitle="How many bathrooms do you need?"
                    value={bathroomCount}
                    onChange={(value) => setBathroomCount(value)}
                />
            </div>
        );
    }

    return (
        <Modal
            isOpen={searchModal.isOpen}
            onClose={searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLabel={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
            body={bodyContent}
        />
    );
};

export default SearchModal;
