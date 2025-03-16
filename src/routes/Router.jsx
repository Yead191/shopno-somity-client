import { Route, Routes } from "react-router-dom";
import React from 'react';
import Home from "@/Pages/Home/Home";
import Root from "@/Root/Root";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Root></Root>}>
                    <Route path="/" element={<Home></Home>} />
                </Route>

            </Routes>

        </>
    );
};

export default Router;