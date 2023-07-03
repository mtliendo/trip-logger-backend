import * as cdk from 'aws-cdk-lib'
import {
	CodePipeline,
	CodePipelineSource,
	ShellStep,
} from 'aws-cdk-lib/pipelines'
import { Construct } from 'constructs'
import { MyPipelineAppStage } from './app-stage'
import { envNameContext } from '../../cdk.context'
import { execSync } from 'child_process'
import { getCurrentGitBranch } from '../../bin/utils'

type TripLoggerDeploymentStackProps = cdk.StackProps & {
	environment: envNameContext
}
export class TripLoggerDeploymentStack extends cdk.Stack {
	constructor(
		scope: Construct,
		id: string,
		props: TripLoggerDeploymentStackProps
	) {
		super(scope, id, props)

		const currentGitBranch = getCurrentGitBranch()
		const pipelineName = `TripLogger-Backend-Pipeline-${props.environment}`

		const pipeline = new CodePipeline(this, pipelineName, {
			pipelineName: pipelineName,
			synth: new ShellStep('Synth', {
				input: CodePipelineSource.gitHub(
					'mtliendo/trip-logger-backend',
					// this doesn't create a new pipeline, it just pulls this branch of the repo
					currentGitBranch
				),
				commands: [
					'npm ci',
					'npm run build',
					`echo "the current branch: ${currentGitBranch}!"`,
					'npx aws-cdk synth',
				],
			}),
		})

		console.log('first')
		// // deploy the stack of resources to the account and region specified in the stage
		// pipeline.addStage(
		// 	new MyPipelineAppStage(this, `deploy-${props.environment}-resources`, {
		// 		environment: props.environment,
		// 	})
		// )
	}
}
