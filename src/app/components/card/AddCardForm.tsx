import React from 'react';
import { Input, Button, Checkbox, Select, Form } from 'antd';

const { Option } = Select;

interface Props {
    onClose: () => void;
    onSubmit: (values: {
        id: string;
        last4: string;
        exp: string;
        brand: 'visa' | 'mastercard'; // extend as needed
    }) => void;
}

const AddCardForm: React.FC<Props> = ({ onClose, onSubmit }) => {
    const [form] = Form.useForm();

    const handleFinish = (values: any) => {
        // Extract last 4 digits
        const cleanedCardNumber = values.cardNumber.replace(/\s+/g, '');
        const last4 = cleanedCardNumber.slice(-4);

        // Dummy brand logic — you could improve this
        const brand: 'visa' | 'mastercard' = cleanedCardNumber.startsWith('4') ? 'visa' : 'mastercard';

        // Build payload
        const newCard = {
            id: 'card-' + Date.now(),
            last4,
            exp: values.exp,
            brand
        };

        onSubmit(newCard); // Pass to parent
        onClose();         // Close modal
    };

    return (
        <Form layout="vertical" form={form} onFinish={handleFinish}>
            <Form.Item label="Name on card" name="name" rules={[{ required: true }]}>
                <Input placeholder="Name on card" />
            </Form.Item>

            <Form.Item label="Card Number" name="cardNumber" rules={[{ required: true }]}>
                <Input placeholder="1234 5678 9012 3456" />
            </Form.Item>

            <div className="flex gap-4">
                <Form.Item label="Exp Date" name="exp" className="flex-1" rules={[{ required: true }]}>
                    <Input placeholder="MM/YY" />
                </Form.Item>

                <Form.Item label="CVC" name="cvc" className="flex-1" rules={[{ required: true }]}>
                    <Input placeholder="123" />
                </Form.Item>
            </div>

            <Form.Item label="Country/Region" name="country" rules={[{ required: true }]}>
                <Select defaultValue="Sri Lanka">
                    <Option value="Sri Lanka">Sri Lanka</Option>
                    <Option value="Maldives">Maldives</Option>
                </Select>
            </Form.Item>

            <Form.Item name="save" valuePropName="checked">
                <Checkbox>Save information securely</Checkbox>
            </Form.Item>

            <Form.Item>
                <Button htmlType="submit" type="primary" block>
                    Add Card
                </Button>
            </Form.Item>

            <p className="text-xs text-gray-500 text-center">
                By confirming your subscription, you allow The Outdoor Inn Crowd Limited to charge
                your card for this and future payments.
            </p>
        </Form>
    );
};

export default AddCardForm;
