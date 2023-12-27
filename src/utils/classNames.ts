type ClassValue = string | { [key: string]: boolean };

export default function classNames(...args: ClassValue[]): string {
    return args
        .reduce((acc: string[], val: ClassValue) => {
            if (typeof val === "string") {
                return acc.concat(val.split(" "));
            }
            return acc.concat(Object.keys(val).filter((key) => val[key]));
        }, [])
        .join(" ");
}
