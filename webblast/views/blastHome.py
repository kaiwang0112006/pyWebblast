# -*- coding: utf-8 -*- 
from pyramid.view import notfound_view_config, view_config
from pyramid.response import Response
from BaseFunction import *
import os

@view_config(route_name='blastnHome',renderer='webcontent/blastn.html')
@view_config(route_name='blastnDemo',renderer='webcontent/blastnDemo.html')
@view_config(route_name='tblastnHome',renderer='webcontent/tblastn.html')
@view_config(route_name='tblastxHome',renderer='webcontent/tblastx.html')
def nuclearHome(request):
    blastdbconf = request.registry['nucleotidedb']
    return {'dbname':blastdbconf.keys()}

@view_config(route_name='blastxHome',renderer='webcontent/blastx.html')
@view_config(route_name='blastpHome',renderer='webcontent/blastp.html')
def proteinHome(request):
    blastdbconf = request.registry['proteindb']
    return {'dbname':blastdbconf.keys()}   