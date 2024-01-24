import { User } from "firebase/auth";

interface IAuthValues {
    name: string;
    email: string;
    password: string;
}

type AuthContextType = {
    values: IAuthValues;
    userInfo: User | null;
};

export default AuthContextType;
export type { IAuthValues };
