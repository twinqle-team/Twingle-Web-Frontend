// hooks/useRecipientCode.ts
import { useMutation } from "@tanstack/react-query";
import { createRecipientCode, CreateRecipientCodePayload } from "./editvendorApi";

export const useCreateRecipientCode = () => {
  return useMutation({
    mutationFn: async ({
      token,
      accountData,
    }: {
      token: string;
      accountData: CreateRecipientCodePayload;
    }) => {
      return createRecipientCode(token, accountData);
    },

    onSuccess: (data) => {
      console.log("Recipient code created successfully:", data);
      // You can add global toast or other side effects here if needed
    },

    onError: (error: any) => {
      console.error("Recipient code creation failed:", error);
      // Error toast is handled in the component, but you can add fallback here
    },
  });
};