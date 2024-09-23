"use client"

import UserTable from "@/components/UserTable";
import { AppDispatch } from "@/store/store";
import { fetchUsers } from "@/store/usersSlice";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

   const fetchCatalog = async () => {
     try {
       const response = await axios.get(
         "/api/catalog/category"
       ); // Full URL
       console.log(response.data);
       return response.data.results;
     } catch (error) {
       if (axios.isAxiosError(error)) {
         console.warn("Axios error fetching catalog data", error.message);
       } else {
         console.warn("Unknown error fetching catalog data", error);
       }
     }
   };
  useEffect(() => {
    fetchCatalog();
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserTable />
    </main>
  );
}
