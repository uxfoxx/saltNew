import React from 'react'

const TermsAndConditions: React.FC = () => {
    return (
        <div className='pt-[94px] pb-4 px-4'>
            <div style={{ maxWidth: 800, margin: '0 auto', backgroundColor: '#fff', border: '1px solid #ddd', padding: 30 }}>
                <h1 style={{ fontSize: 28, marginBottom: 20, textAlign: 'center' }}>Terms and Conditions</h1>
                <p style={{ fontSize: 14, lineHeight: '1.6', marginBottom: 20 }}>Welcome to Salt Mirissa. By accessing our website, making a reservation, or staying with us, you agree to the following terms and conditions. These terms apply to all guests and users of our services.</p>
                <h2 style={{ fontSize: 20, marginTop: 20 }}>1. Bookings and Reservations</h2>
                <ul style={{ fontSize: 14, lineHeight: '1.6', marginLeft: 20 }}>
                    <li style={{ marginBottom: 8 }}>All bookings are subject to availability and confirmation.</li>
                    <li style={{ marginBottom: 8 }}>Guests must provide accurate and complete information at the time of booking.</li>
                    <li style={{ marginBottom: 8 }}>A confirmation message or email will be sent once your booking has been successfully processed.</li>
                    <li>Reservations are confirmed only upon full or partial payment as specified at booking.</li>
                </ul>
                <h2 style={{ fontSize: 20, marginTop: 20 }}>2. Check-in and Check-out</h2>
                <p style={{ fontSize: 14, lineHeight: '1.6' }}>Check-in time: 2:00 PM<br />Check-out time: 11:00 AM<br />Early check-in and late check-out are subject to availability and may incur additional charges. Late departures without prior notice may be charged a fee based on the delay.</p>
                <h2 style={{ fontSize: 20, marginTop: 20 }}>3. Payment and Pricing</h2>
                <p style={{ fontSize: 14, lineHeight: '1.6' }}>All rates are shown in Sri Lankan Rupees (LKR) and may vary based on seasonal demand, availability, and promotions. Prices are confirmed at booking and are inclusive of applicable taxes and service charges unless stated otherwise. Payments can be made online or at the property via cash or card. Salt Mirissa is not liable for international banking or currency conversion fees.</p>
                <h2 style={{ fontSize: 20, marginTop: 20 }}>4. Additional Charges</h2>
                <ul style={{ fontSize: 14, lineHeight: '1.6', marginLeft: 20 }}>
                    <li style={{ marginBottom: 8 }}>Extra beds or additional guests</li>
                    <li style={{ marginBottom: 8 }}>Room service, minibar, special requests</li>
                    <li style={{ marginBottom: 8 }}>Laundry, transport, or other add-on services</li>
                    <li>Late check-out or early check-in charges</li>
                </ul>
                <h2 style={{ fontSize: 20, marginTop: 20 }}>5. Guest Responsibilities</h2>
                <p style={{ fontSize: 14, lineHeight: '1.6' }}>Guests must conduct themselves responsibly. Damage to property, misuse of amenities, or disturbances may result in penalties or removal. Salt Mirissa is not liable for lost or stolen items unless officially stored by management.</p>
                <h2 style={{ fontSize: 20, marginTop: 20 }}>6. Use of Facilities</h2>
                <p style={{ fontSize: 14, lineHeight: '1.6' }}>All facilities are for registered guests only. Management may temporarily close or restrict access for maintenance or safety without notice.</p>
                <h2 style={{ fontSize: 20, marginTop: 20 }}>7. Modifications by Salt Mirissa</h2>
                <p style={{ fontSize: 14, lineHeight: '1.6' }}>Salt Mirissa may modify room allocation or services due to operational needs or unforeseen events. Guests will be informed and offered an alternative of equal value.</p>
                <h2 style={{ fontSize: 20, marginTop: 20 }}>8. Governing Law</h2>
                <p style={{ fontSize: 14, lineHeight: '1.6' }}>These terms are governed by Sri Lankan law. Any disputes will be resolved under Sri Lankan jurisdiction.</p>
                <p style={{ fontSize: 14, lineHeight: '1.6', marginTop: 30 }}>For assistance or clarification, please contact:<br />Email: [email@example.com]<br />Phone: +94 785779779</p>
            </div>
        </div>

    )
}

export default TermsAndConditions;