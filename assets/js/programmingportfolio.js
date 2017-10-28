(function() {
    const $GridRow = $("<div class='grid no-gutters'>")
    const GridItem = ({ html_url, name, description }) => `
        <div class='unit one-third'>
          <div class='project'>
            <h4 class='project-title'><a href='${html_url}'>${name}</a></h4>
            <p>${description}</p>
          </div>
        </div>
    `

    function addRepos(repos, page) {
        repos = repos || []
        page = page || 1

        var uri = "https://api.github.com/users/jcuenod/repos?" +
			"per_page=100&" +
			"page=" + page
        function replaceJSON(repos) {
            $(function() {
                $("#num-repos").text(repos.length)

                // Convert pushed_at to Date.
                $.each(repos, function(i, repo) {
                    repo.pushed_at = new Date(repo.pushed_at)

                    var weekHalfLife = 1.146 * Math.pow(10, -9)

                    var pushDelta = (new Date()) - Date.parse(repo.pushed_at)
                    var createdDelta = (new Date()) - Date.parse(repo.created_at)

                    var weightForPush = 1
                    var weightForWatchers = 1.314 * Math.pow(10, 7)

                    repo.hotness = weightForPush * Math.pow(Math.E, -1 * weekHalfLife * pushDelta)
                    repo.hotness += weightForWatchers * repo.watchers / createdDelta
                })

                // Sort by highest # of watchers.
                repos.sort(function(a, b) {
                    if (a.hotness < b.hotness) return 1
                    if (b.hotness < a.hotness) return -1
                    return 0
                })

                let $currentRow = $GridRow.clone()
                let insertCount = 0
                $.each(repos, function(counter, repo) {
                    if (insertCount > 1 && insertCount % 3 == 0) {
                        $currentRow.appendTo(".projects")
                        $currentRow = $GridRow.clone()
                    }
                    if (repo.description && repo.name && repo.html_url)
                    {
                        $currentRow.append($(GridItem(repo)))
                        insertCount++
                    }
                })
                $currentRow.appendTo(".projects")
            })
        }
		$.getJSON(uri, function (gitdata) {
		    if (gitdata && gitdata.length > 0) {
	            replaceJSON(gitdata)
			}
        })
    }
    addRepos()
    function addStackOverflowRep() {
        var uri = "https://api.stackexchange.com/2.2/users/123415?site=stackoverflow"
        $.getJSON(uri, function (result) {
            $(".sorep .reputation").text(result.items[0].reputation.toLocaleString())
            $(".sorep .gold").text(result.items[0].badge_counts.gold)
            $(".sorep .silver").text(result.items[0].badge_counts.silver)
            $(".sorep .bronze").text(result.items[0].badge_counts.bronze)
        })
    }
    addStackOverflowRep()
})()
