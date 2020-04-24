
function toolItem(tool_information){

	/* Probably should look into a frontend templating system, i.e. moustache.
	   Otherwise, upgrade hosting to allow server-side programming */

	var entry = '' // String that reprsents markup of individual tool


	//  Tool Title ========================================================
	entry += '<div class="tool-container">'
	entry += '<div class="tool">' +
			 '<h4 id="' + tool_information["name"] + '" class="panel-title">' +
			 '<a data-toggle="collapse" class="accordion-toggle collapsed" href="#' + tool_information["name"] + '_c">' + tool_information["name"] + "<span>";

	// Loop through title badges -------------

	// panel_shields = {
	// 	"Bioc": ["years", "downloads"],
	// 	"CRAN": ["version", "downloads"],
	// 	"PyPI": ["version", "python", "status"]
	// }

	// $.each(panel_shields, function(folder, shields){

	// 	svg_name = folder.toLowerCase();
	// 	repo_name = tool_information[svg_name];

	// 	if (typeof tool_information[svg_name] !== 'undefined') {
	// 		$.each(shields, function(index, shield){
	// 			entry += ' <img border="0" height="15" src="img/shields/' + folder + '/' + repo_name + '_' + shield + '.svg">'
	// 		})
	// 	}
	// })

	if (typeof tool_information["bioc"] !== 'undefined') {
		entry += ' <img border="0" height="15" src="http://bioconductor.org/shields/years-in-bioc/' + tool_information["bioc"] + '.svg">' +
				 ' <img border="0" height="15" src="http://bioconductor.org/shields/downloads/release/' + tool_information["bioc"] + '.svg">'
	  }

	  if (typeof tool_information["cran"] !== 'undefined') {
		entry += ' <img border="0" height="15" src="http://www.r-pkg.org/badges/version/' + tool_information["cran"] + '">' +
				 ' <img border="0" height="15" src="http://cranlogs.r-pkg.org/badges/grand-total/' + tool_information["cran"] + '">'
	  }

	  if (typeof tool_information["pypi"] !== 'undefined') {
		entry += ' <img border="0" height="15" src="https://img.shields.io/pypi/v/' + tool_information["pypi"] + '.svg">' +
				 ' <img border="0" height="15" src="https://img.shields.io/pypi/pyversions/' + tool_information["pypi"] + '.svg">' +
				 ' <img border="0" height="15" src="https://img.shields.io/pypi/status/' + tool_information["pypi"] + '.svg">'
	  }

	// Close --------------------------------

	entry += '</span></a></h4></div>';


	//  Tool Panel ========================================================


	entry += '<div id="' + tool_information["name"] + '_c" class="panel-collapse collapse">' +
			 '<ul class="list-group">' +
			 '<li class="list-group-item">' + tool_information["description"] + '</li>';



	if (tool_information["totalRefs"] > 0) {

		// Heading --------------------------

		entry += 	'<div class="panel-heading">' +
					'<p id="' + tool_information["name"] + '_pubs" class="panel-title subtitle">' +
					'<a data-toggle="collapse" class="accordion-toggle collapsed" href="#' + tool_information["name"] + '_pubs_c">' +
					'<strong>Publications:</strong> ' + tool_information["nPubs"] + ', ' +
					'<strong>Preprints:</strong> ' + tool_information["nPres"] + ', ' +
					'<strong>Total citations:</strong> ' + tool_information["citations"] +
					'</a></h4></div>';


		// Loop through Publications and/or pre-prints

		entry += '<div id="' + tool_information["name"] + '_pubs_c" class="panel-collapse collapse">' +
				 '<ul class="list-group">';

		published_set = {}

		if (tool_information["nPubs"] > 0) {
			published_set.Publications = tool_information["pubs"]
		}

		if (tool_information["nPres"] > 0) {
			published_set.Preprints = tool_information["pres"]
		}

		$.each(published_set, function(published_key, published_list){

			entry += '<li class="list-group-item list-title"><h5>' + published_key + '</h5></li>'

			// Loop through publications
			$.each(published_list, function(index, publication){

				entry += '<li class="list-group-item"><em>"' + publication.Title + '"</em><br/>';

				if (publication.DOI.includes('arxiv')) {
					var id = publication.DOI.replace("arxiv/", "")
					entry += '<strong>arXiv: </strong> <a href="https://arxiv.org/abs/' + id + '">' + id + '</a>' + ', ';
				} else {
					entry += '<strong>DOI: </strong> <a href="https://doi.org/' + publication.DOI + '">' + publication.DOI + '</a>' + ', ';
				}

				if(published_key == "Publications"){entry += '<strong>Published: </strong>' + publication.Date + ', '}

				if (typeof publication.Citations !== 'undefined') {
					entry += '<strong>Citations: </strong> ' + publication.Citations;
				}

				entry += '</li>';

			})

		})

		entry += '</ul></div>'
	}

	entry += '<li class="list-group-item"><strong>Platform: </strong> ' + tool_information["platform"] + '</li>';

	if (typeof tool_information["code"] !== 'undefined') {
		entry += '<li class="list-group-item"><strong>Code: </strong> <a class="codebase_url" href="' + tool_information["code"] + '">' + tool_information["code"] + '</a>';
		if (typeof tool_information["github"] !== 'undefined') {
		  var github_clean = tool_information["github"].replace("/", "_")

		  entry += '<div class="github-shields"><div class="github-badge stars"><span>stars</span><span class="blue">N/A</span></div>';
		  entry += '<div class="github-badge forks"><span>forks</span><span class="blue">N/A</span></div>';
		  entry += '<div class="github-badge commits"><span>last commit</span><span class="green">Unknown</span></div></div>';

		}
		entry += '</li>'
	}
	if (typeof tool_information["license"] !== 'undefined') {
	  entry += '<li class="list-group-item"><strong>License: </strong> ' + tool_information["license"] + '</li>';
	}

	entry += '<li class="list-group-item"><strong>Categories: </strong> ' + linkCats(tool_information["cats"]) + '</li>' +
			 '<li class="list-group-item">' +
			 '<strong>Added: </strong> ' + tool_information["added"] + ', ' +
			 '<strong>Updated: </strong>' + tool_information["updated"] +
			 '</li></ul></div></div>';


	return(entry)

}
