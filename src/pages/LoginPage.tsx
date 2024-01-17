import { useForm } from "react-hook-form";
import LayoutAuthentication from "../layout/LayoutAuthentication";
import { yupResolver } from "@hookform/resolvers/yup";
// import { useDispatch } from "react-redux";
import useToggleValue from "../hooks/useToggleValue";
import * as yup from "yup";
import { Link } from "react-router-dom";
import Button, { ButtonFacebook, ButtonGoogle } from "../components/button";
import FormGroup from "../components/common/FormGroup";
import Label from "../components/label";
import { Input } from "../components/input";
import { IconEyeToggle } from "../components/icons";
import { LoginData } from "../types/formData";

const schema = yup.object({
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

const LoginPage = () => {
    const {
        handleSubmit,
        control,
        formState: { isValid, errors },
    } = useForm({ resolver: yupResolver(schema) });
    // const dispatch = useDispatch();
    const handleSignIn = (values: LoginData) => {
        if (!isValid) return;
        console.log(values);
        // dispatch(authLogin(values));
    };
    const { value: showPassword, handleToggleValue: handleTogglePassword } =
        useToggleValue();
    return (
        <LayoutAuthentication heading="Welcome Back!">
            <p className="mb-6 text-xs font-normal text-center lg:mb-8 lg:text-sm text-text3">
                Don't have an account?{" "}
                <Link
                    to={"/register"}
                    className="font-medium underline text-primary"
                >
                    Sign up
                </Link>
            </p>
            <ButtonGoogle text="Sign in with google"></ButtonGoogle>
            <ButtonFacebook text="Sign in with facebook"></ButtonFacebook>
            <form onSubmit={handleSubmit(handleSignIn)}>
                <FormGroup>
                    <Label htmlFor="email">Email *</Label>
                    <Input<LoginData>
                        control={control}
                        type="email"
                        name="email"
                        placeholder="example@gmail.com"
                        error={errors.email?.message}
                    ></Input>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="password">Password *</Label>
                    <Input<LoginData>
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
                <FormGroup>
                    <div className="text-right">
                        <span className="inline-block text-sm font-medium cursor-pointer text-primary">
                            Forgot password
                        </span>
                    </div>
                </FormGroup>
                <Button kind="primary" className="w-full" type="submit">
                    Sign In
                </Button>
            </form>
        </LayoutAuthentication>
    );
};

export default LoginPage;
