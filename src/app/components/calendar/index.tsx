import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, User, Clock, Phone, BrushCleaning } from 'lucide-react';
import { Booking } from '../../../types';
interface CalendarProps {
  bookings: Booking[];
  type: 'room' | 'table';
}

const Calendar: React.FC<CalendarProps> = ({ bookings, type }) => {
  console.log("sfsff", bookings);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBookings, setSelectedBookings] = useState<Booking[] | null>(null);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const isDateBooked = (day: number) => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    return bookings.some(booking => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);

      if (type === 'room') {
        return checkDate >= stripTime(start) && checkDate <= stripTime(end);
      } else {
        return isSameDay(start, checkDate);
      }
    });
  };

  const getBookingsForDate = (day: number): Booking[] => {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    return bookings.filter(booking => {
      const start = new Date(booking.startDate);
      const end = new Date(booking.endDate);

      if (type === 'room') {
        return checkDate >= stripTime(start) && checkDate <= stripTime(end);
      } else {
        return isSameDay(start, checkDate);
      }
    });
  };


  const stripTime = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());



  const formatDateTime = (date: Date) => {
    return date.toLocaleString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between ">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <CalendarIcon className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              {type === 'room' ? 'Room' : 'Table'} Booking Calendar
            </h3>
            <p className="text-gray-600 text-sm">View all bookings and reservations</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => navigateMonth('prev')}
            className="p-2 sm:p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          </button>
          <span className="text-lg sm:text-xl font-semibold text-gray-900 min-w-[160px] sm:min-w-[200px] text-center">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            onClick={() => navigateMonth('next')}
            className="p-2 sm:p-3 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 ">
        {/* Calendar Grid */}
        <div className="relative xl:col-span-2">
          {selectedBookings && (
            <button
              onClick={() => setSelectedBookings(null)}
              className="text-sm text-blue-600 underline hover:text-blue-800 absolute top-1 right-1 sm:top-4 sm:right-4 transition-colors duration-200"
            >
              <BrushCleaning className="inline-block h-4 w-4" />
            </button>
          )}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-4 lg:p-6">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-3 sm:mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="p-2 sm:p-4 text-center text-xs sm:text-sm font-semibold text-gray-600 bg-white rounded-lg">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {emptyDays.map(day => (
                <div key={`empty-${day}`} className="p-2 sm:p-4 h-12 sm:h-16 lg:h-20"></div>
              ))}
              {days.map(day => {
                const isBooked = isDateBooked(day);
                const dayBookings = getBookingsForDate(day);
                const isToday = new Date().toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString();

                return (
                  <div
                    key={day}
                    onClick={() => dayBookings.length > 0 && setSelectedBookings(dayBookings)}
                    className={`p-2 sm:p-4 h-12 sm:h-16 lg:h-20 border rounded-lg cursor-pointer transition-all duration-200 ${isBooked
                      ? 'bg-blue-500 border-blue-600 text-white hover:bg-blue-600 shadow-md'
                      : isToday
                        ? 'bg-white border-blue-300 text-gray-900 hover:bg-blue-50'
                        : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                  >
                    <div className={`font-semibold text-xs sm:text-sm ${isToday && !isBooked ? 'text-blue-600' : ''}`}>
                      {day}
                    </div>
                    {dayBookings.length > 0 && (
                      <div className="text-xs mt-1 truncate opacity-90 hidden sm:block">
                        {dayBookings.length === 1
                          ? dayBookings[0].guestName
                          : `${dayBookings.length} bookings`}
                      </div>
                    )}
                    {isToday && (
                      <div className="text-xs mt-1 font-medium hidden sm:block">
                        Today
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 sm:mt-6 flex items-center justify-center space-x-4 sm:space-x-8 text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded"></div>
              <span className="text-gray-600">Booked</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white border-2 border-blue-300 rounded"></div>
              <span className="text-gray-600">Today</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white border border-gray-200 rounded"></div>
              <span className="text-gray-600">Available</span>
            </div>
          </div>
        </div>

        {/* Booking Details Panel */}
        <div className="xl:col-span-1">
          <div className="bg-gray-50 rounded-lg p-4 sm:p-6 h-full min-h-[400px]">
            {selectedBookings && selectedBookings.length > 0 ? (
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
                    <p className="text-sm text-gray-600">
                      {selectedBookings.length === 1
                        ? '1 booking on this date'
                        : `${selectedBookings.length} bookings on this date`}
                    </p>
                  </div>
                </div>

                {[...selectedBookings]
                  .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                  .map((booking) => (
                    <div key={booking.id} className="bg-white rounded-lg p-4 shadow-sm space-y-3">
                      <h4 className="font-semibold text-gray-900">{booking.guestName}</h4>

                      <div className="space-y-2">
                        <div className="flex items-start space-x-3">
                          <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700">Check-in</p>
                            <p className="text-sm text-gray-600">{formatDateTime(new Date(booking.startDate))}</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-700">Check-out</p>
                            <p className="text-sm text-gray-600">{formatDateTime(new Date(booking.endDate))}</p>
                          </div>
                        </div>

                        {booking.phone && (
                          <div className="flex items-start space-x-3">
                            <Phone className="h-4 w-4 text-gray-500 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-700">Phone</p>
                              <p className="text-sm text-gray-600">{booking.phone}</p>
                            </div>
                          </div>
                        )}

                        {booking.email && (
                          <div className="flex items-start space-x-3">
                            <User className="h-4 w-4 text-gray-500 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-700">Email</p>
                              <p className="text-sm text-gray-600">{booking.email}</p>
                            </div>
                          </div>
                        )}

                        {booking.partySize && (
                          <div className="flex items-start space-x-3">
                            <User className="h-4 w-4 text-gray-500 mt-0.5" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-700">Party Size</p>
                              <p className="text-sm text-gray-600">{booking.partySize} people</p>
                            </div>
                          </div>
                        )}

                        <div className="pt-1">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === 'confirmed'
                              ? 'bg-green-100 text-green-800'
                              : booking.status === 'checked-in'
                                ? 'bg-blue-100 text-blue-800'
                                : booking.status === 'checked-out'
                                  ? 'bg-gray-100 text-gray-800'
                                  : 'bg-red-100 text-red-800'
                              }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        {booking.notes && (
                          <div className="pt-3 border-t border-gray-200">
                            <p className="text-sm font-medium text-gray-700 mb-1">Notes</p>
                            <p className="text-sm text-gray-600 break-words">{booking.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
              </div>

            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Booking</h3>
                <p className="text-gray-600 text-sm">Click on a booked date in the calendar to view detailed information about the reservation.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;