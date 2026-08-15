import { useState } from "react";
import { useCreateCategory } from "../hooks/useAdmin";

interface CreateCategoryFormProps {
    onClose: () => void;
}

const CreateCategory = ({ onClose }: CreateCategoryFormProps) => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const createCategoryMutation = useCreateCategory();

    const handleSubmit = async (
        e: React.SubmitEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        const categoryName = name.trim();
        const categoryDescription = description.trim();

        if (!categoryName) {
            return;
        }

        try {
            await createCategoryMutation.mutateAsync({
                name: categoryName,
                description: categoryDescription,
            });

            // Modal closes only after successful API request
            onClose();

        } catch (error) {
            console.error("Error creating category:", error);
        }
    };

    return (<>

        {/* Form */}
        <form
            onSubmit={handleSubmit}
            className="p-6"
        >

            {/* Name */}
            <fieldset className="mb-5">

                <label
                    htmlFor="category-name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Category Name
                </label>

                <input
                    id="category-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter category name"
                    required
                    disabled={createCategoryMutation.isPending}
                />

            </fieldset>

            {/* Description */}
            <fieldset className="mb-6">

                <label
                    htmlFor="category-description"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Description
                </label>

                <textarea
                    id="category-description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="h-28 w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="Enter category description"
                    disabled={createCategoryMutation.isPending}
                />

            </fieldset>

            {/* Error */}
            {createCategoryMutation.isError && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm text-red-600">
                        Failed to create category. Please try again.
                    </p>
                </div>
            )}

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                    type="button"
                    onClick={onClose}
                    disabled={createCategoryMutation.isPending}
                    className="btn btn-ghost bg-black text-white hover:bg-gray-700"
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={createCategoryMutation.isPending}
                    className="btn btn-primary min-w-36"
                >
                    {createCategoryMutation.isPending ? (
                        <>
                            <span className="loading loading-spinner loading-sm" />
                            Creating...
                        </>
                    ) : (
                        "Create Category"
                    )}
                </button>

            </div>

        </form>
    </>
    );
};

export default CreateCategory;