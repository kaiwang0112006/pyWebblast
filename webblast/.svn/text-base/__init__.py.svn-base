# -*- coding: utf-8 -*- 
#import pymysql
import pyramid_beaker
from pyramid.config import Configurator
from pyramid.events import NewRequest
import url
import ConfigParser
from pyramid.events import BeforeRender
from beaker.cache import CacheManager
from beaker.util import parse_cache_config_options
import pyramid_mako

def main(global_config, **settings):
    """ This function returns a Pyramid WSGI application.
    """
    conf = ConfigParser.ConfigParser()
    conf.read('otheroptions.ini')
    settings['otheroptions'] = conf

    config = Configurator(settings=settings)
    config.include('pyramid_mako')
    config.add_static_view('static', 'webblast:static', cache_max_age=3600)
    
    #setup blast db
    conf = ConfigParser.ConfigParser()
    nucleotidedbconf = {}
    proteindbconf = {}
    conf.read('blastdb.ini')
    secs = conf.sections()
    for sec in secs:
        try:
            dbpath = conf.get(sec, "dbpath")
            dbname = conf.get(sec,"dbname")
            if conf.get(sec,"dbtype") == 'nucleotide':
                nucleotidedbconf[sec] = (dbpath, dbname)
            elif conf.get(sec,"dbtype") == 'protein':
                proteindbconf[sec] = (dbpath, dbname)
        except:
            pass
                
    config.registry['nucleotidedb'] = nucleotidedbconf 
    config.registry['proteindb'] = proteindbconf 


    # set session factory and cache
    pyramid_beaker.set_cache_regions_from_settings (settings)
    session_factory = pyramid_beaker.session_factory_from_settings (settings)
    config.set_session_factory (session_factory)
    pyramid_beaker.set_cache_regions_from_settings (settings)

    config.add_mako_renderer('.html')
    url.add_adview(config)
    config.scan()
    return config.make_wsgi_app()
