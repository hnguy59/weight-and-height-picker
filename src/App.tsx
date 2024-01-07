import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { ResizableBox, ResizeCallbackData } from "react-resizable";

import {
  Button,
  FormControl,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";

import { DEFAULT_HEIGHT, DEFAULT_WEIGHT } from "./data/static";

function App() {
  const DEFAULT_IMAGE_WIDTH = 1592 / 3;
  const DEFAULT_IMAGE_HEIGHT = 1674 / 3;
  const heightRatio = DEFAULT_IMAGE_HEIGHT / DEFAULT_HEIGHT;
  const widthRatio = DEFAULT_IMAGE_WIDTH / DEFAULT_WEIGHT;

  const [imageHeight, setImageHeight] = useState(DEFAULT_IMAGE_HEIGHT);
  const [imageWidth, setImageWidth] = useState(DEFAULT_IMAGE_WIDTH);
  const [height, setHeight] = useState(imageHeight / heightRatio);
  const [weight, setWeight] = useState(imageWidth / widthRatio);

  // const bmiValue = weight / (((height / 100) * height) / 100);

  const handleResize = useCallback(
    (e: SyntheticEvent, { size }: ResizeCallbackData) => {
      setImageWidth(size.width);
      setImageHeight(size.height);
      setHeight(size.height / heightRatio);
      setWeight(size.width / widthRatio);
    },
    [heightRatio, widthRatio]
  );

  const handleReset = useCallback(() => {
    setImageHeight(DEFAULT_IMAGE_HEIGHT);
    setImageWidth(DEFAULT_IMAGE_WIDTH);
    setHeight(DEFAULT_IMAGE_HEIGHT / heightRatio);
    setWeight(DEFAULT_IMAGE_WIDTH / widthRatio);
  }, [DEFAULT_IMAGE_HEIGHT, DEFAULT_IMAGE_WIDTH, heightRatio, widthRatio]);

  useEffect(() => {
    const newImageHeight = height * heightRatio;
    const newImageWidth = weight * widthRatio;

    setImageHeight(newImageHeight);
    setImageWidth(newImageWidth);
  }, [height, heightRatio, weight, widthRatio]);

  return (
    <div className="flex flex-col justify-between items-center w-screen gap-5 p-5">
      <Typography variant="h3">What's my measurements?</Typography>
      <FormControl
        className="flex flex-row gap-5 justify-between"
        variant="outlined"
      >
        <TextField
          label="Height"
          type="number"
          value={height.toFixed()}
          onChange={(e) => setHeight(Number(e.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
          }}
        />
        <TextField
          label="Weight"
          type="number"
          value={weight.toFixed()}
          onChange={(e) => setWeight(Number(e.target.value))}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
        />
        <Button onClick={handleReset}>Reset me</Button>
      </FormControl>
      <ResizableBox
        className="box hover-handles"
        width={imageWidth}
        height={imageHeight}
        onResize={handleResize}
        resizeHandles={["sw", "se", "nw", "ne", "w", "e", "n", "s"]}
      >
        <img src="/henry-body.png" className="w-full h-full border" />
      </ResizableBox>
      <div></div>
    </div>
  );
}

export default App;
