# cody-hickman-aircraft-scheduling

To run this app, please download it. Then, in a terminal, while in the same folder as the 
"package.json" file, enter the commands "npm install" followed by "npm run start." Please 
contact me if there are any issues.

Thank you for considering me this job opportunity. Here are som caveats I would
like to add to anyone viewing this demo app.

ASSUMPTIONS:
-There doesn't seem to be a way to link the aircraft to the flights. The flights 
API does not seem to offer anything that can be used as a foreign key to the 
aircrafts API, thus the assumption is that ALL flights are available to the 
single available aircraft.

-There is only one aircraft. Therefore, this single aircraft is always select-able.
If there had been multiple aircrafts, I would have added the ability to paginate (or
scroll, if the API allowed it) between aircrafts and select a specific one.

-The flights API does not appear to support searching.

FUTURE ENHANCEMENTS:
-Due to only tomorrow being available, a full-fledged app would allow the user to
switch between dates, and not just tomorrow. Certain options would become enabled/
disabled based on the date selected.

-A fully-fledged app would allow the user to select a flight and edit its details, 
such as the airports or times.

-A fully-fledged app would show which flights the user had already selected by 
highlighting them in some way.

-It would be nice if the user could drag and drop flights or re-order them as 
they see fit (as long as their logic meets the given logical constraints).

-If the aircraft API was linked to the flights API, it would be possible 
to show an entire schedule on load, or as soon as an aircraft was selected.

-If the aircraft API supported it, I would've liked to add search functionality
to the flights sidebar.

-I would have liked to have put more love into the utilization chart. I did 
what I could in the allotted time. In the future, I would've liked to add 
dynamic tool tips that shows information on the flights based on where the 
user's mouse hovered.

-Although the appearance turned out okay in the end in my opinion, I would've 
liked to spruce it up a bit more, such as adding a dark mode or giving it a bit 
more of that "wow" factor.

-I did not consider much in the way of responsive design. I did try to implement
it, but I didn't do a lot of testing or consideration of how it would look on
mobile devices or smaller windows.