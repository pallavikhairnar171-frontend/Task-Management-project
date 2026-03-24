import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Editor, EditorState } from "draft-js";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState } from "react";
import dayjs from "dayjs";

export const DynamicForm = ({ fields, initialValues, onSubmit, project }) => {
  const [formData, setFormData] = useState(initialValues);
  // only for color
  const getValueByPath = (obj, path) =>
    path.split(".").reduce((acc, key) => acc?.[key], obj);

  const setValueByPath = (obj, path, value) => {
  const keys = path.split(".");
  const lastKey = keys.pop();
  const ref = keys.reduce((acc, key) => {
    if (acc[key] === undefined) {
      acc[key] = {};
    }
    return acc[key];
  }, obj);

  return ref[lastKey] = value;
};
  const normalizeSchema = (fields) => {
    // Already section-based
    if (fields?.[0]?.fields) return fields;

    return [
      {
        section: "",
        fields,
      },
    ];
  };

  const sections = normalizeSchema(fields);
  // const handelSubmit = () => {};
  const handelOnChange = (name, value) => {
    setFormData((prev) => {
      const updated = structuredClone(prev);
      setValueByPath(updated, name, value);
      return updated;
    });
  };

  const renderFiled = (field) => {
    if (!field || !field.type) return null;
    switch (field.type) {
      case "text":
      case "email":
      case "number":
        return (
          <TextField
            fullWidth
            size="small"
            type={field.type}
            label={field.label}
            required={field.required}
            value={getValueByPath(formData, field.name) ?? ""}
            onChange={(e) => handelOnChange(field.name, e.target.value)}
          />
        );
      case "color":
        return (
          <TextField
            fullWidth
            size="small"
            type="color"
            label={field.label}
            value={getValueByPath(formData, field.name) ?? "#000000"}
            onChange={(e) => handelOnChange(field.name, e.target.value)}
            slotProps={{
              inputLabel: { shrink: true },
            }}
            sx={{ height: 56 }}
          />
        );

      case "textarea":
        return (
          <TextField
            fullWidth
            size="small"
            type={field.type}
            label={field.label}
            required={field.required}
            value={getValueByPath(formData, field.name) ?? ""}
            onChange={(e) => handelOnChange(field.name, e.target.value)}
            rows={4}
            multiline
          />
        );
      case "select": {
        return (
          <TextField
            select
            fullWidth
            label={field.label}
            value={formData[field.name] }
            onChange={(e) => handelOnChange(field.name, e.target.value)}
          >
            {field.options?.map((opt,index) => (
              <MenuItem key={index} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        );
      }
      case "check":
        return (
          <FormControlLabel
            label={field.label}
            control={
              <Checkbox
                checked={!!formData[field.name]}
                onChange={(e) => handelOnChange(field.name, e.target.checked)}
              />
            }
          />
        );
      case "button":
        return (
          <Button
            type="submit"
            variant={field.variant || "contained"}
            color={field.color || "primary"}
            fullWidth={field.fullWidth}
          >
            {field.label}
          </Button>
        );
      case "date":
        return (
          // <DatePicker
          //   label={field.label}
          //   value={formData[field.name] ? (formData[field.name]) : null}
          //   onChange={(newValue) => {
          //     handelOnChange(
          //       field.name,
          //       newValue ? newValue.toISOString() : null
          //     );
          //   }}
          //   slotProps={{
          //     textField: {
          //       fullWidth: true,
          //       size: "small",
          //     },
          //   }}
          // />
          <DatePicker
            label={field.label}
            value={formData[field.name] ? dayjs(formData[field.name]) : null}
            onChange={(newValue) => handelOnChange(field.name, newValue)}
            slotProps={{
              textField: {
                fullWidth: true,
                margin: "normal",
              },
            }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData, project);
        }}
      >
        <Grid spacing={2}>
          {sections.map((section, sIndex) => (
            <Grid item key={sIndex} size={12}>
              {section.section && (
                <Typography fontWeight={600} sx={{ mb: 1, mt: 2 }}>
                  {section.section}
                </Typography>
              )}

              <Grid spacing={2}>
                {section.fields.map((field, fIndex) => (
                  <Grid
                    item
                    marginBottom={2}
                    key={fIndex}
                    size={{ xs: 12, md: field.grid || 6 }}
                  >
                    {renderFiled(field)}
                  </Grid>
                ))}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </form>
    </div>
  );
};
