/*
	Prologue by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

    skel.breakpoints({
        wide: '(min-width: 961px) and (max-width: 1880px)',
        normal: '(min-width: 961px) and (max-width: 1620px)',
        narrow: '(min-width: 961px) and (max-width: 1320px)',
        narrower: '(max-width: 960px)',
        mobile: '(max-width: 736px)'
    });

    $(function() {

        var $window = $(window),
            $body = $('body');

        // Disable animations/transitions until the page has loaded.
        $body.addClass('is-loading');

        $window.on('load', function() {
            $body.removeClass('is-loading');
        });

        // CSS polyfills (IE<9).
        if (skel.vars.IEVersion < 9)
            $(':last-child').addClass('last-child');

        // Fix: Placeholder polyfill.
        $('form').placeholder();

        // Prioritize "important" elements on mobile.
        skel.on('+mobile -mobile', function() {
            $.prioritize(
                '.important\\28 mobile\\29',
                skel.breakpoint('mobile').active
            );
        });

        // Scrolly links.
        $('.scrolly').scrolly();

        // Nav.
        var $nav_a = $('#nav a');

        // Scrolly-fy links.
        $nav_a
            .scrolly()
            .on('click', function(e) {

                var t = $(this),
                    href = t.attr('href');

                if (href[0] != '#')
                    return;

                e.preventDefault();

                // Clear active and lock scrollzer until scrolling has stopped
                $nav_a
                    .removeClass('active')
                    .addClass('scrollzer-locked');

                // Set this link to active
                t.addClass('active');

            });

        // Initialize scrollzer.
        var ids = [];

        $nav_a.each(function() {

            var href = $(this).attr('href');

            if (href[0] != '#')
                return;

            ids.push(href.substring(1));

        });

        $.scrollzer(ids, {
            pad: 200,
            lastHack: true
        });

        // Header (narrower + mobile).

        // Toggle.
        $(
                '<div id="headerToggle">' +
                '<a href="#header" class="toggle"></a>' +
                '</div>'
            )
            .appendTo($body);

        // Header.
        $('#header')
            .panel({
                delay: 500,
                hideOnClick: true,
                hideOnSwipe: true,
                resetScroll: true,
                resetForms: true,
                side: 'left',
                target: $body,
                visibleClass: 'header-visible'
            });

        // Fix: Remove transitions on WP<10 (poor/buggy performance).
        if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
            $('#headerToggle, #header, #main')
            .css('transition', 'none');

    });

})(jQuery);



(function($, undefined) {

    // Put custom repo URL's in this object, keyed by repo name.
    var repoUrls = {
        "bootstrap": "http://twitter.github.com/bootstrap/",
        "finagle": "http://twitter.github.com/finagle/",
        "hogan.js": "http://twitter.github.com/hogan.js/"
    };

    function repoUrl(repo) {
        return repoUrls[repo.name] || repo.html_url;
    }

    // Put custom repo descriptions in this object, keyed by repo name.
    var repoDescriptions = {
        "bootstrap": "An HTML, CSS, and JS toolkit designed to kickstart development of webapps and sites",
        "naggati2": "A protocol builder for Netty using Scala 2.8"
    };

    function repoDescription(repo) {
        return repoDescriptions[repo.name] || repo.description;
    }
    function shortenedRepoDescription(repo) {
        var shortDescriptionLength = 100;
        var repoDesc = repoDescription(repo);
        return repoDesc.length < shortDescriptionLength ? repoDesc : $.trim(repoDescription(repo)).substring(0, shortDescriptionLength).split(" ").slice(0, -1).join(" ") + "...";
    }


    /*function addRecentlyUpdatedRepo(repo) {
        var $item = $("<li>");

        var $name = $("<a>").attr("href", repo.html_url).text(repo.name);
        $item.append($("<span>").addClass("name").append($name));

        var $time = $("<a>").attr("href", repo.html_url + "/commits").text(strftime("%h %e, %Y", repo.pushed_at));
        $item.append($("<span>").addClass("time").append($time));

        $item.append('<span class="bullet">&sdot;</span>');

        var $watchers = $("<a>").attr("href", repo.html_url + "/watchers").text(repo.watchers + " stargazers");
        $item.append($("<span>").addClass("watchers").append($watchers));

        $item.append('<span class="bullet">&sdot;</span>');

        var $forks = $("<a>").attr("href", repo.html_url + "/network").text(repo.forks + " forks");
        $item.append($("<span>").addClass("forks").append($forks));

        $item.appendTo("#recently-updated-repos");
    }*/

    function addRepo(repo) {
        var $item = $("<li>").addClass("repo " + (repo.language || '').toLowerCase());
        var $link = $("<a>").attr("href", repoUrl(repo)).appendTo($item);
        $link.append($("<p>").text(repo.name).attr("data-description", shortenedRepoDescription(repo)));
        $item.appendTo("#repos");
    }

    function addRepos(repos, page) {
        repos = repos || [];
        page = page || 1;

        var uri = "https://api.github.com/users/jcuenod/repos?" +
			"per_page=100&" +
			"page=" + page;
        function replaceJSON(repos) {
                $(function() {
                    $("#num-repos").text(repos.length);

                    // Convert pushed_at to Date.
                    $.each(repos, function(i, repo) {
                        repo.pushed_at = new Date(repo.pushed_at);

                        var weekHalfLife = 1.146 * Math.pow(10, -9);

                        var pushDelta = (new Date()) - Date.parse(repo.pushed_at);
                        var createdDelta = (new Date()) - Date.parse(repo.created_at);

                        var weightForPush = 1;
                        var weightForWatchers = 1.314 * Math.pow(10, 7);

                        repo.hotness = weightForPush * Math.pow(Math.E, -1 * weekHalfLife * pushDelta);
                        repo.hotness += weightForWatchers * repo.watchers / createdDelta;
                    });

                    // Sort by highest # of watchers.
                    repos.sort(function(a, b) {
                        if (a.hotness < b.hotness) return 1;
                        if (b.hotness < a.hotness) return -1;
                        return 0;
                    });

                    $.each(repos, function(i, repo) {
                        addRepo(repo);
                    });

                    // Sort by most-recently pushed to.
                    repos.sort(function(a, b) {
                        if (a.pushed_at < b.pushed_at) return 1;
                        if (b.pushed_at < a.pushed_at) return -1;
                        return 0;
                    });

                    // $.each(repos.slice(0, 3), function(i, repo) {
                    //     addRecentlyUpdatedRepo(repo);
                    // });
                });
            // }
        } //);
		$.getJSON(uri, function (gitdata) {
		    if (gitdata && gitdata.length > 0) {
	            replaceJSON(gitdata);
			}
        });
    }
    addRepos();
    function addStackOverflowRep() {
        var uri = "https://api.stackexchange.com/2.2/users/123415?site=stackoverflow";
        $.getJSON(uri, function (result) {
            $(".sorep .reputation").text(result.items[0].reputation.toLocaleString());
            $(".sorep .gold").text(result.items[0].badge_counts.gold);
            $(".sorep .silver").text(result.items[0].badge_counts.silver);
            $(".sorep .bronze").text(result.items[0].badge_counts.bronze);
        });
    }
    addStackOverflowRep();
})(jQuery);
