from pyramid.response import Response
from pyramid.view import notfound_view_config, view_config
import os, sys
import uuid
import platform

@view_config(route_name='fileUpload')  
def queryUpload(request):
    timestr = request.matchdict['timestr']
    postname = request.matchdict['postname']

    #filename = request.POST[postname].filename.split('.')[0]
    settings = request.registry.settings
    
    
    conf = settings['otheroptions']
    sysstr = platform.system()
#     if(sysstr =="Windows"):
#         temppath = conf.get('temp_path','windows')
#     elif(sysstr == "Linux"):
#         temppath = conf.get('temp_path','linux')
#     elif (sysstr == "Darwin"):
#         temppath = conf.get('temp_path','linux')
    temppath = conf.get('temp_path','temppath')

    #path = temppath + filename + "/"
    fileUpload(request,temppath,postname,timestr)

    return Response('OK')
    
    
def fileUpload(request,path,postname,timestr):

# ``filename`` contains the name of the file in string format.
    #
    # WARNING: this example does not deal with the fact that IE sends an
    # absolute file *path* as the filename.  This example is naive; it
    # trusts user input.

    filename = timestr+"_"+request.POST[postname].filename

    # ``input_file`` contains the actual file data which needs to be
    # stored somewhere.

    input_file = request.POST[postname].file

    # Note that we are generating our own filename instead of trusting
    # the incoming filename since that might result in insecure paths.
    # Please note that in a real application you would not use /tmp,
    # and if you write to an untrusted location you will need to do
    # some extra work to prevent symlink attacks.

    #file_path = os.path.join('/static/tmpfile', '%s' % uuid.uuid4())
#     try:
#         os.chdir(r'phenibq_p/static/scripts/snpQuery/')
#     except:
#         pass

    #os.chdir(r'phenibq_p/static/scripts/snpQuery/')
    file_path = os.path.join(path, filename)
    print file_path
    # We first write to a temporary file to prevent incomplete files from
    # being used.

    #temp_file_path = file_path + '~'
    #output_file = open(temp_file_path, 'wb')
    output_file = open(file_path, 'wb')
    # Finally write the data to a temporary file
    input_file.seek(0)
    while True:
        data = input_file.read(2<<16)
        if not data:
            break
        output_file.write(data)

    # If your data is really critical you may want to force it to disk first
    # using output_file.flush(); os.fsync(output_file.fileno())

    output_file.close()

    # Now that we know the file has been fully saved to disk move it into place.

    #os.rename(temp_file_path, file_path)

