import React, { useState } from "react";
import api from '../utils/axiosWithAuth';

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  // console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
    // console.log(colorToEdit)
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is it saved right now?
    api()
      .put(`/api/colors/${colorToEdit.hex}`, colorToEdit)
      .then(res => {
        // console.log(res)
        updateColors([
          ...colors,
          {color: res.data.color,
          code: res.data.code}
        ])
        setEditing(false)
      })
      .catch(err => {
        console.log(err)
      })
  };

  const deleteColor = (color, id) => {
    // make a delete request to delete this color
    // window.confirm('Are you sure?')
    updateColors(colors.filter(color => color.code.hex !== id))
    const ghost = colors.find(color => color.code.hex === id)
    
    api()
      .delete(`/api/colors/${ghost}`)
      .then(res => {
        console.log(`Delete successful`)
      })
      .catch(err => {
        console.log(err)
        updateColors([...colors, ghost])
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    e.preventDefault();
                    deleteColor(color, color.code.hex)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
