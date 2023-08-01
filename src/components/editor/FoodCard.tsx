import React from "react";
import {
    Box,
    Button,
    ButtonGroup,
    CardActions,
    CardContent,
    Chip,
    Paper,
    Typography,
} from "@mui/material";
import { Food } from "../../types/FoodTypes";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { postAllFoodsUpdate } from "../../data/api";

interface FoodCardProps {
    food: Food;
    setAllFoods: React.Dispatch<React.SetStateAction<Food[]>>;
    onEdit: Function;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, setAllFoods, onEdit }) => {
    return (
        <>
            <Paper elevation={4} sx={{ m: 1, borderRadius: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        px: 1,
                    }}
                >
                    <CardContent>
                        <Typography variant="h5">{food.name}</Typography>
                    </CardContent>
                    <CardActions>
                        <ButtonGroup variant="outlined">
                            <Button
                                onClick={() => onEdit()}
                                endIcon={<EditIcon />}
                            >
                                Bearbeiten
                            </Button>
                            <Button
                                color="error"
                                endIcon={<DeleteForeverIcon />}
                                onClick={() => {
                                    setAllFoods((currentFoods) => {
                                        const filtered = Array.from(
                                            currentFoods.filter((f) => {
                                                return !(f.id === food.id);
                                            })
                                        );
                                        postAllFoodsUpdate(filtered);
                                        return filtered;
                                    });
                                }}
                            >
                                Löschen
                            </Button>
                        </ButtonGroup>
                    </CardActions>
                </Box>

                <CardContent>
                    <Box sx={{ display: "flex", flexDirection: "row" }}></Box>
                    {food.tags.map((tag, i) => {
                        return <Chip key={i} label={tag} sx={{ mx: 0.5 }} />;
                    })}
                </CardContent>
            </Paper>
        </>
    );
};

export default FoodCard;
