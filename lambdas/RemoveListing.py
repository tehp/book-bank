import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BookBankListings')

def lambda_handler(event, context):
    if event['listingID'] and str(event['listingID']).isnumeric():
        try:
            response = table.delete_item(
                Key={
                    'ListingID': str(event['listingID'])
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
    
    # TODO    
    # Reject Requests to this listing
        
    return {
        'statusCode': 200,
        'body': json.dumps('Successfully removed listing ' + str(event['listingID']) + '.')
    }
