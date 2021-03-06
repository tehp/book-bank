import json
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BookBankRequests')

def lambda_handler(event, context):
    
    result = table.query(
        KeyConditionExpression=
            Key('ListingID').eq(int(event['listingID'])) & Key('Username').eq(event['username'])
    )
    
    if len(result['Items']) > 0:
        try:
            result = table.delete_item(
                Key={
                    'Username': event['username'],
                    'ListingID': int(event['listingID'])
                }
            )
        except ClientError as e:
            return {
                'statusCode': 400,
                'body': json.dumps(e.response['Error']['Message'])
            }
        
    return {
        'statusCode': 200,
        'body': json.dumps('Successfully removed request matching ListingID: ' + event['listingID'] + ', Username: ' + event['username'] + ', OR request does not exist.')
    }
