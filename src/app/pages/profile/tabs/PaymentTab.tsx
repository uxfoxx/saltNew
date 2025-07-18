import React, { useState } from 'react';
import { Modal, Tooltip, message } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { AddCardForm } from '../../../components';

interface CardInfo {
    id: string;
    last4: string;
    exp: string;
    brand: 'visa' | 'mastercard';
}

const PaymentTab: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cards, setCards] = useState<CardInfo[]>([
        {
            id: 'card-1',
            last4: '4321',
            exp: '02/27',
            brand: 'visa'
        }
    ]);

    const handleOpen = () => setIsModalOpen(true);
    const handleClose = () => setIsModalOpen(false);

    const handleAddCard = (newCard: CardInfo) => {
        setCards((prev) => [...prev, newCard]);
        setIsModalOpen(false);
        message.success('Card added');
    };

    const handleDeleteCard = (id: string) => {
        setCards((prev) => prev.filter((card) => card.id !== id));
        message.success('Card removed');
    };

    console.log("cards", cards);

    return (
        <div>
            <h3 className="font-bold mb-4">Payment methods</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="relative bg-gradient-to-r from-cyan-700 to-teal-600 text-white rounded-xl p-4 w-full min-h-[160px] shadow-md"
                    >
                        {/* Delete icon */}
                        <Tooltip title="Remove card">
                            <div
                                className="absolute top-2 right-2 text-white bg-white/30 hover:bg-white/60 rounded-full p-1 cursor-pointer"
                                onClick={() => handleDeleteCard(card.id)}
                            >
                                <DeleteOutlined />
                            </div>
                        </Tooltip>

                        <div className="flex flex-col justify-between h-full">
                            <div className="text-2xl font-bold tracking-widest mt-4">**** **** **** {card.last4}</div>
                            <div className="flex justify-between items-end mt-4">
                                <div>
                                    <p className="text-xs opacity-80">Valid Thru</p>
                                    <p className="text-lg font-semibold">{card.exp}</p>
                                </div>
                                <img
                                    src={`/assets/images/icons/${card.brand}-logo.png`}
                                    alt={card.brand}
                                    className="w-12 h-auto"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Card Box */}
                <div
                    onClick={handleOpen}
                    className="border-2 border-dashed border-teal-500 rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center text-center hover:bg-teal-50 transition-all min-h-[160px]"
                >
                    <div className="text-3xl text-teal-600">
                        <PlusOutlined />
                    </div>
                    <p className="mt-2 text-sm text-gray-700 font-medium">Add a new card</p>
                </div>
            </div>

            {/* Modal */}
            <Modal
                title="Add Card"
                open={isModalOpen}
                onCancel={handleClose}
                footer={null}
                destroyOnClose
            >
                <AddCardForm onSubmit={handleAddCard} onClose={handleClose} />
            </Modal>
        </div>
    );
};

export default PaymentTab;
