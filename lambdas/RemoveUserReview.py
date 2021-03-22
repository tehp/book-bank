import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('UserReviewTable')


def lambda_handler(event, context):
    try:
        ReviewID = str(event['pathParameters']['ReviewID'])
    except:
        return {
            'isBase64Encoded': True,
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'},
            'body': 'Valid ReviewID required'
        }

    response = table.delete_item(
        Key={
            'ReviewID': ReviewID
        },
        ReturnValues='ALL_OLD')

    try:
        response['Attributes']
    except:
        return {
            'isBase64Encoded': True,
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'},
            'body': 'No such item'
        }

    # TODO update a user's average rating

    return {
        'isBase64Encoded': True,
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'},
        'body': ReviewID
    }