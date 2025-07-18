import React from 'react';
import { Table } from 'antd';

interface TableCardProps {
    title: string;
    columns: any[];
    data: any[];
}

const TableCard: React.FC<TableCardProps> = ({ title, columns, data }) => {
    return (
        <div className="w-full min-h-[240px] shadow-custom6 rounded-lg bg-white p-4 flex flex-col gap-2">
            <div className="text-base font-semibold">{title}</div>
            <div className='overflow-x-auto whitespace-nowrap min-h-[240px]'>
                <Table
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                    rowKey={(record) => record.id || JSON.stringify(record)}
                />
            </div>
        </div>
    );
};

export default TableCard;
