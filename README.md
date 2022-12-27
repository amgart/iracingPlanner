# AMG's iRacingPlanner
As an *iRacing* user I always found quite difficult to plan my season. When a new season schedule is released, 
I used to go the schedule pdf and build a table with the series, tracks and cars. Once build, I tried to identify
which were the best options to race and what tracks and cars to buy for the season.

This was quite a pain, so I decided to code this little tool that builds a table with all the series, cars and
tracks for the current season.

## How to install
Just download latest release (https://github.com/amgart/iracingPlanner/releases), unzip it and put it in your favourite folder.
Now you only need to double-click *iracing-planner.exe*

## How to use
With the tool up and running, just go to *My cars* tab and select the cars you own on *iRacing*. 
Select too your owned tracks on *My tracks* tab.

Once you have done this, you can return to the main *Dashboard* tab, and you will see the table of series 
as you configured it.

In the *Dashboard* tab will you find the following columns:
*   Series name (if the cell paints green means that you have at least 8 tracks, and you can obtain race participation credits with the series)
*   License needed for racing the series (R, D, C, B or A)
*   Category of the series (Road, Oval, Dirt Oval or RX)
*   Cars allowed for the series (if the cell paints green means that you own at least one car)
*   Number of tracks you can race for this series
*   Weeks: the list of tracks per week (if the cell paints green means that you own the track)

## How the data is obtained
The schedule for the current season, cars and tracks are stored as a json files inside the tool. 
These json files are obtained through *iRacing* API calls and contains all the series, with the corresponding 
tracks per week, license, categories, cars, and other information. These json files need to be updated each season.
So, please, at the beginning of the season download the corresponding release 
[here](https://github.com/amgart/iracingPlanner/releases).

## Known issues and limitations
*   If the serie has less than 12 races, the series is not shown, as this causes confusion about when the races happen.
*   The json file needs to be updated every season. Please read *How to update the tool* section.

## Future features planned
*   Visual enhancements
*   Possibility to add favourite cars, tracks and series.
*   Possibility to filter favourite cars and tracks in the *Dashboard* tab.
*   *Dashboard* is automatically calculated each season instead of manually updating the tool.
*   Price calculator for the user to use when planning the new season and being able to know how much money he needs to spend.
*   Owned cars and tracks are automatically updated with your *iRacing* account instead of the current tabs configuration.

## About the author
If you want to report issues, give me some feedback or recommend some new features, you can do it here in
GitHub or you can reach me by social media:

*   [My YouTube channel](https://www.youtube.com/channel/UC5TSGSOsf1KE2zjnFFJTSfw)
*   [My Twitch channel](https://www.twitch.tv/amgart88)
*   [My Instagram](https://www.instagram.com/amg.art/)
*   [If you want to register in iRacing and use me as a referred](https://www.iracing.com/membership/?refid=366160)
*   If you want to add me as a friend, my iRacing name is: Albert Martínez
*   [If you want to become a patron](https://www.patreon.com/amgart)
*   If you want to buy me a coffee:

[![](https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WBC5FZRDZHMSE)

## Final notes
Please, take into account that I coded this in my free time, but I do not have so much time. Please understand
if the features are arriving slowly. 
If you want to help me, proposing new features, following me in the social media or making a donation 
really helps.

Thank you so much!

## Build Status
[![Build Status](https://travis-ci.com/amgart/iracingPlanner.svg?token=fxGz683x8EKy5r4BMBoM&branch=develop)](https://travis-ci.com/amgart/iracingPlanner)

## Code quality
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/c2a6545e7f60442baca49e0d551d29a1)](https://www.codacy.com/gh/amgart/iracingPlanner/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=amgart/iracingPlanner&amp;utm_campaign=Badge_Grade)
