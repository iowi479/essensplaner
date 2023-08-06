import React, { useEffect, useState } from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    TextField,
} from "@mui/material";
import { Food } from "../../types/FoodTypes";
import { fetchAllFoods, postAllFoodsUpdate } from "../../data/api";
import ClearIcon from "@mui/icons-material/Clear";
import FoodCard from "./FoodCard";
import AddIcon from "@mui/icons-material/Add";
import { v4 as uuidv4 } from "uuid";
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

    const addNewFood = () => {
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

        const f: Food = {
            id: uuidv4(),
            databaseId: missing,
            name: "neues Essen",
            tags: ["neu"],
        };

        setAllFoods((currentFoods) => {
            const result = [f, ...currentFoods];
            postAllFoodsUpdate(result);
            return result;
        });
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
                        onClick={addNewFood}
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
