import json
import boto3

dynamo = boto3.resource('dynamodb')
table = dynamo.Table('Users')

def lambda_handler(event, context):
    
    try:
        userid = str(event['pathParameters']['userId'])
        user = table.get_item(Key={'username': userid})
        
        if "Item" not in user:
            return {
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'statusCode': 404,
                'body': json.dumps({"error": 'USER_NOT_FOUND'}),
            }
        
        user = user["Item"]
        
        if user['banned'] == 'True':
            return {
                'statusCode': 400,
                'body': json.dumps({"error": 'USER_BANNED'}),
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
            }

        return {
            'statusCode': 200,
            'body': json.dumps({
                'username': user['username'],
                'location': user['location'],
                'rating': str(user['rating']),
                'type': user['type']
            }),
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