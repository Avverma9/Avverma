<JoyBox
      sx={{
        width: '100%',
        position: 'relative',
        overflow: { xs: 'auto', sm: 'initial' },
      }}
    >
      <JoyBox
        sx={{
          position: 'absolute',
          display: 'block',
          width: '1px',
          bgcolor: 'warning.300',
          left: '500px',
          top: '-24px',
          bottom: '-24px',
          '&::before': {
            top: '4px',
            content: '"vertical"',
            display: 'block',
            position: 'absolute',
            right: '0.5rem',
            color: 'text.tertiary',
            fontSize: 'sm',
            fontWeight: 'lg',
          },
          '&::after': {
            top: '4px',
            content: '"horizontal"',
            display: 'block',
            position: 'absolute',
            left: '0.5rem',
            color: 'text.tertiary',
            fontSize: 'sm',
            fontWeight: 'lg',
          },
        }}
      />
      <Card
        orientation="horizontal"
        sx={{
          width: '100%',
          flexWrap: 'wrap',
          [`& > *`]: {
            '--stack-point': '500px',
            minWidth:
              'clamp(0px, (calc(var(--stack-point) - 2 * var(--Card-padding) - 2 * var(--variant-borderWidth, 0px)) + 1px - 100%) * 999, 100%)',
          },
          // make the card resizable for demo
          overflow: 'auto',
          resize: 'horizontal',
        }}
      >
        <AspectRatio flex ratio="1" maxHeight={182} sx={{ minWidth: 182 }}>
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
            srcSet="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
        <CardContent>
          <Typography fontSize="xl" fontWeight="lg">
            Alex Morrison
          </Typography>
          <Typography level="body-sm" fontWeight="lg" textColor="text.tertiary">
            Senior Journalist
          </Typography>
          <Sheet
            sx={{
              bgcolor: 'background.level1',
              borderRadius: 'sm',
              p: 1.5,
              my: 1.5,
              display: 'flex',
              gap: 2,
              '& > div': { flex: 1 },
            }}
          >
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Articles
              </Typography>
              <Typography fontWeight="lg">34</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Followers
              </Typography>
              <Typography fontWeight="lg">980</Typography>
            </div>
            <div>
              <Typography level="body-xs" fontWeight="lg">
                Rating
              </Typography>
              <Typography fontWeight="lg">8.9</Typography>
            </div>
          </Sheet>
          <JoyBox sx={{ display: 'flex', gap: 1.5, '& > button': { flex: 1 } }}>
            <JoyButton variant="outlined" color="neutral">
              Chat
            </JoyButton>
            <JoyButton variant="solid" color="primary">
              Follow
            </JoyButton>
          </JoyBox>
        </CardContent>
      </Card>
    </JoyBox>