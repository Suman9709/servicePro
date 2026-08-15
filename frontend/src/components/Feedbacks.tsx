import {
  ChatCircleTextIcon,
  ClockIcon,
} from "@phosphor-icons/react";

const Feedbacks = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 text-black sm:p-6">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-2xl font-bold text-gray-900">
          Feedbacks
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage customer feedback and reviews.
        </p>

      </div>

      {/* Coming Soon */}

      <div className="flex min-h-100 items-center justify-center">

        <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-600">

            <ChatCircleTextIcon
              size={32}
              weight="fill"
            />

          </div>

          <h2 className="mt-5 text-xl font-semibold text-gray-900">
            Feedback System
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Customer feedback and reviews will be available here
            once the feedback system is implemented.
          </p>



          {/* Status */}

          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">

            <ClockIcon
              size={18}
              weight="fill"
            />

            <span>
              Coming soon
            </span>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Feedbacks;