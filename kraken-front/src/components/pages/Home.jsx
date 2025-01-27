import { Outlet } from 'react-router-dom';
import Header from "../header/Header";

function Home() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Home;