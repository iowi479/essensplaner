import { FoodDay } from "../../types/FoodTypes";
import React from "react";
import { Box, CardContent, Grid, Paper, Typography } from "@mui/material";
import DroppableFoodList from "./DroppableFoodList";
import { droppableIDOf, formatDate, isToday } from "../../utils/converters";

interface DroppableDayProps {
    foodDay: FoodDay;
}

const DroppableDay: React.FC<DroppableDayProps> = ({ foodDay }) => {
    return (
        <>
            {isToday(foodDay.day) ? <div id="today" /> : null}
            <Paper
                elevation={4}
                sx={{
                    m: 1,
                    p: 2,
                    backgroundColor: isToday(foodDay.day)
                        ? "#fff9f9"
                        : "#ffffff",
                }}
            >
                <Box>
                    <Typography ml={2} variant="h5">
                        {formatDate(foodDay.day)}
                    </Typography>
                </Box>
                <CardContent>
                    <Grid
                        container
                        columnSpacing={2}
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                        }}
                    >
                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography
                                align="center"
                                variant="h6"
                                color="grey"
                                sx={{ width: "100%" }}
                            >
                                Mittag
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            xs={6}
                            sx={{ display: "flex", flexDirection: "column" }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    p: 1,
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <Typography
                                    align="center"
                                    variant="h6"
                                    color="grey"
                                    sx={{ width: "100%" }}
                                >
                                    Zuhause
                                </Typography>
                            </Box>
                            <DroppableFoodList
                                foodList={foodDay.noon}
                                droppableId={droppableIDOf(foodDay, "noon")}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={6}
                            sx={{ display: "flex", flexDirection: "column" }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    p: 1,
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                <Typography
                                    align="center"
                                    variant="h6"
                                    color="grey"
                                    sx={{ width: "100%" }}
                                >
                                    Büro
                                </Typography>
                            </Box>
                            <DroppableFoodList
                                foodList={foodDay.work}
                                droppableId={droppableIDOf(foodDay, "work")}
                            />
                        </Grid>

                        <Grid
                            item
                            xs={12}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                mt: 4,
                            }}
                        >
                            <Typography
                                align="center"
                                variant="h6"
                                color="grey"
                                sx={{ width: "100%" }}
                            >
                                Abend
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            xs={6}
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifySelf: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: "100%",
                                    p: 1,
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
                                {/* <Typography
                                    align="center"
                                    variant="h6"
                                    color="grey"
                                    sx={{ width: "100%" }}
                                >
                                    Abend
                                </Typography> */}
                            </Box>
                            <DroppableFoodList
                                foodList={foodDay.evening}
                                droppableId={droppableIDOf(foodDay, "evening")}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Paper>
        </>
    );
};

export default DroppableDay;
