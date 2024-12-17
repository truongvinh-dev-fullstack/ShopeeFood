// LoadingContext.js

import React, { createContext, useContext, useState } from 'react'

interface LoadingContextProps {
	isLoading: boolean
	showLoader: () => void
	hideLoader: () => void
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined)

export const LoadingProvider: React.FC<any> = ({ children }: { children: React.ReactNode }) => {
	const [isLoading, setIsLoading] = useState(false)

	const showLoader = () => setIsLoading(true)
	const hideLoader = () => setIsLoading(false)

	const contextValue: LoadingContextProps = {
		isLoading,
		showLoader,
		hideLoader,
	}

	return <LoadingContext.Provider value={contextValue}>{children}</LoadingContext.Provider>
}

export const useLoading = (): LoadingContextProps => {
	const context = useContext(LoadingContext)
	if (!context) {
		throw new Error('useLoading must be used within a LoadingProvider')
	}
	return context
}
