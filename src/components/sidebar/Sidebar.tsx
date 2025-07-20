import SidebarButton from "./SidebarButton";

type SidebarProps = {
    screenRender: (screen: string) => void;
}

const Sidebar = ({screenRender} : SidebarProps) => {

    return (
        <div className="flex justify-center items-center pl-5">
            <aside className="md:max-w-[100px] p-4 flex flex-col text-center bg-white bg-opacity-30 backdrop-blur items-center justify-center md:px-10 lg:p-24 h-full lg:h-[500px] -lg rounded drop-shadow-lg text-zinc-800">
                <SidebarButton buttonName={"Cadastrar ordem de venda"} targetScreen={"SubmitSaleOrder"} screenRender={screenRender}/>
                <SidebarButton buttonName={"Buscar ordem de venda"} targetScreen={"GetSaleOrder"} screenRender={screenRender}/>
                <SidebarButton buttonName={"Listar ordens de venda"} targetScreen={"ListSaleOrders"} screenRender={screenRender}/>
            </aside>
        </div>
    )
}

export default Sidebar