import logging
import boto3
import botocore
from botocore.exceptions import ClientError
import secrets


AWS_ACCESS_KEY_ID = 'AKIA4I4OCD5QAHFP3WMO'
AWS_SECRET_ACCESS_KEY = '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'
AWS_STORAGE_BUCKET_NAME = 'inhealin-therapist-resumes'
AWS_S3_SIGNATURE_VERSION = 's3v4'
AWS_S3_REGION_NAME = 'ap-northeast-1'
AWS_S3_FILE_OVERWRITE = False
AWS_DEFAULT_ACL = None
AWS_S3_VERIFY = True
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage' 



def create_presigned_url():
    # Choose AWS CLI profile, If not mentioned, it would take default
    # boto3.setup_default_session(profile_name='personal')
    raw_bytes = secrets.token_bytes(16)
    object_name = raw_bytes.hex()+".pdf"

    # Generate a presigned URL for the S3 object
    bucket_name =  "inhealin-therapist-resumes"
    # object_name="random file name"
    expiration=600
    s3_client = boto3.client('s3', region_name=AWS_S3_REGION_NAME, aws_access_key_id=AWS_ACCESS_KEY_ID, aws_secret_access_key=AWS_SECRET_ACCESS_KEY, config=boto3.session.Config(signature_version='s3v4'))
    try:
        response = s3_client.generate_presigned_url(
            'put_object',
            Params={
                'Bucket': bucket_name,
                'Key': object_name,
                # "Content-Disposition": "inline"
                },
                ExpiresIn=expiration)
    except Exception as e:
        print(e)
        logging.error(e)
        return "Error"
    # The response contains the presigned URL
    print(response)
    return response


# create_presigned_url('devopsjunction','sqscli-windows.zip',600)