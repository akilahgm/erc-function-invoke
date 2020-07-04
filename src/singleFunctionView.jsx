import React, { useState } from "react";
import "./App.css";
import { Button, Grid, Paper, TextField, InputLabel,CircularProgress  } from "@material-ui/core";

function SingleFunctionView(props) {
  const { data, contract } = props;
  const [result, setResult] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState(null);
  if (data.type !== "function") {
    return <></>;
  }

  const callFunction = async (name, args) => {
    setLoading(true)
    setResult(null)
    const func = contract[name];
    console.log(args)
    
    const argsArray =args?args.split(','):[]
    const result = await func(...argsArray);
    if (result._isBigNumber) {
      const numberResult = h2d(result._hex);
      setResult(numberResult);
    }else if(typeof result === 'string'){
      setResult(result);
    }else{
      setResult('success');
    }
    setLoading(false)
  };

  return (
    <Grid item xs={12} sm={9} style={{ padding: 10 }}>
      <Paper
        style={{
          textAlign: "center",
          padding: 10,
        }}
      >
        <Grid container style={{ flexDirection: "row" }}>
          <Grid item sm={3} style={{ textAlign: "left" }}>
            <InputLabel>{data.name ? data.name : "-ERROR-"}</InputLabel>
          </Grid>
          <Grid item sm={6}>
            {data.inputs && data.inputs.length > 0 ? (
              <TextField
                id="outlined-basic"
                label={(() => {
                  const values = data.inputs.map((data) => {
                    return data.name + ` (${data.type})`;
                  });
                  return values.join(",");
                })()}
                style={{ width: "100%" }}
                onChange={(event) => {
                  setText(event.target.value);
                }}
              />
            ) : (
              <p style={{ textAlign: "left" }}>Getter function</p>
            )}
          </Grid>
          <Grid item sm={3}>
            <Button
              variant="contained"
              color="primary"
              style={{ marginTop: 30 }}
              onClick={() => {
                callFunction(data.name,text);
              }}
            >
              Call
            </Button>
          </Grid>
        </Grid>
        {result ? (
          <div style={{ textAlign: "left", paddingLeft: 20, color: "green" }}>
            Result : {result}
          </div>
        ) : (isLoading?<CircularProgress />:null)}
      </Paper>
    </Grid>
  );
}

function h2d(s) {
  function add(x, y) {
    var c = 0,
      r = [];
    var x = x.split("").map(Number);
    var y = y.split("").map(Number);
    while (x.length || y.length) {
      var s = (x.pop() || 0) + (y.pop() || 0) + c;
      r.unshift(s < 10 ? s : s - 10);
      c = s < 10 ? 0 : 1;
    }
    if (c) r.unshift(c);
    return r.join("");
  }

  var dec = "0";
  s.split("").forEach(function (chr) {
    var n = parseInt(chr, 16);
    for (var t = 8; t; t >>= 1) {
      dec = add(dec, dec);
      if (n & t) dec = add(dec, "1");
    }
  });
  return dec;
}

export default SingleFunctionView;
