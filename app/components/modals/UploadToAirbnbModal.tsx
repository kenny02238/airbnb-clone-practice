"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { useCallback, useMemo, useState } from "react";
import {
  SubmitHandler,
  useForm,
  FieldValues,
  useFieldArray,
} from "react-hook-form";
import { onCloseUpload } from "@/app/redux/features/isUploadToAirbnbModalOpen/isUploadToAirbnbModalOpenSlice";
import Modal from "./Modal";
import BodyContent from "./uploadToAirBnbBodyContent/BodyContent";

enum STEPS {
  CATEGORY,
  LOCATION,
  INFO,
  IMAGES,
  DESCRIPTION,
  PRICE,
}

const UploadToAirbnbModal = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);

  const isUploadModalOpen = useAppSelector(
    (state) => state.isUploadToAirbnbModalOpenSlice.isOpen
  );
  const dispatch = useAppDispatch();

  const uploadModalClose = useCallback(
    () => dispatch(onCloseUpload()),
    [dispatch]
  );
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: {
        flag: "🇹🇼",
        label: "Taiwan",
        latlng: [23.5, 121],
        region: "Asia",
        value: "TW",
      },
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      image: undefined,
      price: 1,
      title: "",
      description: "",
    },
  });

  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const image = watch("image");
  const category = watch("category");

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Next";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) undefined;
    return "Back";
  }, [step]);
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("data", data);

    if (step !== STEPS.PRICE) {
      return onNext();
    }
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, key === "location" ? value.value : value);
      });
      const postData = await fetch("http://192.168.68.120:8000/listings/", {
        method: "POST",
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkzOTk4Mjc2LCJpYXQiOjE2OTM5OTc5NzYsImp0aSI6IjI2MGIzYzAwMzhlODQ4Y2Y5Y2FkNjgwZTJhYzExNTY5IiwidXNlcl9pZCI6Mn0.Y-BV1m0aOuj0qSkPQ-bPbd4IzyYuVvcEtGyD77G4WZA`,
        },
        body: formData,
      });
      const response = await postData.json();
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        isOpen={isUploadModalOpen}
        onClose={uploadModalClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        body={
          <BodyContent
            STEPS={STEPS}
            step={step}
            errors={errors}
            register={register}
            location={location}
            setValue={setValue}
            guestCount={guestCount}
            roomCount={roomCount}
            bathroomCount={bathroomCount}
            category={category}
            image={image}
          />
        }
        title="Airbnb your home"
      />
    </>
  );
};

export default UploadToAirbnbModal;
