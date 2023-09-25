"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux/hook";
import { useCallback, useMemo, useState } from "react";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import { onCloseUpload } from "@/app/redux/features/isUploadToAirbnbModalOpen/isUploadToAirbnbModalOpenSlice";
import Modal from "../Modal";
import BodyContent from "./BodyContent";
import { ToastContainer, Slide, toast } from "react-toastify";
import { onTransition } from "@/app/redux/features/forModalOpenTransition/forModalOpenTransition";
import "react-toastify/dist/ReactToastify.css";

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
    register,
    setValue,
    formState: { errors },
    watch,
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
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(
          key === "location" ? "locationValue" : key,
          key === "location" ? value.value : value
        );
      });
      const response = await toast.promise(
        fetch(`/api/listings/all`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${!authToken ? user?.access : authToken}`,
          },
          body: formData,
        }),
        {
          pending: "uploading property...",
          success: "Property uploaded!",
          error: "Failed to upload property",
        }
      );
      // const response = await res.json();
      dispatch(onTransition(false));
    } catch (err) {
      dispatch(onTransition(false));
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
      <ToastContainer
        position="top-center"
        transition={Slide}
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default UploadToAirbnbModal;
