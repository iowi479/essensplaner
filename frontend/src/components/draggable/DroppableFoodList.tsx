import { Box } from "@mui/material";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Food } from "../../types/FoodTypes";
import {
    LIST_BACKGROUNDCOLOR,
    LIST_BACKGROUNDCOLOR_DRAGGING,
    MIN_ITEM_HEIGHT,
} from "../../utils/env";
import DraggableFood from "./DraggableFood";

interface DroppableFoodListProps {
    foodList: Food[];
    droppableId: string;
}

const DroppableFoodList: React.FC<DroppableFoodListProps> = ({
    foodList,
    droppableId,
}) => {
    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignContent: "stretch",
            }}
        >
            <Droppable droppableId={droppableId}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={{
                            height: "100%",
                        }}
                        {...provided.droppableProps}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                px: 0.5,
                                py: 1,
                                height: "100%",
                                minHeight: MIN_ITEM_HEIGHT,
                                borderRadius: 3,
                                backgroundColor: snapshot.isDraggingOver
                                    ? LIST_BACKGROUNDCOLOR_DRAGGING
                                    : LIST_BACKGROUNDCOLOR,
                                overflowX: "hidden",
                                maxWidth: "100%",
                                overflowY: "scroll",
                            }}
                        >
                            {foodList.map((food, i) => (
                                <DraggableFood food={food} key={i} index={i} />
                            ))}
                            {provided.placeholder}
                        </Box>
                    </div>
                )}
            </Droppable>
        </Box>
    );
};

export default DroppableFoodList;
