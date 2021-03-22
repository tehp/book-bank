import json
import boto3
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('UserReviewTable')
client = boto3.client('lambda')


def lambda_handler(event, context):
    ReviewID = str(uuid.uuid4())

    try:
        response = table.put_item(
            Item={
                "ReviewID": ReviewID,
                "Username": event['Username'],
                "Reviewer": event['Reviewer'],
                "Rating": event['Rating'],
                "Comment": event['Comment']
            })
    except:
        return {
            'statusCode': 400,
            'body': "Input Error"
        }

    # TODO update a user's average rating
    # client_response = client.invoke(
    #     FunctionName = '',
    #     InvocationType = 'RequestResponse',
    #     Payload = json.dumps(inputParams)
    # )

    return {
        'statusCode': 200,
        'ReviewID': ReviewID,
        'body': json.dumps('Success added review')
    }