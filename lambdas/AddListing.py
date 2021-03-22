import json
import boto3
from botocore.exceptions import ClientError
import uuid

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BookBankListings')

def lambda_handler(event, context):
    
    error = ''
    try:
        if not event['username']:
            error += 'Username required to add listing.\n'
        if not event['location']:
            error += 'Location required to add listing.\n'
        if not event['book']:
            error += 'Book Title required to add listing\n'
        if not event['duration']:
            error += 'Rental Duration required to add listing\n'
    except:
        return {
            'statusCode': 400,
            'body': json.dumps('Bad event call.')
        }
        
    if error != '':
        return {
            'statusCode': 400,
            'body': json.dumps('Could not add listing:\n' + error)
        }
        
    listingID = (uuid.uuid4().int >> 64)
    
    result = table.put_item(
        Item={
            'ListingID': listingID,
            'Username': event['username'],
            'Location': event['location'],
            'Book': event['book'],
            'BookInfo': getBookInfo(event),
            'Status': "available",
            'Duration': event['duration']
        }
    )
    
    # TODO    
    # Reject Requests to this listing
        
    return {
        'statusCode': 200,
        'body': {
            'message': json.dumps('Successfully add listing ' + str(listingID) + '.'),
            'listingID': listingID
            }
    }

def getBookInfo(event):
    if 'bookInfo' in event.keys():
        return event['bookInfo']
    return ''
