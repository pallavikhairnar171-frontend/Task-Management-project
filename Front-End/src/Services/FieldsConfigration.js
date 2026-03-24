export const textFieldConfig = [
  {
    name: "title",
    label: "Task Title",
    required: true,
    type: "text",
    grid: 6,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    grid: 6,
  },
  {
    name: "description",
    label: "Description",
    multiline: true,
    rows: 4,
    grid: 12,
  },
];

export const ProjectFormData = [
  {
    name: "name",
    label: "Project Title",
    type: "text",
    required: true,
    grid: 12,
  },
  {
    name: "description",
    label: "Project Description",
    type: "textarea",
    grid: 12,
  },
  {
    name: "startDate",
    label: " Select Project Start Date",
    type: "date",
    grid: 12,
  },
  {
    name: "expexctedCompletDate",
    label: "Select Project Completion Date",
    type: "date",
    grid: 12,
  },
  {
    name: "status",
    label: "Project Status",
    type: "select",
    grid: 6,
    options: [
      { label: "Pendding", value: "pending" },
      { label: "In Progress", value: "in-progress" },
      { label: "Completed", value: "completed" },
    ],
  },
  {
    name: "priority",
    label: "Project Priority",
    type: "select",
    grid: 6,
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },

  {
    type: "button",
    label: "Submit",
    variant: "contained",
    color: "primary",
    fullWidth: true,
  },
];

// export const ThemeFormData = [
//   {
//     name: "name",
//     label: "Project Title",
//     type: "text",
//     required: true,
//     grid: 12,
//   },
//    {
//     name: "key",
//     label: "Select Theme",
//     type: "select",
//     grid: 6,
//     options: [
//       { label: "Light", value: "light" },
//       { label: "Dark", value: "dark" },
//     ],
//   },
//   {
//     name: "inputType",
//     label: "Select Input Type",
//     type: "select",
//     grid: 6,
//     options: [
//       { label: "Outlined", value: "outlined" },
//       { label: "Filled", value: "filled" },
//       {label:"Standard",value:"standard"}
//     ],
//   },
//   {
//     name: "buttonType",
//     label: "Select Button Type",
//     type: "select",
//     grid: 6,
//     options: [
//       { label: "Text", value: "text" },
//       { label: "Contained", value: "contained" },
//       { label: "Outlined", value: "outlined" },
//     ],
//   },
//   {
//     name: "background",
//     label: "Select Background Color",
//     type: "color",
//     grid: 12,
//   },
//   {
//     name: "bgBotton",
//     label: "Select Button Background Color",
//     type: "color",
//     grid: 12,
//   },
//   {
//     name: "headColor",
//     label: "Select Headding Color",
//     type: "color",
//     grid: 12,
//   },
//   {
//     name: "text",
//     label: "Select Text Color",
//     type: "color",
//     grid: 12,
//   },
//   {
//     name: "sidbarBg",
//     label: "Select Sidebar Backgroud Color",
//     type: "color",
//     grid: 12,
//   },
//   {
//     name: "iconC",
//     label: "Select Icon Color",
//     type: "color",
//     grid: 12,
//   },
//    {
//     type: "button",
//     label: "Submit",
//     variant: "contained",
//     color: "primary",
//     fullWidth: true,
//   },

// ];
export const TaskFormData = [
  {
    name: "title",
    label: "Task Title",
    type: "text",
    required: true,
    grid: 12,
  },
  {
    name: "description",
    label: "Task Description",
    type: "textarea",
    grid: 12,
  },
  {
    name: "status",
    label: "Project Status",
    type: "select",
    grid: 6,
    options: [
      { label: "TO-DO", value: "todo" },
      { label: "IN-PROGRESS", value: "in-progress" },
      { label: "DONE", value: "done" },
    ],
  },
  {
    name: "priority",
    label: "Project Priority",
    type: "select",
    grid: 6,
    options: [
      { label: "Low", value: "low" },
      { label: "High", value: "high" },
    ],
  },

  {
    name: "assignedTo",
    label: "Task Assign To User",
    type: "select",
    grid: 6,
    options: [],
  },

  {
    type: "button",
    label: "Submit",
    variant: "contained",
    color: "primary",
    fullWidth: true,
  },
];

