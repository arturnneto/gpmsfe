import React, {useState} from 'react';
import './App.css';
import Sidebar from "./components/sidebar/Sidebar";
import SubmitSaleOrder from "./components/screens/SubmitSaleOrder";
import ListSaleOrders from "./components/screens/ListSaleOrders";
import GetSaleOrder from "./components/screens/GetSaleOrder";

function App() {

    const [screen, setScreen] = useState<string>("SubmitSaleOrder");

    const screenRender = () => {
        switch (screen) {
            case "SubmitSaleOrder":
                return <SubmitSaleOrder />
            case "GetSaleOrder":
                return <GetSaleOrder />
            case "ListSaleOrders":
                return <ListSaleOrders />
        }
    }

  return (
    <div className="flex h-screen w-full bg-cover bg-custom-bg">
        <div className="flex h-screen">
            <Sidebar screenRender={setScreen} />
        </div>

        <main className="flex-1 p-8 mt-12 mb-12 ml-4 mr-6 bg-white bg-opacity-70 rounded-2xl shadow-lg overflow-auto">
            {screenRender()}
        </main>
    </div>
  );
}

export default App;
