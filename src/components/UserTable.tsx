"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setFilter } from "../store/usersSlice";
import FilterInput from "./FilterInput";
import ThemeToggle from "./ThemeToggle";

function UserTable() {
  const dispatch = useDispatch();
  const { users, filters } = useSelector((state: RootState) => state.users);

  const filteredUsers = users.filter((user) =>
    Object.keys(filters).every((key) => {
      const filterValue = filters[key as keyof typeof filters].toLowerCase();
      const userValue = String(user[key as keyof typeof user]).toLowerCase();
      return userValue.includes(filterValue);
    })
  );

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof filters
  ) => {
    dispatch(setFilter({ key, value: e.target.value }));
  };

  const headers = ["Name", "Username", "Email", "Phone"] as const;

  return (
    <div className="p-6">
      <div className="flex justify-end p-5">
        <ThemeToggle />
      </div>
      <div className="flex flex-col sm:flex-row mb-6 gap-4">
        <FilterInput
          placeholder="Search by name"
          value={filters.name.trim()}
          onChange={(e) => handleFilterChange(e, "name")}
        />
        <FilterInput
          placeholder="Search by username"
          value={filters.username.trim()}
          onChange={(e) => handleFilterChange(e, "username")}
        />
        <FilterInput
          placeholder="Search by email"
          value={filters.email.trim()}
          onChange={(e) => handleFilterChange(e, "email")}
        />
        <FilterInput
          placeholder="Search by phone"
          value={filters.phone.trim()}
          onChange={(e) => handleFilterChange(e, "phone")}
        />
      </div>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg dark:bg-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="text-left py-3 px-4 uppercase font-semibold text-sm border-b dark:border-gray-600 text-gray-700 dark:text-gray-300"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-600">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="text-left py-3 px-4 text-gray-900 dark:text-gray-100">
                    {user.name}
                  </td>
                  <td className="text-left py-3 px-4 text-gray-900 dark:text-gray-100">
                    {user.username}
                  </td>
                  <td className="text-left py-3 px-4 text-gray-900 dark:text-gray-100">
                    {user.email}
                  </td>
                  <td className="text-left py-3 px-4 text-gray-900 dark:text-gray-100">
                    {user.phone}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
