import { styled, Box, Chip, IconButton } from "@mui/material";

export const StatusChip = styled(Chip)(({ theme, status }) => ({
  backgroundColor:
    status === "Pending"
      ? theme.palette.warning.main
      : status === "Resolved"
      ? theme.palette.success.main
      : status === "Working"
      ? theme.palette.info.main
      : theme.palette.error.main,
  color: theme.palette.common.white,
  fontSize: "0.75rem",
}));

export const CompactCard = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: theme.spacing(1),
  borderBottom: `1px solid ${theme.palette.divider}`,
  position: "relative",
}));

export const CompactCardContent = styled(Box)(({ theme }) => ({
  flex: 1,
  marginLeft: theme.spacing(2),
}));

export const DeleteButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: theme.spacing(1),
  bottom: theme.spacing(1),
}));
