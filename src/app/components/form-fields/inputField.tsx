import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Checkbox, DatePicker, Input, Select, TimePicker } from "antd";
import React from "react";
import dayjs from 'dayjs';
interface InputFieldProps {
    label?: string;
    type: "text" | "password" | "textarea" | "date" | "time" | "radio" | "select" | "number" | "email" | "checkbox";
    id: string;
    name: string;
    placeholder: string;
    value?: string | number | Date | null | undefined;
    checked?: boolean;
    className?: string;
    allowClear?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id?: string) => void;
    outline?: boolean;
    disabled?: boolean;
    use12Hours?: boolean;
    format?: 'h:mm a' | 'H:mm A' | 'h:mm:ss a' | 'H:mm:ss A' | 'HH:mm:ss' | 'HH:mm';
    options?: { label: string; value: string }[];
    min?: number;
    max?: number;
    required?: boolean;
    rows?: number;
    cols?: number;
    minDate?: Date;
    maxDate?: Date;
}

const InputField: React.FC<InputFieldProps> = (props) => {
    const {
        label,
        type,
        id,
        name,
        placeholder,
        value,
        className,
        allowClear = true,
        onChange,
        outline,
        disabled,
        use12Hours = false,
        format,
        options,
        min,
        max,
        required,
        checked,
        rows,
        cols,
        minDate,
        maxDate,
    } = props;

    switch (type) {
        case "text":
            return (
                <div className="flex flex-col w-full gap-2">
                    <div className="flex items-center gap-1">
                        {label && <label htmlFor={id} className='text-primaryColor font-medium text-sm'>{label}</label>}
                        {label && <span className="text-red-500">*</span>}
                    </div>
                    <Input
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        value={value as string}
                        className={`w-full rounded-md ${className}`}
                        onChange={(e) => onChange && onChange(e)}
                        allowClear={allowClear}
                        disabled={disabled}
                        required={required}
                    />
                </div>
            );
        case "password":
            return (
                <div className="flex flex-col w-full gap-2">
                    <div className="flex items-center gap-1">
                        {label && <label htmlFor={id} className='text-primaryColor font-medium text-sm'>{label}</label>}
                        {label && <span className="text-red-500">*</span>}
                    </div>
                    <Input.Password
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        value={value as string}
                        className={`w-full rounded-md ${className}`}
                        onChange={(e) => onChange && onChange(e)}
                        allowClear={allowClear}
                        disabled={disabled}
                    />
                </div>
            );

        case "number":
            return (
                <div className="flex flex-col w-full gap-2">
                    <div className="flex items-center gap-1">
                        {label && <label htmlFor={id} className='text-primaryColor font-medium text-sm'>{label}</label>}
                        {label && <span className="text-red-500">*</span>}
                    </div>
                    <Input
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        value={value as string}
                        className={`w-full rounded-md ${className}`}
                        onChange={(e) => onChange && onChange(e)}
                        allowClear={allowClear}
                        disabled={disabled}
                        min={min}
                        max={max}
                        required={required}
                    />
                </div>
            );
        case "textarea":
            return (
                <div className="flex flex-col w-full gap-2">
                    <div className="flex items-center gap-1">
                        {label && <label htmlFor={id} className='text-primaryColor font-medium text-sm'>{label}</label>}
                        {label && <span className="text-red-500">*</span>}
                    </div>
                    <div className={`${outline ? 'border border-gray-300 rounded-md' : ''}`}>
                        <textarea
                            id={id}
                            name={name}
                            placeholder={placeholder}
                            value={value as string}
                            className={`w-full rounded-md ${className}`}
                            onChange={(e) => onChange && onChange(e)}
                            disabled={disabled}
                            rows={rows}
                            cols={cols}
                        />
                    </div>
                </div>
            );
        case "date":
            return (
                <div className="flex flex-col w-full gap-2">
                    <div className="flex items-center gap-1">
                        {label && <label htmlFor={id} className='text-primaryColor font-medium text-sm'>{label}</label>}
                        {label && <span className="text-red-500">*</span>}
                    </div>
                    <div className={`${outline ? 'border border-gray-300 rounded-md' : ''}`}>
                        <DatePicker
                            id={id}
                            name={name}
                            placeholder={placeholder}
                            value={value ? dayjs(value) : null}
                            className={`w-full rounded-md ${className}`}
                            onChange={(date, dateString) => onChange && onChange({ target: { value: dateString, } } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name)}
                            disabled={disabled}
                            minDate={minDate ? dayjs(minDate) : undefined}
                            maxDate={maxDate ? dayjs(maxDate) : undefined}
                            format={format}
                        />
                    </div>
                </div>
            );
        case "time":
            return (
                <div className="flex flex-col w-full gap-2">
                    <div className="flex items-center gap-1">
                        {label && <label htmlFor={id} className='text-primaryColor font-medium text-sm'>{label}</label>}
                        {label && <span className="text-red-500">*</span>}
                    </div>
                    <div className={`${outline ? 'border border-gray-300 rounded-md' : ''}`}>
                        <TimePicker
                            id={id}
                            name={id}
                            placeholder={placeholder}
                            value={value ? dayjs(value, format) : null}
                            className={`w-full rounded-md ${className}`}
                            onChange={(time, timeString) => onChange && onChange({ target: { value: timeString } } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name)}
                            disabled={disabled}
                            use12Hours={use12Hours}
                            format={format}
                        />
                    </div>
                </div>
            );
        case "select":
            return (
                <div className="flex flex-col w-full gap-2">
                    <div className="flex items-center gap-1">
                        {label && <label htmlFor={id} className='text-primaryColor font-medium text-sm'>{label}</label>}
                        {label && <span className="text-red-500">*</span>}
                    </div>
                    <Select
                        id={id}
                        placeholder={placeholder}
                        value={value}
                        className={`w-full rounded-md ${className}`}
                        onChange={(value) => onChange && onChange({ target: { value } } as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, name)}
                        disabled={disabled}
                    >
                        {options?.map((option) => (
                            <Select.Option key={option.value} value={option.value}>{option.label}</Select.Option>
                        ))}
                    </Select>
                </div>
            );
        case "email":
            return (
                <div className="flex flex-col w-full gap-2">
                    <div className="flex items-center gap-1">
                        {label && <label htmlFor={id} className='text-primaryColor font-medium text-sm'>{label}</label>}
                        {label && <span className="text-red-500">*</span>}
                    </div>
                    <Input
                        id={id}
                        name={name}
                        placeholder={placeholder}
                        value={value as string}
                        className={`w-full rounded-md ${className}`}
                        onChange={(e) => onChange && onChange(e)}
                        allowClear={allowClear}
                        disabled={disabled}
                    />
                </div>
            );
        case "checkbox":
            return (
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-1">
                        <label htmlFor={id}>{label}</label>
                        {label && <span className="text-red-500">*</span>}
                    </div>
                    <Checkbox
                        id={id}
                        name={name}
                        defaultChecked={checked}
                        onChange={(e) => onChange && onChange(e as unknown as React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, id)}
                        disabled={disabled}
                    />
                </div>
            );
        default:
            return (
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-1">
                        <label htmlFor={id}>{label}</label>
                        {label && <span className="text-red-500">*</span>}
                    </div>
                    <input
                        type={type}
                        id={id}
                        value={value as string}
                        name={name}
                        placeholder={placeholder}
                        onChange={(e) => onChange && onChange(e)}
                        disabled={disabled}
                    />
                </div>
            );
    }

}

export default InputField;
