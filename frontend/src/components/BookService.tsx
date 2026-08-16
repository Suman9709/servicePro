import { useState } from "react";
import { WrenchIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { useGetCategories } from "../hooks/useAdmin";
import { useBooking } from "../hooks/useCustomer";

const BookService = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [description, setDescription] = useState("");

  const {
    data: categories,
    isLoading,
  } = useGetCategories();

  const bookingMutation = useBooking()



  const selectedCategoryData = categories?.find(
    (category) => category.id.toString() === selectedCategory
  );

  const services = selectedCategoryData?.services ?? [];

  const selectedServiceData = services.find(
    (service) => service.id.toString() === selectedService
  );

  const handleCategoryChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(e.target.value);
    setSelectedService("");
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const data = {
      category: Number(selectedCategory),
      service: Number(selectedService),
      description,
    };
    try {
      await bookingMutation.mutateAsync(data)
      alert("Booking done for the ")
    }
    catch (error) {
      console.error("Error in booking service", error)
    }

    console.log("Booking data:", data);
  };



  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 text-black sm:px-6 lg:px-8">

      <div className="mx-auto max-w-3xl">

        {/* Header */}

        <div className="mb-6">

          <h1 className="text-2xl font-bold text-gray-900">
            Book a Service
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Select the service you need and describe your problem.
          </p>

        </div>


        {/* Form Card */}

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Card Header */}

          <div className="border-b border-gray-200 bg-gray-50 px-6 py-5">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                <WrenchIcon
                  size={24}
                  weight="fill"
                />
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Service Request
                </h2>

                <p className="text-sm text-gray-500">
                  Choose a category and service
                </p>
              </div>

            </div>

          </div>


          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="space-y-6 p-6"
          >

            {/* Category */}

            <fieldset>

              <label
                htmlFor="category"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Service Category
              </label>

              <select
                id="category"
                value={selectedCategory}
                onChange={handleCategoryChange}
                disabled={isLoading}
                className="
                                    select
                                    select-bordered
                                    h-12
                                    w-full
                                    border-gray-300
                                    bg-white
                                    text-gray-900
                                    focus:border-blue-500
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-100
                                "
                required
              >

                <option value="">
                  {isLoading
                    ? "Loading categories..."
                    : "Select a category"
                  }
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

              {selectedCategoryData && (
                <p className="mt-2 text-xs text-gray-500">
                  {selectedCategoryData.description}
                </p>
              )}

            </fieldset>


            {/* Service */}

            <fieldset>

              <label
                htmlFor="service"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Service
              </label>

              <select
                id="service"
                value={selectedService}
                onChange={(e) =>
                  setSelectedService(e.target.value)
                }
                disabled={
                  !selectedCategory ||
                  services.length === 0
                }
                className="
                                    select
                                    select-bordered
                                    h-12
                                    w-full
                                    border-gray-300
                                    bg-white
                                    text-gray-900
                                    focus:border-blue-500
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-100
                                "
                required
              >

                <option value="">
                  {!selectedCategory
                    ? "Select a category first"
                    : services.length === 0
                      ? "No services available"
                      : "Select a service"
                  }
                </option>

                {services.map((service) => (
                  <option
                    key={service.id}
                    value={service.id}
                  >
                    {service.name}
                  </option>
                ))}

              </select>

            </fieldset>


            {/* Selected Service Preview */}

            {selectedServiceData && (
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">

                <div className="flex items-start gap-3">

                  <CheckCircleIcon
                    size={22}
                    weight="fill"
                    className="mt-0.5 shrink-0 text-blue-600"
                  />

                  <div className="min-w-0">

                    <h3 className="font-semibold text-gray-900">
                      {selectedServiceData.name}
                    </h3>

                    <p className="mt-1 text-sm text-gray-600">
                      {selectedServiceData.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-3 text-sm">

                      <span className="font-medium text-gray-700">
                        ₹{selectedServiceData.estimated_price}
                      </span>

                      <span className="text-gray-400">
                        •
                      </span>

                      <span className="text-gray-600">
                        Estimated time:{" "}
                        {selectedServiceData.estimated_time}
                      </span>

                    </div>

                  </div>

                </div>

              </div>
            )}


            {/* Description */}

            <fieldset>

              <label
                htmlFor="description"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Describe Your Problem
              </label>

              <textarea
                id="description"
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Tell us what problem you are experiencing..."
                className="
                                    textarea
                                    textarea-bordered
                                    min-h-32
                                    w-full
                                    resize-none
                                    border-gray-300
                                    bg-white
                                    text-gray-900
                                    focus:border-blue-500
                                    focus:outline-none
                                    focus:ring-2
                                    focus:ring-blue-100
                                "
                required
              />

              <p className="mt-2 text-xs text-gray-400">
                Please provide enough details so the engineer can understand the problem.
              </p>

            </fieldset>


            {/* Submit */}

            <div className="border-t border-gray-100 pt-5">

              <button
                type="submit"
                disabled={
                  !selectedCategory ||
                  !selectedService ||
                  !description.trim()
                }
                className="btn btn-primary h-12 w-full text-base sm:w-auto sm:min-w-48 bg-blue-600 hover:bg-blue-700 text-white"
              >
                <WrenchIcon
                  size={20}
                  weight="bold"
                />

                Book Service
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default BookService;