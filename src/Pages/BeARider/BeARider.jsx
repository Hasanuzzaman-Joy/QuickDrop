import { useForm, Controller } from "react-hook-form";
import { useLoaderData } from "react-router";

const BeARider = () => {
  const regionData = useLoaderData();

  const { register, handleSubmit, watch, control } = useForm();
  const selectedRegion = watch("region");

  // Get unique region names
  const uniqueRegions = [...new Set(regionData.map((item) => item.region))];

  // Find covered areas based on selected region
  const filteredCoveredAreas = regionData
    .filter((item) => item.region === selectedRegion)
    .flatMap((item) => item.district);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-green-700 mb-2">Be a Rider</h1>
          <p className="text-gray-600 mb-6">
            Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle.
            From personal packages to business shipments — we deliver on time, every time.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Your Name"
                {...register("name", { required: true })}
                className="border w-full p-2 rounded"
              />
              <input
                type="number"
                placeholder="Your age"
                {...register("age", { required: true })}
                className="border w-full p-2 rounded"
              />
            </div>

            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Your Email"
                {...register("email", { required: true })}
                className="border w-full p-2 rounded"
              />
              <select
                {...register("region", { required: true })}
                className="border w-full p-2 rounded"
              >
                <option value="">Select your region</option>
                {uniqueRegions.map((region, index) => (
                  <option key={index} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                placeholder="NID"
                {...register("nid", { required: true })}
                className="border w-full p-2 rounded"
              />
              <input
                type="text"
                placeholder="Contact"
                {...register("contact", { required: true })}
                className="border w-full p-2 rounded"
              />
            </div>

            <div>
              <Controller
                control={control}
                name="warehouse"
                rules={{ required: true }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="border w-full p-2 rounded"
                    disabled={!selectedRegion}
                  >
                    <option value="">Select wire-house</option>
                    {filteredCoveredAreas.map((area, idx) => (
                      <option key={idx} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>

            <button
              type="submit"
              className="bg-lime-400 text-white px-4 py-2 rounded hover:bg-lime-500"
            >
              Submit
            </button>
          </form>
        </div>

        <div className="flex items-center justify-center">
          <img src="/rider.png" alt="Rider" className="w-64 h-auto" />
        </div>
      </div>
    </div>
  );
};

export default BeARider;
