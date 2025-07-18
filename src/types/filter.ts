export interface RoomBookingStepProps {
    roomId: string;
    roomCount: number;
}
export interface FormDataProps {
    checkInDate: Date | null;
    checkOutDate: Date | null;
    numberOfGuests: number | '';
    roomDetails?: RoomBookingStepProps;
}

export interface TableBookingStepProps {
    tableId: string;
    tableCount: number;
}
export interface ReservationFormData {
    reservationDate: Date | null;
    reservationTime: string;
    numberOfGuests: number | '';
    tableDetails?: TableBookingStepProps;
}
export interface FilterFieldConfig<T> {
    id: string;
    name: keyof T;
    label: string;
    type: "text" | "password" | "textarea" | "date" | "time" | "radio" | "select" | "number" | "email" | "checkbox";
    placeholder?: string;
    required?: boolean;
    min?: number;
    max?: number;
    minDate?: Date;
    maxDate?: Date;
    use12Hours?: boolean;
    format?: 'h:mm a' | 'H:mm A' | 'h:mm:ss a' | 'H:mm:ss A' | 'HH:mm:ss' | 'HH:mm';
}

export interface FilterProps<T> {
    formData: T;
    setFormData: React.Dispatch<React.SetStateAction<T>>;
    fields: FilterFieldConfig<T>[];
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleReset: () => void;
}