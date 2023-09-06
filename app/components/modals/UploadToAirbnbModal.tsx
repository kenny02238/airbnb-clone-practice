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
import BodyContent from "../uploadToAirBnbBodyContent/BodyContent";

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
      categories: "",
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
    console.log("dddd", data);

    if (step !== STEPS.PRICE) {
      return onNext();
    }
    try {
      const formData = new FormData();
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key]);
        }
      }
      // formData.append("file",data)
      const postData = await fetch("https://air.pethelp-api.store/listings/", {
        method: "POST",
        headers: {
          Authorization: `Bearer `,
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
            image={image}
          />
        }
        title="Airbnb your home"
      />
    </>
  );
};

export default UploadToAirbnbModal;
