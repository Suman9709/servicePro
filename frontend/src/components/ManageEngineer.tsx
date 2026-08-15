import { useState } from "react";

import {
    UsersThreeIcon,
    UserCircleCheckIcon,
    UserCircleIcon,
    UserCircleMinusIcon,
    PlusIcon,
    MagnifyingGlassIcon,
    DotsThreeVerticalIcon,
} from "@phosphor-icons/react";

import CreateEngineerForm from "./CreateEngineerForm";
import { useGetEngineers } from "../hooks/useAdmin";



const ManageEngineer = () => {
    const [isEngineerModalOpen, setIsEngineerModalOpen] = useState(false);

    const { data: engineersData, isLoading } = useGetEngineers();

    const handleEngineerForm = () => {
        setIsEngineerModalOpen(true);
    };

    const handleCloseEngineerForm = () => {
        setIsEngineerModalOpen(false);
    };


    return (
        <div className="min-h-screen bg-gray-50 p-6 text-black">

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Manage Engineers
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage your service engineers and their availability.
                    </p>
                </div>

                <button
                    className="btn btn-primary gap-2"
                    onClick={handleEngineerForm}
                >
                    <PlusIcon size={20} weight="bold" />
                    Add Engineer
                </button>
            </div>

            {/* Modal */}
            {isEngineerModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl">

                        {/* Modal Header */}
                        <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Create Engineer
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Add a new service engineer.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleCloseEngineerForm}
                                className="btn btn-sm btn-circle btn-ghost text-black transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Form */}
                        <div className="max-h-[75vh] overflow-y-auto">
                            <CreateEngineerForm
                                onClose={handleCloseEngineerForm}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                {/* Total */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Total Engineers
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-gray-900">
                               {engineersData?.length ?? 0}
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                All registered engineers
                            </p>
                        </div>

                        <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                            <UsersThreeIcon size={26} weight="fill" />
                        </div>
                    </div>
                </div>

                {/* Available */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Available
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-green-600">
                                {engineersData?.filter(engineer => engineer.is_available).length ?? 0}
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Ready for new jobs
                            </p>
                        </div>

                        <div className="rounded-lg bg-green-50 p-3 text-green-600">
                            <UserCircleCheckIcon size={26} weight="fill" />
                        </div>
                    </div>
                </div>

                {/* Busy */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Busy
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-orange-500">
                                {engineersData?.filter(engineer => !engineer.is_available).length ?? 0}
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Currently assigned
                            </p>
                        </div>

                        <div className="rounded-lg bg-orange-50 p-3 text-orange-500">
                            <UserCircleIcon size={26} weight="fill" />
                        </div>
                    </div>
                </div>

                {/* Unavailable */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Unavailable
                            </p>

                            <h2 className="mt-2 text-3xl font-bold text-red-500">
                                {engineersData?.filter(engineer => !engineer.is_available).length ?? 0}
                            </h2>

                            <p className="mt-1 text-xs text-gray-500">
                                Not available currently
                            </p>
                        </div>

                        <div className="rounded-lg bg-red-50 p-3 text-red-500">
                            <UserCircleMinusIcon size={26} weight="fill" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Engineer List */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">

                {/* Table Header */}
                <div className="flex flex-col gap-4 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Engineers
                        </h2>

                        <p className="text-sm text-gray-500">
                            View and manage all engineers.
                        </p>
                    </div>

                    {/* Search */}
                    <div className="relative w-full sm:w-72">
                        <MagnifyingGlassIcon
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />

                        <input
                            type="text"
                            placeholder="Search engineers..."
                            className="input input-bordered w-full bg-white pl-10 text-gray-900 transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="table">

                        <thead>
                            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700 pl-8">
                                <th>Engineer</th>
                                <th>Specialization</th>
                                <th>Experience</th>
                                <th>Status</th>
                                <th className="text-right">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            
                            {isLoading ? (<tr><td colSpan={5} className="text-center">Loading...</td></tr>) 
                            :
                             engineersData?.map((engineer) => {
                                const initial = engineer.username
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .toUpperCase();

                                return (
                                    <tr key={engineer.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <div className="avatar placeholder">
                                                    <div className="flex w-10 items-center justify-center rounded-full bg-primary text-white">
                                                        <span>{initial}</span>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="font-semibold">
                                                        {engineer.username}
                                                    </p>

                                                    <p className="text-xs text-gray-500">
                                                        {engineer.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td>
                                            {engineer.specialization}
                                        </td>

                                        <td>
                                            {engineer.experience}
                                        </td>

                                        <td>
                                            <span
                                                className={`badge ${engineer.is_available
                                                        ? "bg-green-800 text-white"
                                                        : "bg-red-800 text-white"
                                                    }`}
                                            >
                                                {engineer.is_available
                                                    ? "Available"
                                                    : "Unavailable"}
                                            </span>
                                        </td>



                                        <td className="text-right">
                                            <button className="btn btn-ghost btn-sm border border-gray-200 bg-white text-black transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100">
                                                <DotsThreeVerticalIcon size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageEngineer;