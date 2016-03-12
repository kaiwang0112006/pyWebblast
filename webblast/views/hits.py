# -*- coding: utf-8 -*- 
from pyramid.view import notfound_view_config, view_config
from pyramid.response import Response
from BaseFunction import *
import os
from subprocess import Popen, PIPE


@view_config(route_name='fetchhits',renderer='json')
def fetchhits(request):
    parameters_data = request.json_body
    settings = request.registry.settings
    conf = settings['otheroptions']
    temppath = conf.get('temp_path','temppath')
    staticpath = conf.get('temp_path','staticpath')
    ncbibase = conf.get('ncbi','basepath')
    blastdbconf = request.registry['nucleotidedb']
    blastdbconf.update(request.registry['proteindb'])
    
    db = os.path.join(blastdbconf[parameters_data['DB']][0], blastdbconf[parameters_data['DB']][1])
    outhit = os.path.join(temppath, 'hits.fa')
    blastcmd = "%sblastdbcmd -db %s -entry '%s'" % (ncbibase, db, parameters_data['hitStr'])
    print blastcmd
    #run cmd
    p = Popen(blastcmd, stdout=PIPE, stderr=PIPE,shell=True)
    stdout, stderr = p.communicate()
          
    print "blastdbcmd error:",stderr
    if p.returncode and stderr !='':
        return {'error':stderr}
    else:   
        return {'error':'','fastaStr':stdout}