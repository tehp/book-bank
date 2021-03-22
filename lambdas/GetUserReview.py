import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('UserReviewTable')


def lambda_handler(event, context):
    try:
        ReviewID = event['pathParameters']['ReviewID']
    except:
        return {
            'isBase64Encoded': True,
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'},
            'body': 'Valid ReviewID required'
        }

    response = table.get_item(
        Key={
            'ReviewID': ReviewID
        })
    try:
        review = str(response['Item'])
    except:
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
        'body': review
    }