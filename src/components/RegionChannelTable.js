// import React, { useMemo, useState } from "react";

// export default function RegionChannelTable({ data }) {
//   const [openRegion, setOpenRegion] = useState({});
//   const [openChannel, setOpenChannel] = useState({});

//   const grouped = useMemo(() => {
//     const map = {};
//     data.forEach((r) => {
//       if (!map[r.region]) map[r.region] = {};
//       if (!map[r.region][r.channel]) map[r.region][r.channel] = [];

//       map[r.region][r.channel].push(r);
//     });
//     return map;
//   }, [data]);

//   const row = {
//     display: "flex",
//     padding: "8px 6px",
//     borderBottom: "1px solid #eee",
//     cursor: "pointer",
//   };

//   const cell = (w) => ({ width: w, fontSize: 14 });

//   const ctr = (i, c) => {
//     if (!i) return "0.00%";
//     return ((c / i) * 100).toFixed(2) + "%";
//   };

//   return (
//     <div style={{ background: "#fff", borderRadius: 8, padding: 12, marginTop: 12 }}>
//       {/* HEADER */}
//       <div style={{ ...row, fontWeight: 700, cursor: "default" }}>
//         <div style={cell(200)}>Category</div>
//         <div style={cell(120)}>Spend</div>
//         <div style={cell(120)}>Impr.</div>
//         <div style={cell(120)}>Conv</div>
//         <div style={cell(120)}>Clicks</div>
//         <div style={cell(100)}>CTR</div>
//       </div>

//       {/* REGIONS */}
//       {Object.keys(grouped).map((region) => (
//         <React.Fragment key={region}>
//           <div
//             style={{ ...row, fontWeight: 600 }}
//             onClick={() =>
//               setOpenRegion((p) => ({ ...p, [region]: !p[region] }))
//             }
//           >
//             <div style={cell(200)}>
//               {openRegion[region] ? "▼" : "▶"} {region}
//             </div>
//             <div style={cell(120)}>-</div>
//             <div style={cell(120)}>-</div>
//             <div style={cell(120)}>-</div>
//             <div style={cell(120)}>-</div>
//             <div style={cell(100)}>-</div>
//           </div>

//           {openRegion[region] &&
//             Object.keys(grouped[region]).map((channel) => {
//               const rows = grouped[region][channel];

//               const agg = rows.reduce(
//                 (a, r) => {
//                   a.s += r.spend;
//                   a.i += r.impressions;
//                   a.c += r.conversions;
//                   a.k += r.clicks;
//                   return a;
//                 },
//                 { s: 0, i: 0, c: 0, k: 0 }
//               );

//               return (
//                 <React.Fragment key={channel}>
//                   <div
//                     style={{ ...row, paddingLeft: 24, fontWeight: 500 }}
//                     onClick={() =>
//                       setOpenChannel((p) => ({
//                         ...p,
//                         [channel]: !p[channel],
//                       }))
//                     }
//                   >
//                     <div style={cell(200)}>
//                       {openChannel[channel] ? "▼" : "▶"} {channel}
//                     </div>

//                     <div style={cell(120)}>₹{agg.s.toFixed(2)}</div>
//                     <div style={cell(120)}>{agg.i.toLocaleString()}</div>
//                     <div style={cell(120)}>{agg.c}</div>
//                     <div style={cell(120)}>{agg.k}</div>
//                     <div style={cell(100)}>{ctr(agg.i, agg.c)}</div>
//                   </div>

//                   {openChannel[channel] &&
//                     rows.map((r, index) => (
//                       <div
//                         key={index}
//                         style={{
//                           ...row,
//                           paddingLeft: 48,
//                           background: "#fafafa",
//                           cursor: "default",
//                         }}
//                       >
//                         <div style={cell(200)}>Row #{r.id}</div>
//                         <div style={cell(120)}>₹{r.spend}</div>
//                         <div style={cell(120)}>{r.impressions}</div>
//                         <div style={cell(120)}>{r.conversions}</div>
//                         <div style={cell(120)}>{r.clicks}</div>
//                         <div style={cell(100)}>{ctr(r.impressions, r.conversions)}</div>
//                       </div>
//                     ))}
//                 </React.Fragment>
//               );
//             })}
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }
import React, { useMemo, useState } from "react";

