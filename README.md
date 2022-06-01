# iRacingPlanner
As an *iRacing* user I always found quite difficult to plan my season. When a new season schedule is released, 
I used to go the schedule pdf and build a table with the series, tracks and cars. Once build, I tried to identify
which were the best options to race and what tracks and cars to buy for the season.

This was quite a pain, so I decided to code this little tool that builds a table with all the series, cars and
tracks for the current season.

## How to install
Before running the app you need to make sure that you have Java installed. If you have not installed it, please
follow these steps (https://www.java.com/en/download/help/windows_manual_download.html).
If you already have at least Java 16 installed, then download latest release 
(https://github.com/amgart/iracingPlanner/releases), unzip it and put it in your favourite folder.
Open a commandPrompt, navigate to the folder and execute it with the following command:

*java -jar iRacingPlanner-1.0.jar* 

Note: I know that this can be a bit complicated, in future releases I will improve this.

## How to use
With the tool up and running, just go to *My cars* tab and select the cars you own on *iRacing*. 
Select too your owned tracks on *My tracks* tab.

Once you have done this, you can return to the main *Dashboard* tab and you will see the table of series 
as you configured it.

In the *Dashboard* tab will you find the following columns:
  *   Serie name
  *   License needed for racing the series (R, D, C, B or A)
  *   Category of the serie (Road, Oval, Dirt Oval or RX)
  *   Cars allowed for the serie (if the cell paints green means that you own at least one car)
  *   Number of tracks missing for the series (if the cell paints green means that you have at least 8 tracks and you can obtain *iDollars* with the serie)
  *   Weeks: the list of tracks per week (if the cell paints green means that you own the track)

## How the data is obtained
The schedule for the current season is stored as a json file inside the tool. This json file is obtained through
an *iRacing* API call and contains all the series, with the corresponding tracks per week, license, categories, 
cars, and other information. This json needs to be updated each season. Please read the 
*How to update the tool* section.

## Known issues and limitations
  *   At this moment the tool only displays series with 12 weeks.
  *   The json file needs to be updated every season. Please read *How to update the tool* section.
  *   The json file can contain duplicated cars and/or tracks. This causes the tool to display the cars and/or tracks duplicated as they have different names in the json. If this happens, please select all the cars/tracks that apply.
  *   The json does not contain which of the cars/tracks are included in the starter pack (not needed to buy). The tool cannot know which ones are owned by default, so please, select all cars and tracks.

## Future features planned
  *   Possibility to add favourite cars, tracks and series.
  *   Possibility to filter by category, license, cars and favourites in the *Dashboard* tab.
  *   *Dashboard* is automatically calculated each season instead of manually updating the tool.
  *   Price calculator for the user to use when planning the new season and being able to know how much money he needs to spend.
  *   Owned cars and tracks are automatically updated with your *iRacing* account instead of the current tabs configuration.

## About the author
If you want to report issues, give me some feedback or recommend some new features, you can do it here in
Github or you can reach me by social media:

  *   My YouTube channel: https://www.youtube.com/channel/UC5TSGSOsf1KE2zjnFFJTSfw
  *   My Twitch channel: https://www.twitch.tv/amgart88
  *   My Instagram: https://www.instagram.com/amg.art/
  *   If you want to register in iRacing and use me as a referred: https://www.iracing.com/membership/?refid=366160
  *   If you want to add me as a friend, my iRacing name is: Albert Martínez
  *   If you want to make a donation:

[![](https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donate_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=WBC5FZRDZHMSE)

## Final notes
Please, take into account that I coded this in my free time, but I do not have so much time. Please understand
if the features are arriving slowly. 
If you want to help me, proposing new features, following me in the social media or making a donation 
really helps.

## Thank you so much

## Build Status
[![Build Status](https://travis-ci.com/amgart/iracingPlanner.svg?token=fxGz683x8EKy5r4BMBoM&branch=develop)](https://travis-ci.com/amgart/iracingPlanner)

## Code quality
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/c2a6545e7f60442baca49e0d551d29a1)](https://www.codacy.com/gh/amgart/iracingPlanner/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=amgart/iracingPlanner&amp;utm_campaign=Badge_Grade)
