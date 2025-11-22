import React, { useMemo, useState } from "react";

export default function RegionChannelTable({ data }) {
  const [openRegion, setOpenRegion] = useState({});
  const [openChannel, setOpenChannel] = useState({});

  // Group data by region → channel
  const grouped = useMemo(() => {
    const map = {};
    data.forEach(r => {
      if (!map[r.region]) map[r.region] = {};
      if (!map[r.region][r.channel]) map[r.region][r.channel] = [];
      map[r.region][r.channel].push(r);
    });
    return map;
  }, [data]);

  const row = {
    display: "flex",
    padding: "8px 6px",
    borderBottom: "1px solid #eee",
    cursor: "pointer"
  };

  const cell = w => ({ width: w });

  return (
    <div style={{ background: "#fff", borderRadius: 8, padding: 12 }}>
      <div style={{ ...row, fontWeight: 700, cursor: "default" }}>
        <div style={cell(200)}>Category</div>
        <div style={cell(120)}>Spend</div>
        <div style={cell(120)}>Impr</div>
        <div style={cell(120)}>Conv</div>
        <div style={cell(120)}>Clicks</div>
      </div>

      {/* REGIONS */}
      {Object.keys(grouped).map(region => (
        <React.Fragment key={region}>
          <div
            style={{ ...row, fontWeight: 600 }}
            onClick={() =>
              setOpenRegion(prev => ({ ...prev, [region]: !prev[region] }))
            }
          >
            <div style={cell(200)}>
              {openRegion[region] ? "▼" : "▶"} {region}
            </div>
            <div style={cell(120)}>-</div>
            <div style={cell(120)}>-</div>
            <div style={cell(120)}>-</div>
            <div style={cell(120)}>-</div>
          </div>

          {/* CHANNELS */}
          {openRegion[region] &&
            Object.keys(grouped[region]).map(channel => {
              const rows = grouped[region][channel];
              const agg = rows.reduce(
                (a, r) => {
                  a.s += r.spend;
                  a.i += r.impressions;
                  a.c += r.conversions;
                  a.k += r.clicks;
                  return a;
                },
                { s: 0, i: 0, c: 0, k: 0 }
              );

              return (
                <React.Fragment key={channel}>
                  <div
                    style={{ ...row, paddingLeft: 24 }}
                    onClick={() =>
                      setOpenChannel(prev => ({
                        ...prev,
                        [channel]: !prev[channel]
                      }))
                    }
                  >
                    <div style={cell(200)}>
                      {openChannel[channel] ? "▼" : "▶"} {channel}
                    </div>
                    <div style={cell(120)}>₹{agg.s.toFixed(2)}</div>
                    <div style={cell(120)}>{agg.i.toLocaleString()}</div>
                    <div style={cell(120)}>{agg.c}</div>
                    <div style={cell(120)}>{agg.k}</div>
                  </div>

                  {/* OPTIONAL: SHOW RAW ROWS */}
                  {openChannel[channel] &&
                    rows.map((r, idx) => (
                      <div
                        key={idx}
                        style={{ ...row, paddingLeft: 48, background: "#fafafa" }}
                      >
                        <div style={cell(200)}>Row #{r.id}</div>
                        <div style={cell(120)}>₹{r.spend}</div>
                        <div style={cell(120)}>{r.impressions}</div>
                        <div style={cell(120)}>{r.conversions}</div>
                        <div style={cell(120)}>{r.clicks}</div>
                      </div>
                    ))}
                </React.Fragment>
              );
            })}
        </React.Fragment>
      ))}
    </div>
  );
}