export default function RegionChannelTable({ data }) {
  const [openRegion, setOpenRegion] = useState({});
  const [openChannel, setOpenChannel] = useState({});

  // Group data region → channel
  const grouped = useMemo(() => {
    const map = {};
    data.forEach((r) => {
      if (!map[r.region]) map[r.region] = {};
      if (!map[r.region][r.channel]) map[r.region][r.channel] = [];

      map[r.region][r.channel].push(r);
    });
    return map;
  }, [data]);

  const header = {
    display: "flex",
    padding: "10px 8px",
    borderBottom: "2px solid #e2e2e2",
    fontWeight: 700,
    background: "#f8f9fb",
  };

  const row = {
    display: "flex",
    padding: "8px 8px",
    borderBottom: "1px solid #eee",
    alignItems: "center",
    fontSize: 14,
  };

  const cell = (w) => ({ width: w, minWidth: w });

  const ctr = (impr, conv) => {
    if (!impr) return "0.00%";
    return ((conv / impr) * 100).toFixed(2) + "%";
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 10,
        padding: 12,
        marginTop: 16,
        boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
      }}
    >
      {/* HEADER */}
      <div style={header}>
        <div style={cell(240)}>Category</div>
        <div style={cell(120)}>Spend</div>
        <div style={cell(120)}>Impr.</div>
        <div style={cell(120)}>Conv</div>
        <div style={cell(120)}>Clicks</div>
        <div style={cell(100)}>CTR</div>
      </div>

      {/* REGION ROWS */}
      {Object.keys(grouped).map((region) => (
        <React.Fragment key={region}>
          <div
            style={{
              ...row,
              background: "#fdfdfd",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={() =>
              setOpenRegion((p) => ({ ...p, [region]: !p[region] }))
            }
          >
            <div style={cell(240)}>
              {openRegion[region] ? "▼" : "▶"} {region}
            </div>
            <div style={cell(120)}>-</div>
            <div style={cell(120)}>-</div>
            <div style={cell(120)}>-</div>
            <div style={cell(120)}>-</div>
            <div style={cell(100)}>-</div>
          </div>

          {/* CHANNEL ROWS */}
          {openRegion[region] &&
            Object.keys(grouped[region]).map((channel) => {
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
                    style={{
                      ...row,
                      paddingLeft: 22,
                      fontWeight: 500,
                      cursor: "pointer",
                      background: "#fafafa",
                    }}
                    onClick={() =>
                      setOpenChannel((p) => ({
                        ...p,
                        [channel]: !p[channel],
                      }))
                    }
                  >
                    <div style={cell(240)}>
                      {openChannel[channel] ? "▼" : "▶"} {channel}
                    </div>

                    <div style={cell(120)}>₹{agg.s.toFixed(2)}</div>
                    <div style={cell(120)}>{agg.i.toLocaleString()}</div>
                    <div style={cell(120)}>{agg.c}</div>
                    <div style={cell(120)}>{agg.k}</div>
                    <div style={cell(100)}>{ctr(agg.i, agg.c)}</div>
                  </div>

                  {/* RAW ROWS (Optional expand) */}
                  {openChannel[channel] &&
                    rows.map((r) => (
                      <div
                        key={r.id}
                        style={{
                          ...row,
                          paddingLeft: 50,
                          background: "#f3f4f6",
                        }}
                      >
                        <div style={cell(240)}>Row #{r.id}</div>

                        <div style={cell(120)}>₹{r.spend}</div>
                        <div style={cell(120)}>{r.impressions}</div>
                        <div style={cell(120)}>{r.conversions}</div>
                        <div style={cell(120)}>{r.clicks}</div>
                        <div style={cell(100)}>
                          {ctr(r.impressions, r.conversions)}
                        </div>
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
