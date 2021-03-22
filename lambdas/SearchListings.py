import json
import boto3
from botocore.exceptions import ClientError

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('BookBankListings')


def lambda_handler(event, context):
    response = table.scan()
    return {
        'statusCode': 200,
        'body': response["Items"]
    }
