import React from 'react'
import InputField from '../form-fields/inputField'
import { FilterProps } from '../../../types';

const Filter = <T,>({ formData, setFormData, fields, handleSubmit, handleReset }: FilterProps<T>): JSX.Element => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {fields.map((field) => {
                    const value = formData[field.name];
                    return (
                        <InputField
                            key={field.id}
                            id={field.id}
                            name={String(field.name)}
                            label={field.label}
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
                    );
                })}
            </div>

            <div className="flex justify-end">
                {Object.values(formData as Record<string, unknown>).some(value => value !== null && value !== '' && value !== undefined) && (
                    <button type="button" onClick={handleReset} className="bg-gray-200 py-2 px-4 rounded-xl mt-4 mr-2 text-sm">
                        Reset
                    </button>
                )}
                <button type="submit" className="bg-black text-white py-2 px-4 rounded-xl mt-4 text-sm">
                    Check Availability
                </button>
            </div>
        </form>
    );
};



export default Filter