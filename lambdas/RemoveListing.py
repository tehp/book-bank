import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BookBankListings')


def lambda_handler(event, context):
    if event['listingID'] and event['listingID'].isnumeric():
        try:
            response = table.delete_item(
                Key={
                    'ListingID': int(event['listingID'])
                }
            )
        except ClientError as e:
            return {
                'statusCode': 400,
                'body': json.dumps(e.response['Error']['Message'])
            }
    else:
        return {
            'statusCode': 400,
            'body': json.dumps('No listingID found.')
        }

    return {
        'statusCode': 200,
        'body': json.dumps('Successfully removed listing ' + event['listingID'] + '.')
    }
