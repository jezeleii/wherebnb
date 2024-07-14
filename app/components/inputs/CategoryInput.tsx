'use client';


interface CategoryInputProps {
    icon: IconType; 
    label: string; 
    selected?: boolean; 
    onClick: (value: string) => void; 
}

const CategoryInput: React.FC<CategoryInputProps> = ({
    icon: Icon, 
    label, 
    selected, 
    onClick
}) => {
  return (
    <div
        onClick={() => onClick(label)}
        className={`
            rounded-xl
            border-2
            p-4
            flex
            flex-col
            gap-3
            hover:border-black
            transition
            cursor-pointer
            ${selected ? 'border-black' : 'border-neutral-200'}
        `}
    >
        <Icon/>
        {label}
    </div>
  )
}

export default CategoryInput;