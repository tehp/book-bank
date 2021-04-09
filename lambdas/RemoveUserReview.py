import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('UserReviewTable')


def lambda_handler(event, context):
    try:
        ReviewID = str(event['ReviewID'])
    except:
        return {
            'isBase64Encoded': True,
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*'},
            'body': 'Valid ReviewID required'
        }

    exprAttrNames = {}
    exprAttrVals = {}
    
    filterExpression = "#" + "Reviewer = :Reviewer"
    exprAttrNames['#Reviewer'] = 'Reviewer'
    exprAttrVals[':Reviewer'] = event['Reviewer']

    response = table.delete_item(
        Key={
            'ReviewID': ReviewID
        },
        ConditionExpression=filterExpression,
        ExpressionAttributeNames=exprAttrNames,
        ExpressionAttributeValues=exprAttrVals,
        
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
