# -*- coding: utf-8 -*- 
from pyramid.view import notfound_view_config, view_config
from pyramid.response import Response
from BaseFunction import *
import os
from subprocess import Popen, PIPE
from Bio import SeqIO
from parseBlast import *
from xml.sax import xmlreader
from json import *
from blastformat import *

@view_config(route_name='tblastnrun',renderer='json')
def tblastnrun(request):
    parameters_data = request.json_body
    settings = request.registry.settings
    conf = settings['otheroptions']
    temppath = conf.get('temp_path','temppath')
    staticpath = conf.get('temp_path','staticpath')
    ncbibase = conf.get('ncbi','basepath')
    blastdbconf = request.registry['nucleotidedb']
    timestr = str(parameters_data['timestr'])
    #timestr = 'a'
    xmlresult = {}
      
    if parameters_data['jobtitle'] == '':
        parameters_data['jobtitle'] = 'anonymous'
              
    #parse query
    queryids = []
    if 'filename' in parameters_data:
        queryname = parameters_data['filename']
        queryfa = os.path.join(temppath, parameters_data['filename'])
        for seq_record in SeqIO.parse(queryfa, "fasta"):
            queryids.append((seq_record.id,len(seq_record)))
      
    elif 'seq' in parameters_data:
        if len(parameters_data['seq']) == 0:
            return {'error':"Empty seq query!"}
        else:
            queryname = timestr + '_' + parameters_data['jobtitle'] + '_query.fa'
            queryfa = os.path.join(temppath, queryname)
            with open(queryfa, 'w') as fwrite:
                queryids.append((('%seq' % parameters_data['jobtitle']),len(parameters_data['seq'])))
                fwrite.write('>%seq\n' % parameters_data['jobtitle'])
                fwrite.write("%s\n" % parameters_data['seq'].encode('utf8'))
    else:
        return {'error':"Empty seq query!"}
    #setup DB
    db = os.path.join(blastdbconf[parameters_data['DB']][0], blastdbconf[parameters_data['DB']][1])
    #setup output formate 11
    outname = timestr + '_' + parameters_data['jobtitle'] + '_tblastn.out'
    out11 = os.path.join(temppath, outname)
    #setup blast cmd
    blastcmd = '%stblastn -query %s -db %s -outfmt 11 -out %s' % (ncbibase, queryfa, db, out11)
    
    for param in parameters_data:
        if param not in ['seq','filename','jobtitle','timestr','DB','lcasemasking']:
            if str(parameters_data[param]) != '':
                blastcmd += " -%s %s" % (param,str(parameters_data[param]))
    if parameters_data['lcasemasking'] == 'True':
        blastcmd += " lcasemasking"
    print blastcmd
    #run blastn  
    p = Popen(blastcmd, stdout=PIPE, stderr=PIPE,shell=True)
    stdout, stderr = p.communicate()
          
    print "blast error:",stderr
    if p.returncode and stderr !='':
        return {'error':stderr}
    else:
        #transform the result

        outfmtfileReturn = blastformat(timestr,parameters_data,temppath,staticpath,ncbibase,'tblastn')
        xmlresult = parseXML(outfmtfileReturn['xml'][2],queryids)
        print 'returning result...'


        return {'outfmtfileReturn':outfmtfileReturn, 'xmlresult':xmlresult, 'error':''}

