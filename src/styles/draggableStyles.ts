export const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    userSelect: "none",
    height: "100%",
    // styles we need to apply on draggables
    ...draggableStyle,
});

export const getListStyle = (isDraggingOver: boolean) => ({
    height: "100%",
});

export const LIST_BACKGROUNDCOLOR = "#ededed";
export const LIST_BACKGROUNDCOLOR_DRAGGING = "#f4fff4";
export const ITEM_BACKGROUNDCOLOR = "#ffffff";
export const ITEM_BACKGROUNDCOLOR_HOVER = "#f5f5f5";

export const MIN_ITEM_HEIGHT = 100;
