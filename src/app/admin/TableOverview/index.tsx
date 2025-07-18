import { Booking, OverviewData } from "../../../types";
import OverviewCard from "../../components/over-view/OverviewCard";


const sampleTableBookings: Booking[] = [
    {
        id: '5',
        guestName: 'Robert Wilson',
        startDate: new Date('2025-01-15T19:00:00'),
        endDate: new Date('2025-01-15T21:00:00'),
        status: 'confirmed',
        phone: '+1 (555) 111-2222',
        email: 'robert.wilson@email.com',
        partySize: 4
    },
    {
        id: '9',
        guestName: 'Pramud Ndaula',
        startDate: new Date('2025-01-15T16:00:00'),
        endDate: new Date('2025-01-15T19:00:00'),
        status: 'confirmed',
        phone: '+1 (555) 111-2222',
        email: 'pramud.ndaula@email.com',
        partySize: 4
    },
    {
        id: '6',
        guestName: 'Lisa Anderson',
        startDate: new Date('2025-01-16T18:30:00'),
        endDate: new Date('2025-01-16T20:30:00'),
        status: 'confirmed',
        phone: '+1 (555) 333-4444',
        email: 'lisa.anderson@email.com',
        partySize: 2
    },
    {
        id: '7',
        guestName: 'David Martinez',
        startDate: new Date('2025-01-18T20:00:00'),
        endDate: new Date('2025-01-18T22:00:00'),
        status: 'confirmed',
        phone: '+1 (555) 555-6666',
        email: 'david.martinez@email.com',
        partySize: 6
    },
    {
        id: '8',
        guestName: 'Jennifer Taylor',
        startDate: new Date('2025-01-20T19:30:00'),
        endDate: new Date('2025-01-20T21:30:00'),
        status: 'confirmed',
        phone: '+1 (555) 777-8888',
        email: 'jennifer.taylor@email.com',
        partySize: 3
    }
];
const TableOverview: React.FC = () => {
    const tableData: OverviewData = {
        title: 'Table 1',
        subtitle: '4 Seats • $50/table',
        status: 'occupied',
        statusOptions: ['occupied', 'available', 'maintenance'],
        totalBookings: 15,
        revenue: '$200',
        occupancyText: 'Room is currently unoccupied',
        appointmentText: 'No upcoming appointments',
        lastCleaned: 'Thu, Jan 23, 2025, 10:00 AM',
        currentBookings: 15,
        label: 'room',
        bookings: sampleTableBookings,
        type: 'table',
    };

    return <OverviewCard data={tableData} />;
};

export default TableOverview;
