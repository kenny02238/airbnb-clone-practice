"use client";
import { useState, useCallback } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../inputs/input";
import Heading from "../Heading";
import Button from "../Button";
import Modal from "./Modal";
import { useAppSelector, useAppDispatch } from "@/app/redux/hook";
import { onClose } from "@/app/redux/features/isModalOpen/isModalOpenSlice";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isOpen = useAppSelector((state) => state.isModalOpen.isOpen);
  const dispatch = useAppDispatch();

  const modalClose = useCallback(() => dispatch(onClose()), [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      // await fetch("/api/register", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
    } catch (err) {
      console.log("hey", err);

      toast.error("🦄 Wow so easy!", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    setIsLoading(false);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div
        className="
            text-neutral-500 
            text-center 
            mt-4 
            font-light
          "
      >
        <p>
          Already have an account?
          <span
            onClick={() => {}}
            className="
                text-neutral-800
                cursor-pointer 
                hover:underline
              "
          >
            {" "}
            Log in
          </span>
        </p>
      </div>
    </div>
  );
  return (
    <>
      <ToastContainer
        position="top-center"
        transition={Slide}
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Modal
        isOpen={isOpen}
        onClose={modalClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel="Continue"
        title="Register"
        body={bodyContent}
        footer={footerContent}
        secondaryAction={modalClose}
        secondaryActionLabel="Cancel"
      />
    </>
  );
};

export default RegisterModal;
