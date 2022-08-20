import { Runtime } from 'aws-cdk-lib/aws-lambda'
import { App, Stack, RemovalPolicy, CfnOutput } from 'aws-cdk-lib'
import { NodejsFunction, NodejsFunctionProps } from 'aws-cdk-lib/aws-lambda-nodejs'
import { BlockPublicAccess, Bucket, EventType, HttpMethods, BucketAccessControl } from 'aws-cdk-lib/aws-s3'
import { LambdaDestination } from 'aws-cdk-lib/aws-s3-notifications'

import { join } from 'path'
import secret from './secret.json'


export class TShirtStack extends Stack {
  constructor(app: App, id: string) {
    super(app, id);

    const s3 = new Bucket(this, `tshirt-editor-${id}`, {
      blockPublicAccess: {
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false
      } as BlockPublicAccess,
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
      cors: [{
          allowedMethods: [HttpMethods.GET, HttpMethods.POST, HttpMethods.PUT,],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
        }],
      accessControl: BucketAccessControl.PUBLIC_READ,
      publicReadAccess: true
    })

    const nodeJsFunctionProps: NodejsFunctionProps = {
      bundling: {
        externalModules: ['aws-sdk'],
      },
      depsLockFilePath: join(__dirname, 'lambdas', 'package-lock.json'),
      environment: {
        BUCKET_NAME: s3.bucketName,
        PLATFORM: secret.platform,
        TOKEN: secret.token,
      },
      runtime: Runtime.NODEJS_16_X,
    }

    const uploadFile = new NodejsFunction(this, 'uploadFileFunction', {
      entry: join(__dirname, 'lambdas', 'upload-file.ts'),
      ...nodeJsFunctionProps,
    })

    s3.addEventNotification(
      EventType.OBJECT_CREATED,
      new LambdaDestination(uploadFile),
      {suffix: ".png"}
    )

    new CfnOutput(this, 'bucketName', {
      value: s3.bucketName,
    })

    // const api = new RestApi(this, `tshirt-editor-api-${id}`, {
    //   restApiName: 'TShirt Editor Service'
    // });

    // const items = api.root.addResource('api');
    // const singleItem = items.addResource('{filename}');
    // singleItem.addMethod('POST', new LambdaIntegration(uploadFile));
    
    // addCorsOptions(singleItem)
  }
}

// export function addCorsOptions(apiResource: IResource) {
//   apiResource.addMethod('OPTIONS', new MockIntegration({
//     integrationResponses: [{
//       statusCode: '200',
//       responseParameters: {
//         'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
//         'method.response.header.Access-Control-Allow-Origin': "'*'",
//         'method.response.header.Access-Control-Allow-Credentials': "'false'",
//         'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'",
//       },
//     }],
//     passthroughBehavior: PassthroughBehavior.NEVER,
//     requestTemplates: {
//       "application/json": "{\"statusCode\": 200}"
//     },
//   }), {
//     methodResponses: [{
//       statusCode: '200',
//       responseParameters: {
//         'method.response.header.Access-Control-Allow-Headers': true,
//         'method.response.header.Access-Control-Allow-Methods': true,
//         'method.response.header.Access-Control-Allow-Credentials': true,
//         'method.response.header.Access-Control-Allow-Origin': true,
//       },
//     }]
//   })
// }

const app = new App();
new TShirtStack(app, 'TShirtEditor');
app.synth();