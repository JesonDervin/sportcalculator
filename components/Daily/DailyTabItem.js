import { List, ListItemButton, ListItemText, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import * as React from "react";
export default function DailyTabItem({ item }) {
  const [open, setOpen] = React.useState(0);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <List>
        {item.foods.map((value, index) => {
          return (
            <div key={index}>
              <ListItemButton onClick={handleClick}>
                <ListItemText
                  primary={formatFood(
                    value.name,
                    value.quantity,
                    value.calories
                  )}
                />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemText primary={formatFoodDetails(value.details)} />
                  </ListItemButton>
                </List>
              </Collapse>
            </div>
          );
        })}
      </List>
    </div>
  );
}

function formatFood(name, quantity, calories) {
  return `${name} - ${quantity}g ${calories}kcal`;
}

function formatFoodDetails(detail) {
  let output = "";
  for (var property in detail) {
    output += `${property}: ${detail[property]}g `;
  }
  console.log("outpyt", output);
  return output;
}
