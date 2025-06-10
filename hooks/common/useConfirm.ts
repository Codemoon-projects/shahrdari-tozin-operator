"use client"

import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { openConfirm, addResolver, type ConfirmOptions } from "@/store/core/confirm"

// Generate a unique ID without external dependencies
export function generateId(): string {
    return Math.random().toString(36).substring(2, 9) + Date.now().toString(36)
}

export function useConfirm() {
    const dispatch = useDispatch()

    // Memoize the confirm function to prevent unnecessary re-renders
    const openConfirmModal = useCallback(
        (options: ConfirmOptions = {}) => {
            return new Promise<boolean>((resolve) => {
                const id = generateId()

                // Add the resolver to the store
                dispatch(addResolver({ id, resolver: resolve }))

                // Open the confirm dialog
                dispatch(openConfirm({ id, options }))
            })
        },
        [dispatch],
    )

    return { openConfirmModal }
}
