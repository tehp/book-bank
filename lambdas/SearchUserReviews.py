import json
import boto3
from boto3.dynamodb.conditions import Attr

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('UserReviewTable')


def lambda_handler(event, context):
    try:
        Username = event['pathParameters']['Username']
    except:
        return {
            'isBase64Encoded': True,
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'},
            'body': 'Valid ReviewID required'
        }

    response = table.scan(
        FilterExpression=Attr('Username').eq(Username)
    )

    reviews = response['Items']
    if (reviews == []):
        return {
            'isBase64Encoded': True,
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'},
            'body': 'No Review matching ReviewID'
        }

    return {
        'isBase64Encoded': False,
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'},
        'body': str(reviews)
    }