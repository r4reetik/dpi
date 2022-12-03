import React from 'react';
import { toast } from "react-toastify";
import { ToastContainerProps, ToastProps } from "react-toastify/dist/types";
import { UilCheckCircle, UilExclamationTriangle } from "@iconscout/react-unicons";

type ToastParamProps = {
    closeToast: () => void;
    toastProps: ToastProps;
  };
  
  const success = (title: string, description?: string, config?: ToastContainerProps) => {
    toast.success(({ ...props }: ToastParamProps) => (
        <Notification title={title} description={description} {...props} />
      ),
      {
        icon: <UilCheckCircle width='40px' height='40px' className='text-primary' />,
        progressClassName: "!bg-primary",
        ...config,
      }
    );
  };
  
  const error = (title: string, description?: string, config?: ToastContainerProps) => {
    toast.error(
      ({ ...props }: ToastParamProps) => (
        <Notification title={title} description={description} {...props} />
      ),
      {
        icon: <UilExclamationTriangle width='40px' height='40px' className='text-accent' />,
        progressClassName: "!bg-red",
        ...config,
      }
    );
  };

export const Toast = { success, error };
