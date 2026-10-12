import type { IAccountState } from "@/interfaces/IStore.interface";
import { accountActions, accountStore } from "@/store/accountStore";
import { describe, it, expect, beforeEach } from "vitest";

describe('Test accountStore', () => {
	beforeEach(()=> {
		accountActions.clearAccount()
	});

	it('Should correct initial state', () => {
			expect(accountStore.state.address).toBe('');
			expect(accountStore.state.password).toBe('');
			expect(accountStore.state.token).toBeNull();
			expect(accountStore.state.createdAt).toBeNull();
	});

	it('Should set mock data to store', () => {
		const mockData: IAccountState = {
			address: 'test@example.com',
			password: 'secret_password',
			token: 'secret_token',
		}

		accountActions.setAccount(mockData);
		
		expect(accountStore.state.address).toBe(mockData.address);
		expect(accountStore.state.password).toBe(mockData.password);
		expect(accountStore.state.token).toBe(mockData.token);
		expect(accountStore.state.createdAt).toBeGreaterThan(0);
	});


	it('Should clear store', () => {
    const mockData: IAccountState = {
			address: 'test@example.com',
			password: 'secret_password',
			token: 'secret_token',
		}

		accountActions.setAccount(mockData);

    accountActions.clearAccount()

    expect(accountStore.state.address).toBe('')
    expect(accountStore.state.password).toBe('')
    expect(accountStore.state.token).toBeNull()
    expect(accountStore.state.createdAt).toBeNull()
  })
});
