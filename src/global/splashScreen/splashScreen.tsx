import React, { memo } from 'react';

function SplashScreen() {
	return (
		<div id="fuse-splash-screen">
			<div className="logo">
				<img
					width="128"
					src="/assets/images/logo/logo.png"
					alt="logo"
				/>
			</div>
			<div id="spinner">
				<div className="bounce1" />
				<div className="bounce2" />
				<div className="bounce3" />
			</div>
		</div>
	);
}

export default memo(SplashScreen);
