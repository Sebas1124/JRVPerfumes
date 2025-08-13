import { Box, Drawer } from "@mui/material"
import { DrawerContent } from "./DrawerContent"

interface DrawerComponentProps {
    mobileOpen: boolean;
    handleDrawerToggle: () => void;
    navItems: { text: string; icon: React.ReactNode; path: string }[];
    drawerWidth?: number;
}

export const DrawerComponent = ({ mobileOpen, handleDrawerToggle, navItems, drawerWidth = 240 }: DrawerComponentProps) => {

  return (
    <Box
          component="nav"
          sx={{
            display: { xs: "block", md: "none" },
          }}
          aria-label="navigation"
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
                bgcolor: "background.paper",
              },
            }}
          >
            <DrawerContent
              isMobile={mobileOpen}
              handleDrawerToggle={handleDrawerToggle}
              navItems={navItems}
              drawerWidth={drawerWidth}
            />
          </Drawer>
        </Box>
  )
}
