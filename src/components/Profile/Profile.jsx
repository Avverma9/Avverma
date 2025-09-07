import {
  Edit as EditIcon,
  Email as EmailIcon,
  Home as HomeIcon,
  Lock as LockIcon,
  Logout as LogoutIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProfileData } from "../../redux/reducers/profileSlice";
import { userId } from "../../utils/Unauthorized";

function InfoItem({ icon, label, value, onActionClick }) {
  return (
    <ListItem sx={{ py: 0.75 }}>
      <ListItemIcon sx={{ minWidth: 36, color: "primary.dark" }}>
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="caption" color="text.secondary">
            {label}
          </Typography>
        }
        secondary={
          value ? (
            <Typography
              variant="body2"
              color="text.primary"
              sx={{ fontWeight: 500 }}
            >
              {value}
            </Typography>
          ) : (
            <Typography
              variant="caption"
              onClick={onActionClick}
              sx={{
                fontWeight: 500,
                color: "warning.main",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Please Update
            </Typography>
          )
        }
      />
    </ListItem>
  );
}

function PasswordItem({ onActionClick }) {
  return (
    <ListItem sx={{ py: 0.75 }}>
      <ListItemIcon sx={{ minWidth: 36, color: "primary.dark" }}>
        <LockIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant="caption" color="text.secondary">
            Password
          </Typography>
        }
        secondary={
          <Button
            size="small"
            variant="text"
            onClick={onActionClick}
            sx={{
              p: 0,
              justifyContent: "flex-start",
              textTransform: "none",
              height: "22px",
            }}
          >
            Change Password
          </Button>
        }
      />
    </ListItem>
  );
}

const ProfileSkeleton = () => (
  <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
    <Card sx={{ maxWidth: 380, width: "100%", borderRadius: 3.5 }}>
      <Box sx={{ height: 80, bgcolor: "grey.200" }} />
      <Stack sx={{ p: 2, mt: -6 }} alignItems="center">
        <Skeleton
          variant="circular"
          sx={{ width: 90, height: 90, border: "4px solid white" }}
        />
        <Skeleton
          variant="text"
          sx={{ fontSize: "1.25rem", width: "60%", mt: 1 }}
        />
      </Stack>
      <Divider sx={{ mt: -1.5 }} />
      <List dense sx={{ p: 1.5, py: 0.5 }}>
        {Array.from(new Array(4)).map((_, index) => (
          <ListItem key={index} sx={{ py: 0.75 }}>
            <ListItemIcon>
              <Skeleton variant="circular" width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary={<Skeleton variant="text" width="40%" />}
              secondary={<Skeleton variant="text" width="80%" />}
            />
          </ListItem>
        ))}
      </List>
    </Card>
  </Box>
);

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    if (!userId) {
      navigate("/login", { replace: true });
      return;
    }
    dispatch(fetchProfileData(userId));
  }, [dispatch, navigate]);

  if (!userId) {
    return null;
  }

  if (error) {
    return (
      <Typography color="error" sx={{ p: 3 }}>
        Error loading profile data: {error.message}
      </Typography>
    );
  }

  if (loading) {
    return <ProfileSkeleton />;
  }

  const handleEdit = () => {
    navigate("/profile-update/user-data/page");
  };

  const handleLogOut = () => {
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
      }}
    >
      <Card
        sx={{
          maxWidth: 380,
          width: "100%",
          borderRadius: 3.5,
          boxShadow: "0 10px 30px -5px rgba(0,0,0,0.1)",
        }}
      >
        <Box
          sx={{
            height: 80,
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }}
        />
        <Stack sx={{ p: 1, mt: -2 }} alignItems="center" spacing={1}>
          <Avatar
            src={data?.images?.[0]}
            alt={data?.name || "User Avatar"}
            sx={{
              width: 90,
              height: 90,
              border: "4px solid",
              borderColor: "background.paper",
              boxShadow: 3,
            }}
          />
          <Typography variant="h6" fontWeight="bold">
            {data?.userName || "User Name"}
          </Typography>
        </Stack>
        <Divider sx={{ mt: -1 }} />
        <List dense sx={{ px: 1.5 }}>
          <InfoItem
            icon={<EmailIcon fontSize="small" />}
            label="Email Address"
            value={data?.email}
            onActionClick={handleEdit}
          />
          <InfoItem
            icon={<PhoneIcon fontSize="small" />}
            label="Phone Number"
            value={data?.mobile}
            onActionClick={handleEdit}
          />
          <InfoItem
            icon={<HomeIcon fontSize="small" />}
            label="Address"
            value={data?.address}
            onActionClick={handleEdit}
          />
          <PasswordItem onActionClick={handleEdit} />
        </List>
        <Divider />
        <Stack
          spacing={1.5}
          direction="row"
          sx={{ p: 1.5, justifyContent: "center" }}
        >
          <Button
            size="small"
            onClick={handleLogOut}
            variant="outlined"
            color="error"
            startIcon={<LogoutIcon />}
          >
            Log Out
          </Button>
          <Button
            size="small"
            onClick={handleEdit}
            variant="contained"
            startIcon={<EditIcon />}
          >
            Update Profile
          </Button>
        </Stack>
      </Card>
    </Box>
  );
}
