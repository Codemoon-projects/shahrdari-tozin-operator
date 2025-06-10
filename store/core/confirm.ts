"use client"

import { createSlice, type PayloadAction, createSelector } from "@reduxjs/toolkit"
import type { RootState } from "../store"

export type ConfirmOptions = {
    title?: string
    description?: string
    confirmText?: string
    cancelText?: string
}

type ConfirmState = {
    open: boolean
    options: ConfirmOptions
    id: string | null
    resolvers: Record<string, (value: boolean) => void>
}

const initialState: ConfirmState = {
    open: false,
    options: {},
    id: null,
    resolvers: {},
}

export const confirmSlice = createSlice({
    name: "confirm",
    initialState,
    reducers: {
        openConfirm: (state, action: PayloadAction<{ id: string; options: ConfirmOptions }>) => {
            state.open = true
            state.options = action.payload.options
            state.id = action.payload.id
        },
        closeConfirm: (state) => {
            state.open = false
        },
        addResolver: (state, action: PayloadAction<{ id: string; resolver: (value: boolean) => void }>) => {
            state.resolvers[action.payload.id] = action.payload.resolver
        },
        resolveConfirm: (state, action: PayloadAction<{ id: string; value: boolean }>) => {
            const { id, value } = action.payload
            if (state.resolvers[id]) {
                // Execute the resolver outside of the reducer
                const resolver = state.resolvers[id]
                queueMicrotask(() => resolver(value))
                delete state.resolvers[id]
            }
            state.open = false
        },
    },
})

// Memoized selectors for better performance
export const selectConfirmOpen = (state: RootState) => state.confirm.open
export const selectConfirmId = (state: RootState) => state.confirm.id

export const selectConfirmOptions = createSelector([(state: RootState) => state.confirm.options], (options) => ({
    title: options.title || "Confirm Action",
    description: options.description || "Are you sure you want to continue?",
    confirmText: options.confirmText || "OK",
    cancelText: options.cancelText || "Cancel",
}))

export const { openConfirm, closeConfirm, addResolver, resolveConfirm } = confirmSlice.actions

export default confirmSlice.reducer
