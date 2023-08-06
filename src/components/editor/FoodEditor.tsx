import AddIcon from "@mui/icons-material/Add";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ClearIcon from "@mui/icons-material/Clear";
import {
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchAllFoods, postAllFoodsUpdate } from "../../data/api";
import { Food } from "../../types/FoodTypes";
import { newFood } from "../../utils/food";
import FoodCard from "./FoodCard";
import FoodEditDialog from "./FoodEditDialog";

interface FoodEditorProps {
    switchPage: Function;
}

const FoodEditor: React.FC<FoodEditorProps> = ({ switchPage }) => {
    const [allFoods, setAllFoods] = useState<Food[]>([]);
    const [allFoodFilter, setAllFoodFilter] = useState<string>("");
    const [editDialogFood, setEditDialogFood] = useState<Food | undefined>();

    useEffect(() => {
        const load = async () => {
            try {
                setAllFoods(await fetchAllFoods());
            } catch (err) {
                console.error("fetching all foods:");
                console.error(err);
            }
        };

        load();
    }, []);

    const onAddNewFood = () => {
        const ids: number[] = [];

        allFoods.forEach((food) => {
            ids.push(food.databaseId);
        });

        ids.sort();

        let missing = -1;
        for (let i = 0; i < ids.length; i++) {
            if (ids[i] !== i) {
                missing = i;

                break;
            }
        }

        const createdFood = newFood(missing);

        setAllFoods((currentFoods) => {
            const result = [createdFood, ...currentFoods];
            postAllFoodsUpdate(result);
            return result;
        });

        setEditDialogFood(createdFood);
    };

    return (
        <Container maxWidth="md">
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
                    <CalendarMonthIcon fontSize="inherit" />
                </IconButton>
            </Box>

            <Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        my: 2,
                    }}
                >
                    <Button
                        variant="outlined"
                        onClick={onAddNewFood}
                        endIcon={<AddIcon />}
                    >
                        Hinzufügen
                    </Button>
                </Box>
                {allFoods
                    .filter((f) =>
                        (
                            f.name.toLowerCase() + f.tags.join().toLowerCase()
                        ).includes(allFoodFilter.toLowerCase())
                    )
                    .map((food, i) => {
                        return (
                            <FoodCard
                                key={i}
                                food={food}
                                setAllFoods={setAllFoods}
                                onEdit={() => {
                                    setEditDialogFood(food);
                                }}
                            />
                        );
                    })}
            </Box>

            {editDialogFood ? (
                <FoodEditDialog
                    allFoods={allFoods}
                    initialFood={editDialogFood}
                    isOpen={!!editDialogFood}
                    setAllFoods={setAllFoods}
                    setEditDialogFood={setEditDialogFood}
                />
            ) : null}
        </Container>
    );
};

export default FoodEditor;
