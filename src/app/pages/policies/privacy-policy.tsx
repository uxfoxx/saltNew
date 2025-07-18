import React from 'react'

const PrivacyPolicy: React.FC = () => {
    return (
        <div className='pt-[94px] pb-4 px-4'>
            <div className='' style={{ maxWidth: 800, margin: '0 auto', backgroundColor: '#fff', border: '1px solid #ddd', padding: 30 }}>
                <h1 style={{ fontSize: 28, marginBottom: 20, textAlign: 'center' }}>Privacy Policy</h1>
                <p style={{ fontSize: 14, lineHeight: '1.6', marginBottom: 20 }}>At Salt Mirissa, we respect your privacy and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard your data when you visit our website or interact with our services.</p>
                <h2 style={{ fontSize: 20, marginTop: 20 }}>1. Information We Collect</h2>
                <ul style={{ fontSize: 14, lineHeight: '1.6', marginLeft: 20 }}>
                    <li style={{ marginBottom: 8 }}>Name, contact details, and booking preferences when you make a reservation</li>
                    <li style={{ marginBottom: 8 }}>Payment and billing information (processed securely via trusted gateways)</li>
                    <li>Browser information, device type, and IP address for website analytics</li>
                </ul>
                <h2 style={{ fontSize: 20, marginTop: 20 }}>2. How We Use Your Information</h2>
                <ul style={{ fontSize: 14, lineHeight: '1.6', marginLeft: 20 }}>
                    <li style={{ marginBottom: 8 }}>To confirm and manage bookings</li>
                    <li style={{ marginBottom: 8 }}>To personalize your experience and improve our services</li>
                    <li style={{ marginBottom: 8 }}>To send promotional content (only with your consent)</li>
                    <li>To comply with legal obligations or resolve disputes</li>
                </ul>
                <h2 style={{ fontSize: 20, marginTop: 20 }}>3. Sharing Your Information</h2>
                <p style={{ fontSize: 14, lineHeight: '1.6' }}>We do not sell or rent your information to third parties. Your data may be shared only with trusted service providers for payment processing, marketing (if consented), or legal compliance.</p>
                <h2 style={{ fontSize: 20, marginTop: 20 }}>4. Data Security</h2>
                <p style={{ fontSize: 14, lineHeight: '1.6' }}>We use secure systems and protocols to protect your information. All payment transactions are encrypted and processed through secure platforms.</p>
                <h2 style={{ fontSize: 20, marginTop: 20 }}>5. Your Choices</h2>
                <p style={{ fontSize: 14, lineHeight: '1.6' }}>You can opt out of promotional communications at any time. You may request access to, correction of, or deletion of your personal data.</p>
                <h2 style={{ fontSize: 20, marginTop: 20 }}>6. Cookies</h2>
                <p style={{ fontSize: 14, lineHeight: '1.6' }}>We use cookies to enhance your browsing experience. You may adjust your browser settings to disable cookies, though this may affect site functionality.</p>
                <h2 style={{ fontSize: 20, marginTop: 20 }}>7. Changes to the Policy</h2>
                <p style={{ fontSize: 14, lineHeight: '1.6' }}>Salt Mirissa reserves the right to update this policy at any time. The latest version will always be available on our website.</p>
                <p style={{ fontSize: 14, lineHeight: '1.6', marginTop: 30 }}>For any questions or concerns, please contact us at:<br />Email: [email@example.com]<br />Phone: +94 785779779</p>
            </div>
        </div>

    )
}

export default PrivacyPolicy