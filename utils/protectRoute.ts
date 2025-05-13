import { checkWalletConnection } from "./walletHelpers";

export const protectRoute = async (router: any) => {
    const walletAddress = await checkWalletConnection();
    if (!walletAddress) {
        // Redirect to homepage if wallet is not connected
        router.push("/");
    }
    return walletAddress;
};
