import { forwardRef } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider } from '@mui/material';

//-----------------------|| CUSTOM MAIN CARD ||-----------------------//

export const MainCard = forwardRef(({ border = true, children, content = true, contentClass, title, ...others }, ref) => {
  const theme = useTheme();

  return (
    <Card
      ref={ref}
      {...others}
      sx={{
        border: border ? '1px solid' : 'none',
        borderColor: theme.palette.primary[200] + 75,
      }}
    >
      {/* card header */}
      {title && <CardHeader title={title} />}

      {/* content & header divider */}
      {title && <Divider />}

      {/* card content */}
      {content && <CardContent sx={{ ...contentClass }}>{children}</CardContent>}
      {!content && children}
    </Card>
  );
});
