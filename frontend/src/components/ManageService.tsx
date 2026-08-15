import {
  WrenchIcon,
  PlusIcon,
  MagnifyingGlassIcon,


  FolderOpenIcon,
} from "@phosphor-icons/react";

import { useMemo, useState } from "react";

import {



  useGetAllServices,
} from "../hooks/useAdmin";
import CreateService from "./CreateService";



const ManageService = () => {

  // =====================================================
  // STATE
  // =====================================================

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [isCreateServiceOpen, setIsCreateServiceOpen] =
    useState(false);


  // =====================================================
  // GET SERVICES
  // =====================================================

  const {
    data: services,
    isLoading,
    isError,
    error,
  } = useGetAllServices();

  // =====================================================
  // FILTER SERVICES
  // =====================================================

  const filteredServices = useMemo(() => {

    if (!services) {
      return [];
    }

    return services.filter((service) => {

      const searchText =
        search.toLowerCase();

      const matchesSearch =
        service.name
          .toLowerCase()
          .includes(searchText) ||

        service.description
          .toLowerCase()
          .includes(searchText);


      const matchesCategory =
        selectedCategory === "all" ||
        service.category.toString() ===
        selectedCategory;


      return (
        matchesSearch &&
        matchesCategory
      );

    });

  }, [
    services,
    search,
    selectedCategory,
  ]);


  // =====================================================
  // CATEGORY IDS
  // =====================================================

  const categoryIds = useMemo(() => {

    if (!services) {
      return [];
    }

    return [
      ...new Set(
        services.map(
          (service) => service.category
        )
      ),
    ];

  }, [services]);

  const handleCreateService = async () => {

    setIsCreateServiceOpen(true);

  };


  const handleCloseCreateService = () => {

    setIsCreateServiceOpen(false);

  };


  // =====================================================
  // LOADING
  // =====================================================

  if (isLoading) {

    return (
      <div className="min-h-screen bg-gray-50 p-6">

        <div className="flex min-h-100 items-center justify-center">

          <span className="loading loading-spinner loading-lg text-primary" />

        </div>

      </div>
    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (isError) {

    return (
      <div className="min-h-screen bg-gray-50 p-6">

        <div className="rounded-xl border border-red-200 bg-red-50 p-6">

          <h2 className="text-lg font-semibold text-red-700">
            Failed to load services
          </h2>

          <p className="mt-1 text-sm text-red-600">
            Something went wrong while fetching services.
          </p>

          {error instanceof Error && (
            <p className="mt-2 text-xs text-red-500">
              {error.message}
            </p>
          )}

        </div>

      </div>
    );

  }


  // =====================================================
  // STATISTICS
  // =====================================================

  const totalServices =
    services?.length ?? 0;

  const totalCategories =
    categoryIds.length;


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="min-h-screen bg-gray-50 p-4 text-black sm:p-6">


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-2xl font-bold text-gray-900">
            Manage Services
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create and manage all services.
          </p>

        </div>


        <button
          onClick={handleCreateService}
          className="btn btn-primary w-full gap-2 sm:w-auto"
        >

          <PlusIcon
            size={20}
            weight="bold"
          />

          Create Service

        </button>

      </div>


      {/* ================================================= */}
      {/* CREATE SERVICE MODAL */}
      {/* ================================================= */}

      {isCreateServiceOpen && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-gray-200 p-6">

              <div>

                <h2 className="text-xl font-semibold text-gray-900">
                  Create Service
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add a new service.
                </p>

              </div>


              <button
                type="button"
                onClick={handleCloseCreateService}
                className="btn btn-sm btn-circle btn-ghost text-black border border-black "
              >
                ✕
              </button>

            </div>


            {/* Form */}

            <div className="max-h-[75vh] overflow-y-auto">



              <CreateService
                onClose={handleCloseCreateService}
              />



            </div>

          </div>

        </div>

      )}


      {/* ================================================= */}
      {/* STATISTICS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">


        {/* Total Services */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Total Services
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {totalServices}
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                All available services
              </p>

            </div>


            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">

              <WrenchIcon
                size={26}
                weight="fill"
              />

            </div>

          </div>

        </div>


        {/* Total Categories */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Categories
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {totalCategories}
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Categories with services
              </p>

            </div>


            <div className="rounded-lg bg-purple-50 p-3 text-purple-600">

              <FolderOpenIcon
                size={26}
                weight="fill"
              />

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* TABLE */}
      {/* ================================================= */}

      <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">


        {/* Table Header */}

        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-lg font-semibold text-gray-900">
              Services
            </h2>

            <p className="text-sm text-gray-500">
              View and manage all services.
            </p>

          </div>


          {/* Filters */}

          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">


            {/* Search */}

            <div className="relative w-full sm:w-72">

              <MagnifyingGlassIcon
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search services..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                                    input
                                    input-bordered
                                    w-full
                                    border-gray-300
                                    bg-white
                                    pl-10
                                    text-gray-900
                                    outline-none
                                    focus:border-blue-500
                                    focus:ring-2
                                    focus:ring-blue-100
                                "
              />

            </div>


            {/* Category */}

            <select
              value={selectedCategory}
              onChange={(e) =>
                setSelectedCategory(
                  e.target.value
                )
              }
              className="
                                select
                                select-bordered
                                w-full
                                border-gray-300
                                bg-white
                                text-gray-900
                                sm:w-52
                            "
            >

              <option value="all">
                All Categories
              </option>

              {categoryIds.map(
                (categoryId) => (

                  <option
                    key={categoryId}
                    value={categoryId}
                  >
                    Category #{categoryId}
                  </option>

                )
              )}

            </select>

          </div>

        </div>


        {/* ================================================= */}
        {/* TABLE */}
        {/* ================================================= */}

        <div className="overflow-x-auto">

          <table className="table w-full ">


            <thead className="text-black px-32">

              <tr>

                <th>
                  Service
                </th>

                <th>
                  Category
                </th>

                <th>
                  Description
                </th>

                <th>
                  Estimated Price
                </th>

                <th>
                  Estimated Time
                </th>

              

              </tr>

            </thead>


            <tbody>

              {filteredServices.map(
                (service) => (

                  <tr
                    key={service.id}
                    className="hover:bg-gray-50"
                  >


                    {/* Service */}

                    <td>

                      <div className="flex items-center gap-3">

                        <div className="
                                                    flex
                                                    h-10
                                                    w-10
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    bg-blue-50
                                                    text-blue-600
                                                ">

                          <WrenchIcon
                            size={21}
                            weight="fill"
                          />

                        </div>


                        <div>

                          <p className="font-semibold text-gray-900">
                            {service.name}
                          </p>

                        </div>

                      </div>

                    </td>


                    {/* Category */}

                    <td>

                      <span className="
                                                badge
                                                border-purple-100
                                                bg-purple-50
                                                text-purple-700
                                            ">
                        {service.category_name}
                      </span>

                    </td>


                    {/* Description */}

                    <td>

                      <p className="
                                                max-w-50
                                                truncate
                                                text-sm
                                                text-gray-600
                                            ">
                        {service.description}
                      </p>

                    </td>


                    {/* Price */}

                    <td>

                      <span className="font-semibold text-gray-900">
                        ₹{service.estimated_price}
                      </span>

                    </td>


                    {/* Time */}

                    <td>

                      <span className="
                                                badge
                                                border-gray-200
                                                bg-gray-50
                                                text-gray-700
                                            ">
                        {service.estimated_time}
                      </span>

                    </td>



                  </tr>

                )
              )}


              {/* No results */}

              {filteredServices.length === 0 && (

                <tr>

                  <td
                    colSpan={6}
                    className="py-16 text-center"
                  >

                    <div className="flex flex-col items-center">

                      <div className="
                                                flex
                                                h-14
                                                w-14
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-gray-100
                                                text-gray-400
                                            ">

                        <WrenchIcon
                          size={28}
                        />

                      </div>


                      <p className="mt-4 font-medium text-gray-600">
                        No services found
                      </p>


                      <p className="mt-1 text-sm text-gray-400">

                        {search
                          ? "Try searching for another service."
                          : "Create your first service."}

                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>


     

    </div>
  );
};

export default ManageService;