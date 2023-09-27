import json
import string

def checkEmailSpelling(email):
    if(len(email)>2 and "@" in email and "." in email):
        if(email.index("@") > 0 and email.index(".") > 2):
            return True
    return False

def checkPasswordSpelling(password,userType):
    file = open("./common/passwordPolicies.json","r")
    passwordPolicies = json.load(file)
    policies=passwordPolicies[userType]
    policiesCount = len(policies)
    for x in password:
        if(policies["specialChar"]["isReq"] is True and x in string.punctuation):
            print("s")
            return False
        if(policies["number"]["isReq"] is True and x in string.octdigits):
            print("s")
            return False
        if(policies["upperCaseChar"]["isReq"] is True and x in string.ascii_uppercase):
            return False
    return True