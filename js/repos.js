$(document).ready(function() {

jQuery.ajax({
  dataType: "json",
  url: "https://api.github.com/orgs/flightstats/repos",
  success: function(data) {

  	var publishedRepos = _.compact(_.map(data, function(item) {
  		if (!item.homepage) {
  			return null;
  		}

  		return {
  			name:item.name,
  			description:item.description,
  			link:item.html_url,
  			stars:item.watchers,
  			forks:item.forks,
  			language:item.language,
  			issues:item.open_issues_count,
  			updated:item.updated_at
  		};

  	}));

  	var template = $("#repo-template").html();
  	var parentContainer = $(".repos");

  	_.each(publishedRepos, function(repo, i) {
  		parentContainer.append(template.replace("{{REPO-INDEX}}", i));

  		var repoElement = $("#repo-" + i);

  		repoElement.find(".view-link a").attr("href", repo.link);
  		repoElement.find(".repo-name").html(repo.name);
  		repoElement.find(".repo-description").html(repo.description);
  		repoElement.find(".repo-language").html(repo.language);
  	});

  }
});

});