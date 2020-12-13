# cody-hickman-aircraft-scheduling

Thank you for considering me this job opportunity. Here are soem caveats I would
like to add to anyone viewing this demo app.

ASSUMPTIONS:
-There is no way to link the aircraft to the flights. The flights API does not
offer anything that can be used as a foreign key to the aircrafts API, thus the
assumption is that ALL flights are available to the single available aircraft.

-There is only one aircraft. Therefore, this single aircraft is always select-able.
If there had been multiple aircrafts, I would have added the ability to paginate (or
scroll, if the API allowed it) between aircrafts and select a specific one.

FUTURE ENHANCEMENTS:
-Due to only tomorrow being available, a full-fledged app would allow the user to
switch between dates, and not just tomorrow. Certain options would become enabled/
disabled based on the date selected.

-A fully-fledged app would allow the user to select a flight and edit its details, such
as the airports or times.

-A fully-fledged app would show which flights the user had already selected by highlighting them in some way.

-It would be nice if the user could drag and drop flights or re-order them as they see fit (as long as their logic meets the given logical constraints).

-If the aircraft API was linked to the flights API, it would be possible to show an entire schedule on load, or as soon as an aircraft was selected.

-I could've done a better job on the chart. I did what I could in the allotted time. In the future, I would've liked to add dynamic tool tips that shows information on the flights based on where the user's mouse hovered.

-Although the appearance turned out okay in the end in my opinion, I would've liked to spruce it up a bit more, such as adding a dark mode or giving it a bit more of a "wow" factor.