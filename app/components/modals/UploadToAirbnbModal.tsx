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
      location: "",
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imgSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const location = watch("location");
  console.log(location);

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };
  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) "Create";
    return "Next";
  }, [step]);
  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) undefined;
    return "Back";
  }, [step]);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) onNext();
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
          />
        }
        title="Airbnb your home"
      />
    </>
  );
};

export default UploadToAirbnbModal;
