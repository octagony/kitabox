import { APP_TEMP_MAIL_LOCAL_STORAGE_ACCOUNT_KEY } from "#/utils/constants";
import {createStore} from "@tanstack/react-store";

const initialState: IAccountState = {
		address: '',
		password: '',
		token: null,
}

const getInitialState = (): IAccountState => {
	
  if (typeof window === 'undefined') {
		return initialState;
	}

  const saved = localStorage.getItem(APP_TEMP_MAIL_LOCAL_STORAGE_ACCOUNT_KEY)
 
	return saved ? JSON.parse(saved) : initialState
}

export const accountStore = createStore<IAccountState>(getInitialState());

export const accountActions = {
	setAccount: (account: IAccountState) => {
		accountStore.setState(() => account);

		 if (typeof window !== 'undefined') {
      localStorage.setItem('temp_mail_account', JSON.stringify(account))
    }
	},

	clearAccount: () => {
		accountStore.setState(() => initialState);

		 if (typeof window !== 'undefined') {
      localStorage.removeItem('temp_mail_account')
    }
	}
	
}