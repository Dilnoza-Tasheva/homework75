import Grid from '@mui/material/Grid2';
import { CircularProgress, IconButton, TextField } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { useAppDispatch, useAppSelector } from './app/hooks.ts';
import { selectDecodedText, selectEncodedText, selectLoading, selectPassword } from './features/passwordSlice.ts';
import { decodeText, encodeText } from './features/passwordThunks.ts';
import { useEffect, useState } from 'react';


const App = () => {
  const dispatch = useAppDispatch();
  const password = useAppSelector(selectPassword);
  const decodedText = useAppSelector(selectDecodedText);
  const encodedText = useAppSelector(selectEncodedText);
  const fetchLoading = useAppSelector(selectLoading);

  const [appPassword, setAppPassword] = useState('');
  const [appDecodedText, setAppDecodedText] = useState('');
  const [appEncodedText, setAppEncodedText] = useState('');

  useEffect(() => {
    setAppPassword(password);
  }, [password]);

  useEffect(() => {
    setAppDecodedText(decodedText);
  }, [decodedText]);

  useEffect(() => {
    setAppEncodedText(encodedText);
  }, [encodedText]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppPassword(e.target.value);
  };

  const handleDecodedTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppDecodedText(e.target.value);
  };

  const handleEncodedTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAppEncodedText(e.target.value);
  };

  const sendEncodedText = () => {
    if (!appPassword) {
      alert('Password is required!');
      return;
    }
    dispatch(encodeText({ password: appPassword, message: appDecodedText }));
  };

  const sendDecodedText = () => {
    if (!appPassword) {
      alert('Password is required!');
      return;
    }
    dispatch(decodeText({ password: appPassword, message: appEncodedText}));
  };


    return (
        <Grid container direction={"column"} spacing={2} alignItems="center" justifyContent="center">
            <Grid size={{xs: 4}}>
                <TextField
                    label="Decoded Message"
                    id="decoded message"
                    name="decoded message"
                    fullWidth
                    multiline
                    value={appDecodedText}
                    onChange={handleDecodedTextChange}
                />
            </Grid>

            <Grid container direction={"row"} spacing={1} alignItems="center">
                <Grid size={{xs: 6}}>
                    <TextField
                        label="Password"
                        id="password"
                        name="password"
                        type="password"
                        value={appPassword}
                        onChange={handlePasswordChange}
                        fullWidth
                    />
                </Grid>

                <Grid container direction={"row"}  alignItems="center">
                    <IconButton color="primary" onClick={sendEncodedText}>
                        <ArrowDownwardIcon/>
                    </IconButton>
                    <IconButton color="primary" onClick={sendDecodedText}>
                        <ArrowUpwardIcon/>
                    </IconButton>
                </Grid>
            </Grid>

            <Grid size={{xs: 4}}>
                <TextField
                    label="Encoded Message"
                    id="encoded message"
                    name="encoded message"
                    fullWidth
                    multiline
                    value={appEncodedText}
                    onChange={handleEncodedTextChange}
                />
            </Grid>
          {fetchLoading && <CircularProgress />}
        </Grid>
    )
};

export default App;
