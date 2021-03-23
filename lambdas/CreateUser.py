import json
import boto3

dynamo = boto3.resource('dynamodb')
users = dynamo.Table('Users')

def respond(code, body):
    return {
        'statusCode': code,
        'body': json.dumps(body),
    }

def lambda_handler(event, context):

    try:
        if 'username' not in event or 'location' not in event or 'email' not in event:
          return respond(400, {'error': 'missing data'})

        user = users.get_item(Key={'username': event['username']})

        if "Item" in user:
            return respond(400, {'error': 'USERNAME_TAKEN'})

        user = {
          'location': event['location'],
          'email': event['email'],
          'username': event['username'],
          'banned': False,
          'rating': 0,
          'type': 'user'
        }

        if 'phone' in event:
            user['phone'] = event['phone']

        users.put_item(Item=user)

        return respond(200, {'message': 'USER_CREATED'})

    except:
        return respond(500, {"error": "unknown error"})
