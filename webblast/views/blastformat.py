from subprocess import Popen, PIPE
import os

def blastformat(timestr,parameters_data,temppath,staticpath,ncbibase,blasttype='blastn'):
    outname = timestr + '_' + parameters_data['jobtitle'] + '_'+ blasttype + '.out'
    out11 = os.path.join(temppath, outname)
    outfmtdict = {'5':'xml','6':'tabular','17':'sam','0':'text'}
    outfmtfileReturn = {'xml':['XML'],'tabular':['Table'],'sam':['SAM'],'text':['Text']}
    for fmt in outfmtdict:
        outfmtfilename = timestr + '_' + parameters_data['jobtitle'] + '_' + blasttype +'.' + outfmtdict[fmt]
        outfmtfile = os.path.join(temppath, outfmtfilename)
        cmd = "%sblast_formatter -archive %s -outfmt %s -out %s" % (ncbibase, out11, fmt, outfmtfile)
        print cmd
        p = Popen(cmd, stdout=PIPE, stderr=PIPE,shell=True)
        stdout, stderr = p.communicate()
        print "blast_formatter error:",stderr
        if stderr == '':
            outfmtfileReturn[outfmtdict[fmt]].append(os.path.join(staticpath, outfmtfilename))
            if fmt == '5':
                outfmtfileReturn[outfmtdict[fmt]].append(outfmtfile)
        else:
            outfmtfileReturn[outfmtdict[fmt]].append('')
            #return {'error':stderr}
    
    outfmtfileReturn['asn'] = ['BLAST archive (ASN.1)',os.path.join(staticpath, outname)]
    
    return outfmtfileReturn