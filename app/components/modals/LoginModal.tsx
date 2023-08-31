"use client";

import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/app/redux/hook";
import { onClose } from "@/app/redux/features/isLoginModalOpen/isLoginModalOpenSlice";
import { onOpen } from "@/app/redux/features/isRegisterModalOpen/isRegisterModalOpenSlice";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Heading from "../Heading";
import Button from "../Button";

const LoginModal = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const modalIsOpen = useAppSelector(
    (state) => state.isLoginModalOpenSlice.isOpen
  );

  const loginModalClose = useCallback(() => {
    dispatch(onClose());
  }, [dispatch]);
  const registerModalOpen = useCallback(() => {
    dispatch(onOpen());
  }, [dispatch]);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        // toast.success('Logged in');
        router.refresh();
        loginModalClose();
      }

      if (callback?.error) {
        // toast.error(callback.error);
      }
    });
  };
  const handleGoogleLogin = async () => {
    await signIn("google");
  };
  const onToggle = useCallback(() => {
    loginModalClose();
    registerModalOpen();
  }, [loginModalClose, registerModalOpen]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
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
        onClick={() => signIn("github")}
      />
      <div
        className="
      text-neutral-500 text-center mt-4 font-light"
      >
        <p>
          First time using Airbnb?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Create an account
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={modalIsOpen}
      title="Login"
      actionLabel="Continue"
      onClose={loginModalClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