export const ThemeFormData = [
  {
    section: "Basic Information",
    fields: [
      {
        name: "name",
        label: "Theme Name",
        type: "text",
        required: true,
        grid: 6,
      },
      {
        name: "mode",
        label: "Theme Mode",
        type: "select",
        required: true,
        grid: 6,
        options: [
          { label: "Dark", value: "dark" },
          { label: "Light", value: "light" },
        ],
      },
      {
        name: "inputType",
        label: "Select Input Type",
        type: "select",
        grid: 6,
        options: [
          { label: "Outlined", value: "outlined" },
          { label: "Filled", value: "filled" },
          { label: "Standard", value: "standard" },
        ],
      },
      {
        name: "buttonType",
        label: "Select Button Type",
        type: "select",
        grid: 6,
        options: [
          { label: "Text", value: "text" },
          { label: "Contained", value: "contained" },
          { label: "Outlined", value: "outlined" },
        ],
      },
    ],
  },

  {
    section: "Background Colors",
    fields: [
      {
        name: "colors.background.main",
        label: "Main Background",
        grid: 6,
        type: "color",
      },
      {
        name: "colors.background.paper",
        label: "Paper Background",
        type: "color",
        grid: 6,
      },
      {
        name: "colors.background.card",
        label: "Card Background",
        type: "color",
        grid: 6,
      },
    ],
  },

  {
    section: "Sidebar",
    fields: [
      {
        name: "colors.sidebar.background",
        label: "Sidebar Background",
        type: "color",
        grid: 6,
      },
      {
        name: "colors.sidebar.text",
        label: "Sidebar Text",
        grid: 6,
        type: "color",
      },
      {
        name: "colors.sidebar.icon",
        label: "Sidebar Icon",
        grid: 6,
        type: "color",
      },

      {
        name: "colors.sidebar.active.background",
        label: "Active Background",
        type: "color",
        grid: 6,
      },
      {
        name: "colors.sidebar.active.text",
        label: "Active Text",
        type: "color",
        grid: 6,
      },
      {
        name: "colors.sidebar.active.icon",
        label: "Active Icon",
        type: "color",
        grid: 6,
      },

      {
        name: "colors.sidebar.hover.background",
        label: "Hover Background",
        type: "color",
        grid: 6,
      },
      {
        name: "colors.sidebar.hover.text",
        label: "Hover Text",
        type: "color",
        grid: 6,
      },
      {
        name: "colors.sidebar.hover.icon",
        label: "Hover Icon",
        type: "color",
        grid: 6,
      },

      {
        name: "colors.sidebar.border",
        label: "Sidebar Border",
        type: "color",
        grid: 6,
      },
    ],
  },

  {
    section: "Text Colors",
    fields: [
      {
        name: "colors.text.primary",
        label: "Primary Text",
        type: "color",
        grid: 6,
      },
      {
        name: "colors.text.secondary",
        label: "Secondary Text",
        type: "color",
        grid: 6,
      },
      {
        name: "colors.text.disabled",
        label: "Disabled Text",
        type: "color",
        grid: 6,
      },
    ],
  },

  {
    section: "Buttons",
    fields: [
      {
        name: "colors.button.primary.background",
        label: "Primary Button Background",
        type: "color",
        grid: 6,
      },
      {
        name: "colors.button.primary.text",
        label: "Primary Button Text",
        type: "color",
        grid: 6,
      },
      {
        name: "colors.button.primary.hover",
        label: "Primary Button Hover",
        type: "color",
        grid: 6,
      },
      {
        name: "colors.button.primary.border",
        label: "Primary Button Border",
        type: "color",
        grid: 6,
      },

      {
        name: "colors.button.secondary.background",
        label: "Secondary Button Background",
        type: "color",
        grid: 6,
      },
      {
        name: "colors.button.secondary.text",
        label: "Secondary Button Text",
        type: "color",
        grid: 6,
      },
      {
        name: "colors.button.secondary.hover",
        label: "Secondary Button Hover",
        type: "color",
        grid: 6,
      },
      {
        name: "colors.button.secondary.border",
        label: "Secondary Button Border",
        type: "color",
        grid: 6,
      },
    ],
  },

  {
    section: "Icons & Borders",
    fields: [
      {
        name: "colors.icon.default",
        label: "Icon Default",
        grid: 6,
        type: "color",
      },
      {
        name: "colors.icon.active",
        label: "Icon Active",
        grid: 6,
        type: "color",
      },
      {
        name: "colors.icon.disabled",
        label: "Icon Disabled",
        grid: 6,
        type: "color",
      },

      {
        name: "colors.border.default",
        label: "Border Default",
        grid: 6,
        type: "color",
      },
      {
        name: "colors.border.focus",
        label: "Border Focus",
        grid: 6,
        type: "color",
      },
    ],
  },
  {
    section: "",
    fields: [
      {
        type: "button",
        label: "Submit",
        variant: "contained",
        color: "primary",
        fullWidth: true,
      },
    ],
  },
];
