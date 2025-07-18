import React, { useEffect } from 'react';
import { FilterFieldConfig, ReservationFormData } from '../../../../types';
import { InputField } from '../../../components';
import { tablesArray } from '../../dine-with-us';
import { IoIosArrowDown } from "react-icons/io";

const TableBookingStepOne: React.FC<{
    fields: FilterFieldConfig<ReservationFormData>[];
    setFormData: React.Dispatch<React.SetStateAction<ReservationFormData>>;
    formData: ReservationFormData;
    handleSubmit: (e: React.FormEvent) => void;
}> = ({ fields, setFormData, formData, handleSubmit }) => {
    const [selectedTable, setSelectedTable] = React.useState<{
        id: string;
        title: string;
        image: string;
    } | null>(null);
    const [tableCount, setTableCount] = React.useState<number>(0);
    const [tables, setTables] = React.useState(tablesArray);
    const maxPerTable = 2; // Assuming each table can accommodate 2 guests
    const FaArrowDownIcon = IoIosArrowDown as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

    useEffect(() => {
        // accordint to the formData.numberOfGuests, eample if numberOfGuests is 4, and max per table is 2, then we need 2 tables
        const numberOfGuests = formData.numberOfGuests || 0;
        const requiredTables = Math.ceil(numberOfGuests / maxPerTable);
        setTableCount(requiredTables);

        // randomly select a table from the available tables id
        const availableTables = tables.filter(table => table.id === formData.tableDetails?.tableId);
        if (availableTables.length > 0) {
            const randomTable = availableTables[Math.floor(Math.random() * availableTables.length)];
            setSelectedTable({
                id: randomTable.id,
                title: randomTable.title,
                image: randomTable.image,
            });
        } else {
            setSelectedTable(null);
        }
        console.log("setTables", setTables)
    }, [formData.numberOfGuests, formData.tableDetails?.tableId, tables]);

    return (
        <div className="flex flex-col w-full">
            <form onSubmit={handleSubmit} className="w-full shadow-custom6 p-3 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
                    {fields.map((field) => {
                        const value = formData[field.name];
                        return (
                            <div className="flex flex-col w-full gap-2">
                                {field.label && <label htmlFor={field.id} className='text-black font-medium text-sm'>{field.label}</label>}
                                <InputField
                                    key={field.id}
                                    id={field.id}
                                    name={String(field.name)}
                                    type={field.type}
                                    placeholder={field.placeholder as string}
                                    value={field.type === 'date' && value instanceof Date ? value.toISOString().split('T')[0] : String(value ?? '')}
                                    onChange={(e) => {
                                        const newValue =
                                            field.type === 'number'
                                                ? Number(e.target.value)
                                                : field.type === 'date'
                                                    ? new Date(e.target.value)
                                                    : e.target.value;

                                        setFormData((prev) => ({
                                            ...prev,
                                            [field.name]: newValue || (field.required ? '' : null),
                                        }));
                                    }}
                                    className="w-full"
                                    required={field.required}
                                    min={field.min}
                                    max={field.max}
                                    minDate={field.minDate}
                                    maxDate={field.maxDate}
                                    use12Hours={field.use12Hours}
                                    format={field.format}
                                />
                            </div>
                        );
                    })}
                </div>

            </form>
            {tableCount > 0 && (
                <div className="mt-4 w-full shadow-custom6 p-3 rounded-lg">
                    <div className='flex items-center justify-between'>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">{selectedTable?.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">Total Number of Guest</p>
                            <p className="text-sm font-bold mb-2">Max {tableCount} Guests</p>
                        </div>
                        <div>
                            <div className='bg-primaryColor text-white px-5 py-1 rounded-lg flex items-center justify-between'>
                                {tableCount > 1 ? `${tableCount} Tables` : `${tableCount} Table`}
                                <FaArrowDownIcon className='ml-2 text-lg' />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TableBookingStepOne;
