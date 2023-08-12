import EditNoteIcon from "@mui/icons-material/EditNote";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
    Autocomplete,
    Box,
    Button,
    Chip,
    Grid,
    IconButton,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
    fetchAllFoods,
    fetchFoodDays,
    postFoodDaysUpdate,
} from "../../data/api";
import { Food, FoodDay } from "../../types/FoodTypes";
import { decodeIDs } from "../../utils/converters";
import {
    copy,
    move,
    remove,
    reorder,
    scrollToToday,
} from "../../utils/dnd/transformations";
import {
    ALL_FOOD_ID,
    POLLING_TIMEOUT,
    WINDOW_WIDTH_SHOW_SIDEBAR_SIZE,
} from "../../utils/env";
import { filterFoods, getTags } from "../../utils/food";
import DroppableDay from "./DroppableDay";
import DroppableFoodList from "./DroppableFoodList";

interface DraggableListProps {
    switchPage: Function;
}

const DraggableList: React.FC<DraggableListProps> = ({ switchPage }) => {
    const [foodDaysList, setFoodDaysList] = useState<FoodDay[]>([]);
    const [allFoods, setAllFoods] = useState<Food[]>([]);
    const [allFoodTags, setAllFoodTags] = useState<string[]>(getTags(allFoods));

    const [showSideBar, setShowSideBar] = useState<boolean>(true);

    const [allFoodFilterText, setAllFoodFilterText] = useState<string>("");
    const [allFoodFilters, setAllFoodFilters] = useState<string[]>([]);
    const [filteredFoodList, setFilteredFoodList] = useState<Food[]>([]);

    console.log("allFood", allFoods);
    console.log("filtered", filteredFoodList);

    useEffect(() => {
        const load = async () => {
            try {
                await Promise.all([
                    setAllFoods(
                        (
                            await fetchAllFoods()
                        ).sort((a, b) => a.name.localeCompare(b.name))
                    ),

                    setFoodDaysList(await fetchFoodDays()),
                ]);
            } catch (err) {
                console.error("fetching data:", err);
            } finally {
                setTimeout(() => load(), POLLING_TIMEOUT);
            }
        };

        load().then(() => setTimeout(scrollToToday, 500));
    }, []);

    useEffect(() => {
        setAllFoodTags(getTags(allFoods).sort());
    }, [allFoods]);

    useEffect(() => {
        setFilteredFoodList(
            filterFoods(allFoods, [...allFoodFilters, allFoodFilterText])
        );
    }, [allFoods, allFoodFilters, allFoodFilterText]);

    useEffect(() => {
        const handleResize = () => {
            const shouldShow =
                window.innerWidth > WINDOW_WIDTH_SHOW_SIDEBAR_SIZE;
            if (showSideBar !== shouldShow) {
                setShowSideBar(shouldShow);
            }
        };

        window.addEventListener("resize", handleResize);
    });

    const onDragEnd = (result: DropResult): void => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        const ids = decodeIDs(source, destination);

        if (destination.droppableId === ALL_FOOD_ID) {
            if (source.droppableId === ALL_FOOD_ID) {
                // setAllFoods((currentState) => {
                //     const result = reorder(
                //         currentState,
                //         source.index,
                //         destination.index
                //     );
                //     postAllFoodsUpdate(result);
                //     return result;
                // });
            } else {
                setFoodDaysList((currentState) => {
                    const result = currentState.map((day) => {
                        if (day.id === ids.sourceDayId) {
                            return remove(day, ids.sourceCol, source.index);
                        } else return day;
                    });
                    postFoodDaysUpdate(result);
                    return result;
                });
            }
        } else {
            switch (source.droppableId) {
                case destination.droppableId:
                    setFoodDaysList((currentState) => {
                        const result = currentState.map((day) => {
                            if (day.id === ids.sourceDayId) {
                                return {
                                    ...day,
                                    [ids.sourceCol]: reorder(
                                        day[ids.sourceCol],
                                        source.index,
                                        destination.index
                                    ),
                                };
                            } else return day;
                        });
                        postFoodDaysUpdate(result);
                        return result;
                    });
                    break;

                case ALL_FOOD_ID:
                    setFoodDaysList((currentState) => {
                        const result = currentState.map((day) => {
                            if (day.id === ids.destDayId) {
                                return copy(
                                    filteredFoodList,
                                    day,
                                    ids.destCol,
                                    source,
                                    destination
                                );
                            } else return day;
                        });
                        postFoodDaysUpdate(result);
                        return result;
                    });
                    break;

                default:
                    setFoodDaysList((currentState) => {
                        let src: Food[] | undefined = undefined;
                        let dst: Food[] | undefined = undefined;
                        const result = currentState.map((day) => {
                            if (day.id === ids.destDayId) {
                                dst = day[ids.destCol];
                            }
                            if (day.id === ids.sourceDayId) {
                                src = day[ids.sourceCol];
                            }
                            return day;
                        });

                        if (!src || !dst) {
                            console.error(
                                "Have to check this. On side of move not found..."
                            );
                            return currentState;
                        }
                        move(src, dst, source, destination);
                        postFoodDaysUpdate(result);

                        return result;
                    });
                    break;
            }
        }
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={showSideBar ? 7 : 11}
                        sx={{ maxHeight: "100vh", overflow: "scroll" }}
                    >
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                            {foodDaysList.map((foodDay, i) => (
                                <DroppableDay
                                    foodDay={foodDay}
                                    key={i}
                                ></DroppableDay>
                            ))}
                        </Box>
                    </Grid>

                    {showSideBar ? (
                        <Grid
                            item
                            xs={4}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                height: "100vh",
                            }}
                        >
                            <Box
                                sx={{
                                    m: 2,
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <Autocomplete
                                    multiple
                                    options={allFoodTags}
                                    value={allFoodFilters}
                                    onChange={(_, tags) =>
                                        setAllFoodFilters([...tags])
                                    }
                                    freeSolo
                                    fullWidth
                                    renderTags={(
                                        value: readonly string[],
                                        getTagProps
                                    ) =>
                                        value.map(
                                            (option: string, index: number) => (
                                                <Chip
                                                    variant="outlined"
                                                    label={option}
                                                    {...getTagProps({ index })}
                                                />
                                            )
                                        )
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            onChange={(e) =>
                                                setAllFoodFilterText(
                                                    e.target.value
                                                )
                                            }
                                            value={allFoodFilterText}
                                            fullWidth
                                            variant="standard"
                                            label="Filter"
                                        />
                                    )}
                                />

                                <IconButton
                                    aria-label="delete"
                                    size="large"
                                    sx={{ ml: 1 }}
                                    onClick={() => switchPage(true)}
                                >
                                    <EditNoteIcon fontSize="inherit" />
                                </IconButton>
                            </Box>
                            <Box
                                sx={{ flexGrow: 1, overflow: "hidden", pb: 2 }}
                            >
                                <DroppableFoodList
                                    foodList={filteredFoodList}
                                    droppableId={ALL_FOOD_ID}
                                />
                            </Box>
                        </Grid>
                    ) : null}
                    <Grid
                        item
                        xs={1}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100vh",
                        }}
                    >
                        <Box
                            sx={{
                                position: "absolute",
                                height: "150px",
                                right: "10px",
                                top: "calc(50% - 75px)",
                                mr: 1,
                            }}
                        >
                            <Button
                                variant="outlined"
                                sx={{ height: "150px" }}
                                onClick={() =>
                                    setShowSideBar((current) => !current)
                                }
                            >
                                {showSideBar ? (
                                    <KeyboardArrowRightIcon fontSize="large" />
                                ) : (
                                    <KeyboardArrowLeftIcon fontSize="large" />
                                )}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </DragDropContext>
        </>
    );
};

export default DraggableList;
