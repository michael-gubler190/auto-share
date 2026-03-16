import { useEffect } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    // Prevent background scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            aria-modal="true"
            role="dialog"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-xl mx-4 p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    {title && (
                        <h2 className="text-2xl font-bold">{title}</h2>
                    )}
                    <button
                        onClick={onClose}
                        className="ml-auto text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                        <XMarkIcon className="size-6" />
                    </button>
                </div>

                {/* Content */}
                {children}
            </div>
        </div>,
        document.body
    );
}