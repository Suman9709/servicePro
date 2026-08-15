import { useState } from "react";
import { useCreateService, useGetCategories } from "../hooks/useAdmin";

interface CreateFormProps {
    onClose: () => void;
}

const CreateService = ({ onClose }: CreateFormProps) => {
    const [formData, setFormData] = useState({
        category: "",
        name: "",
        description: "",
        estimatedTime: "",
        estimatedCost: "",
    });

    const { data: categories, isLoading: isCategoriesLoading } =
        useGetCategories();
    const createServiceMutation = useCreateService();

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = {
            category: Number(formData.category),
            name: formData.name.trim(),
            description: formData.description.trim(),
            estimated_time: formData.estimatedTime,
            estimated_price: formData.estimatedCost,
        };
        try {
            await createServiceMutation.mutateAsync(data)
            onClose();
            console.log(data)
        }
        catch (error) {
            console.error("error in creating service", error)
        }



        // createServiceMutation.mutate(data)
    };

    return (
        <form onSubmit={handleSubmit} className="p-6">

            {/* Category */}

            <div className="mb-5">
                <label
                    htmlFor="category"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Category
                </label>

                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    disabled={isCategoriesLoading}
                    className="
                        select
                        h-12
                        w-full
                        rounded-lg
                        border
                        border-gray-300
                        bg-white
                        text-gray-900
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                    "
                >
                    <option value="" disabled>
                        {isCategoriesLoading
                            ? "Loading categories..."
                            : "Select a category"}
                    </option>

                    {categories?.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>


            {/* Service Name */}

            <div className="mb-5">
                <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Service Name
                </label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Tap Repair"
                    required
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
                        placeholder:text-gray-400
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                    "
                />
            </div>


            {/* Description */}

            <div className="mb-5">
                <label
                    htmlFor="description"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Description
                </label>

                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe what this service includes..."
                    rows={4}
                    required
                    className="
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
                        placeholder:text-gray-400
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                    "
                />
            </div>


            {/* Time + Price */}

            <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

                {/* Estimated Time */}

                <div>
                    <label
                        htmlFor="estimatedTime"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Estimated Time
                    </label>

                    <input
                        id="estimatedTime"
                        name="estimatedTime"
                        type="time"
                        step="1"
                        value={formData.estimatedTime}
                        onChange={handleChange}
                        required
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
                    />

                    <p className="mt-1 text-xs text-gray-400">
                        Example: 00:30:00
                    </p>
                </div>


                {/* Estimated Price */}

                <div>
                    <label
                        htmlFor="estimatedCost"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Estimated Price
                    </label>

                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                            ₹
                        </span>

                        <input
                            id="estimatedCost"
                            name="estimatedCost"
                            type="number"
                            min="0"
                            step="0.01"
                            value={formData.estimatedCost}
                            onChange={handleChange}
                            placeholder="199.00"
                            required
                            className="
                                h-12
                                w-full
                                rounded-lg
                                border
                                border-gray-300
                                bg-white
                                pl-9
                                pr-4
                                text-gray-900
                                outline-none
                                transition
                                placeholder:text-gray-400
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-100
                            "
                        />
                    </div>
                </div>

            </div>


            {/* Buttons */}

            <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">

                <button
                    type="button"
                    onClick={onClose}
                    className="
                        btn
                        min-w-24
                        border-gray-300
                        bg-white
                        text-gray-700
                        hover:bg-gray-50
                    "
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="btn btn-primary min-w-32"
                >
                    Create Service
                </button>

            </div>

        </form>
    );
};

export default CreateService;