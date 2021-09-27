// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';

//-----------------------|| CUSTOM SUB CARD ||-----------------------//

export const SubCard = ({ children, title, ...others }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        border: '1px solid',
        borderColor: theme.palette.primary.light,
        ':hover': {
          boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
        },
      }}
      {...others}
    >
      {/* card header and action */}
      {title && <CardHeader sx={{ p: 2.5 }} title={<Typography variant="h5">{title}</Typography>} />}
      {/* content & header divider */}
      {title && (
        <Divider
          sx={{
            opacity: 1,
            borderColor: theme.palette.primary.light,
          }}
        />
      )}
      {/* card content */}
      <CardContent sx={{ p: 2.5 }}>{children}</CardContent>
    </Card>
  );
};
