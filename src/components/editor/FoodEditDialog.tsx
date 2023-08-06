import {
    Autocomplete,
    Button,
    Chip,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { postAllFoodsUpdate } from "../../data/api";
import { Food } from "../../types/FoodTypes";
import { getTags } from "../../utils/food";

type FoodEditDialogProps = {
    setAllFoods: React.Dispatch<React.SetStateAction<Food[]>>;
    setEditDialogFood: React.Dispatch<React.SetStateAction<Food | undefined>>;
    allFoods: Food[];
    isOpen: boolean;
    initialFood: Food;
};

const FoodEditDialog: React.FC<FoodEditDialogProps> = ({
    setAllFoods,
    setEditDialogFood,
    allFoods,
    isOpen,
    initialFood,
}) => {
    const [food, setFood] = useState(initialFood);
    const [options, setOptions] = useState(getTags(allFoods));

    useEffect(() => {
        setOptions((currentOptions) => {
            const result = [...currentOptions];

            food.tags.forEach((tag) => {
                if (!result.includes(tag)) {
                    result.push(tag);
                }
            });

            return result.sort();
        });
    }, [food]);

    const handleClose = () => {
        setEditDialogFood(undefined);
    };

    const onSave = async () => {
        food.name = food.name.trim();
        for (let i = 0; i < allFoods.length; i++) {
            if (allFoods[i].id === food.id) {
                allFoods[i] = food;
                break;
            }
        }

        setAllFoods(() => {
            const result = [...allFoods];
            postAllFoodsUpdate(result);
            return result;
        });
        handleClose();
    };

    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <Container sx={{ minWidth: "600px" }}>
                <DialogContent>
                    <TextField
                        autoFocus
                        label="Name"
                        fullWidth
                        variant="standard"
                        sx={{ my: 2 }}
                        value={food.name}
                        error={food.name.length < 2}
                        onChange={(e) => {
                            setFood((food) => {
                                return { ...food, name: e.target.value };
                            });
                        }}
                    />
                    <Autocomplete
                        multiple
                        options={options}
                        value={food.tags}
                        onChange={(_, tags) => {
                            setFood((currentFood) => {
                                return { ...currentFood, tags };
                            });
                        }}
                        freeSolo
                        renderTags={(value: readonly string[], getTagProps) =>
                            value.map((option: string, index: number) => (
                                <Chip
                                    variant="outlined"
                                    label={option}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="standard"
                                label="Tags"
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Abbrechen</Button>
                    <Button onClick={onSave}>Speichern</Button>
                </DialogActions>
            </Container>
        </Dialog>
    );
};

export default FoodEditDialog;
