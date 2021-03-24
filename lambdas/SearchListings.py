import json
import boto3
from botocore.exceptions import ClientError
from boto3.dynamodb.conditions import Key

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BookBankListings')

def lambda_handler(event, context):
    
    #return{
    #    'statusCode':400,
     #   'headers': {
      #      'Content-Type': 'application/json',
       #     'Access-Control-Allow-Origin': '*'
        #},
        #'body': json.dumps(event)
    #}
    if 'queryStringParameters' in event and event['queryStringParameters']:
        event = event['queryStringParameters']
        
        filterExpression = ''
        exprAttrVals = {}
        exprAttrNames = {}
        numFilters = 0
        
        print(event)
        
        if 'duration' in event:
            if event['duration']:
                filterExpression += "#duration = :duration"
                exprAttrNames['#duration'] = 'Duration'
                exprAttrVals[':duration'] = event['duration']
                numFilters += 1
                
        if 'book' in event:
            if event['book']:
                if numFilters != 0:
                    filterExpression += " and "
                filterExpression += "#book = :book"
                exprAttrNames['#book'] = 'Book'
                exprAttrVals[':book'] = event['book']
                numFilters += 1
                
        if 'location' in event:
            if event['location']:
                if numFilters != 0:
                    filterExpression += " and "
                filterExpression += "#location = :location"
                exprAttrNames['#location'] = 'Location'
                exprAttrVals[':location'] = event['location']
                numFilters += 1
                
        if 'status' in event:
            if event['status']:
                if numFilters != 0:
                    filterExpression += " and "
                filterExpression += "#status = :status"
                exprAttrNames['#status'] = 'Status'
                exprAttrVals[':status'] = event['status']
                numFilters += 1
                
        if 'username' in event:
            if event['username']:
                if numFilters != 0:
                    filterExpression += " and "
                filterExpression += "#" + "username = :username"
                exprAttrNames['#username'] = 'Username'
                exprAttrVals[':username'] = event['username']
                numFilters += 1
        
        print(filterExpression)
        print(exprAttrVals)
        
        if 'listingID' in event:
            response = table.query(
                KeyConditionExpression=Key('ListingID').eq(event['listingID'])
            )
        elif numFilters != 0:
            response = table.scan(
                FilterExpression= filterExpression,
                ExpressionAttributeNames= exprAttrNames,
                ExpressionAttributeValues= exprAttrVals
            )
        else:
            response = table.scan()
    else:
        response = table.scan()
    
    
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps(response["Items"])
    }
