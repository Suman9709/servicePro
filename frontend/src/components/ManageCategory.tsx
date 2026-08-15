import {
  FolderOpenIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  PencilSimpleIcon,
  TrashIcon,
  WrenchIcon,
  DropIcon,
  LightningIcon,
  HammerIcon,
  FanIcon,
  XIcon,
} from "@phosphor-icons/react";

import { useState } from "react";
import { useDeleteCategory, useGetCategories } from "../hooks/useAdmin";
import type { CategoryResponse } from "../services/adminservice";
import CreateCategory from "./CreateCategory";
import EditCategory from "../Pages/EditCategory";


// ==============================
// Category Icon Helper
// ==============================

const getCategoryIcon = (categoryName: string) => {
  switch (categoryName.toLowerCase()) {
    case "plumbing":
      return <DropIcon size={22} weight="fill" />;

    case "ac repair":
      return <FanIcon size={22} weight="fill" />;

    case "carpenter":
      return <HammerIcon size={22} weight="fill" />;

    case "electrical":
      return <LightningIcon size={22} weight="fill" />;

    default:
      return <WrenchIcon size={22} weight="fill" />;
  }
};

const ManageCategory = () => {

  const [search, setSearch] = useState("");
  const [isCreateCategoryFormOpen, setIsCreateCategoryFormOpen] = useState(false);
  const [editCategoryById, setEditCategoryById] = useState<number | null>(null)

  const { data: categories, isLoading, isError, error } = useGetCategories();


  const deleteCategoryMutation = useDeleteCategory();

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await deleteCategoryMutation.mutateAsync(categoryId);
    }
    catch (error) {
      console.error("Error deleting category:", error);
    }
  }

  const filteredCategories = categories?.filter((category) =>
    category.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );



  const totalCategories = categories?.length ?? 0;

  const totalServices =
    categories?.reduce(
      (total, category) =>
        total + category.services.length,
      0
    ) ?? 0;

  const handleCreateCategory = () => {
    setIsCreateCategoryFormOpen(true);
  };
  const handleCloseCreateCategoryForm = () => {
    setIsCreateCategoryFormOpen(false);
  };

  const handleEditCategory = (
    category: CategoryResponse
  ) => {
    setEditCategoryById(category.id)

  };

  const handleCloseEditCategory = () => {
    setEditCategoryById(null);
  }


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">

        <div className="flex min-h-100 items-center justify-center">

          <span className="loading loading-spinner loading-lg text-primary" />

        </div>

      </div>
    );
  }


  if (isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">

        <div className="rounded-xl border border-red-200 bg-red-50 p-6">

          <h2 className="text-lg font-semibold text-red-700">
            Failed to load categories
          </h2>

          <p className="mt-1 text-sm text-red-600">
            Something went wrong while fetching categories.
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


  return (
    <div className="min-h-screen bg-gray-50 p-4 text-black sm:p-6">

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-2xl font-bold text-gray-900">
            Manage Categories
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create and manage service categories.
          </p>

        </div>
        <button
          onClick={handleCreateCategory}
          className="btn btn-primary w-full gap-2 sm:w-auto"
        >
          <PlusIcon
            size={20}
            weight="bold"
          />

          Create Category

        </button>

      </div>
      {
        isCreateCategoryFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl">

              {/* Modal Header */}
              <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Create Category
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Add a new service category.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCloseCreateCategoryForm}
                  className="btn btn-sm btn-circle btn-ghost text-black transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  ✕
                </button>
              </div>

              {/* Form */}
              <div className="max-h-[75vh] overflow-y-auto">
                <CreateCategory
                  onClose={() => {
                    setIsCreateCategoryFormOpen(false);
                  }}

                />
              </div>
            </div>
          </div>
        )

      }


      {/* ================================================= */}
      {/* STATISTICS */}
      {/* ================================================= */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Total Categories */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Total Categories
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                {totalCategories}
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                All service categories
              </p>

            </div>


            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">

              <FolderOpenIcon
                size={26}
                weight="fill"
              />

            </div>

          </div>

        </div>


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
                Services across all categories
              </p>

            </div>


            <div className="rounded-lg bg-purple-50 p-3 text-purple-600">

              <WrenchIcon
                size={26}
                weight="fill"
              />

            </div>

          </div>

        </div>

      </div>


      {/* ================================================= */}
      {/* CATEGORY TABLE */}
      {/* ================================================= */}

      <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">


        {/* Table Header */}

        <div className="flex flex-col gap-4 border-b border-gray-200 p-5 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-lg font-semibold text-gray-900">
              Categories
            </h2>

            <p className="text-sm text-gray-500">
              View and manage all service categories.
            </p>

          </div>


          {/* Search */}

          <div className="relative w-full lg:w-80">

            <MagnifyingGlassIcon
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search categories..."
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
                                transition
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-100
                            "
            />

          </div>

        </div>


        <div className="overflow-x-auto">

          <table className="table w-full">


            {/* Table Head */}

            <thead>

              <tr>

                <th>
                  Category
                </th>

                <th>
                  Description
                </th>

                <th>
                  Services
                </th>

                <th className="text-right">
                  Actions
                </th>

              </tr>

            </thead>


            {/* Table Body */}

            <tbody>

              {filteredCategories?.map(
                (category) => (

                  <tr
                    key={category.id}
                    className="hover:bg-gray-50"
                  >

                    {/* ======================= */}
                    {/* Category */}
                    {/* ======================= */}

                    <td>

                      <div className="flex items-center gap-3">

                        {/* Icon */}

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

                          {getCategoryIcon(
                            category.name
                          )}

                        </div>


                        {/* Name */}

                        <div className="min-w-0">

                          <p className="
                                                        truncate
                                                        font-semibold
                                                        text-gray-900
                                                    ">
                            {category.name}
                          </p>



                        </div>

                      </div>

                    </td>


                    {/* ======================= */}
                    {/* Description */}
                    {/* ======================= */}

                    <td>

                      <p className="
                                                max-w-md
                                                text-sm
                                                text-gray-600 line-clamp-1
                                            ">
                        {category.description}
                      </p>

                    </td>


                    {/* ======================= */}
                    {/* Services */}
                    {/* ======================= */}

                    <td>

                      <span className="
                                                badge
                                                border-blue-100
                                                bg-blue-50
                                                text-blue-700
                                            ">

                        {category.services.length}

                        <span className="ml-1">
                          {category.services.length === 1
                            ? "service"
                            : "services"}
                        </span>

                      </span>

                    </td>


                    {/* ======================= */}
                    {/* Actions */}
                    {/* ======================= */}

                    <td>

                      <div className="
                                                flex
                                                justify-end
                                                gap-1
                                            ">


                        {/* Edit */}

                        <button
                          onClick={() =>
                            handleEditCategory(
                              category
                            )
                          }
                          className="
                                                        btn
                                                        btn-ghost
                                                        btn-sm
                                                        text-blue-600
                                                        hover:bg-blue-50
                                                    "
                          title="Edit category"
                        >

                          <PencilSimpleIcon
                            size={18}
                          />

                        </button>
                        {/* Delete */}

                        <button
                          onClick={() =>
                            handleDeleteCategory(category.id)
                          }

                          className="
                        btn
                        btn-ghost
                        btn-sm
                        text-red-600
                        hover:bg-red-50
                        "
                          title="Delete category"
                        >

                          <TrashIcon
                            size={18}
                          />

                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}


              {/* ================================================= */}
              {/* NO RESULTS */}
              {/* ================================================= */}

              {filteredCategories?.length === 0 && (

                <tr>

                  <td
                    colSpan={4}
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

                        <FolderOpenIcon
                          size={28}
                        />

                      </div>


                      <p className="
                                                mt-4
                                                font-medium
                                                text-gray-600
                                            ">
                        No categories found
                      </p>


                      <p className="
                                                mt-1
                                                text-sm
                                                text-gray-400
                                            ">

                        {search
                          ? "Try searching for another category."
                          : "Create your first service category."}

                      </p>

                    </div>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </div>

      {
        editCategoryById !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl">

              {/* Modal Header */}

              <div className="flex items-center justify-between border-b border-gray-200 p-6">

                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Edit Category
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Update category information.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCloseEditCategory}
                  className="btn btn-sm btn-circle btn-ghost text-gray-600 hover:bg-gray-100"
                >
                  <XIcon size={20} />
                </button>

              </div>


              {/* Edit Form */}

              <div className="max-h-[75vh] overflow-y-auto">

                <EditCategory
                  id={editCategoryById}
                  onClose={handleCloseEditCategory}
                />

              </div>

            </div>

          </div>
        )}


    </div >
  );
};

export default ManageCategory;