import { Dialog, Transition } from "@headlessui/react";
import { Fragment, type ReactNode } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

function Modal({ isOpen, onClose, children }: ModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div
          className="bg-[rgba(43, 43, 43, 0.70)]/7 fixed inset-0 backdrop-blur-[5px]"
          aria-hidden="true"
        />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
            {children}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
}

export default Modal;
