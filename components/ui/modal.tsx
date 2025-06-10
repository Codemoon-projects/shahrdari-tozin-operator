"use client";

import { closeModal, modals } from "@/store/core/modals";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import type React from "react";

interface ModalProps {
    __name__: modals;
    children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ __name__, children }) => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((store) => store.modals.modals[__name__]);
    if (!isOpen) return null;

    const onClose = () => {
        dispatch(closeModal(__name__));
    };

    return (
        <div
            id="modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
            <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
            <div className="relative  bg-base-100 rounded-lg shadow-xl max-w-full max-h-full overflow-auto">
                <button
                    onClick={onClose}
                    className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>
                <div className="p-4">{children}</div>
            </div>
        </div>
    );
};
