

const CreateCategory = () => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Create Category</h2>
            <form >
                <fieldset className="mb-5">
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        className="w-full h-12 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                        placeholder="Enter the category name"
                    />
                </fieldset>
                <fieldset className="mb-5">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Description
                    </label>

                    <textarea
                        id="description"
                        className="w-full h-24 px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                        placeholder="Enter the category description"
                    />
                </fieldset>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                >
                    Create Category
                </button>

            </form>
        </div>
    )
}

export default CreateCategory