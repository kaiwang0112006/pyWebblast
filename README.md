# pyWebblast
pyWebblast is a project that I started to setup a local web interface for blast. Currently, it's built on the top of [Pyramid](http://www.pylonsproject.org). It's still need professional opinion to make it better


Requirements
---------
* [Pyramid](http://www.pylonsproject.org) (>=1.5.7)
* [Biopython](http://biopython.org/DIST/docs/install/Installation.html) (1.66 is tested)

Setup and start server
---------

### How to setup a pyramid server

After installed Pyramid successfully, one can go to the webblast path and to follows:

    $ cd /path/of/webblast
    $ python setup.py develop
    
Then edit development.ini and setup the host and port:

    [server:main]
    use = egg:waitress#main
    host = localhost
    port = 6543
 
Now start the server by:

    $ pserve development.ini
    
### How to use Pyramid server in Apache

To do that, [mod_wsgi](https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/modwsgi/) is needed.

Create a apache conf file:

	# Use only 1 Python sub-interpreter.  Multiple sub-interpreters
	# play badly with C extensions.  See
	# http://stackoverflow.com/a/10558360/209039
	WSGISocketPrefix /var/run/wsgi
	<VirtualHost *:80>
	WSGIApplicationGroup %{GLOBAL}
	WSGIPassAuthorization On
	WSGIDaemonProcess root threads=4 \
	   python-path=/opt/python27/lib/python2.7/site-packages
	WSGIScriptAlias / /var/www/html/webblast/pyramid.wsgi
	
	
	
	<Directory /var/www/html/webblast>
	  WSGIProcessGroup root
	  Order allow,deny
	  Allow from all
	</Directory>
	</VirtualHost>
	
and a wsgi file:

	from pyramid.paster import get_app, setup_logging
	import os
	ini_path = '/var/www/html/webblast/development.ini'
	os.chdir('/var/www/html/webblast')
	setup_logging(ini_path)
	application = get_app(ini_path, 'main')
	
include the new apache conf file in apache main conf file, for example in my PC, it is: /etc/httpd/conf/httpd.conf. And restart the apache server.

Setup local blast database
---------

NCBI blast+ tools can formate database using:

    $ makeblastdb -dbtype <db type> -title <db title> -in <db> -parse_seqids
    
-parse_seqids is required to generate links for downloading search hits

Then add the database to blastdb.ini in webblast:

	[Fagopyrum tataricum nucleotide]
	dbpath = /Users/wangkai/blastprepare/blastdb/ftn
	dbname = PBJellyAfterMatePair.fasta
	dbtype = nucleotide
	
	[Fagopyrum tataricum protein]
	dbpath = /Users/wangkai/blastprepare/blastdb/ft_p
	dbname = FagopyrumProtein
	dbtype = protein
	
Setup path of ncbi blast+
---------

After install ncbi blast+, setup the path in otheroptions.ini:

	[ncbi]
	basepath = /usr/local/ncbi/blast/bin/

Temporary demo link
---------

[link](http://123.57.33.46:8080/blastn/Demo)

Newest screenshot
---------

### How to query 

#### Querypage:

<p align="center">
  <img src="https://github.com/kaiwang0112006/pyWebblast/blob/master/webblast/static/images/readme/query.png?raw=true" alt="How to query"/>
</p>

#### Result plot:

<p align="center">
  <img src="https://github.com/kaiwang0112006/pyWebblast/blob/master/webblast/static/images/readme/plot.png?raw=true" alt="How to query"/>
</p>

#### Result table:

<p align="center">
  <img src="https://github.com/kaiwang0112006/pyWebblast/blob/master/webblast/static/images/readme/table.png?raw=true" alt="How to query"/>
</p>

#### Result detail:

<p align="center">
  <img src="https://github.com/kaiwang0112006/pyWebblast/blob/master/webblast/static/images/readme/detail.png?raw=true" alt="How to query"/>
</p>
