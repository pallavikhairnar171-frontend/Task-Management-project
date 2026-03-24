import React, { useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import gsap from "gsap";

export const DynamicDialogBox = ({
  open,
  onClose,
  title,
  children,
  actions,
  maxWidth = "sm",
  height = "70vh",
}) => {

  const paperRef = useRef(null);
  const tl = useRef(null);
 useEffect(() => {
    if (!open) return;
    if (!paperRef.current) return;

    if (!tl.current) {
      tl.current = gsap.timeline({ paused: true });

      tl.current.fromTo(
        paperRef.current,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }

    tl.current.play(0);
  }, [open]);

   const handleClose = () => {
    if (!tl.current) {
    
      return;
    }

    tl.current.reverse();
    tl.current.eventCallback("onReverseComplete", () => {
      tl.current = null; 
      onClose();         
    });
  };
  

  return (
     <Dialog
      open={open}
      fullWidth
      maxWidth={maxWidth}
      scroll="paper"
      onClose={handleClose}
      PaperProps={{
        ref: paperRef,
        sx: { height },
      }}
    >
      {title && <DialogTitle>{title}</DialogTitle>}

      <DialogContent dividers sx={{ overflowY: "auto" }}>
        {children}
      </DialogContent>

      {actions && (
        <DialogActions>
          {actions.map((action, i) => (
            <Button
              key={i}
              
              onClick={() =>
                action.onClick
                  ? action.onClick(handleClose)
                  : handleClose()
              }
              color={action.color || "primary"}
            >
              {action.label}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
};
