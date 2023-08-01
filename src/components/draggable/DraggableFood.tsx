import { Draggable } from "react-beautiful-dnd";
import { Food } from "../../types/FoodTypes";
import React from "react";
import {
    ITEM_BACKGROUNDCOLOR,
    ITEM_BACKGROUNDCOLOR_HOVER,
} from "../../styles/draggableStyles";
import { Box, Card, CardContent, Typography } from "@mui/material";

interface DraggableFoodProps {
    food: Food;
    index: number;
}

const DraggableFood: React.FC<DraggableFoodProps> = ({ food, index }) => {
    return (
        <Draggable index={index} draggableId={food.id} key={food.id}>
            {(provided, _) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ ...provided.draggableProps.style }}
                >
                    <Box
                        sx={{
                            p: 1,
                            py: 0.5,
                        }}
                    >
                        <Card
                            sx={{
                                backgroundColor: ITEM_BACKGROUNDCOLOR,
                                ":hover": {
                                    backgroundColor: ITEM_BACKGROUNDCOLOR_HOVER,
                                },
                            }}
                        >
                            <CardContent>
                                <Typography align="center">
                                    {food.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                </div>
            )}
        </Draggable>
    );
};

export default DraggableFood;
