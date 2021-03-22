import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BookBankRequests')

def lambda_handler(event, context):

    error = ''
    try:
        if not event['username']:
            error += 'Username required to add request. '
        if not event['listing']:
            error += 'Listing required to add request. '
        if not event['listing'].isnumeric():
            error += 'Listing required to be numeric. '            
            
    except:
        return {
            'statusCode': 400,
            'body': json.dumps('Bad event call. ')
        }
        
    if error != '':
        return {
            'statusCode': 400,
            'body': json.dumps('Could not add listing: ' + error)
        }        
    
    result = table.put_item(
        Item={
            'Username': event['username'],
            'ListingID': int(event['listing']),
            'Comment': getComment(event),
            'Status': "pending",
            'Reason': getReason(event)
        }
    )
    
    return {
        'statusCode': 200,
        'body': json.dumps('Successfully add request. ')
    }    
    

def getComment(event):
    if 'comment' in event.keys():
        return event['comment']
    return ''
    

def getReason(event):
    if 'reason' in event.keys():
        return event['reason']
    return ''
    
    
