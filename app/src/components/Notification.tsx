import { ToastProps } from "react-toastify/dist/types";

type NotificationProps = {
  title: string;
  description?: string;
  closeToast: () => void;
  toastProps: ToastProps;
};

export const Notification = ({ title, description, closeToast, toastProps }: NotificationProps) => {
  // const titleColor = `${toastProps.type === "success" ? "text-primary" : "text-red-500"}`;

  return (
    <div>
      <div className={`font-medium break-words leading-6 text-grey-400 text-sm`}>{title}</div>
      <div className='text-sm font-normal break-words text-grey-400'>{description}</div>
    </div>
  );
};
