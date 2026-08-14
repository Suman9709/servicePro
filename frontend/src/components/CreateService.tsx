import { useState } from 'react'

const CreateService = () => {
    const [formData, setFormData] = useState({
        category: '',
        name: '',
        description: '',
        estimatedTime: '',
        estimatedCost: ''
    })
    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Create Service</h2>
            <form >
                {/* select the category */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend">Category</legend>
                    <select defaultValue="Pick a category" className="select">
                        <option disabled={true}>Select the category</option>
                        <option>AC Repair</option>
                        <option>Plumbing</option>
                        <option>Carpenter</option>
                    </select>
                </fieldset>
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
                        placeholder="Enter service name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </fieldset>
                <fieldset className="mb-5">
                    <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Description
                    </label>

                    <input
                        id="description"
                        type="text"
                        className="w-full h-12 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                        placeholder="Enter service description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                </fieldset>
                <fieldset className="mb-5">
                    <label
                        htmlFor="estimatedTime"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Estimated Time
                    </label>

                    <input
                        id="estimatedTime"
                        type="text"
                        className="w-full h-12 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                        placeholder="Enter estimated time"
                        value={formData.estimatedTime}
                        onChange={(e) => setFormData({ ...formData, estimatedTime: e.target.value })}
                    />
                </fieldset>
                <fieldset className="mb-5">
                    <label
                        htmlFor="estimatedCost"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Estimated Cost
                    </label>

                    <input
                        id="estimatedCost"
                        type="text"
                        className="w-full h-12 px-4 rounded-lg bg-white border border-gray-300 text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition"
                        placeholder="Enter estimated cost"
                        value={formData.estimatedCost}
                        onChange={(e) => setFormData({ ...formData, estimatedCost: e.target.value })}
                    />
                </fieldset>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 transition"
                >
                    Create Service
                </button>

            </form>
        </div>
    )
}

export default CreateService