export type DraggableStyle = DraggingStyle | NotDraggingStyle;
export type DraggingStyle = {
  position: "fixed";
  top: number;
  left: number;
  boxSizing: "border-box";
  width: number;
  height: number;
  transition: string;
  transform: string;
  zIndex: number;
  opacity: number;
  pointerEvents: "none";
};
export type NotDraggingStyle = {
  transition: string | null | "none";
};
