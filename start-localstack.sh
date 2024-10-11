#!/bin/bash
awslocal s3api create-bucket --bucket polisales-bucket
awslocal s3api put-bucket-cors --bucket polisales-bucket --cors-configuration file:///etc/localstack/init/ready.d/localstack-s3-cors.json