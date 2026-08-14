import { useState, type FormEvent } from "react";
import { useCreateEngineer } from "../hooks/useAdmin";

interface CreateEngineerFormProps {
    onClose: () => void;
}

const CreateEngineerForm = ({
    onClose,
}: CreateEngineerFormProps) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [professionalTitle, setProfessionalTitle] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [experience, setExperience] = useState("");
    const [password, setPassword] = useState("");


    const createEngineerMutation = useCreateEngineer()
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createEngineerMutation.mutateAsync({
                username,
                email,
                phone_number: phone,
                professional_title: professionalTitle,
                specialization,
                experience,
                password,
            });
            console.log("Engineer created successfully");
         
            onClose();
        }
        catch (error) {
            console.error("Error creating engineer:", error);
        }
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="
                w-full
                max-h-[70vh]
                overflow-y-auto
                pr-1
                [scrollbar-none]
                [-ms-overflow-style:none]
                [&::-webkit-scrollbar]:hidden
            "
        >
            {/* Username */}
            <fieldset className="mb-4">
                <label
                    htmlFor="username"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Username
                </label>

                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="
                        h-11
                        w-full
                        rounded-lg
                        border border-gray-300
                        bg-white
                        px-4
                        text-sm
                        text-gray-900
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                    "
                    placeholder="Enter your username"
                    required
                />
            </fieldset>

            {/* Email */}
            <fieldset className="mb-4">
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Email
                </label>

                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                        h-11
                        w-full
                        rounded-lg
                        border border-gray-300
                        bg-white
                        px-4
                        text-sm
                        text-gray-900
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                    "
                    placeholder="Enter your email"
                    required
                />
            </fieldset>

            {/* Phone */}
            <fieldset className="mb-4">
                <label
                    htmlFor="phone"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Phone Number
                </label>

                <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="
                        h-11
                        w-full
                        rounded-lg
                        border border-gray-300
                        bg-white
                        px-4
                        text-sm
                        text-gray-900
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                    "
                    placeholder="Enter your phone number"
                    required
                />
            </fieldset>

            {/* Professional Title */}
            <fieldset className="mb-4">
                <label
                    htmlFor="professionalTitle"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Professional Title
                </label>

                <input
                    id="professionalTitle"
                    type="text"
                    value={professionalTitle}
                    onChange={(e) =>
                        setProfessionalTitle(e.target.value)
                    }
                    className="
                        h-11
                        w-full
                        rounded-lg
                        border border-gray-300
                        bg-white
                        px-4
                        text-sm
                        text-gray-900
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                    "
                    placeholder="Enter your professional title"
                    required
                />
            </fieldset>

            {/* Specialization */}
            <fieldset className="mb-4">
                <label
                    htmlFor="specialization"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Specialization
                </label>

                <input
                    id="specialization"
                    type="text"
                    value={specialization}
                    onChange={(e) =>
                        setSpecialization(e.target.value)
                    }
                    className="
                        h-11
                        w-full
                        rounded-lg
                        border border-gray-300
                        bg-white
                        px-4
                        text-sm
                        text-gray-900
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                    "
                    placeholder="Enter your specialization"
                    required
                />
            </fieldset>

            {/* Experience */}
            <fieldset className="mb-4">
                <label
                    htmlFor="experience"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Experience
                </label>

                <input
                    id="experience"
                    type="string"
                    min="0"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="
                        h-11
                        w-full
                        rounded-lg
                        border border-gray-300
                        bg-white
                        px-4
                        text-sm
                        text-gray-900
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                    "
                    placeholder="Experience in years"
                    required
                />
            </fieldset>

            {/* Password */}
            <fieldset className="mb-5">
                <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Password
                </label>

                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                        h-11
                        w-full
                        rounded-lg
                        border border-gray-300
                        bg-white
                        px-4
                        text-sm
                        text-gray-900
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-100
                    "
                    placeholder="Enter your password"
                    required
                />
            </fieldset>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row">
                <button
                    type="button"
                    onClick={handleClose}
                    className="
                        h-11
                        w-full
                        rounded-lg
                        bg-gray-500
                        px-4
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-gray-600
                        focus:outline-none
                        focus:ring-2
                        focus:ring-gray-100
                        sm:w-1/2
                    "
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="
                        h-11
                        w-full
                        rounded-lg
                        bg-blue-500
                        px-4
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:bg-blue-600
                        focus:outline-none
                        focus:ring-2
                        focus:ring-blue-100
                        sm:w-1/2
                    "
                >
                    Create Engineer
                </button>
            </div>
        </form>
    );
};

export default CreateEngineerForm;