Explanations of Technical Choices:


Aim:
The sketch originally proposed for "LOC-node" representation, where the user will be presented with the additional information of Line-of-code changes (the addition and deletion of lines) for each of the commits.  The design called for two side-by-side bar graph above each commit nodes, where the user can gain the following information:

1. How much code did the commit change (total magnitude)?
2. How much features were added/deleted (difference between the two bar lengths)

Implementation details:

In order to obtain the LOC information, additional API calls to individual commits were required.  After the branch/commit information was loaded, the detailed information for each unique commit was retrieved and its "stats" field was extracted and added to the node data.  The caveat here is that the retrieval needs to the server as many times as the number of commits displayed and makes the initial load less responsive.

Because of limited space in which the bars can be displayed, the height had to be controlled - I have chosen to use log transformation to limit the height of large changes.

The original sketch included collapsing and expanding the serial nodes, but I've found that this is an additional complication which will not give too much information for the effort, and was not considered for implementation.

Weakness:

This LOC-node implementation may not be "flashy" as changes in node layout, and it may be a bit busy for some. However, I assume that users already familiar with the GitHub Network display and LOC change graph will appreciate the extra information that can be gleaned from the visualization without referring to individual commits to determine the impact of the changes to the project.

Strength:

The strength of LOC-node is that the viewer can immediately locate the "hot-spot" for change by focusing on the colored bar charts.  By focusing on addition (blue bars) or the deletions (red bars) of code, one can scan for large addition or deletions in one glance.  The data density from adding the bar chart takes advantage of "small multiples" approach, where user can get both the details and the overall trends.