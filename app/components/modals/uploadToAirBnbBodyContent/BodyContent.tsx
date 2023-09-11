"use client";

import { useMemo } from "react";
import { categories } from "../../navbar/Categories";
import CategoryInput from "../../inputs/CategoryInput";
import CountrySelect from "../../inputs/CountrySelect";
import ImageUpload from "../../inputs/ImageUpload";
import Input from "../../inputs/Input";
import dynamic from "next/dynamic";
import Counter from "../../inputs/Counter";
import { UseFormSetValue, UseFormRegister } from "react-hook-form";
import { FieldValues } from "react-hook-form";
import Heading from "../../Heading";

enum STEPS {
  CATEGORY,
  LOCATION,
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE,
}
export interface Location {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
}

interface BodyContentProps {
  STEPS: typeof STEPS;
  step: STEPS;
  location: Location;
  setValue: UseFormSetValue<FieldValues>;
  register: UseFormRegister<FieldValues>;
  errors: {};
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: string;
  image: string;
}
const BodyContent: React.FC<BodyContentProps> = ({
  STEPS,
  step,
  register,
  errors,
  setValue,
  location,
  guestCount,
  roomCount,
  category,
  bathroomCount,
  image,
}) => {
  const Map = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        ssr: false,
      }),
    [location]
  );

  if (step === STEPS.LOCATION) {
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />
        <CountrySelect value={location} onChange={setValue} />
        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenitis do you have?"
        />
        <Counter
          onChange={(value) => setValue("guestCount", value)}
          value={guestCount}
          title="Guests"
          subtitle="How many guests do you allow?"
        />
        <hr />
        <Counter
          onChange={(value) => setValue("roomCount", value)}
          value={roomCount}
          title="Rooms"
          subtitle="How many rooms do you have?"
        />
        <hr />
        <Counter
          onChange={(value) => setValue("bathroomCount", value)}
          value={bathroomCount}
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />
        <ImageUpload onChange={setValue} value={image} />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />
        <Input
          id="title"
          label="Title"
          // disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description"
          // disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          // disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of these best describes your place?"
          subtitle="Pick a category"
        />
        <div
          className="
        grid 
        grid-cols-1 
        md:grid-cols-2 
        gap-3
        max-h-[50vh]
        overflow-y-auto
      "
        >
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(category) => setValue("category", category)}
                selected={category === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default BodyContent;
