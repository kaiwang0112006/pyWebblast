from Bio.Blast import NCBIXML
from BaseFunction import *

def parseXML(xmlfile,queryids):
    xmlresult = {}
    for q in queryids:
        xmlresult[q[0]] = [q[1]]    
    blast_xml = open(xmlfile)
    '''Parse BLAST XML output'''
    id_filter = 0
    blast_record = NCBIXML.parse(blast_xml)

    for hit in blast_record:
        aligndata = []
        for alignment in hit.alignments:
            hsps = []
            position = []
            stateData = {'score':[]}
            for hsp in alignment.hsps:
                if (hsp.identities/float(hsp.align_length) >= id_filter):
                    position.append(int(hsp.query_start))
                    position.append(int(hsp.query_end))
                    hit_id = alignment.hit_id
                    hit_name = alignment.hit_def
                    strand = []
                    stateData['score'].append(hsp.score)

                    if hsp.query_start < hsp.query_end:
                        strand.append('+')
                    else:
                        strand.append('-')
                        
                    if hsp.sbjct_start < hsp.sbjct_end:
                        strand.append('+')
                    else:
                        strand.append('-')
                        
                    matchstr = generateSeqalign(hsp,strand,60)
                        
                    align=dict(hit_id = hit_id,
                               hit_name = hit_name,
                               hit_start = hsp.sbjct_start,
                               hit_stop = hsp.sbjct_end,
                               query_start = hsp.query_start,
                               query_stop = hsp.query_end,
                               align_lenght = hsp.align_length,
                               identities = hsp.identities,
                               identity_percent = hsp.identities/float(hsp.align_length)*100,
                               positives = hsp.positives,
                               similarity_percent = hsp.positives/float(hsp.align_length)*100,
                               gaps = hsp.gaps,
                               gaps_percent = hsp.gaps/float(hsp.align_length)*100,
                               queryCoverage = abs(float(hsp.query_end-hsp.query_start))/float(xmlresult[hit.query][0])*100,
                               strand = strand,
                               evalue = hsp.expect,
                               blast_score = hsp.score,
                               query_seq = hsp.query,
                               match_seq = hsp.match,
                               hit_seq = hsp.sbjct,
                               aligns = hsp.num_alignments,
                               matchstr = matchstr,
                               other = dir(hsp))
                    hsps.append(align)
            position.sort()
            aligndata.append(dict(hsps=hsps,
                                   qstart = position[0],
                                   qend = position[-1],
                                   hit_def = alignment.hit_def,
                                   hit_id = alignment.hit_id,
                                   length = alignment.length,
                                   title = alignment.title,
                                   max_score=max(stateData['score']),
                                   total_score = sum(stateData['score'])))

        xmlresult[hit.query].append(aligndata)
        #matchstr = generateSeqalign(hsp,strand,59)
        #print matchstr

    return xmlresult

def generateSeqalign(hsp,strand,linelenghth):
    qstart = hsp.query_start

    tstart = hsp.sbjct_start

     
    matchstr = ''
    start = 0
    stepdict = {"+":1,"-":-1}

    while start < hsp.align_length:
        hspmatch = jedgeStr(hsp.match)
        hspquery = jedgeStr(hsp.query)
        hspsbjct = jedgeStr(hsp.sbjct)
        qend = qstart
        tend = tstart
        for i in range(linelenghth):
            try:
                if hspquery[start+i]!='-' and hspsbjct[start+i]!='-' :
                    qend = qend + stepdict[strand[0]]
                    tend = tend + stepdict[strand[1]]
            except:
                break
        matchstr += "Query\t%d\t%s\t%d\n" % (qstart,hspquery[int(start):int(start+linelenghth)],qend+stepdict[strand[0]]*(-1))
        matchstr += "     \t \t%s\n" % (hspmatch[start:start+linelenghth])
        matchstr += "Subject\t%d\t%s\t%d\n" % (tstart,hspsbjct[int(start):int(start+linelenghth)],tend+stepdict[strand[1]]*(-1))
        matchstr +='\n'
        start = start + linelenghth
        qstart = qend
        tstart = tend

    return matchstr
        