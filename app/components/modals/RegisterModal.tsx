"use client";
import { useState, useCallback } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";
import Modal from "./Modal";
import { signIn } from "next-auth/react";
import { useAppSelector, useAppDispatch } from "@/app/redux/hook";
import { onClose } from "@/app/redux/features/isRegisterModalOpen/isRegisterModalOpenSlice";
import { onOpen } from "@/app/redux/features/isLoginModalOpen/isLoginModalOpenSlice";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const isOpen = useAppSelector(
    (state) => state.isRegisterModalOpenSlice.isOpen
  );

  const dispatch = useAppDispatch();
  const registerModalClose = useCallback(() => dispatch(onClose()), [dispatch]);
  const loginModalOpen = useCallback(() => {
    return dispatch(onOpen());
  }, [dispatch]);
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
      const res = await fetch("/api/user/register", {
        method: "POST",
        body: JSON.stringify(data),
      });
      console.log(res);
    } catch (err) {
      toast.error(`🦄 Wow so easy! ${err}`, {
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
  const onToggle = useCallback(() => {
    registerModalClose();
    loginModalOpen();
  }, [registerModalClose, loginModalOpen]);
  const handleGoogleLogin = async () => {
    await signIn("google");
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="email"
        label="Email"
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
        onClick={handleGoogleLogin}
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
            onClick={onToggle}
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
      <Modal
        isOpen={isOpen}
        onClose={registerModalClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel="Continue"
        title="Register"
        body={bodyContent}
        footer={footerContent}
        secondaryAction={registerModalClose}
        secondaryActionLabel="Cancel"
      />
    </>
  );
};

export default RegisterModal;
