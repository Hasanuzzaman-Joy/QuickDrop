import React from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Button from "../../shared/button";
import { useLoaderData } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddForm = () => {

    const locationData = useLoaderData();

    const { user } = useAuth();

    const axiosSecure = useAxiosSecure();

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm();

    // Get unique regions    
    const regions = [...new Set(locationData.map(region => region.region))];

    const watchType = watch("type", "document");

    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion");

    // Filter districts based on selected region
    const senderDistricts = locationData
        .filter(item => item.region === senderRegion)
        .map(item => item.district);

    const receiverDistricts = locationData
        .filter(item => item.region === receiverRegion)
        .map(item => item.district);

    const onSubmit = (data) => {
        const trackingId = `TRK-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        if (data.type === "non-document" && !data.weight) {
            Swal.fire("Missing Field", "Parcel Weight is required for non-document type.", "error");
            return;
        }

        const weight = parseFloat(data.weight || 0);
        const isSameCity = data.senderCenter === data.receiverCenter;

        let basePrice = 0;
        let extraWeightFee = 0;
        let extraZoneFee = 0;

        // Calculate cost
        if (data.type === "document") {
            basePrice = isSameCity ? 60 : 80;
        } else {
            if (weight <= 3) {
                basePrice = isSameCity ? 110 : 150;
            } else {
                basePrice = isSameCity ? 110 : 150;
                extraWeightFee = (weight - 3) * 40;
                if (!isSameCity) {
                    extraZoneFee = 40;
                }
            }
        }

        const totalCost = basePrice + extraWeightFee + extraZoneFee;

        // SweetAlert Table Breakdown
        Swal.fire({
            title: `Delivery Cost: ৳${totalCost}`,
            html: `
        <div style="overflow-x:auto">
          <table style="width:100%; border-collapse: collapse; font-size: 14px; text-align:left;">
            <thead>
              <tr style="background-color:#f0f0f0">
                <th style="border:1px solid #ccc; padding: 8px;">Item</th>
                <th style="border:1px solid #ccc; padding: 8px;">Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="border:1px solid #ccc; padding: 8px;">📦 Parcel Type</td>
                <td style="border:1px solid #ccc; padding: 8px;">${data.type === "document" ? "Document" : "Non-Document"}</td>
              </tr>
              <tr>
                <td style="border:1px solid #ccc; padding: 8px;">🪶 Weight</td>
                <td style="border:1px solid #ccc; padding: 8px;">${data.type === "document" ? "N/A" : `${weight} kg`}</td>
              </tr>
              <tr>
                <td style="border:1px solid #ccc; padding: 8px;">📍 Delivery Zone</td>
                <td style="border:1px solid #ccc; padding: 8px;">${isSameCity ? "Within City" : "Outside City"}</td>
              </tr>
              <tr>
                <td style="border:1px solid #ccc; padding: 8px;">💰 Base Price</td>
                <td style="border:1px solid #ccc; padding: 8px;">৳${basePrice}</td>
              </tr>
              ${extraWeightFee > 0 ? `
              <tr>
                <td style="border:1px solid #ccc; padding: 8px;">➕ Extra Weight Fee</td>
                <td style="border:1px solid #ccc; padding: 8px;">৳${extraWeightFee}</td>
              </tr>` : ""}
              ${extraZoneFee > 0 ? `
              <tr>
                <td style="border:1px solid #ccc; padding: 8px;">➕ Extra Zone Fee</td>
                <td style="border:1px solid #ccc; padding: 8px;">৳${extraZoneFee}</td>
              </tr>` : ""}
              <tr style="background-color:#f9f9f9; font-weight:bold;">
                <td style="border:1px solid #ccc; padding: 8px;">💵 Total Cost</td>
                <td style="border:1px solid #ccc; padding: 8px;">৳${totalCost}</td>
              </tr>
            </tbody>
          </table>
        </div>
        `,
            icon: "info",
            showCancelButton: true,
            confirmButtonText: "Confirm & Save",
            cancelButtonText: "Go Back & Edit",
            confirmButtonColor: "#0d6efd",
            cancelButtonColor: "#333"
        }).then((result) => {
            if (result.isConfirmed) {
                const finalData = {
                    ...data,
                    cost: totalCost,
                    payment_status: "unpaid",
                    delivery_status: "not delivered",
                    tracking_id: trackingId,
                    sender: user?.email,
                    creation_date: new Date().toISOString()
                };
                // Send the data to the server
                axiosSecure.post("/add-parcels", finalData)
                    .then(res => {
                        if (res.data.insertedId) {
                            // Show the success message after saving the data
                            Swal.fire("Success", "Parcel has been saved!", "success");
                            reset();
                        }
                    })
                    .catch(err => console.log(err));
            }
        });
    };

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-1">Add Parcel Details</h1>
            <p className="text-gray-600 mb-6">Door to Door delivery requires pickup and delivery locations</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* Parcel Info */}
                <div>
                    <h2 className="font-semibold mb-3">Parcel Info</h2>

                    {/* Parcel type radio */}
                    <div className="mb-4">
                        <label className="mr-6">
                            <input type="radio" value="document" {...register("type")} defaultChecked />
                            <span className="ml-1">Document</span>
                        </label>
                        <label>
                            <input type="radio" value="non-document" {...register("type")} />
                            <span className="ml-1">Non-Document</span>
                        </label>
                    </div>

                    {/* Parcel Name and Weight inline */}
                    <div className="flex items-center gap-12">
                        <label className="flex flex-col w-1/2">
                            <span className="mb-1 font-medium">Parcel Name</span>
                            <input
                                type="text"
                                placeholder="Parcel Name"
                                {...register("title", { required: true })}
                                className="p-2 border rounded"
                            />
                        </label>

                        {watchType === "non-document" && (
                            <label className="flex flex-col w-1/2">
                                <span className="mb-1 font-medium">Parcel Weight (kg)</span>
                                <input
                                    type="number"
                                    placeholder="Parcel Weight"
                                    {...register("weight")}
                                    className="p-2 border rounded"
                                />
                            </label>
                        )}
                    </div>
                </div>

                {/* Dashed Divider */}
                <hr className="border-t border-dashed border-gray-400 my-6" />

                {/* Sender and Receiver in same row */}
                <div className="flex gap-12">

                    {/* Sender Info */}
                    <div className="flex-1">
                        <h2 className="font-semibold mb-3">Sender Info</h2>

                        {/* Two inputs per row except Region & Pickup Instruction */}
                        <div className="flex gap-4 mb-3">
                            <input
                                type="text"
                                placeholder="Sender Name"
                                {...register("senderName", { required: true })}
                                className="flex-1 p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Sender Contact"
                                {...register("senderContact", { required: true })}
                                className="flex-1 p-2 border rounded"
                            />
                        </div>

                        <select
                            {...register("senderRegion", { required: true })}
                            className="w-full p-2 border rounded mb-3"
                        >
                            <option value="">Select Region</option>
                            {regions.map((region, index) => (
                                <option key={index} value={region}>{region}</option>
                            ))}
                        </select>

                        <div className="flex gap-4 mb-3">
                            <select
                                {...register("senderCenter", { required: true })}
                                className="flex-1 p-2 border rounded"
                            >
                                <option value="">Select Service Center</option>
                                {senderDistricts.map((district, index) => (
                                    <option key={index} value={district}>{district}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Sender Address"
                                {...register("senderAddress", { required: true })}
                                className="flex-1 p-2 border rounded"
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Pickup Instruction"
                            {...register("pickupInstruction", { required: true })}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Receiver Info */}
                    <div className="flex-1">
                        <h2 className="font-semibold mb-3">Receiver Info</h2>

                        <div className="flex gap-4 mb-3">
                            <input
                                type="text"
                                placeholder="Receiver Name"
                                {...register("receiverName", { required: true })}
                                className="flex-1 p-2 border rounded"
                            />
                            <input
                                type="text"
                                placeholder="Receiver Contact"
                                {...register("receiverContact", { required: true })}
                                className="flex-1 p-2 border rounded"
                            />
                        </div>

                        <select
                            {...register("receiverRegion", { required: true })}
                            className="w-full p-2 border rounded mb-3"
                        >
                            <option value="">Select Region</option>
                            {regions.map((region, index) => (
                                <option key={index} value={region}>{region}</option>
                            ))}
                        </select>

                        <div className="flex gap-4 mb-3">
                            <select
                                {...register("receiverCenter", { required: true })}
                                className="flex-1 p-2 border rounded"
                            >
                                <option value="">Select Service Center</option>
                                {receiverDistricts.map((district, index) => (
                                    <option key={index} value={district}>{district}</option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Receiver Address"
                                {...register("receiverAddress", { required: true })}
                                className="flex-1 p-2 border rounded"
                            />
                        </div>

                        <input
                            type="text"
                            placeholder="Delivery Instruction"
                            {...register("deliveryInstruction", { required: true })}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                </div>

                <Button type={"submit"} title={"Proceed to confirm booking"} width={"w-full md:w-md"}></Button>
            </form>
        </div>
    );
};

export default AddForm;
