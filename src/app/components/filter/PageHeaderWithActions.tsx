import React, { useState } from 'react';
import { Button, Input, Popover, Radio } from 'antd';
import { FilterOutlined, PlusOutlined } from '@ant-design/icons';

interface PageHeaderWithActionsProps {
    title: string;
    onSearch?: (value: string) => void;
    onFilterChange?: (value: string) => void;
    onNewClick?: () => void;
    newButtonLabel?: string;
    showSearch?: boolean;
    showFilter?: boolean;
    showNewButton?: boolean;
    filterOptions?: { label: string; value: string }[];
    filterDefaultValue?: string;
}

const PageHeaderWithActions: React.FC<PageHeaderWithActionsProps> = ({
    title,
    onSearch,
    onFilterChange,
    onNewClick,
    newButtonLabel = 'New',
    showSearch = true,
    showFilter = true,
    showNewButton = true,
    filterOptions = [
        { label: 'All', value: 'all' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
    ],
    filterDefaultValue = 'all',
}) => {
    const [filterValue, setFilterValue] = useState(filterDefaultValue);
    const [popoverVisible, setPopoverVisible] = useState(false);

    const filterContent = (
        <Radio.Group
            value={filterValue}
            onChange={(e) => {
                const val = e.target.value;
                setFilterValue(val);
                onFilterChange?.(val);
                setPopoverVisible(false);
            }}
        >
            {filterOptions.map((opt) => (
                <Radio key={opt.value} value={opt.value} style={{ display: 'block', marginBottom: 4 }}>
                    {opt.label}
                </Radio>
            ))}
        </Radio.Group>
    );

    return (
        <div className="flex flex-col md:flex-row gap-2 md:items-center justify-between mb-4 border-b-2 border-black/5 pb-4">
            <h2 className="text-base font-semibold">{title}</h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                {showSearch && (
                    <Input.Search
                        placeholder="Search..."
                        allowClear
                        onSearch={onSearch}
                        style={{ minWidth: 200 }}
                    />
                )}
                {showFilter && (
                    <Popover
                        content={filterContent}
                        title="Filter By Status"
                        trigger="click"
                        open={popoverVisible}
                        onOpenChange={setPopoverVisible}
                    >
                        <Button icon={<FilterOutlined />}>
                            Filter
                        </Button>
                    </Popover>
                )}

                {showNewButton && (
                    <Button type="primary" icon={<PlusOutlined />} onClick={onNewClick}>
                        {newButtonLabel}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default PageHeaderWithActions;
