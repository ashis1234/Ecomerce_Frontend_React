import * as React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';

export default function MediaControlCard() {
  const theme = useTheme();

  return (
    <div>
      <Card sx = {{ minWidth : "200px"}}>
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={4}>
            <CardMedia
              component = "img"
              image = {"https://picsum.photos/1200/500"}
            />
          </Grid>


          <Grid item xs={8}>
            <Typography variant="subtitle2" gutterBottom component="div">
              fjashf
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
}
