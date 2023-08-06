import ClearIcon from "@mui/icons-material/Clear";
import EditNoteIcon from "@mui/icons-material/EditNote";
import {
    Box,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import {
    fetchAllFoods,
    fetchFoodDays,
    postAllFoodsUpdate,
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
import { ALL_FOOD_ID } from "../../utils/env";
import DroppableDay from "./DroppableDay";
import DroppableFoodList from "./DroppableFoodList";

interface DraggableListProps {
    switchPage: Function;
}

const DraggableList: React.FC<DraggableListProps> = ({ switchPage }) => {
    const [foodList, setFoodList] = useState<FoodDay[]>([]);
    const [allFoods, setAllFoods] = useState<Food[]>([]);
    const [allFoodFilter, setAllFoodFilter] = useState<string>("");

    useEffect(() => {
        const load = async () => {
            try {
                await setAllFoods(await fetchAllFoods());
            } catch (err) {
                console.error("fetching all foods:", err);
            }

            try {
                await setFoodList(await fetchFoodDays());
            } catch (err) {
                console.error("fetching all days:", err);
            }
            setTimeout(scrollToToday, 500);
        };

        load();
    }, []);

    const onDragEnd = (result: DropResult): void => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        const ids = decodeIDs(source, destination);

        if (destination.droppableId === ALL_FOOD_ID) {
            if (source.droppableId === ALL_FOOD_ID) {
                setAllFoods((currentState) => {
                    const result = reorder(
                        currentState,
                        source.index,
                        destination.index
                    );
                    postAllFoodsUpdate(result);
                    return result;
                });
            } else {
                setFoodList((currentState) => {
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
                    setFoodList((currentState) => {
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
                    setFoodList((currentState) => {
                        const result = currentState.map((day) => {
                            if (day.id === ids.destDayId) {
                                return copy(
                                    allFoods,
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
                    setFoodList((currentState) => {
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
        <DragDropContext onDragEnd={onDragEnd}>
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={8}
                    sx={{ maxHeight: "100vh", overflow: "scroll" }}
                >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        {foodList.map((foodDay, i) => (
                            <DroppableDay
                                foodDay={foodDay}
                                key={i}
                            ></DroppableDay>
                        ))}
                    </Box>
                </Grid>

                <Grid
                    item
                    xs={4}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100vh",
                    }}
                >
                    <Box sx={{ m: 2, display: "flex", flexDirection: "row" }}>
                        <TextField
                            name="Filter"
                            label="Filter"
                            fullWidth
                            value={allFoodFilter}
                            onChange={(e) => {
                                setAllFoodFilter(e.target.value);
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            sx={{
                                                visibility: allFoodFilter
                                                    ? "visible"
                                                    : "hidden",
                                            }}
                                            onClick={() => setAllFoodFilter("")}
                                        >
                                            <ClearIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
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
                    <Box sx={{ flexGrow: 1, overflow: "hidden", pb: 2 }}>
                        <DroppableFoodList
                            foodList={allFoods.filter((f) =>
                                (
                                    f.name.toLowerCase() +
                                    f.tags.join().toLowerCase()
                                ).includes(allFoodFilter.toLowerCase())
                            )}
                            droppableId={ALL_FOOD_ID}
                        />
                    </Box>
                </Grid>
            </Grid>
        </DragDropContext>
    );
};

export default DraggableList;
