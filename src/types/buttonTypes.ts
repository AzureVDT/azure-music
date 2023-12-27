export interface ButtonProps {
    type?: "button" | "submit" | "reset";
    children: React.ReactNode;
    className?: string;
    isLoading?: boolean;
    href?: string;
    kind?: "primary" | "secondary" | "ghost";
}
