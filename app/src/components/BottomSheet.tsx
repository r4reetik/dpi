import { Dialog, Transition } from "@headlessui/react";
import { UilTimes } from "@iconscout/react-unicons";
import { Fragment, ReactNode } from "react";

interface BottomSheetProp {
  open: boolean;
  title?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  hideCloseIcon?: boolean;
}

function BottomSheet({
  open,
  setOpen,
  children,
  title,
  hideCloseIcon = false,
}: BottomSheetProp) {
  const _handleOnClose = () => setOpen(false);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-hidden"
        onClose={_handleOnClose}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom=" opacity-0"
            enterTo="opacity-100 "
            leave="ease-in duration-200"
            leaveFrom="opacity-100 "
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 transition-opacity bg-black bg-opacity-80" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-bottom"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="translate-y-[100px] opacity-0 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-[100px]"
          >
            <div className="relative inline-block w-full p-4 overflow-hidden font-semibold text-left text-white align-middle transition-all transform bg-black-800 rounded-t-3xl">
              {title && (
                <Dialog.Title
                  as="h3"
                  className={`mb-3 font-extrabold text-2xl leading-6 capitalize`}
                >
                  {title}
                </Dialog.Title>
              )}
              {!hideCloseIcon && (
                <button
                  className="absolute w-8 h-8 p-1 border border-gray-500 rounded-full outline-none top-4 right-4" // focus:outline-none
                  onClick={_handleOnClose}
                >
                  <UilTimes className="w-full h-full m-auto text-gray-500 " />
                </button>
              )}
              {children}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

const Title = ({ children }: { children: ReactNode }) => {
  return (
    <p className="mx-2 my-3 text-xl font-extrabold tracking-wide text-white">
      {children}
    </p>
  );
};

const Description = ({ children }: { children: ReactNode }) => {
  return (
    <p className="m-2 text-sm font-medium tracking-wide text-grey-400">
      {children}
    </p>
  );
};

const Separator = ({ className }: { className?: string }) => {
  return <hr className={` ${className} my-5 border-black-600`} />;
};

BottomSheet.Title = Title;
BottomSheet.Separator = Separator;
BottomSheet.Description = Description;

export default BottomSheet;
