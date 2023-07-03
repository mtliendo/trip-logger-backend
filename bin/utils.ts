import { execSync } from 'child_process'
import { CDKContext } from '../cdk.context'
import { App, Stack } from 'aws-cdk-lib'

export const getCurrentGitBranch = () =>
	execSync('git symbolic-ref HEAD --short').toString().trim()

export const getCDKContext = (scope: App | Stack): CDKContext => {
	// Get the environment context based on the current git branch, merge with globals
	const currentGitBranch = getCurrentGitBranch()

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
