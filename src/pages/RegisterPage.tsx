import { Link, useNavigate } from "react-router-dom";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import Button, { ButtonGoogle } from "../components/button";
import FormGroup from "../components/common/FormGroup";
import Label from "../components/label";
import { Input } from "../components/input";
import { IconEyeToggle } from "../components/icons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useToggleValue from "../hooks/useToggleValue";
import Checkbox from "../components/checkbox";
import { RegisterData } from "../types/formData";
import { handleLoginWithGoogle } from "../utils/handleLoginWithGoogle";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebaseConfig";
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
import { useEffect } from "react";
import { useAuth } from "../contexts/auth-context";

const schema = yup.object({
    name: yup.string().required("This field is required"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Please enter your email address"),
    password: yup
        .string()
        .min(8, "Your password must be at least 8 character or greater")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            {
                message:
                    "Your password must have at least with one lowercase, uppercase, digit and special character",
            }
        )
        .required("This field is required"),
});

const RegisterPage = () => {
    const {
        handleSubmit,
        control,
        formState: { isValid, errors, isSubmitting },
        reset,
    } = useForm({ resolver: yupResolver(schema) });
    const navigate = useNavigate();
    const { userInfo } = useAuth() || {};
    const handleSignUp = async (values: RegisterData) => {
        if (!isValid) return;
        try {
            await createUserWithEmailAndPassword(
                auth,
                values.email,
                values.password
            );
            if (auth.currentUser) {
                const hashedPassword = await bcrypt.hash(values.password, 10);
                await setDoc(doc(db, "users", auth.currentUser.uid), {
                    name: values.name,
                    email: values.email,
                    password: hashedPassword,
                    avatar: "https://source.unsplash.com/random",
                    createdAt: serverTimestamp(),
                });
                await updateProfile(auth.currentUser, {
                    displayName: values.name,
                    photoURL: "https://source.unsplash.com/random",
                });
                toast.success("Register successfully");
                reset({});
                navigate("/");
            } else {
                toast.error("Register failed, please try again later");
            }
        } catch (error) {
            toast.error("Email already exists");
        }
    };
    const { value: acceptTerm, handleToggleValue: handleToggleTerm } =
        useToggleValue();
    const { value: showPassword, handleToggleValue: handleTogglePassword } =
        useToggleValue();
    useEffect(() => {
        if (userInfo?.email) {
            navigate("/");
        }
    }, [navigate, userInfo]);
    return (
        <LayoutAuthentication heading="Register">
            <p className="mb-6 text-xs font-normal text-center lg:mb-8 lg:text-sm text-text3">
                Already have an account?{" "}
                <Link
                    to={"/login"}
                    className="font-medium underline text-primary"
                >
                    Login
                </Link>
            </p>
            <ButtonGoogle
                text="Sign up with google"
                onClick={() => handleLoginWithGoogle(navigate)}
            ></ButtonGoogle>
            <p className="mb-4 text-xs font-normal text-center lg:text-sm lg:mb-8 text-text2 dark:text-white">
                Or sign up with email
            </p>
            <form autoComplete="off" onSubmit={handleSubmit(handleSignUp)}>
                <FormGroup>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input<RegisterData>
                        control={control}
                        type="text"
                        name="name"
                        placeholder="Jhon Doe"
                        error={errors.name?.message}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Email *</Label>
                    <Input<RegisterData>
                        control={control}
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        error={errors.email?.message}
                    ></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password *</Label>
                    <Input<RegisterData>
                        control={control}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Create an password"
                        error={errors.password?.message}
                    >
                        <IconEyeToggle
                            open={showPassword}
                            onClick={handleTogglePassword}
                        ></IconEyeToggle>
                    </Input>
                </FormGroup>
                <div className="flex items-start mb-5 gap-x-5">
                    <Checkbox
                        name="term"
                        checked={acceptTerm}
                        onClick={handleToggleTerm}
                    >
                        <p className="flex-1 text-xs lg:text-sm text-text2 dark:text-text3">
                            I agree to the{" "}
                            <span className="underline cursor-pointer text-secondary">
                                Terms of Use
                            </span>{" "}
                            and have read and understand the{" "}
                            <span className="underline cursor-pointer text-secondary">
                                Privacy policy
                            </span>
                            .
                        </p>
                    </Checkbox>
                </div>
                <Button
                    className="w-full"
                    kind="primary"
                    type="submit"
                    isLoading={isSubmitting}
                >
                    Create my account
                </Button>
            </form>
        </LayoutAuthentication>
    );
};

export default RegisterPage;
