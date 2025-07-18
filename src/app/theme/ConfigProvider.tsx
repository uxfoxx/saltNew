import { ConfigProvider } from 'antd';

interface AppConfigProviderProps {
    children: React.ReactNode;
}


const AppConfigProvider = ({ children }: AppConfigProviderProps) => {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#67cacc', // Stepper active color
                    colorPrimaryHover: '#5bbcbc', // Optional: hover shade
                },
                components: {
                    Button: {
                        colorPrimary: '#3b7576',          // Button color
                        colorPrimaryHover: '#336969',     // Button hover
                        colorPrimaryActive: '#2e5e5e',     // Button click
                    },
                    Steps: {
                        colorPrimary: '#67cacc',
                        colorTextDescription: '#888',
                        iconSize: 28,               // Step icon circle
                        iconFontSize: 14,           // Number inside circle   
                    },
                    Select: {
                        colorPrimary: '#3b7576',         // affects border and highlight
                        controlHeight: 35,               // height of the selector
                        borderRadius: 8,
                        optionSelectedBg: '#3b7576',     // selected option background in dropdown
                        optionSelectedColor: '#ffffff', // text color of selected option in dropdown
                    },
                },
            }}
        >
            {children}
        </ConfigProvider>
    );
};

export default AppConfigProvider;
