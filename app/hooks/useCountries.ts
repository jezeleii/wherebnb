import countries from 'world-countries';

// This is a hook that returns a list of countries, using an object with a value property.
const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag, // This should be the Unicode emoji
    latlng: country.latlng,
    region: country.region,
}));

const useCountries = () => {
    const getAll = () => formattedCountries;
    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value);
    }

    return {
        getAll,
        getByValue
    };
};

export default useCountries;
