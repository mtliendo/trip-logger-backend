import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as sqs from 'aws-cdk-lib/aws-sqs'
import { getCDKContext } from '../../bin/utils'

type TripLoggerBackendStackProps = cdk.StackProps & {}

export class TripLoggerBackendStack extends cdk.Stack {
	constructor(
		scope: Construct,
		id: string,
		props: TripLoggerBackendStackProps
	) {
		super(scope, id, props)

		// The code that defines your stack goes here
		const context = getCDKContext(this)
		// example resource
		const queue = new sqs.Queue(
			this,
			`TripLoggerBackendQueue-${context.environment}`,
			{
				queueName: `TripLoggerBackendQueue-${context.environment}`,
				visibilityTimeout: cdk.Duration.seconds(300),
			}
		)
	}
}
