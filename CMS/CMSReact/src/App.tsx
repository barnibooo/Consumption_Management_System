import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<<<<<<< Updated upstream
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
=======
      <AppBar position="static" sx={{ backgroundColor: "#202938" }}>
        <Container maxWidth={false}>
          <Toolbar
            disableGutters
            sx={{
              justifyContent: {
                xs: "center",
                sm: "center",
                xl: "space-between",
              },
              padding: { xs: "0 16px", xl: "0 24px" },
            }}
          >
            <BarChartIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1, fontSize: 35 }}
            />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                color: "#e7e6dd",
                textDecoration: "none",
              }}
            >
              Consumption Management System
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "none", color: "#d3d9d4" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon
                  sx={{
                    fontSize: 35,
                  }}
                />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page}
                    onClick={() => handlePageNavigation(page)}
                  >
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <BarChartIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                fontFamily: "monospace",
                fontWeight: 700,
                textDecoration: "none",
                color: "#e7e6dd",
                textAlign: { xs: "center", sm: "center" },
                flexGrow: { xs: 1, sm: 1 },
              }}
            >
              Content Management System
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={() => handlePageNavigation(page)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <AccountCircleIcon sx={{ fontSize: 35, color: "#e7e6dd" }} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        display="flex"
        height="calc(100vh - 64px)" // Adjust height to account for AppBar height
        flexDirection={{ xs: "column", md: "row" }}
      >
        {/* Sidebar Replacement */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", md: "column" },
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: "flex-start",
            p: 2,
            width: { xs: "90%", md: "auto" },
            minWidth: { md: 50 },
            mb: { xs: 2, md: 0 },
            m: 2,
            height: "90%",
            backgroundColor: "#202938",
          }}
        >
          <Stack direction={{ xs: "row", md: "column" }} spacing={2}>
            <IconButton>
              <RamenDiningOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />
            </IconButton>
            <IconButton>
              <LunchDiningOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />
            </IconButton>
            <IconButton>
              <DinnerDiningOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />
            </IconButton>
            <IconButton>
              <CookieOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />
            </IconButton>
            <IconButton>
              <FastfoodOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />
            </IconButton>
            <IconButton>
              <LocalBarOutlined sx={{ fontSize: 35, color: "#e7e6dd" }} />
            </IconButton>
          </Stack>
        </Box>

        {/* Orders Section */}
        <Box
          mb={{ xs: 2, md: 3 }}
          width={{ xs: "90%", md: "70%", lg: "40%", xl: "30%" }}
          display="flex"
          justifyContent={{ xs: "center", md: "flex-start" }}
          sx={{ height: "80%", p: 2 }} // Add margin around the Orders Box and set height to 50vh
        >
          <Card
            sx={{
              width: {
                xs: "100%",
                md: "100%",
              },
              height: "100%", // Set height to 100%
              backgroundColor: "#202938",
            }}
          >
            <CardHeader
              title="Orders"
              subheader="Total:"
              sx={{
                "& .MuiCardHeader-subheader": {
                  color: "#d5d6d6",
                },
                "& .MuiCardHeader-title": {
                  color: "#e7e6dd",
                },
              }}
            />
            <CardContent>
              {[...Array(5)].map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingBottom: "4px",
                    marginBottom: "4px",
                  }}
                >
                  <Typography variant="body2" color="#e7e6dd" fontSize={16}>
                    1x Étel név
                  </Typography>
                  <Typography variant="body2" color="#e7e6dd" fontSize={16}>
                    Ár XX
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Box>

        {/* Main Content */}
        <Box
          display="flex"
          flexDirection="column"
          flexGrow={1}
          ml={{ md: 3 }}
          width="100%"
        >
          {/* Content Cards */}
          <Box sx={{ height: "100%", overflowY: "scroll" }}>
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={2}
              justifyContent={{ xs: "center", sm: "flex-start" }}
              margin={2}
            >
              {[...Array(12)].map((_, index) => (
                <Card
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "45%",
                      md: "90%",
                      lg: "45%",
                      xl: "30%",
                    },
                    background: "#202938",
                    color: "#e7e6dd",
                  }}
                  key={index}
                >
                  <CardHeader
                    title="Étel név"
                    subheader="Kategória név"
                    sx={{ "& .MuiCardHeader-subheader": { color: "#d5d6d6" } }}
                  />
                  <CardMedia
                    component="img"
                    height="200"
                    image="/sample.png"
                    alt="Kép"
                  />
                  <CardContent>
                    <Typography>
                      Desciption: Opus igitur est dicere possit dura dfzhdg
                      dfgdfgd sdfd fdg wetfgdfg sdfsdfgsg
                    </Typography>
                    <Typography>IsAvailable: True</Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton>
                      <AddCircleOutlineIcon
                        sx={{ fontSize: 35, color: "#e7e6dd" }}
                      />
                    </IconButton>
                    <IconButton>
                      <RemoveCircleOutlineIcon
                        sx={{ fontSize: 35, color: "#e7e6dd" }}
                      />
                    </IconButton>
                  </CardActions>
                </Card>
              ))}
            </Stack>
          </Box>
        </Box>
      </Box>
>>>>>>> Stashed changes
    </>
  )
}

export default App
