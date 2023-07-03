import * as branch from 'git-branch'
import { CDKContext } from '../cdk.context'
import { App, Stack } from 'aws-cdk-lib'

export const getCDKContext = (scope: App | Stack): CDKContext => {
	// Get the environment context based on the current git branch, merge with globals
	const currentGitBranch = branch.sync()

	const globals = scope.node.tryGetContext('globals')
	const environments = scope.node.tryGetContext('environments')

	const environment = environments.find(
		(env: any) => env.branchName === currentGitBranch
	)
	if (!environment) {
		throw new Error(`No environment found for branch ${currentGitBranch}`)
	}

	return { ...globals, ...environment }
}
