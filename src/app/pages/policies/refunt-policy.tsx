import React from 'react'

const RefundPolicy: React.FC = () => {
    return (
        <div className='pt-[94px] pb-4 px-4'>
            <div style={{ maxWidth: 800, margin: '0 auto', backgroundColor: '#fff', border: '1px solid #ddd', padding: 30 }}>
                <h1 style={{ fontSize: 28, marginBottom: 20, textAlign: 'center' }}>Refund Policy</h1>
                <p style={{ fontSize: 14, lineHeight: '1.6', marginBottom: 15 }}>In the rare event that Salt Mirissa must cancel a booking or is unable to provide the reserved service due to internal reasons:</p>
                <ul style={{ fontSize: 14, lineHeight: '1.6', marginLeft: 20 }}>
                    <li style={{ marginBottom: 10 }}><strong>No refunds</strong> will be provided in cases where the issue arises from Salt Mirissa’s own responsibility.</li>
                    <li style={{ marginBottom: 10 }}><strong>100% refund</strong> will be issued if a cancellation is due to an error on the part of Salt Mirissa (e.g., overbooking, operational closures, service disruptions).</li>
                    <li><strong>Refund processing:</strong> Refunds, if applicable, will be processed using the original payment method within 7 to 14 business days.</li>
                </ul>
            </div>
        </div>

    )
}

export default RefundPolicy