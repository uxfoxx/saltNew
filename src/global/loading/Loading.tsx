import React from 'react';
import { useState } from 'react';
import clsx from 'clsx';
import { useTimeout } from '../hooks';

export type LoadingProps = {
	delay?: number;
	className?: string;
};


function Loading(props: LoadingProps) {
	const { delay = 0, className } = props;
	const [showLoading, setShowLoading] = useState(!delay);

	useTimeout(() => {
		setShowLoading(true);
	}, delay);

	return (
		<div
			className={clsx(
				className,
				'flex flex-1 flex-col items-center justify-center p-24',
				!showLoading ? 'hidden' : ''
			)}
		>
			<div className="logo flex items-center gap-2">
				<img
					width="64"
					src="/assets/images/logo/logo"
					alt="logo"
				/>
				<span className='font-bold text-primaryColor'>
					SALT
				</span>
			</div>
			<div
				className="-mb-6 text-13 font-medium sm:text-20 text-gray-600"
			>
				Loading ...
			</div>
			<div id="spinner">
				<div className="bounce1" />
				<div className="bounce2" />
				<div className="bounce3" />
			</div>
		</div>
	);
}

export default Loading;
