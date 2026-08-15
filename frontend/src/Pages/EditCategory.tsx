import { useEffect, useState } from "react";
import {
    useGetCategoryById,
    useUpdateCategory,
} from "../hooks/useAdmin";

interface EditCategoryProps {
    id: number;
    onClose: () => void;
}

const EditCategory = ({
    id,
    onClose,
}: EditCategoryProps) => {

    const {
        data: category,
        isLoading,
        isError,
    } = useGetCategoryById(id);

    const updateCategoryMutation = useUpdateCategory(id);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (category) {
            setName(category.name);
            setDescription(category.description);
        }
    }, [category]);

    const handleCategoryUpdate = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        try {
            await updateCategoryMutation.mutateAsync({
                name: name.trim(),
                description: description.trim(),
            });

            console.log("Category updated successfully");

            onClose();

        } catch (error) {
            console.error(
                "Error updating category:",
                error
            );
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-6">
                <span className="loading loading-spinner loading-md" />
            </div>
        );
    }

    if (isError || !category) {
        return (
            <div className="p-6 text-center">
                <p className="text-red-600">
                    Failed to load category.
                </p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleCategoryUpdate}
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
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                    className="
                        h-12
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        px-4
                        text-gray-900
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                    "
                    placeholder="Enter category name"
                    required
                    disabled={
                        updateCategoryMutation.isPending
                    }
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
                    onChange={(e) =>
                        setDescription(e.target.value)
                    }
                    className="
                        h-28
                        w-full
                        resize-none
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        px-4
                        py-3
                        text-gray-900
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                    "
                    placeholder="Enter category description"
                    disabled={
                        updateCategoryMutation.isPending
                    }
                />

            </fieldset>

            {/* Error */}
            {updateCategoryMutation.isError && (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm text-red-600">
                        Failed to update category.
                        Please try again.
                    </p>
                </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                    type="button"
                    onClick={onClose}
                    disabled={
                        updateCategoryMutation.isPending
                    }
                    className="
                        btn
                        btn-ghost
                        bg-black
                        text-white
                        hover:bg-gray-700
                    "
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={
                        updateCategoryMutation.isPending
                    }
                    className="btn btn-primary min-w-36"
                >
                    {updateCategoryMutation.isPending ? (
                        <>
                            <span className="loading loading-spinner loading-sm" />
                            Updating...
                        </>
                    ) : (
                        "Update Category"
                    )}
                </button>

            </div>

        </form>
    );
};

export default EditCategory;