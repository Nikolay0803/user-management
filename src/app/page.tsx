"use client"

import UserTable from "@/components/UserTable";
import { AppDispatch } from "@/store/store";
import { fetchUsers } from "@/store/usersSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserTable />
    </main>
  );
}
