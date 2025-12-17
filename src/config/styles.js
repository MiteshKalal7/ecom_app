import { fonts } from ".";
import { colors } from "./colors";

export const globalStyles = {
  textStyle: (
    fontSize = 14,
    fontWeight,
    color = colors.color3,
    lineHeight = null,
    textAlign = "left",
    fontFamily = fonts.primary
  ) => ({
    fontSize,
    fontWeight,
    color,
    fontFamily,
    textAlign,
    lineHeight,
  }),
};
