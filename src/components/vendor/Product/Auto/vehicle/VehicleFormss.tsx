// import { useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Car, CheckCircle2, ImageIcon, ListChecks, MapPin } from "lucide-react";
// import { AnimatePresence, motion } from "framer-motion";
// import {
//   vehicleSchema,
//   vehicleDefaults,
//   IMAGE_MIN,
//   type VehicleFormValues,
//   type UploadedImage,
//   type UploadedVideo,
// } from "@/lib/auto/schema";
// import {
//   AVAILABILITY,
//   BODY_TYPES,
//   BRANDS,
//   CONDITIONS,
//   COUNTRIES,
//   DRIVE_TYPES,
//   FUEL_TYPES,
//   MILEAGE_UNITS,
//   TRANSMISSIONS,
// } from "@/lib/auto/data";
// import { SectionCard } from "./SectionCard";
// import { TextInput, NumberInput, SelectInput, TextareaField } from "./TextareaField";
// import { SearchableSelect } from "./SearchableSelect";
// import { ImageUploader } from "./ImageUploader";
// import { VideoUploader } from "./VideoUploader";
// import { FeatureSelector } from "./FeatureSelector";
// import { ActionButtons } from "./ActionButtons";

// export function VehicleForm() {
//   const [images, setImages] = useState<UploadedImage[]>([]);
//   const [video, setVideo] = useState<UploadedVideo | null>(null);
//   const [imageError, setImageError] = useState<string | undefined>();
//   const [submitting, setSubmitting] = useState(false);
//   const [savingDraft, setSavingDraft] = useState(false);
//   const [published, setPublished] = useState(false);

//   const {
//     register,
//     control,
//     handleSubmit,
//     reset,
//     watch,
//     formState: { errors },
//   } = useForm<VehicleFormValues>({
//     resolver: zodResolver(vehicleSchema),
//     defaultValues: vehicleDefaults,
//     mode: "onBlur",
//   });

//   const description = watch("description") ?? "";

//   const validateMedia = () => {
//     if (images.length < IMAGE_MIN) {
//       setImageError(`Please upload at least ${IMAGE_MIN} images before publishing.`);
//       return false;
//     }
//     if (images.some((img) => img.status === "uploading")) {
//       setImageError("Please wait for all images to finish uploading.");
//       return false;
//     }
//     setImageError(undefined);
//     return true;
//   };

//   const onSubmit = handleSubmit(async (values) => {
//     if (!validateMedia()) {
//       document.getElementById("media-section")?.scrollIntoView({ behavior: "smooth", block: "center" });
//       return;
//     }
//     setSubmitting(true);
//     // Simulated publish — replace with a real API call when a backend is connected.
//     await new Promise((r) => setTimeout(r, 1400));
//     console.log("Vehicle published:", { ...values, images: images.length, video: !!video });
//     setSubmitting(false);
//     setPublished(true);
//     setTimeout(() => setPublished(false), 4000);
//   });

//   const onSaveDraft = async () => {
//     setSavingDraft(true);
//     await new Promise((r) => setTimeout(r, 900));
//     setSavingDraft(false);
//   };

//   const onCancel = () => {
//     reset(vehicleDefaults);
//     images.forEach((img) => URL.revokeObjectURL(img.previewUrl));
//     setImages([]);
//     if (video) URL.revokeObjectURL(video.previewUrl);
//     setVideo(null);
//     setImageError(undefined);
//     // window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
//       {/* ---------------- Vehicle Details ---------------- */}
//       <SectionCard
//         title="Vehicle Details"
//         subtitle="Core specifications and pricing for this listing."
//         icon={Car}
//       >
//         <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
//           <TextInput
//             label="Vehicle Title"
//             required
//             placeholder="Enter vehicle title"
//             error={errors.title?.message}
//             wrapperClassName="md:col-span-2"
//             {...register("title")}
//           />

//           <Controller
//             control={control}
//             name="brand"
//             render={({ field }) => (
//               <SearchableSelect
//                 label="Brand"
//                 required
//                 options={BRANDS}
//                 value={field.value}
//                 onChange={field.onChange}
//                 placeholder="Search manufacturers…"
//                 error={errors.brand?.message}
//               />
//             )}
//           />

//           <TextInput
//             label="Model"
//             required
//             placeholder="e.g. Camry XSE"
//             error={errors.model?.message}
//             {...register("model")}
//           />

//           <NumberInput
//             label="Year"
//             required
//             placeholder="e.g. 2024"
//             min={1900}
//             max={new Date().getFullYear() + 1}
//             error={errors.year?.message}
//             {...register("year")}
//           />

//           <SelectInput
//             label="Condition"
//             required
//             options={CONDITIONS}
//             placeholder="Select condition"
//             error={errors.condition?.message}
//             {...register("condition")}
//           />

//           <SelectInput
//             label="Body Type"
//             required
//             options={BODY_TYPES}
//             placeholder="Select body type"
//             error={errors.bodyType?.message}
//             {...register("bodyType")}
//           />

//           <SelectInput
//             label="Transmission"
//             required
//             options={TRANSMISSIONS}
//             placeholder="Select transmission"
//             error={errors.transmission?.message}
//             {...register("transmission")}
//           />

//           <SelectInput
//             label="Fuel Type"
//             required
//             options={FUEL_TYPES}
//             placeholder="Select fuel type"
//             error={errors.fuelType?.message}
//             {...register("fuelType")}
//           />

//           <SelectInput
//             label="Drive Type"
//             required
//             options={DRIVE_TYPES}
//             placeholder="Select drive type"
//             error={errors.driveType?.message}
//             {...register("driveType")}
//           />

