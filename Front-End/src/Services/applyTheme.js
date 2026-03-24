export const applyTheme = (theme) => {
  if (!theme?.colors) return;

  const root = document.documentElement;
  const { colors } = theme;

  //  Background
  root.style.setProperty("--bg-main", colors.background.main);
  root.style.setProperty("--bg-paper", colors.background.paper);
  root.style.setProperty("--bg-card", colors.background.card);

  //  Text
  root.style.setProperty("--text-primary", colors.text.primary);
  root.style.setProperty("--text-secondary", colors.text.secondary);
  root.style.setProperty("--text-disabled", colors.text.disabled);

  //  Border
  root.style.setProperty("--border-default", colors.border.default);
  root.style.setProperty("--border-focus", colors.border.focus);

  //  Buttons
  root.style.setProperty("--btn-primary-bg", colors.button.primary.bg);
  root.style.setProperty("--btn-primary-text", colors.button.primary.text);
  root.style.setProperty("--btn-secondary-bg", colors.button.secondary.bg);
  root.style.setProperty("--btn-secondary-text", colors.button.secondary.text);

  //  Sidebar
  root.style.setProperty("--sidebar-bg", colors.sidebar.background);
  root.style.setProperty("--sidebar-text", colors.sidebar.text);
  root.style.setProperty("--sidebar-icon", colors.sidebar.icon);
  root.style.setProperty("--sidebar-active-bg", colors.sidebar.active.background);
  root.style.setProperty("--sidebar-active-text", colors.sidebar.active.text);
  root.style.setProperty("--sidebar-hover-bg", colors.sidebar.hover.background);
  root.style.setProperty("--sidebar-hover-text", colors.sidebar.hover.text);
  root.style.setProperty("--sidebar-hover-icon", colors.sidebar.hover.icon);

  //  Icons
  root.style.setProperty("--icon-default", colors.icon.default);
  root.style.setProperty("--icon-active", colors.icon.active);
  root.style.setProperty("--icon-disabled", colors.icon.disabled);

  //  Meta
  root.style.setProperty("--input-variant", theme.inputType);
  root.style.setProperty("--button-variant", theme.buttonType);
};
