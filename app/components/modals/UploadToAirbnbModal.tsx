"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { useCallback, useMemo, useState } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { onCloseUpload } from "@/app/redux/features/isUploadToAirbnbModalOpen/isUploadToAirbnbModalOpenSlice";
import Modal from "./Modal";
import BodyContent from "./uploadToAirBnbBodyContent/BodyContent";
import { BsClockFill } from "react-icons/bs";

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

  const { user, authToken } = useAppSelector(
    (state) => state.userSessionSlice.userData
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
      console.log(`Bearer ${!authToken ? user?.access : authToken}`);
      console.log("formData", formData);
      //${process.env.API_URL}
      const res = await fetch(`${process.env.API_URL}/listings/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${!authToken ? user?.access : authToken}`,
          "Content-Type":
            "multipart/form-data; boundary=<calculated when request is sent>",
        },
        body: formData,
      });
      const response = await res.json();
      console.log("response", response, res);
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
