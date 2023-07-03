export type CDKContext = {
	appName: string
	appDescription: string
	region: string
	environment: envNameContext
	branchName: branchNameContext
	accountId: string
}

export type envNameContext = 'prod' | 'staging' | 'sandbox'

export type branchNameContext = 'main' | 'staging' | 'develop'
