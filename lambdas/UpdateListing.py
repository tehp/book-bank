import json
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BookBankListings')

def lambda_handler(event, context):
    updateExpression = 'set '
    exprAttrVals = {}
    exprAttrNames = {}
    numUpdates = 0
    
    if 'listingID' not in event.keys():
        return {
            'statusCode': 400,
            'body': "No listingID to update."
        }
    
    if 'duration' in event.keys():
        if event['duration']:
            updateExpression += "#duration = :duration"
            exprAttrNames['#duration'] = 'Duration'
            exprAttrVals[':duration'] = event['duration']
            numUpdates += 1
            
    if 'book' in event.keys():
        if event['book']:
            if numUpdates != 0:
                updateExpression += ", "
            updateExpression += "#book = :book"
            exprAttrNames['#book'] = 'Book'
            exprAttrVals[':book'] = event['book']
            numUpdates += 1
            
    if 'bookInfo' in event.keys():
        if numUpdates != 0:
            updateExpression += ", "
        updateExpression += "#info = :info"
        exprAttrNames["#info"] = "BookInfo"
        exprAttrVals[":info"] = event["bookInfo"]
        numUpdates += 1
            
    if 'location' in event.keys():
        if event['location']:
            if numUpdates != 0:
                updateExpression += ", "
            updateExpression += "#location = :location"
            exprAttrNames['#location'] = 'Location'
            exprAttrVals[':location'] = event['location']
            numUpdates += 1
            
    if 'status' in event.keys():
        if event['status']:
            if numUpdates != 0:
                updateExpression += ", "
            updateExpression += "#status = :status"
            exprAttrNames['#status'] = 'Status'
            exprAttrVals[':status'] = event['status']
            numUpdates += 1
            
    if numUpdates == 0:
        return {
            'statusCode': 400,
            'body': "Nothing to update"
        }
    
    try:    
        result = table.update_item(
                Key={
                    'ListingID': str(event['listingID'])
                },
                ConditionExpression=Key('ListingID').eq(event['listingID']),
                UpdateExpression=updateExpression,
                ExpressionAttributeNames=exprAttrNames,
                ExpressionAttributeValues=exprAttrVals
            )
    except:
        return{
            'statusCode': 400,
            'body': "ListingID " + str(event['listingID']) + " is not valid."
        }
        
    return{
        'statusCode': 200,
        'body': "Updated listingID " + str(event['listingID'])
    }
