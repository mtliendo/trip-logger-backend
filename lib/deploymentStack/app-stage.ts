import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import { TripLoggerBackendStack } from '../applicationStack/trip-logger-backend-stack'
import { envNameContext } from '../../cdk.context'

type MyPipelineAppStageProps = cdk.StageProps & {
	environment: envNameContext
}

export class MyPipelineAppStage extends cdk.Stage {
	constructor(scope: Construct, id: string, props: MyPipelineAppStageProps) {
		super(scope, id, props)

		// Create a new backend app stack for the passed in environment
		const stackName = `TripLoggerBackendStack-${props.environment}`
		new TripLoggerBackendStack(this, stackName, { stackName })
	}
}
