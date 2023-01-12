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
            // State for managing the mouse click
            mouse: {
                innerCircle: "",
            },
            // State for managing the songs
            songsList: {
                songs: [],
                thumbnails: [],
                songIndex: 0,
                name: [],
                isPlaying: false,
            },
            // State for managing the themes
            theme: {
                themeList: [],
                themeIndex: 0,
            },
        };
        // Reference to access the components
        this.controllerRef = React.createRef();
        this.progressRef = React.createRef();
    }

    // Menu Functionality
    isMenuVisible = (menu, screen) => {
        const { songsList } = this.state;

        if (menu.pageRender === "yes"){
            menu.menuVisible = "yes";
            screen.screenIndex = screen.wallpaperIndex;
            menu.pageRender = "no";

            songsList.songs.map((song) => {
                song.pause();
                song.currentTime = 0;
                return [];
            });
            songsList.isPlaying = false;
        }

        else {
            if (menu.menuVisible === "yes" &&
                menu.musicVisible === "no" &&
                menu.settingsVisible === "no"
            )
            {
                menu.menuVisible = "no";
            }
            else if
                (menu.menuVisible === "yes" &&
                 menu.musicVisible === "yes" &&
                 menu.settingsVisible === "no"
            )
            {
                menu.musicVisible = "no";
            }
            else if
               (menu.menuVisible === "yes" &&
                menu.musicVisible === "no" &&
                menu.settingsVisible === "yes"
            )
            {
                menu.settingsVisible = "no";
            }
            else {
                menu.menuVisible = "yes";
            }
        }
        this.setState({
            menu, screen, songsList
        });
    }
}

















export default App;