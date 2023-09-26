def checkEmailSpelling(email):
    if(len(email)>2 and "@" in email and "." in email):
        if(email.index("@") > 0 and email.index(".") > 2):
            return True
    return False