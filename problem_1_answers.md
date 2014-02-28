# Problem 1: Understanding GitHub Data

### Contributors

__1. Who is the audience? (e.g. project manager, contributor, project user, visitor, etc.)__

Visitors are the main audience - the visitor can get an idea about the overall activity of the entire project by the frequency of the commits over time, as well as the level of involvement by the individual contributors.

__2. What data have been used? How can you get the data using the GitHub API? (Note that it can be the combination of multiple queries and their processing).__

Repositories/Collaborators data is used to get all the users. Stats for commit counts.

GitHub API: <pre>
GET /repos/:owner/:repo/collaborators
GET /repos/:owner/:repo/stats/contributors
</pre>

__3. Those visualizations are updated over time. What happens if suddenly a contributor pushes many commits in a short time interval? How would you address this particular issue?__

A spike in the graph will increase the y-axis range, flattening the features of other commits.  One way to solve this is to use log scale, so the rest of the commit patterns with the lower frequencies can be visible.


### Commits

__1. Who is the audience?__

As with the "Contributors" page, visitors are the main audience here, allowing the exact number of commits during certain time period (binned days by histogram, commits on a particular day on line plot).

__2. What data have been used?__

Contributors and commit activity stats were used to draw the activities.

<pre>
GET /repos/:owner/:repo/stats/contributors
GET /repos/:owner/:repo/stats/commit_activity
GET /repos/:owner/:repo/stats/participation
</pre>


__3. What happens if suddenly a contributor pushes many commits in a short time interval?__

As with the Contributors, a spike in the graph will increase the y-axis range, obscuring the smaller features.  As with the solution above, log scale will help.


### Code Frequency

__1. Who is the audience?__

Both project manager and visitors will benefit from this graph.  The amount of added/deleted code will show both the magnitude of the change and how much of the existing code has been replaced versus how much code was added.

__2. What data have been used?__

There is a code frequency data from stats API.
<pre>
GET /repos/:owner/:repo/stats/code_frequency
</pre>

__3. What happens if suddenly a contributor pushes many commits in a short time interval?__

As with the Contributors and Commits, a spike in the graph will increase the y-axis range, obscuring the smaller features.  As with the solution above, log scale will help.


### Punch Card

__1. Who is the audience?__

This view is more useful for the project manager and contributor - it shows the working patterns of the team.

__2. What data have been used?__

There is a summary statistics of commit numbers for days and hours of a week.

<pre>
GET /repos/:owner/:repo/stats/punch_card
</pre>

__3. What happens if suddenly a contributor pushes many commits in a short time interval?__

A concentrated spot on the punchcard will have much larger dots than others.  One way of solving this is to have the median commits for that time period of that week to have a more robust indicator of the pattern of activities.


### Network graph


__1. Who is the audience?__

The view is mainly for the manager and contributors, allowing the developers to see the history of features being added and branches being developed at the time.

__2. What data have been used?__

Commits by branch gives detailed information about each branches' commit activity, as well as individual commits' parent commits.

<pre>
GET /repos/:owner/:repo/commits
</pre>


__3. What happens if suddenly a contributor pushes many commits in a short time interval?__

A concentrated commit by a single persion will have a local effect on the network graph, where the rows of that user will have many consecutive dots.  This will elongate that particular day to an extent all other contributer for that particular day to look sparse.

The segment will look monotonous with many commits in a row
<pre>
normal day
-o--o-
---o--
-o----
busy day
-o-----------o-
-o-o-o-o-o-o-o-
</pre>
One solution is to collapse consecutive commits witout another contributor into a single node with a number of commits made, e.g,
<pre>
-o---o-
--o:7---
</pre>

There will be a need to make the collapsed node to expand in order to allow the user to access the individual commits. User should be able to expand by clicking on the collapsed node (and also allow the user to collapse again).


__4. What is the role of interaction for this visualization? Would a static graph have been sufficient?__

The role of interaction for this visualization is to allow the user to access the individual commits by clicking on the nodes.  This will allow the user to look at what has been changed in that commit.

Static graph would have been sufficient, with link into static elements of the visualization.  The network visualization will need to be paginated, with the link/buttons to redraw the new segments of the graph.  The user will likely to be less engaged with the data, however.

__5. What happens if many new developers suddenly join the project and push commits for the first time? How would you preserve the graph's readability in such a situation?__

If many new developers join and commit, there will be many merges, increasing the height of the graph, possibly overwhelming the rest of the graph.  

Again, collapsing an overly complicated/large section of the graph into a single specialized node (perhaps based on the vertial size of that segment of the graph) will clean up the graph.

<pre>
-o-\
----o-\
-------o-\
----------o------

to

-o[merge:4]-
</pre>

