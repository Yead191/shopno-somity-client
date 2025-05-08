import { Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "@/Pages/Home/Home";
import MainLayout from "@/Layout/MainLayout";
import DashboardLayout from "@/Layout/DashboardLayout";
import Login from "@/authentication/Login";
import Register from "@/authentication/Register";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { useAuthUser } from "@/redux/auth/authAction";
import { setLoading, setUser } from "@/redux/auth/authSlice";
import auth from "@/firebase/firebase.init";
import ManageUsers from "@/Pages/Dashboard/Admin/ManageMembers/ManageMembers";
import MemberProfilePage from "@/Pages/MemberProfile/MemberProfile";
import TransactionDashboard from "@/Pages/Dashboard/Admin/TransactionDashboard/TransactionDashboard";

const Router = () => {
  const dispatch = useDispatch();
  const user = useAuthUser();
  console.log(user);

  useEffect(() => {
    dispatch(setLoading(true));

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        dispatch(
          setUser({
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            uid: currentUser.uid,
            createdAt: currentUser.metadata.creationTime,
            lastLoginAt: currentUser.metadata.lastSignInTime,
          })
        );

        // Set Token in Cookies
        // await axios.post(
        //     `${import.meta.env.VITE_API_URL}/auth/jwt`,
        //     { email: currentUser.email },
        //     { withCredentials: true }
        // );
      } else {
        // dispatch(logOutUser());
        // // Clear Token from Cookies
        // await axios.post(
        //     `${import.meta.env.VITE_API_URL}/auth/logout`,
        //     {},
        //     { withCredentials: true }
        // );
      }
      dispatch(setLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);
  return (
    <>
      <Routes>
        {/* main routes */}
        <Route path="/" element={<MainLayout></MainLayout>}>
          <Route path="/" element={<Home></Home>} />
        </Route>

        {/* authentication routes */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>

        {/* dashboard routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="admin/manage-users" element={<ManageUsers />} />
          <Route path="admin/transaction-report" element={<TransactionDashboard />} />
          <Route path="member-profile/:id" element={<MemberProfilePage />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
