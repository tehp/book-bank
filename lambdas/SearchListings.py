import json
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BookBankListings')

def lambda_handler(event, context):
    filterExpression = ''
    exprAttrVals = {}
    exprAttrNames = {}
    numFilters = 0
    
    if 'duration' in event.keys():
        if event['duration']:
            filterExpression += "#duration = :duration"
            exprAttrNames['#duration'] = 'Duration'
            exprAttrVals[':duration'] = event['duration']
            numFilters += 1
            
    if 'book' in event.keys():
        if event['book']:
            if numFilters != 0:
                filterExpression += " and "
            filterExpression += "#book = :book"
            exprAttrNames['#book'] = 'Book'
            exprAttrVals[':book'] = event['book']
            numFilters += 1
            
    if 'location' in event.keys():
        if event['location']:
            if numFilters != 0:
                filterExpression += " and "
            filterExpression += "#location = :location"
            exprAttrNames['#location'] = 'Location'
            exprAttrVals[':location'] = event['location']
            numFilters += 1
            
    if 'status' in event.keys():
        if event['status']:
            if numFilters != 0:
                filterExpression += " and "
            filterExpression += "#status = :status"
            exprAttrNames['#status'] = 'Status'
            exprAttrVals[':status'] = event['status']
            numFilters += 1
            
    if 'username' in event.keys():
        if event['username']:
            if numFilters != 0:
                filterExpression += " and "
            filterExpression += "#" + "username = :username"
            exprAttrNames['#username'] = 'Username'
            exprAttrVals[':username'] = event['username']
            numFilters += 1
    
    print(filterExpression)
    print(exprAttrVals)
    
    if 'listingID' in event.keys():
        response = table.query(
            KeyConditionExpression=Key('ListingID').eq(event['listingID'])
        )
    else:
        response = table.scan(
            FilterExpression= filterExpression,
            ExpressionAttributeNames= exprAttrNames,
            ExpressionAttributeValues= exprAttrVals
        )
    
    return {
        'statusCode': 200,
        'body': response["Items"]
    }
