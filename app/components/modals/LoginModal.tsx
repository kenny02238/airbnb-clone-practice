"use client";

import { useCallback, useState } from "react";
import { signIn } from "next-auth/react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/app/redux/hook";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { onClose } from "@/app/redux/features/isLoginModalOpen/isLoginModalOpenSlice";
import { onOpen } from "@/app/redux/features/isRegisterModalOpen/isRegisterModalOpenSlice";
import { onTransition } from "@/app/redux/features/forModalOpenTransition/forModalOpenTransition";

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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const res = await toast.promise(
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }),
        {
          pending: "Logging in... 🚀🔐",
        }
      );
      toast.success(`Logged in! 🎉🔐`, {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(onTransition(false));
    } catch (err) {
      toast.error(`🦄 ${err}`, {
        position: "top-center",
        autoClose: 100000,
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
        disabled={isLoading}
        isOpen={modalIsOpen}
        title="Login"
        actionLabel="Continue"
        onClose={loginModalClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent}
      />
    </>
  );
};

export default LoginModal;
