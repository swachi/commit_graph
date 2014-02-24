Who is the audience? (e.g. project manager, contributor, project user, visitor, etc.)
What data have been used? How can you get the data using the GitHub API? (Note that it can be the combination of multiple queries and their processing).
Those visualizations are updated over time. What happens if suddenly a contributor pushes many commits in a short time interval? How would you address this particular issue?

Contributors

Audience:

Visitors are the main audience - the visitor can get an idea about the overall activity of the entire project by the frequency of the commits over time, as well as the level of involvement by the individual contributors.

Data used:

What will happen if a contributor pushes many commits in short time interval:

A spike in the graph will increase the y-axis range, flattening the features of other commits.  One way to solve this is to use log scale, so the rest of the commit patterns with the lower frequencies can be visible.


Commits

Audience:

As with the "Contributors" page, visitors are the main audience here, allowing the exact number of commits during certain time period (binned days by histogram, commits on a particular day on line plot).

Data used:

What will happen if a contributor pushes many commits in short time interval:

As with the Contributors, a spike in the graph will increase the y-axis range, obscuring the smaller features.  As with the solution above, log scale will help.


Code Frequency

Audience:

Both project manager and visitors will benefit from this graph.  The amount of added/deleted code will show both the magnitude of the change and how much of the existing code has been replaced versus how much code was added.


Data used:

What will happen if a contributor pushes many commits in short time interval:

As with the Contributors, a spike in the graph will increase the y-axis range, obscuring the smaller features.  As with the solution above, log scale will help.



Punch Card:

This view is more useful for the project manager and contributor - it shows the working patterns of the team.


What will happen if a contributor pushes many commits in short time interval:

A concentrated spot on the punchcard will have much larger dots than others.  One way of solving this is to have the median commits for that time period of that week to have a more robust indicator of the pattern of activities.


==================

Network graph:


Audience:

The view is mainly for the manager and contributors, allowing the developers to see the history of features being added and branches being developed at the time.

Data Used:


What will happen...:
A concentrated commit by a single persion will have a local effect on the network graph, where the rows of that user will have many consecutive dots.  This will elongate that particular day to an extent all other contributer for that particular day to look sparse.

The segment will look monotonous with many commits in a row
normal day
-o--o-
---o--
-o----
busy day
-o-----------o-
-o-o-o-o-o-o-o-

One solution is to collapse consecutive commits witout another contributor into a single node with a number of commits made, e.g,

-o---o-
--o:7---

There will be a need to make the collapsed node to expand in order to allow the user to access the individual commits. User should be able to expand by clicking on the collapsed node (and also allow the user to collapse again).


The role of interaction for this visualization is to allow the user to access the individual commits by clicking on the nodes.  This will allow the user to look at what has been changed in that commit.

Static graph would have been sufficient, with link into static elements of the visualization.  The network visualization will need to be paginated, with the link/buttons to redraw the new segments of the graph.  The user will likely to be less engaged with the data, however.

If many new developers join and commit, there will be many merges, increasing the height of the graph, possibly overwhelming the rest of the graph.  Again, collapsing an overly complicated/large section of the graph into a single specialized node (perhaps based on the vertial size of that segment of the graph) will clean up the graph.

-o-
-o-
-o-
-o-

to

-o[merge:4]-









