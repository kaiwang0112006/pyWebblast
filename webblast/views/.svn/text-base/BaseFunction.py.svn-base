import platform

def jedgeTemppath(request):
    settings = request.registry.settings
    conf = settings['otheroptions']
    sysstr = platform.system()
    if(sysstr =="Windows"):
        temppath = conf.get('temp_path','windows')
    elif(sysstr == "Linux"):
        temppath = conf.get('temp_path','linux')
    elif (sysstr == "Darwin"):
        temppath = conf.get('temp_path','linux')
        
    return temppath

def jedgeStr(strings):
    if type(strings) != type('a'):
        return strings.encode('utf-8')
    else:
        return strings