//           <NumberInput
//             label="Mileage"
//             required
//             placeholder="e.g. 42000"
//             min={0}
//             error={errors.mileage?.message}
//             suffix={
//               <select
//                 aria-label="Mileage unit"
//                 className="h-8 rounded-lg border border-input bg-secondary px-2 text-xs font-semibold text-secondary-foreground outline-none transition-colors focus-visible:border-primary"
//                 {...register("mileageUnit")}
//               >
//                 {MILEAGE_UNITS.map((u) => (
//                   <option key={u} value={u}>
//                     {u}
//                   </option>
//                 ))}
//               </select>
//             }
//             {...register("mileage")}
//           />

//           <TextInput
//             label="Engine Capacity"
//             required
//             placeholder="e.g. 2.0L Turbo"
//             error={errors.engineCapacity?.message}
//             {...register("engineCapacity")}
//           />

//           <TextInput
//             label="Exterior Color"
//             required
//             placeholder="e.g. Obsidian Black"
//             error={errors.exteriorColor?.message}
//             {...register("exteriorColor")}
//           />

//           <TextInput
//             label="Interior Color"
//             required
//             placeholder="e.g. Tan Leather"
//             error={errors.interiorColor?.message}
//             {...register("interiorColor")}
//           />

//           <TextInput
//             label="VIN (Vehicle Identification Number)"
//             required
//             placeholder="17-character VIN"
//             maxLength={17}
//             hint="17 characters — letters I, O and Q are not used."
//             error={errors.vin?.message}
//             className="uppercase"
//             {...register("vin")}
//           />

//           <NumberInput
//             label="Price ($)"
//             required
//             prefix="$"
//             placeholder="e.g. 38,500"
//             min={0}
//             step="0.01"
//             error={errors.price?.message}
//             {...register("price")}
//           />

//           <SelectInput
//             label="Availability Status"
//             required
//             options={AVAILABILITY}
//             placeholder="Select status"
//             error={errors.availability?.message}
//             {...register("availability")}
//           />

//           <TextareaField
//             label="Vehicle Description"
//             required
//             placeholder="Describe the vehicle's history, condition, options and anything a buyer should know…"
//             wrapperClassName="md:col-span-2"
//             className="min-h-[180px]"
//             charCount={description.length}
//             maxChars={2000}
//             error={errors.description?.message}
//             {...register("description")}
//           />
//         </div>
//       </SectionCard>

//       {/* ---------------- Location ---------------- */}
//       <SectionCard
//         title="Dealer / Vehicle Location"
//         subtitle="Where buyers can view or collect the vehicle."
//         icon={MapPin}
//         delay={0.05}
//       >
//         <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
//           <TextInput
//             label="City"
//             required
//             placeholder="e.g. Los Angeles"
//             error={errors.city?.message}
//             {...register("city")}
//           />
//           <TextInput
//             label="State / Province"
//             required
//             placeholder="e.g. California"
//             error={errors.state?.message}
//             {...register("state")}
//           />
//           <TextInput
//             label="Zip / Postal Code"
//             required
//             placeholder="e.g. 90012"
//             error={errors.zip?.message}
//             {...register("zip")}
//           />
//           <Controller
//             control={control}
//             name="country"
//             render={({ field }) => (
//               <SearchableSelect
//                 label="Country"
//                 required
//                 options={COUNTRIES}
//                 value={field.value}
//                 onChange={field.onChange}
//                 placeholder="Search countries…"
//                 error={errors.country?.message}
//               />
//             )}
//           />
//           <TextareaField
//             label="Full Address"
//             required
//             placeholder="Street address, building, suite…"
//             wrapperClassName="md:col-span-2"
//             className="min-h-[90px]"
//             error={errors.address?.message}
//             {...register("address")}
//           />
//         </div>
//       </SectionCard>

//       {/* ---------------- Media ---------------- */}
//       <div id="media-section">
//         <SectionCard
//           title="Vehicle Media"
//           subtitle="High-quality photos and video dramatically increase buyer interest."
//           icon={ImageIcon}
//           delay={0.05}
//         >
//           <div className="flex flex-col gap-8">
//             <ImageUploader images={images} onChange={setImages} error={imageError} />
//             <VideoUploader video={video} onChange={setVideo} />
//           </div>
//         </SectionCard>
//       </div>

//       {/* ---------------- Features ---------------- */}
//       <SectionCard
//         title="Vehicle Features"
//         subtitle="Select all equipment and options included with this vehicle."
//         icon={ListChecks}
//         delay={0.05}
//       >
//         <Controller
//           control={control}
//           name="features"
//           render={({ field }) => (
//             <FeatureSelector selected={field.value ?? []} onChange={field.onChange} />
//           )}
//         />
//       </SectionCard>

//       <ActionButtons
//         submitting={submitting}
//         savingDraft={savingDraft}
//         onCancel={onCancel}
//         onSaveDraft={onSaveDraft}
//       />

//       {/* ---------------- Success toast ---------------- */}
//       <AnimatePresence>
//         {published && (
//           <motion.div
//             initial={{ opacity: 0, y: 20, scale: 0.95 }}
//             animate={{ opacity: 1, y: 0, scale: 1 }}
//             exit={{ opacity: 0, y: 10, scale: 0.95 }}
//             role="status"
//             className="fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-semibold text-background shadow-2xl"
//           >
//             <CheckCircle2 size={17} className="text-accent" aria-hidden="true" />
//             Vehicle published successfully!
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </form>
//   );
// }