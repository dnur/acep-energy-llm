from google_drive_helper import pdf_to_json, json_to_vector

bucket1 = '1-OcjRs7SFL-J9i1ekKe5CQElPlZ0Utcs'
bucket2 = '1N6ShPsKoxcUtn-Ky75Uk4J3qgQPXo2hw'        
bucket3 = '1jP5PfAKLwdGDQDvN_TihNIEBcsGASoe_'

pdf_to_json(bucket1, bucket2, bucket3)
# json_to_vector(bucket3) #TODO