import json
import boto3
from boto3.dynamodb.conditions import Attr

dynamo = boto3.resource('dynamodb')
table = dynamo.Table('Listings')

def lambda_handler(event, context):
    
    try:
        userid = str(event['pathParameters']['userId'])
        listings = table.scan(FilterExpression=Attr('username').eq(userid))
        
        if "Items" not in listings:
            return {
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'statusCode': 404,
                'body': json.dumps({"error": 'USER_NOT_FOUND'}),
            }
        
        return {
            'statusCode': 200,
            'body': json.dumps(listings['Items']),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        }

    except:
        return {
            'statusCode': 500,
            'body': json.dumps({"error": "unknown error"}),
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        }