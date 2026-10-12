export interface IDomainsResponse {
  'hydra:member': IDomain[]
}

export interface IDomain {
  id: string,
  domain: string,
  isActive: boolean,
}

export interface IAccountResponse {
  id: string,
  address: string,
  quota: number,
  used: number,
}

export interface ITokenResponse {
  token: string,
}

export interface IMessagesResponse {
  'hydra:member': IMessageSummary[]
}

export interface IMessageSummary {
  id: string,
  from: { 
		address: string,
		name: string ,
	},
  subject: string,
  intro: string,
  seen: boolean,
  createdAt: string,
}

export interface IMessageDetail extends IMessageSummary {
  to: { 
		address: string,
		name: string,
	}[],
  text: string,
  html: string[],
  hasAttachments: boolean,
}

export interface IMessageDeleteResponse {
  id: string,
}
