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

    //
    componentDidMount() {
        this.containerElementOuter = this.controllerRef.current;
        this.activeRegionOuter = new ZingTouch.Region(this.containerElementOuter);
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
        return;
    };

    // Functionality to handle the down press css effect on middle button
    addClass = (classname, event) => {
        if (classname === "inner-circle" && event === "down") {
            const { mouse } = this.state;
            mouse.innerCircle = "down";
            this.setState({mouse});
        }
    };

    // Functionality to handle the up press css effect on middle button
    removeClass = (classname, event) => {
        if (classname === "inner-circle" && event === "up") {
            const {mouse} = this.state;
            mouse.innerCircle = "up";
            this.setState({mouse})
        }
    };

    // Functionality to handle the click operations in the app
    tap = (menu, screen) => {
        const { songsList, theme } = this.state;
        // Goto sub-menu of the main menu
        if (
            menu.menuVisible === "yes" &&
            menu.musicVisible === "no" &&
            menu.settingsVisible === "no"
        )
        {
            if (menu.optionsIndex === 0)
            {
                menu.musicVisible = "yes";
            }
            else if (menu.optionsIndex === 1)
            {
                menu.pageRender = "yes";
                menu.menuVisible = "no";
                screen.screenIndex = 6;
            }
            else if (menu.optionsIndex === 2)
            {
                menu.pageRender = "yes";
                menu.menuVisible = "no";
                screen.screenIndex = 5;
            }
            else
            {
                menu.settingsVisible = "yes";
            }
        }
        // Music menu page
        else if(
            menu.menuVisible === "yes" &&
            menu.musicVisible === "yes" &&
            menu.settingsVisible === "no"
        )
        {
            if (menu.musicIndex === 0)
            {
                menu.pageRender = "yes";
                menu.menuVisible = "no";
                screen.screenIndex = 7;
                songsList.isPlaying = true;
                songsList.songs[songsList.songIndex].play();
            }
            else if (menu.musicIndex === 1)
            {
                menu.pageRender = "yes";
                menu.menuVisible = "no";
                screen.screenIndex = 8;
            }
            else
            {
                menu.pageRender = "yes";
                menu.menuVisible = "no";
                screen.screenIndex = 9;
            }
        }
        // Sttings Menu page
        else if (
            menu.menuVisible === "yes" &&
            menu.musicVisible === "no" &&
            menu.settingsVisible === "yes"
        )
        {
            if (menu.settingsIndex === 0)
            {
                if (screen.wallpaperIndex < 4)
                {
                    screen.wallpaperIndex += 1;
                }
                else
                {
                    screen.wallpaperIndex = 0;
                }
                screen.screenIndex = screen.wallpaperIndex;
            }
            // changing the theme
            else
            {
                if (theme.themeIndex === 0)
                {
                    theme.themeIndex = 1;
                }
                else
                {
                    theme.themeIndex = 0;
                }
            }
        }
        this.setState({
            menu, screen, songsList, theme
        });
        return;
    };

    // Functionality to handle the screen rotation
    rotate = (menu) => {
        //
        this.activeRegionOuter.bind(
            this.containerElementOuter,
            "rotate",
            (event) => {
                event.stopPropagation();

                // rotation in main menu
                if (
                    menu.menuVisible === "yes" &&
                    menu.musicVisible === "no" &&
                    menu.settingsVisible === "no"
                )
                {
                    const angle = event.detail.angle;
                    if (angle >= 0 && angle <= 90)
                    {
                        menu.optionsIndex = 0;
                    }
                    else if (angle > 90 && angle <= 180)
                    {
                        menu.optionsIndex = 1;
                    }
                    else if (angle > 180 && angle <= 270)
                    {
                        menu.optionsIndex = 2;
                    }
                    else if (angle > 270 && angle <= 360)
                    {
                        menu.optionsIndex = 3;
                    }
                    else if (angle >= -90 && angle < 0)
                    {
                        menu.optionsIndex = 3;
                    }
                    else if (angle >= -180 && angle < -90)
                    {
                        menu.optionsIndex = 2;
                    }
                    else if (angle >= -270 && angle < -180)
                    {
                        menu.optionsIndex = 1;
                    }
                    else if (angle >= -360 && angle < -270)
                    {
                        menu.optionsIndex = 0;
                    }
                    else
                    {}
                }
                // Rotation in music menu
                else if (
                    menu.menuVisible === "yes" &&
                    menu.musicVisible === "yes" &&
                    menu.settingsVisible === "no"
                ) {
                    const angle = event.detail.angle;
                    if (angle >= 0 && angle <= 120)
                    {
                        menu.musicIndex = 0;
                    }
                    else if (angle > 120 && angle <= 240)
                    {
                        menu.musicIndex = 1;
                    }
                    else if (angle > 240 && angle <= 360)
                    {
                        menu.musicIndex = 2;
                    }
                    else if (angle >= -120 && angle < 0)
                    {
                        menu.musicIndex = 2;
                    }
                    else if (angle >= -240 && angle < -120)
                    {
                        menu.musicIndex = 1;
                    }
                    else if (angle >= -360 && angle < -240)
                    {
                        menu.musicIndex = 0;
                    }
                    else {}
                }
                // Rotation in Settings menu
                else if (
                    menu.menuVisible === "yes" &&
                    menu.musicVisible === "no" &&
                    menu.settingsVisible === "yes"
                ) {
                    const angle = event.detail.angle;
                    if (angle >= 0 && angle <= 120)
                    {
                        menu.settingsIndex = 0;
                    }
                    else if (angle > 120 && angle <= 240)

                        menu.settingsIndex = 1;
                    }
                    else if (angle > 240 && angle <= 360)
                    {
                        menu.settingsIndex = 2;
                    }
                    else if (angle >= -120 && angle < 0)
                    {
                        menu.settingsIndex = 2;
                    }
                    else if (angle >= -240 && angle < -120)
                    {
                        menu.settingsIndex = 1;
                    }
                    else if (angle >= -360 && angle < -240)
                    {
                        menu.settingsIndex = 0;
                    } else {}

                this.setState({menu})
            });
    };
}

















export default App;