# -*- coding: utf-8 -*- 
from pyramid.view import notfound_view_config, view_config
from pyramid.response import Response
 
@view_config(route_name='home',renderer='webcontent/home.html')
@view_config(route_name='home_slash',renderer='webcontent/home.html')
def home(request):
    return {}