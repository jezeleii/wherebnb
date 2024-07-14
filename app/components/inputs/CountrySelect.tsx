'use client';

import Select, { StylesConfig } from 'react-select';
import useCountries from '../../hooks/useCountries';

export type CountrySelectValue = {
    flag: string;
    label: string; 
    latlng: number[];
    region: string;
    value: string;
}

interface CountrySelectProps {
    value: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    value, 
    onChange = () => {} // Default no-op function
}) => {
    const { getAll } = useCountries();

    const customStyles: StylesConfig<CountrySelectValue, false> = {
        control: (provided, state) => ({
            ...provided,
            padding: '3px',
            borderWidth: '2px',
            borderRadius: '6px',
            borderColor: state.isFocused ? 'black' : provided.borderColor,
            '&:hover': {
                borderColor: 'white',
            },
        }),
        input: (provided) => ({
            ...provided,
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? '#002b69' : 'white',
            color: state.isFocused ? 'white' : 'black',
            '&:hover': {
                backgroundColor: '#002b69',
                color: 'white',
            },
        }),
    };

    return (
        <div>
            <Select
                placeholder="Anywhere"
                isClearable
                options={getAll()}
                value={value}
                onChange={(value) => onChange(value as CountrySelectValue)}
                formatOptionLabel={(option: any) => (
                    <div className="flex flex-row items-center gap-3">
                        <div>{option.flag}</div> {/* Render flag as emoji */}
                        <div>
                            {option.label}, 
                            <span className="text-gray-400 ml-1">{option.region}</span>
                        </div>
                    </div>
                )}
                styles={customStyles}
                theme={(theme) => ({
                    ...theme, 
                    borderRadius: 6, 
                    colors: {
                        ...theme.colors, 
                        primary: 'black',
                        primary25: '#002b69'
                    }
                })}
            />
        </div>
    );
}

export default CountrySelect;
