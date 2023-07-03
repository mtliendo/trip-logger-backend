#!/usr/bin/env node

import 'source-map-support/register'
import * as cdk from 'aws-cdk-lib'
import { TripLoggerDeploymentStack } from '../lib/deploymentStack/deployment-stack'
import { getCDKContext } from './utils'

const app = new cdk.App()
const context = getCDKContext(app)
const stackName = `TripLoggerDeploymentStack-${context.environment}`

// Create a new deployment stack for each environment listed in the cdk.context.json file
new TripLoggerDeploymentStack(app, stackName, {
	stackName: stackName,
	env: { account: context.accountId, region: context.region },
	environment: context.environment,
})
