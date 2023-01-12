import React from 'react';
import Ipod from './Display/Ipod';
import ZingTouch from 'zingtouch';
import Helmet from 'react-helmet';


class App extends React.Component {
    constructor() {
        super();
        // State
        this.state = {
            menu: {
                options: [
                    {
                        music: ["all-songs", "artists", "albums"],
                    },
                    {
                        games: [],
                    },
                    {
                        coverflow: [],
                    },
                    {
                        settings: [
                            "change-wallpaper",
                            "change-orientation",
                            "change-theme",
                        ],
                    },
                ],
                // Menu Visibility
                menuVisible: "no",
                musicVisible: "no",
                settingsVisible: "no",

                // Menu options index for traversal
                optionsIndex: 0,
                musicIndex: 0,
                settingsIndex: 0,
                // for main page rendering (songs, artists, albums)
                pageRender: "no"
            },
            // State for managing the screen display
            screen: {
                // wallpaper list
                wallpaper: [

                ],
                // wallpaper index
                wallpaperIndex: 0,
                // wallpaper traversal
                screenIndex: 0,
            },
        }

    }
}

















export default App;