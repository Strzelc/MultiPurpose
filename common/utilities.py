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
    if(policies["minLength"]["isReq"] is True and len(password) < policies["minLength"]["minLength"]):
        return False
    else:
        policies["minLength"]["isReq"] = False
    for x in password:
        if(policies["specialChar"]["isReq"] is True and x in string.punctuation):
            policies["specialChar"]["isReq"] = False
        if(policies["number"]["isReq"] is True and x in string.octdigits):
            policies["number"]["isReq"] = False
        if(policies["upperCaseChar"]["isReq"] is True and x in string.ascii_uppercase):
            policies["upperCaseChar"]["isReq"] = False
    for policy in policies:
        if (policies[policy]["isReq"] is True):
            return False
    return True