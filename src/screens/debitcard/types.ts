export interface ToastData {
    status: "na" | "loading" | "success" | "fail";
    message?: string | undefined;
}