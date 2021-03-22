import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BookBankListings')
listingIndex = 0

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
        
    global listingIndex
    response = table.put_item(
        Item={
            'ListingID': listingIndex,
            'Username': event['username'],
            'Location': event['location'],
            'Book': event['book'],
            'BookInfo': getBookInfo(event),
            'Status': "available",
            'Duration': event['duration']
        }
    )
    
    listingIndex += 1

    # TODO    
    # Reject Requests to this listing
        
    return {
        'statusCode': 200,
        'body': json.dumps('Successfully add listing ' + str(listingIndex-1) + '.')
    }

def getBookInfo(event):
    if 'bookInfo' in event.keys():
        return event['bookInfo']
    return ''