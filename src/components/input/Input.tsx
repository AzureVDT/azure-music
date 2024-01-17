import React from "react";
import {
    Control,
    FieldValues,
    Path,
    PathValue,
    useController,
} from "react-hook-form";
import { withErrorBoundary } from "react-error-boundary";
import ErrorComponent from "../common/ErrorComponent";
import classNames from "../../utils/classNames";

type InputProps<T extends FieldValues> = {
    control: Control<T>;
    name: keyof T;
    placeholder?: string;
    type?: string;
    error?: string;
    children?: React.ReactNode;
};

const Input = <T extends object>({
    control,
    name,
    type = "text",
    error = "",
    children,
    placeholder = "",
    ...props
}: InputProps<T>) => {
    const { field } = useController({
        control,
        name: name as unknown as Path<T>,
        defaultValue: "" as PathValue<T, Path<T>>,
    });
    return (
        <>
            <div className="relative">
                <input
                    autoComplete="off"
                    type={type}
                    id={String(name)}
                    placeholder={placeholder}
                    className={classNames(
                        `w-full px-6 py-4 text-sm font-medium border rounded-xl
                        placeholder:text-text4 dark:placeholder:text-text2 dark:text-white bg-transparent`,
                        error.length > 0
                            ? "border-error text-error"
                            : "border-strock dark:border-darkStrock",
                        children ? "pr-16" : ""
                    )}
                    {...field}
                    {...props}
                />
                {children && (
                    <span className="absolute cursor-pointer select-none right-6 top-2/4 -translate-y-2/4">
                        {children}
                    </span>
                )}
            </div>
            {error.length > 0 && (
                <span className="text-sm font-medium pointer-events-none text-error error-input">
                    {error}
                </span>
            )}
        </>
    );
};

const InputWithBoundary = withErrorBoundary(Input, {
    FallbackComponent: ErrorComponent,
});

export { Input, InputWithBoundary };
