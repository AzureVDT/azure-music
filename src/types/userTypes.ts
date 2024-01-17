type UserTypes = {
    accessToken: string;
    displayName: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    metadata: {
        createdAt: string;
        creationTime: string;
        lastLoginAt: string;
        lastSignInTime: string;
    };
    phoneNumber: string | null;
    photoURL: string | null;
    providerData: {
        displayName: string;
        email: string;
        phoneNumber: string | null;
        photoURL: string;
        providerId: string;
        uid: string;
    }[];
    providerId: string;
    uid: string;
    refreshToken: string;
    stsTokenManager: {
        accessToken: string;
        expirationTime: number;
        refreshToken: string;
        isExpired: boolean;
    };
};

export default UserTypes;
