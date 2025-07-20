type Props = {
    buttonName: string;
    targetScreen: string;
    screenRender: (screen: string) => void;
};

const SidebarButton = ( {buttonName, targetScreen, screenRender} : Props) => {

    return (
        <button className="md:max-w-[400px] lg:h-[90px] lg:w-[150px] flex flex-col text-center items-center justify-center md:px-10 lg:p-6 lg:m-3 bg-blue-700 bg-opacity-90 rounded-2xl drop-shadow-lg text-gray-200 font-semibold"
                onClick={() => screenRender(targetScreen)}
        >
            {buttonName}
        </button>
    )
};

export default SidebarButton