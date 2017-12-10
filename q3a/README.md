# Voting Platform Setup Procedure
The following procedure is written assuming you have the aws cli tools installed on your computer

1. Zip everthing in the lambda-src folder into ```deploy-package.zip```
```
# zip deploy-package.zip *
```

2. Create the S3 bucket and upload the zip file just created to the bucket
```
# aws s3api create-bucket --bucket <the name of the bucket> --region us-east-2 --create-bucket-configuration LocationConstraint=us-east-2
# aws s3 cp deploy-package.zip s3://<the name of the bucket>/deploypackage.zip
```

3. Modify the parameters value in the ```votingPlatformParam.json``` according to the setup of your AWS environment

4. Create a new CloudFormation stack using the template ```votingPlatform.json```
This cloudformation template handles the creation of the lambda function and the ElastiCache.
```
# aws cloudformation create-stack --stack-name <the name of the stack> --template-body file://votingPlatform.json --parameters file://votingPlatformParam.json --capabilities CAPABILITY_IAM
```
5. After the completing the creation of the stack, update the environment variables of the Lambda Function with name same as the cloudformation stack name.
  Update the variable ```REDIS_URL``` to the end point url of the ElastiCache created. The other two variables are defaulted to   value as needed by the specification.

6. Go to the AWS API Gateway Console and create a new api.
7. Create a new resource with two methods, one GET method and one PUT method. Un-select the proxy option.
8. With the GET method, configure it to integrate with the Lambda Function created by CloudFormation. Leave other settings as     default.
9. In the settings of Integration Request under the Method Execution page, create a new Body Mapping Template of content type ```application/json``` with the following spec:
```
#set($inputRoot = $input.path('$'))
{
    "operation": "getVotes"
}
```
10. With the PUT method, configure it to integrate with the Lambda Function created by CloudFormation. Leave other settings as     default.
11. In the settings of Integration Request under the Method Execution page, create a new Body Mapping Template of content type ```application/json``` with the following spec:
```
#set($inputRoot = $input.path('$'))
{
  "voteTo" : "$inputRoot.voteTo",
  "operation": "upVote"
}
```
12. Deploy the API and running the following test cases:
```
# curl -XPUT  https://igz27r5beh.execute-api.us-east-2.amazonaws.com/poc/votes -H 'content-type:application/json' -d '{"voteTo": "u01"}'
{"msg":"Completed"}
# curl -XPUT  https://igz27r5beh.execute-api.us-east-2.amazonaws.com/poc/votes -H 'content-type:application/json' -d '{"voteTo": "u02"}'
{"msg":"Completed"}
# curl -XPUT  https://igz27r5beh.execute-api.us-east-2.amazonaws.com/poc/votes -H 'content-type:application/json' -d '{"voteTo": "u03"}'
{"msg":"Completed"}
# curl -XPUT  https://igz27r5beh.execute-api.us-east-2.amazonaws.com/poc/votes -H 'content-type:application/json' -d '{"voteTo": "u04"}'
{"msg":"Completed"}
# curl -XGET  https://igz27r5beh.execute-api.us-east-2.amazonaws.com/poc/votes
{"indivVote":[{"id":"u01","votes":"1"},{"id":"u02","votes":"1"},{"id":"u03","votes":1},{"id":"u04","votes":1}],"voteInLastWindow":4}
```

# Architectural Design and Considerations
1. Note that there is no database involved in the solution.
  This is because this application does not involve many transactional operations and complex queries.
  Moreover, the ElastiCache provides excellent resilience and with the PERSIST enable the long live of the keys. This makes it   totally feasible to only store the voting info in ElastiCache to save cost and avoid unnecessary bottleneck of RDBMS.
2. API Gateway integrated with Lambda Function makes the voting platform highly available and adapt to a wide range of access     scale.
3. No logic is implemented to check the voting request body, which is not necessary as the candidate list is hardcoded to the frontend, enhances the processing speed.

