export interface IMailInfoComponentProps {
	 address: string, 
	 onCreateNew: () => void, 
	 isAccountLoading: boolean, 
	 isDomainsLoading: boolean, 
   formattedTime?: string
   isTimerActive?: boolean
}