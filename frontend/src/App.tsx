import { Container } from "@mui/material";
import { useState } from "react";
import DraggableList from "./components/draggable/DraggableList";
import FoodEditor from "./components/editor/FoodEditor";

const App = () => {
    const [editing, setEditing] = useState(false);
    return (
        <Container maxWidth="xl">
            {editing ? (
                <FoodEditor
                    switchPage={() => {
                        setEditing(false);
                    }}
                />
            ) : (
                <DraggableList
                    switchPage={() => {
                        setEditing(true);
                    }}
                />
            )}
        </Container>
    );
};

export default App;
