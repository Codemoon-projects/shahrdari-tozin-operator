"use client";

import type React from "react";

import { useEffect, useRef, useCallback, memo, useState } from "react";
import { createPortal } from "react-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectConfirmOpen,
  selectConfirmId,
  selectConfirmOptions,
  closeConfirm,
  resolveConfirm,
} from "@/store/core/confirm";
import { cn } from "@/lib/utils";

// Separate the modal content for better memoization
const ModalContent = memo(function ModalContent({
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: {
  title: string;
  description: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="modal-box">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="py-4">{description}</p>
      <div className="modal-action">
        <button className="btn btn-outline" onClick={onCancel} type="button">
          {cancelText}
        </button>
        <button className="btn btn-primary" onClick={onConfirm} type="button">
          {confirmText}
        </button>
      </div>
    </div>
  );
});

export function ConfirmModal() {
  const dispatch = useDispatch();
  const open = useSelector(selectConfirmOpen);
  const id = useSelector(selectConfirmId);
  const options = useSelector(selectConfirmOptions);
  const modalRef = useRef<HTMLDialogElement>(null);
  const [mounted, setMounted] = useState(false);

  // Only run on client
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    if (open) {
      modalElement.showModal();
    } else {
      modalElement.close();
    }
  }, [open]);

  // Handle the native dialog close event
  useEffect(() => {
    const modalElement = modalRef.current;
    if (!modalElement) return;

    const handleClose = () => {
      if (!modalElement.open) {
        dispatch(closeConfirm());
      }
    };

    modalElement.addEventListener("close", handleClose);
    return () => {
      modalElement.removeEventListener("close", handleClose);
    };
  }, [dispatch]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === modalRef.current && id) {
        dispatch(resolveConfirm({ id, value: false }));
      }
    },
    [dispatch, id]
  );

  const handleConfirm = useCallback(() => {
    if (id) {
      dispatch(resolveConfirm({ id, value: true }));
    }
  }, [dispatch, id]);

  const handleCancel = useCallback(() => {
    if (id) {
      dispatch(resolveConfirm({ id, value: false }));
    }
  }, [dispatch, id]);

  // Use portal for better DOM structure
  if (!mounted) return null;

  return createPortal(
    <dialog
      ref={modalRef}
      className={cn(
        "modal modal-bottom sm:modal-middle",
        open ? "modal-open" : ""
      )}
      onClick={handleBackdropClick}
    >
      <ModalContent
        {...options}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </dialog>,
    document.body
  );
}
